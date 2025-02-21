import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';
import { IProductPriceList } from '../../types/type/price-list/price-list';
import { PriceListsContext } from '../../context/price-list/PriceListContext';

const PriceListPage: React.FC = () => {
  const { priceLists } = useContext(PriceListsContext);
  console.log('1', priceLists);

  const [laptopCategories, setLaptopCategories] = useState<
    Record<string, IProductPriceList[]>
  >({});
  const [activeLaptopItem, setActiveLaptopItem] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchPriceList();
  }, [location.pathname]);

  const fetchPriceList = async () => {
    try {
      const aggregatedLaptops = priceLists.reduce(
        (acc: Record<string, IProductPriceList[]>, list: any) => {
          Object.entries(list.phoneProducts || {}).forEach(
            ([category, products]) => {
              if (Array.isArray(products)) {
                (products as IProductPriceList[]).forEach(product => {
                  // const key = `${category} ${product.name}`;
                  const key = `${category} `;
                  acc[key] = acc[key] || [];
                  acc[key].push(product);
                });
              }
            }
          );
          return acc;
        },
        {}
      );

      setLaptopCategories(aggregatedLaptops);
      setActiveLaptopItem(Object.keys(aggregatedLaptops)[0] || '');
    } catch (error) {
      console.error('Error fetching price list:', error);
    }
  };

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
        {/* Phone Catalog */}
        <div className="px-2 xl:px-[100px]">
          <div role="region" aria-label="Danh mục thu mua điện thoại">
            <h2 className="my-5 font-bold text-primary">
              Danh Mục Thu Mua Điện Thoại
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
            {Object.keys(laptopCategories).map(item => (
              <Button
                key={item}
                onClick={() => setActiveLaptopItem(item)}
                className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                  activeLaptopItem === item
                    ? 'bg-primary text-white hover:bg-primary hover:text-white'
                    : 'bg-white text-primary'
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
          <table className="mt-5 min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-secondary text-white">
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Dung lượng</th>
              </tr>
            </thead>
            <tbody>
              {laptopCategories[activeLaptopItem]?.map((product, index) => (
                <tr key={index} className="hover:bg-black hover:bg-opacity-10">
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
      </div>
    </div>
  );
};

export default PriceListPage;
