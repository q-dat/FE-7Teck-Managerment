import React, { useRef } from 'react';
import { BannerDesktop, BannerTablet, BannerMobile } from '../../assets/images';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { IProduct } from '../../types/type/product/product';
import { Button } from 'react-daisyui';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from 'react-icons/io';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const products: IProduct[] = [
    {
      _id: '1',
      product_catalog_id: '',
      name: 'Sản Phẩm 1',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 100,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '2',
      product_catalog_id: '',
      name: 'Sản Phẩm 2',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '3',
      product_catalog_id: '',
      name: 'Sản Phẩm 3',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '4',
      product_catalog_id: '',
      name: 'Sản Phẩm 4',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '5',
      product_catalog_id: '',
      name: 'Sản Phẩm 5',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '6',
      product_catalog_id: '',
      name: 'Sản Phẩm 6',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '7',
      product_catalog_id: '',
      name: 'Sản Phẩm 7',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '8',
      product_catalog_id: '',
      name: 'Sản Phẩm 8',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '9',
      product_catalog_id: '',
      name: 'Sản Phẩm 9',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '10',
      product_catalog_id: '',
      name: 'Sản Phẩm 10',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '11',
      product_catalog_id: '',
      name: 'Sản Phẩm 11',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    }
  ];

  // const saleProducts = products.filter(product => product.status === 'sale');

  // scrollRefMobile
  const scrollRefMobile = useRef<HTMLDivElement>(null);
  const scrollMobile = (scrollOffset: number) => {
    if (scrollRefMobile.current) {
      scrollRefMobile.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefIpad
  const scrollRefIpad = useRef<HTMLDivElement>(null);
  const scrollIpad = (scrollOffset: number) => {
    if (scrollRefIpad.current) {
      scrollRefIpad.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefLaptopWindow
  const scrollRefLaptopWindow = useRef<HTMLDivElement>(null);
  const scrollLaptopWindow = (scrollOffset: number) => {
    if (scrollRefLaptopWindow.current) {
      scrollRefLaptopWindow.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefLaptopMacbook
  const scrollRefLaptopMacbook = useRef<HTMLDivElement>(null);
  const scrollLaptopMacbook = (scrollOffset: number) => {
    if (scrollRefLaptopMacbook.current) {
      scrollRefLaptopMacbook.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      {/* Banner */}
      <div>
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[12%] xl:top-[20%]">
            <p className="bg-gradient-to-r from-primary to-white bg-clip-text text-[25px] font-black italic text-transparent dark:from-primary dark:to-gray-100 md:text-[40px]">
              Đổi Điện Thoại Cũ, <br /> Nhận Ngay Giá Tốt Nhất!
            </p>
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-thin text-transparent dark:from-primary dark:to-primary">
              up to 90%
            </p>
          </div>
          {/* Banner IMG */}
          <div>
            <img
              src={BannerDesktop}
              className="hidden w-full xl:block"
              alt="BannerDesktop"
            />
            <img
              src={BannerTablet}
              className="hidden w-full md:block xl:hidden"
              alt="BannerTablet"
            />
            <img
              src={BannerMobile}
              className="w-full md:hidden"
              alt="BannerMobile"
            />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="space-y-10 px-2 xl:px-[130px]">
        {/* Mobile */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Điện Thoại Nổi Bật
          </p>
          <Link to="product-detail">
            <div
              ref={scrollRefMobile}
              className="grid grid-flow-col grid-rows-2 items-start justify-between gap-x-5 gap-y-5 overflow-x-auto scroll-smooth py-1 scrollbar-hide"
            >
              {products.map(product => (
                <div
                  key={product._id}
                  className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
                >
                  <div className="flex w-[190px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[190px] w-[190px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
                      src={product.img}
                    />
                    <p>{product.name}</p>
                    <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                    <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                      <Button size="sm">Mua Ngay</Button>
                      <Button size="sm">Xem Thêm</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Link>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollMobile(-200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDropleftCircle className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollMobile(200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDroprightCircle className="text-4xl" />
            </Button>
          </div>
        </div>
        {/* Ipad */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Ipad
          </p>
          <div
            ref={scrollRefIpad}
            className="grid grid-flow-col grid-rows-2 items-start justify-between gap-x-5 gap-y-5 overflow-x-auto scroll-smooth py-1 scrollbar-hide"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[190px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[190px] w-[190px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
                    src={product.img}
                  />
                  <p>{product.name}</p>
                  <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                  <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <Button size="sm">Mua Ngay</Button>
                    <Button size="sm">Xem Thêm</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollIpad(-200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDropleftCircle className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollIpad(200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDroprightCircle className="text-4xl" />
            </Button>
          </div>
        </div>
        {/* Laptop Window */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Laptop Window
          </p>
          <div
            ref={scrollRefLaptopWindow}
            className="flex flex-row items-start justify-between gap-x-5 gap-y-5 overflow-x-auto scroll-smooth py-1 scrollbar-hide"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[190px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[190px] w-[190px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
                    src={product.img}
                  />
                  <p>{product.name}</p>
                  <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                  <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <Button size="sm">Mua Ngay</Button>
                    <Button size="sm">Xem Thêm</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollLaptopWindow(-200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDropleftCircle className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollLaptopWindow(200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDroprightCircle className="text-4xl" />
            </Button>
          </div>
        </div>
        {/* Laptop MacBook */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Laptop MacBook
          </p>
          <div
            ref={scrollRefLaptopMacbook}
            className="flex flex-row items-start justify-between gap-x-5 gap-y-5 overflow-x-auto scroll-smooth py-1 scrollbar-hide"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[190px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[190px] w-[190px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
                    src={product.img}
                  />
                  <p>{product.name}</p>
                  <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                  <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <Button size="sm">Mua Ngay</Button>
                    <Button size="sm">Xem Thêm</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollLaptopMacbook(-200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDropleftCircle className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollLaptopMacbook(200)}
              className="rounded-full border-transparent bg-transparent p-0 text-primary shadow-none hover:border hover:border-primary dark:text-primary"
            >
              <IoIosArrowDroprightCircle className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default HomePage;
