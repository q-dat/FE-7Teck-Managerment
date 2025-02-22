import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';
import { IProductPriceList } from '../../types/type/price-list/price-list';
import { PriceListsContext } from '../../context/price-list/PriceListContext';

const PriceListPage: React.FC = () => {
  const { priceLists } = useContext(PriceListsContext);
  const location = useLocation();

  const [categories, setCategories] = useState<{
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

    setCategories(aggregatedData);

    setActiveTabs({
      phoneProducts: Object.keys(aggregatedData.phoneProducts)[0] || '',
      tabletProducts: Object.keys(aggregatedData.tabletProducts)[0] || '',
      macbookProducts: Object.keys(aggregatedData.macbookProducts)[0] || '',
      windowsProducts: Object.keys(aggregatedData.tabletProducts)[0] || ''
    });
  }, [priceLists, location.pathname]);

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
        {[
          'phoneProducts',
          'macbookProducts',
          'tabletProducts',
          'windowsProducts'
        ].map(
          categoryType =>
            Object.keys(categories[categoryType as keyof typeof categories])
              .length > 0 && (
              <div key={categoryType} className="px-2 xl:px-[100px]">
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
                    categories[categoryType as keyof typeof categories]
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
                    {categories[categoryType as keyof typeof categories][
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
    </div>
  );
};

export default PriceListPage;
