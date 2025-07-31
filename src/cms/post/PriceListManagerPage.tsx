import React, { useContext, useEffect, useState } from 'react';
import ModalCreatePriceListPageAdmin from '../../components/admin/modalAdmin/ModalPriceListPage/ModalCreatePriceListPageAdmin';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import { PriceListContext } from '../../context/price-list/PriceListContext';
import { IProductPriceList } from '../../types/type/price-list/price-list';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../components/orther/loading';
import { isIErrorResponse } from '../../types/error/error';
import { Toastify } from '../../helper/Toastify';
import ModalDeletePriceListPageAdmin from '../../components/admin/modalAdmin/ModalPriceListPage/ModalDeletePriceListPageAdmin';
import { FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import NavbarPost from '../../components/admin/responsiveUI/mobile/NavbarPost';

const PriceListManagerPage: React.FC = () => {
  const { priceLists, getAllPriceLists, loading, error, deletePriceLists } = useContext(PriceListContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const [selectedPriceListId, setSelectedPriceListId] = useState<string | null>(null);

  const openModalDeleteAdmin = (id: string) => {
    setSelectedPriceListId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);

  const [catalogs, setCatalogs] = useState<Record<string, Record<string, IProductPriceList[]>>>({});
  const [parentIds, setParentIds] = useState<Record<string, string>>({});
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const aggregatedData: Record<string, Record<string, IProductPriceList[]>> = {};
    const parentIdMap: Record<string, string> = {};

    priceLists.forEach(list => {
      ['phoneProducts', 'tabletProducts', 'macbookProducts', 'windowsProducts'].forEach(categoryType => {
        const productsByCategory = list[categoryType as keyof typeof list] || {};
        Object.entries(productsByCategory).forEach(([category, data]) => {
          if (Array.isArray(data)) {
            if (!aggregatedData[categoryType]) {
              aggregatedData[categoryType] = {};
            }
            if (!aggregatedData[categoryType][category]) {
              aggregatedData[categoryType][category] = [];
              parentIdMap[category] = list._id;
            }
            aggregatedData[categoryType][category].push(...data);
          }
        });
      });
    });

    setCatalogs(aggregatedData);
    setParentIds(parentIdMap);
    setActiveTabs(
      Object.keys(aggregatedData).reduce(
        (acc, key) => ({
          ...acc,
          [key]: Object.keys(aggregatedData[key])[0] || ''
        }),
        {}
      )
    );
  }, [priceLists]);
  //
  const handleDeletePhone = async () => {
    if (selectedPriceListId) {
      try {
        await deletePriceLists(selectedPriceListId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllPriceLists();
      } catch (error) {
        const errorMessage = isIErrorResponse(error) ? error.data?.message : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
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
        {Object.keys(catalogs).map(
          categoryType =>
            Object.keys(catalogs[categoryType as keyof typeof catalogs]).length > 0 && (
              <div key={categoryType}>
                <div role="region" aria-label={`Danh mục ${categoryType}`}>
                  <h2 className="my-5 px-2 font-bold text-primary">
                    {categoryType === 'phoneProducts'
                      ? 'Bảng giá iPhone'
                      : categoryType === 'tabletProducts'
                        ? 'Bảng giá iPad'
                        : categoryType === 'macbookProducts'
                          ? 'Bảng giá Laptop Macbook'
                          : 'Bảng giá Laptop Windows'}
                  </h2>
                </div>

                {/* Nút chọn danh mục */}
                <div className="grid grid-cols-3 gap-2 px-2 xl:grid-cols-6 xl:px-0">
                  {Object.keys(catalogs[categoryType as keyof typeof catalogs]).map(category => (
                    <Button
                      key={category}
                      onClick={() =>
                        setActiveTabs({
                          ...activeTabs,
                          [categoryType]: category
                        })
                      }
                      className={`flex w-full items-center justify-center rounded-md text-xs transition-all duration-500 ease-in-out hover:rounded-box hover:bg-secondary hover:text-white xl:text-sm ${
                        activeTabs[categoryType] === category
                          ? 'bg-primary text-white hover:bg-primary hover:text-white'
                          : 'bg-white text-primary'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <div className="w-screen overflow-x-auto border-8 border-transparent scrollbar-hide xl:w-full xl:border-none">
                  {/* Bảng sản phẩm */}
                  <Table className="mt-5 border border-secondary" zebra>
                    <Table.Head className="bg-secondary text-center text-white">
                      <span>Số thứ tự</span>
                      <span>Tên sản phẩm</span>
                      <span>Dung Lượng</span>
                      <span>Giá</span>
                      <span>Hành động</span>
                    </Table.Head>
                    <Table.Body className="text-center text-sm">
                      {catalogs[categoryType as keyof typeof catalogs][activeTabs[categoryType]]?.map(
                        (product, index) => (
                          <Table.Row key={index} className="border border-secondary">
                            <span>
                              #{index + 1}
                              {parentIds[activeTabs[categoryType]]}
                            </span>
                            <span>{product?.name}</span>
                            <span>{product?.storage}</span>
                            <span>{(product?.price * 1000).toLocaleString('vi-VN')}đ</span>
                            <span className="flex flex-row items-center justify-center gap-2">
                              <Button
                                size="sm"
                                color="success"
                                // onClick={() =>
                                //   // openModalEditAdmin(product?._id ?? '')
                                // }
                                className="text-sm font-light text-white"
                              >
                                <FaPenToSquare />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => openModalDeleteAdmin(`${parentIds[activeTabs[categoryType]]}`)}
                                className="bg-red-600 text-sm font-light text-white"
                              >
                                <MdDelete />
                              </Button>
                            </span>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            )
        )}
      </div>
      <ModalCreatePriceListPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeletePriceListPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhone}
      />
    </div>
  );
};

export default PriceListManagerPage;
