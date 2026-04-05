import React, { useContext, useEffect, useState } from 'react';
import NavtitleAdmin from '../../components/adminPage/NavtitleAdmin';
import NavbarPost from '../../components/adminPage/responsiveUI/mobile/NavbarPost.mobile';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine, RiUploadCloud2Line } from 'react-icons/ri';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PriceListContext } from '../../context/price-list/PriceListContext';
import ErrorLoading from '../../components/common/error/ErrorLoading';
import { LoadingLocal } from '../../components/common/loading';
import { isIErrorResponse } from '../../types/error/error';
import { Toastify } from '../../helper/Toastify';
import { IProductVariant, IPriceListApi } from '../../types/type/price-list/price-list';
import ModalCreatePriceListPageAdmin from '../../components/adminPage/modalAdmin/price-list/PriceListPageModal/CreatePriceList.modal';
import ModalDeletePriceListPageAdmin from '../../components/adminPage/modalAdmin/price-list/PriceListPageModal/DeletePriceList.modal';
import ModalEditPriceListPageAdmin from '../../components/adminPage/modalAdmin/price-list/PriceListPageModal/EditPriceList.modal';
import PriceListImportModal from './PriceListImport.modal';

const PriceListManagerPage: React.FC = () => {
  const { priceLists, getAllPriceLists, loading, error, deletePriceLists } = useContext(PriceListContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState<IPriceListApi | null>(null);
  const [catalogs, setCatalogs] = useState<Record<string, Record<string, IProductVariant[]>>>({});
  const [parentIds, setParentIds] = useState<Record<string, string>>({});
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);

  const openModalEditAdmin = (priceList: IPriceListApi) => {
    setSelectedPriceList(priceList);
    setIsModalEditOpen(true);
  };

  const closeModalEditAdmin = () => {
    setSelectedPriceList(null);
    setIsModalEditOpen(false);
  };

  const openModalDeleteAdmin = (priceList: IPriceListApi) => {
    setSelectedPriceList(priceList);
    setIsModalDeleteOpen(true);
  };

  const closeModalDeleteAdmin = () => {
    setSelectedPriceList(null);
    setIsModalDeleteOpen(false);
  };

  const [openPriceListImport, setOpenPriceListImport] = useState(false);

  useEffect(() => {
    if (!priceLists || priceLists.length === 0) return;

    const aggregatedData: Record<string, Record<string, IProductVariant[]>> = {};
    const parentIdMap: Record<string, string> = {};
    const newActiveTabs: Record<string, string> = {};

    priceLists.forEach(list => {
      const category = list.category;
      if (!aggregatedData[category]) aggregatedData[category] = {};

      list.groups.forEach(group => {
        aggregatedData[category][group.catalog] = group.variants.map(v => ({
          ...v,
          price_new: typeof v.price_new === 'string' ? Number(v.price_new) : v.price_new,
          price_used: typeof v.price_used === 'string' ? Number(v.price_used) : v.price_used,
          storage: v.storage
        }));

        parentIdMap[group.catalog] = list._id;

        if (!newActiveTabs[category]) newActiveTabs[category] = group.catalog;
      });
    });

    setCatalogs(aggregatedData);
    setParentIds(parentIdMap);
    setActiveTabs(prev => ({ ...newActiveTabs, ...prev }));
  }, [priceLists]);

  const handleDelete = async () => {
    if (!selectedPriceList) return;

    try {
      await deletePriceLists(selectedPriceList._id);
      Toastify('Xoá bảng giá thành công', 201);
      closeModalDeleteAdmin();
      getAllPriceLists();
    } catch (err) {
      const errorMessage = isIErrorResponse(err) ? err.data?.message : 'Xoá thất bại';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarPost Title_NavbarPost="Bảng Giá" />

      <NavtitleAdmin
        Title_NavtitleAdmin="Quản Lý Danh Sách Bảng Giá"
        Btn_Create={
          <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
            <Button color="primary" onClick={openModalCreateAdmin} className="w-[100px] text-sm font-light text-white">
              <RiAddBoxLine className="text-xl" />
              Thêm
            </Button>

            <Button
              color="secondary"
              onClick={() => setOpenPriceListImport(true)}
              className="w-[100px] text-sm font-light text-white"
            >
              <RiUploadCloud2Line className="text-xl" />
            </Button>
          </div>
        }
      />

      {Object.keys(catalogs).map(categoryType => {
        const activeCatalog = activeTabs[categoryType];
        const parentPriceList = priceLists.find(list => list._id === parentIds[activeCatalog]);

        return (
          Object.keys(catalogs[categoryType]).length > 0 && (
            <div key={categoryType}>
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 px-2 xl:grid-cols-6 xl:px-0">
                {Object.keys(catalogs[categoryType]).map(category => (
                  <Button
                    size="sm"
                    key={category}
                    onClick={() =>
                      setActiveTabs(prev => ({
                        ...prev,
                        [categoryType]: category
                      }))
                    }
                    className={`my-2 text-xs xl:text-sm ${
                      activeTabs[categoryType] === category ? 'bg-primary text-white' : 'bg-white text-primary'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {/*  */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold uppercase text-black dark:text-white">
                  {categoryType === 'phoneProducts'
                    ? 'Điện Thoại'
                    : categoryType === 'tabletProducts'
                      ? 'Máy Tính Bảng'
                      : categoryType === 'macbookProducts'
                        ? 'Laptop Macbook'
                        : 'Laptop Windows'}
                </h2>
                <h2 className="text-xl font-bold uppercase text-black dark:text-white">{activeCatalog}</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => parentPriceList && openModalEditAdmin(parentPriceList)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    size="sm"
                    className="bg-red-600 text-white"
                    onClick={() => parentPriceList && openModalDeleteAdmin(parentPriceList)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="w-screen overflow-x-auto xl:w-full">
                <Table className="my-5 border border-secondary" zebra>
                  <Table.Head className="bg-secondary text-center text-white">
                    <span>#</span>
                    <span>Tên sản phẩm</span>
                    <span>Giá Máy Mới</span>
                    <span>Giá Máy Cũ</span>
                    <span>ĐK thu mua</span>
                  </Table.Head>

                  <Table.Body className="text-center text-sm">
                    {catalogs[categoryType][activeCatalog]?.map((product, index) => (
                      <Table.Row key={product._id} className="border border-secondary text-black dark:text-white">
                        <span>#{index + 1}</span>
                        <span>{product.name}</span>

                        <span className="font-semibold text-red-700">
                          {product.price_new ? (product.price_new * 1000).toLocaleString('vi-VN') + 'đ' : '-'}
                        </span>

                        <span className="font-semibold text-red-700">
                          {product.price_used ? (product.price_used * 1000).toLocaleString('vi-VN') + 'đ' : '-'}
                        </span>

                        <span className="line-clamp-2 w-40">
                          {product.condition ? (
                            <span dangerouslySetInnerHTML={{ __html: product.condition }} />
                          ) : (
                            'Chưa có nội dung'
                          )}
                        </span>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          )
        );
      })}

      <PriceListImportModal open={openPriceListImport} onClose={() => setOpenPriceListImport(false)} />

      <ModalCreatePriceListPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />

      <ModalEditPriceListPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        priceList={selectedPriceList}
      />

      <ModalDeletePriceListPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PriceListManagerPage;
