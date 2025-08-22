import React, { useContext, useEffect, useState } from 'react';
import ModalCreatePriceListPageAdmin from '../../components/admin/modalAdmin/ModalPriceListPage/ModalCreatePriceListPageAdmin';
import ModalDeletePriceListPageAdmin from '../../components/admin/modalAdmin/ModalPriceListPage/ModalDeletePriceListPageAdmin';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarPost from '../../components/admin/responsiveUI/mobile/NavbarPost';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { PriceListContext } from '../../context/price-list/PriceListContext';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../components/orther/loading';
import { isIErrorResponse } from '../../types/error/error';
import { Toastify } from '../../helper/Toastify';
import { IProductVariant } from '../../types/type/price-list/price-list';

const PriceListManagerPage: React.FC = () => {
  const { priceLists, getAllPriceLists, loading, error, deletePriceLists } = useContext(PriceListContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPriceListId, setSelectedPriceListId] = useState<string | null>(null);
  const [catalogs, setCatalogs] = useState<Record<string, Record<string, IProductVariant[]>>>({});
  const [parentIds, setParentIds] = useState<Record<string, string>>({});
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPriceListId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);

  useEffect(() => {
    if (!priceLists || priceLists.length === 0) return;

    const aggregatedData: Record<string, Record<string, IProductVariant[]>> = {};
    const parentIdMap: Record<string, string> = {};
    const newActiveTabs: Record<string, string> = {};

    priceLists.forEach(list => {
      const category = list.category; // ví dụ "phoneProducts"
      if (!aggregatedData[category]) aggregatedData[category] = {};

      list.groups.forEach(group => {
        aggregatedData[category][group.catalog] = group.variants.map(v => ({
          ...v,
          price_new: typeof v.price_new === 'string' ? Number(v.price_new) : v.price_new,
          price_used: typeof v.price_used === 'string' ? Number(v.price_used) : v.price_used
        }));
        parentIdMap[group.catalog] = list._id;

        if (!newActiveTabs[category]) newActiveTabs[category] = group.catalog; // mặc định tab đầu
      });
    });

    setCatalogs(aggregatedData);
    setParentIds(parentIdMap);
    setActiveTabs(prev => ({ ...newActiveTabs, ...prev }));
  }, [priceLists]);

  const handleDelete = async () => {
    if (!selectedPriceListId) return;
    try {
      await deletePriceLists(selectedPriceListId);
      Toastify('Xoá sản phẩm thành công', 201);
      getAllPriceLists();
      closeModalDeleteAdmin();
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
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Bảng Giá"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="primary"
                onClick={openModalCreateAdmin}
                className="w-[100px] text-sm font-light text-white"
              >
                <RiAddBoxLine className="text-xl" color="white" />
                Thêm
              </Button>
            </div>
          }
        />
      </div>

      {Object.keys(catalogs).map(
        categoryType =>
          Object.keys(catalogs[categoryType]).length > 0 && (
            <div key={categoryType}>
              <h2 className="my-5 px-2 font-bold text-primary">
                {categoryType === 'phoneProducts'
                  ? 'Bảng giá iPhone'
                  : categoryType === 'tabletProducts'
                    ? 'Bảng giá iPad'
                    : categoryType === 'macbookProducts'
                      ? 'Bảng giá Laptop Macbook'
                      : 'Bảng giá Laptop Windows'}
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 px-2 xl:grid-cols-6 xl:px-0">
                {Object.keys(catalogs[categoryType]).map(category => (
                  <Button
                    key={category}
                    onClick={() => setActiveTabs(prev => ({ ...prev, [categoryType]: category }))}
                    className={`flex w-full items-center justify-center rounded-md text-xs transition-all duration-500 ease-in-out hover:rounded-box hover:bg-secondary hover:text-white xl:text-sm ${
                      activeTabs[categoryType] === category ? 'bg-primary text-white' : 'bg-white text-primary'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Table */}
              <div className="w-screen overflow-x-auto border-8 border-transparent scrollbar-hide xl:w-full xl:border-none">
                <Table className="mt-5 border border-secondary" zebra>
                  <Table.Head className="bg-secondary text-center text-white">
                    <span>#</span>
                    <span>Tên sản phẩm</span>
                    <span>Dung lượng</span>
                    <span>Giá Máy Mới</span>
                    <span>Giá Máy Cũ</span>
                    <span>Trạng thái</span>
                    <span>ĐK thu mua</span>
                    <span>Hành động</span>
                  </Table.Head>
                  <Table.Body className="text-center text-sm">
                    {catalogs[categoryType][activeTabs[categoryType]]?.map((product, index) => (
                      <Table.Row key={index} className="border border-secondary text-black dark:text-white">
                        <span>#{index + 1}</span>
                        <span>{product.name}</span>
                        <span>{product.storage}</span>
                        <span>{(product.price_new * 1000).toLocaleString('vi-VN')}đ</span>
                        <span>{(product.price_used * 1000).toLocaleString('vi-VN')}đ</span>
                        <span className="line-clamp-2">
                          {product?.condition ? (
                            <span dangerouslySetInnerHTML={{ __html: product.condition }} />
                          ) : (
                            'Chưa có nội dung'
                          )}
                        </span>
                        <span className="flex flex-row items-center justify-center gap-2">
                          {/* <Button
                                size="sm"
                                color="success"
                                // onClick={() =>
                                //   // openModalEditAdmin(product?._id ?? '')
                                // }
                                className="text-sm font-light text-white"
                              >
                                <FaPenToSquare />
                              </Button> */}
                          <Button
                            size="sm"
                            onClick={() => openModalDeleteAdmin(parentIds[activeTabs[categoryType]])}
                            className="bg-red-600 text-sm font-light text-white"
                          >
                            <MdDelete />
                          </Button>
                        </span>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          )
      )}

      <ModalCreatePriceListPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeletePriceListPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PriceListManagerPage;
