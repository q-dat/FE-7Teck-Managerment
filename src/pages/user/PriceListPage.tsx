import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';

// Định nghĩa kiểu sản phẩm
interface Product {
  name: string;
  price: string;
  storage: string;
}
export interface IPhoneCatalog {
  _id: string;
  name: string;
}

const PriceListPage: React.FC = () => {
  // Title Tag
  useEffect(() => {
    document.title = `Bảng Giá Thu Mua - 7Teck`;
  });
  const [activePhoneItem, setActivePhoneItem] = useState<string>('Iphone 15');
  const [activeIpadItem, setActiveIpadItem] = useState<string>('Ipad Pro');
  const [activeLaptopItem, setActiveLaptopItem] =
    useState<string>('MacBook Air');
  const location = useLocation();

  const FecthPhoneCatalog: IPhoneCatalog[] = [
    { name: 'Iphone 15', _id: '1' },
    { name: 'Iphone 14', _id: '2' },
    { name: 'Iphone 13', _id: '3' },
    { name: 'Iphone 12', _id: '4' }
  ];

  const FecthIpadCatalog: IPhoneCatalog[] = [
    { name: 'Ipad Pro', _id: '1' },
    { name: 'Ipad Air', _id: '2' },
    { name: 'Ipad Mini', _id: '3' },
    { name: 'Ipad 10', _id: '4' }
  ];

  const FecthLaptopCatalog: IPhoneCatalog[] = [
    { name: 'MacBook Air', _id: '1' },
    { name: 'MacBook Pro', _id: '2' },
    { name: 'MacBook 12', _id: '3' }
  ];

  const phoneProducts: Record<string, Product[]> = {
    'Iphone 15': [
      { name: 'Iphone 15 128GB', price: '30,000,000 VND', storage: '128GB' },
      { name: 'Iphone 15 256GB', price: '35,000,000 VND', storage: '256GB' },
      { name: 'Iphone 15 Cũ 256GB', price: '35,000,000 VND', storage: '256GB' }
    ],
    'Iphone 14': [
      { name: 'Iphone 14 128GB', price: '25,000,000 VND', storage: '128GB' },
      { name: 'Iphone 14 256GB', price: '28,000,000 VND', storage: '256GB' }
    ]
  };

  const ipadProducts: Record<string, Product[]> = {
    'Ipad Pro': [
      { name: 'Ipad Pro 128GB', price: '20,000,000 VND', storage: '128GB' },
      { name: 'Ipad Pro 256GB', price: '25,000,000 VND', storage: '256GB' }
    ],
    'Ipad Air': [
      { name: 'Ipad Air 64GB', price: '15,000,000 VND', storage: '64GB' },
      { name: 'Ipad Air 256GB', price: '18,000,000 VND', storage: '256GB' }
    ]
  };

  const laptopProducts: Record<string, Product[]> = {
    'MacBook Air': [
      { name: 'MacBook Air 256GB', price: '35,000,000 VND', storage: '256GB' },
      { name: 'MacBook Air 512GB', price: '40,000,000 VND', storage: '512GB' }
    ],
    'MacBook Pro': [
      { name: 'MacBook Pro 256GB', price: '45,000,000 VND', storage: '256GB' },
      { name: 'MacBook Pro 512GB', price: '50,000,000 VND', storage: '512GB' }
    ]
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const storedPhoneItem = sessionStorage.getItem('activePhoneItem');
    const storedIpadItem = sessionStorage.getItem('activeIpadItem');
    const storedLaptopItem = sessionStorage.getItem('activeLaptopItem');

    if (storedPhoneItem) setActivePhoneItem(storedPhoneItem);
    if (storedIpadItem) setActiveIpadItem(storedIpadItem);
    if (storedLaptopItem) setActiveLaptopItem(storedLaptopItem);
  }, [location.pathname]);

  const handlePhoneItemClick = (itemName: string) => {
    setActivePhoneItem(itemName);
    sessionStorage.setItem('activePhoneItem', itemName);
  };

  const handleIpadItemClick = (itemName: string) => {
    setActiveIpadItem(itemName);
    sessionStorage.setItem('activeIpadItem', itemName);
  };

  const handleLaptopItemClick = (itemName: string) => {
    setActiveLaptopItem(itemName);
    sessionStorage.setItem('activeLaptopItem', itemName);
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Bảng Giá Thu Mua" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="">Bảng Giá Thu Mua</Link>
            </li>
          </ul>
        </div>
        <div>
          {/* Phone Catalog */}
          <div className="px-2 xl:px-[100px]">
            {/* Tittle */}
            <div className="my-5 font-bold text-primary">
              Danh Mục Thu Mua Điện Thoại
            </div>
            <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
              {FecthPhoneCatalog.map(item => (
                <Button
                  key={item._id}
                  className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                    item.name === activePhoneItem
                      ? 'bg-primary text-white hover:bg-primary hover:text-white'
                      : 'bg-white text-primary'
                  }`}
                  onClick={() => handlePhoneItemClick(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Bảng sản phẩm */}
            <table className="mt-5 min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="border border-primary px-4 py-2 text-left">
                    Tên sản phẩm
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Giá
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Dung lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {phoneProducts[activePhoneItem]?.map((product, index) => (
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

          {/* Ipad Catalog */}
          <div className="px-2 xl:px-[100px]">
            {/* Tittle */}
            <div className="my-5 font-bold text-primary">
              Danh Mục Thu Mua Ipad
            </div>
            <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
              {FecthIpadCatalog.map(item => (
                <Button
                  key={item._id}
                  className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                    item.name === activeIpadItem
                      ? 'bg-primary text-white hover:bg-primary hover:text-white'
                      : 'bg-white text-primary'
                  }`}
                  onClick={() => handleIpadItemClick(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Bảng sản phẩm */}
            <table className="mt-5 min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="border border-primary px-4 py-2 text-left">
                    Tên sản phẩm
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Giá
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Dung lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {ipadProducts[activeIpadItem]?.map((product, index) => (
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

          {/* Laptop Catalog */}
          <div className="px-2 xl:px-[100px]">
            {/* Tittle */}
            <div className="my-5 font-bold text-primary">
              Danh Mục Thu Mua Laptop
            </div>
            <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
              {FecthLaptopCatalog.map(item => (
                <Button
                  key={item._id}
                  className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                    item.name === activeLaptopItem
                      ? 'bg-primary text-white hover:bg-primary hover:text-white'
                      : 'bg-white text-primary'
                  }`}
                  onClick={() => handleLaptopItemClick(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Bảng sản phẩm */}
            <table className="mt-5 min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="border border-primary px-4 py-2 text-left">
                    Tên sản phẩm
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Giá
                  </th>
                  <th className="border border-primary px-4 py-2 text-left">
                    Dung lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {laptopProducts[activeLaptopItem]?.map((product, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default PriceListPage;
