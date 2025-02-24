import React, { useContext, useEffect, useState } from 'react';
import ModalCreatePriceListPageAdmin from '../../../components/admin/Modal/ModalPriceListPage/ModalCreatePriceListPageAdmin';
import NavtitleAdmin from '../../../components/admin/NavtitleAdmin';
import { Button } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import NavbarAdmin from '../../../components/admin/Reponsive/Mobile/NavbarAdmin';
import { PriceListsContext } from '../../../context/price-list/PriceListContext';
import { IProductPriceList } from '../../../types/type/price-list/price-list';

const PriceListManagerPage: React.FC = () => {
  const { priceLists } = useContext(PriceListsContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  // Get All Price List

  const [catalogs, setCatalogs] = useState<{
    phoneProducts: Record<string, IProductPriceList[]>;
    tabletProducts: Record<string, IProductPriceList[]>;
    macbookProducts: Record<string, IProductPriceList[]>;
    windowsProducts: Record<string, IProductPriceList[]>;
  }>({
    phoneProducts: {},
    tabletProducts: {},
    macbookProducts: {},
    windowsProducts: {}
  });

  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({
    phoneProducts: '',
    tabletProducts: '',
    macbookProducts: '',
    windowsProducts: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const aggregatedData = {
      phoneProducts: {} as Record<string, IProductPriceList[]>,
      tabletProducts: {} as Record<string, IProductPriceList[]>,
      macbookProducts: {} as Record<string, IProductPriceList[]>,
      windowsProducts: {} as Record<string, IProductPriceList[]>
    };

    [
      'phoneProducts',
      'tabletProducts',
      'macbookProducts',
      'windowsProducts'
    ].forEach(categoryType => {
      priceLists.forEach(list => {
        const productsByCategory =
          list[categoryType as keyof typeof list] || {};

        Object.entries(productsByCategory).forEach(([category, products]) => {
          if (Array.isArray(products)) {
            aggregatedData[categoryType as keyof typeof aggregatedData][
              category
            ] =
              aggregatedData[categoryType as keyof typeof aggregatedData][
                category
              ] || [];
            aggregatedData[categoryType as keyof typeof aggregatedData][
              category
            ].push(...(products as IProductPriceList[]));
          }
        });
      });
    });

    setCatalogs(aggregatedData);

    setActiveTabs({
      phoneProducts: Object.keys(aggregatedData.phoneProducts)[0] || '',
      tabletProducts: Object.keys(aggregatedData.tabletProducts)[0] || '',
      macbookProducts: Object.keys(aggregatedData.macbookProducts)[0] || '',
      windowsProducts: Object.keys(aggregatedData.windowsProducts)[0] || ''
    });
  }, [priceLists]);

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Bảng Giá" />
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
      <div>
        {[
          'phoneProducts',
          'macbookProducts',
          'tabletProducts',
          'windowsProducts'
        ].map(
          categoryType =>
            Object.keys(catalogs[categoryType as keyof typeof catalogs])
              .length > 0 && (
              <div key={categoryType}>
                <div role="region" aria-label={`Danh mục ${categoryType}`}>
                  <h2 className="my-5 font-bold text-primary">
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
                <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
                  {Object.keys(
                    catalogs[categoryType as keyof typeof catalogs]
                  ).map(category => (
                    <Button
                      key={category}
                      onClick={() =>
                        setActiveTabs({
                          ...activeTabs,
                          [categoryType]: category
                        })
                      }
                      className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                        activeTabs[categoryType] === category
                          ? 'bg-primary text-white hover:bg-primary hover:text-white'
                          : 'bg-white text-primary'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Bảng sản phẩm */}
                <table className="mt-5 min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-secondary text-white">
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Dung lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogs[categoryType as keyof typeof catalogs][
                      activeTabs[categoryType]
                    ]?.map((product, index) => (
                      <tr
                        key={index}
                        className="hover:bg-black hover:bg-opacity-10"
                      >
                        <td className="border border-primary px-4 py-2 text-black">
                          {product.name}
                        </td>
                        <td className="border border-primary px-4 py-2 text-black">
                          {product.price}
                        </td>
                        <td className="border border-primary px-4 py-2 text-black">
                          {product.storage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
      <ModalCreatePriceListPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
    </div>
  );
};

export default PriceListManagerPage;
