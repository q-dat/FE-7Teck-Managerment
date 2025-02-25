import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button, Table } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { IProductPriceList } from '../../types/type/price-list/price-list';
import { PriceListsContext } from '../../context/price-list/PriceListContext';

const PriceListPage: React.FC = () => {
  const { priceLists } = useContext(PriceListsContext);

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
    <div>
      <HeaderResponsive Title_NavbarMobile="Bảng Giá Thu Mua" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link role="navigation" aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link role="navigation" aria-label="Bảng giá thu mua" to="">
                Bảng Giá Thu Mua
              </Link>
            </li>
          </ul>
        </div>
        {/* Danh mục sản phẩm */}
        <div className="px-2 xl:px-20">
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
                  <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">
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

                  {/* Bảng sản phẩm */}
                  <Table className="mt-5 border border-black" zebra>
                    <Table.Head className="bg-secondary text-center text-white">
                      <span>Tên sản phẩm</span>
                      <span>Dung lượng</span>
                      <span>Giá thu cũ</span>
                    </Table.Head>
                    <Table.Body className="text-center text-sm">
                      {catalogs[categoryType as keyof typeof catalogs][
                        activeTabs[categoryType]
                      ]?.map((product, index) => (
                        <Table.Row key={index}>
                          <span>{product?.name}</span>
                          <span>{product?.storage}</span>
                          <span>
                            {(product?.price * 1000).toLocaleString('vi-VN')}đ
                          </span>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceListPage;
