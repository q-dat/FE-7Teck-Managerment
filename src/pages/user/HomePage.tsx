import React, { useEffect, useRef, useState } from 'react';
import { BannerDesktop, BannerTablet, BannerMobile } from '../../assets/images';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { IProduct } from '../../types/type/product/product';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
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
  const [isLeftButtonVisibleMobile, setIsLeftButtonVisibleMobile] =
    useState(true);
  const [isRightButtonVisibleMobile, setIsRightButtonVisibleMobile] =
    useState(true);

  const [isLeftButtonVisibleWindow, setIsLeftButtonVisibleWindow] =
    useState(true);
  const [isRightButtonVisibleWindow, setIsRightButtonVisibleWindow] =
    useState(true);

  const [isLeftButtonVisibleIpad, setIsLeftButtonVisibleIpad] = useState(true);
  const [isRightButtonVisibleIpad, setIsRightButtonVisibleIpad] =
    useState(true);

  const [isLeftButtonVisibleMacbook, setIsLeftButtonVisibleMacbook] =
    useState(true);
  const [isRightButtonVisibleMacbook, setIsRightButtonVisibleMacbook] =
    useState(true);

  const scrollRefMobile = useRef<HTMLDivElement>(null);
  const scrollRefWindow = useRef<HTMLDivElement>(null);
  const scrollRefIpad = useRef<HTMLDivElement>(null);
  const scrollRefMacbook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      checkScrollPosition(
        scrollRefMobile.current,
        setIsLeftButtonVisibleMobile,
        setIsRightButtonVisibleMobile
      );
      checkScrollPosition(
        scrollRefWindow.current,
        setIsLeftButtonVisibleWindow,
        setIsRightButtonVisibleWindow
      );
      checkScrollPosition(
        scrollRefIpad.current,
        setIsLeftButtonVisibleIpad,
        setIsRightButtonVisibleIpad
      );
      checkScrollPosition(
        scrollRefMacbook.current,
        setIsLeftButtonVisibleMacbook,
        setIsRightButtonVisibleMacbook
      );
    };

    handleScrollAndResize();
    window.addEventListener('resize', handleScrollAndResize);

    if (scrollRefMobile.current) {
      scrollRefMobile.current.addEventListener('scroll', handleScrollAndResize);
    }
    if (scrollRefWindow.current) {
      scrollRefWindow.current.addEventListener('scroll', handleScrollAndResize);
    }
    if (scrollRefIpad.current) {
      scrollRefIpad.current.addEventListener('scroll', handleScrollAndResize);
    }
    if (scrollRefMacbook.current) {
      scrollRefMacbook.current.addEventListener(
        'scroll',
        handleScrollAndResize
      );
    }

    return () => {
      window.removeEventListener('resize', handleScrollAndResize);

      if (scrollRefMobile.current) {
        scrollRefMobile.current.removeEventListener(
          'scroll',
          handleScrollAndResize
        );
      }
      if (scrollRefWindow.current) {
        scrollRefWindow.current.removeEventListener(
          'scroll',
          handleScrollAndResize
        );
      }
      if (scrollRefIpad.current) {
        scrollRefIpad.current.removeEventListener(
          'scroll',
          handleScrollAndResize
        );
      }
      if (scrollRefMacbook.current) {
        scrollRefMacbook.current.removeEventListener(
          'scroll',
          handleScrollAndResize
        );
      }
    };
  }, []);

  const checkScrollPosition = (
    scrollContainer: HTMLElement | null,
    setLeftButtonVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setRightButtonVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (scrollContainer) {
      const isAtStart = scrollContainer.scrollLeft === 0;
      const isAtEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth;

      setLeftButtonVisible(!isAtStart);
      setRightButtonVisible(!isAtEnd);
    }
  };

  // scrollRefMobile
  const scrollMobile = (scrollOffset: number) => {
    if (scrollRefMobile.current) {
      scrollRefMobile.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefIpad
  const scrollIpad = (scrollOffset: number) => {
    if (scrollRefIpad.current) {
      scrollRefIpad.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefWindow
  const scrollWindow = (scrollOffset: number) => {
    if (scrollRefWindow.current) {
      scrollRefWindow.current.scrollLeft += scrollOffset;
    }
  };
  // scrollRefMacbook
  const scrollMacbook = (scrollOffset: number) => {
    if (scrollRefMacbook.current) {
      scrollRefMacbook.current.scrollLeft += scrollOffset;
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
              className="grid grid-flow-col grid-rows-2 items-start justify-between gap-3 overflow-x-auto scroll-smooth py-1 scrollbar-hide xl:gap-5"
            >
              {products.map(product => (
                <div
                  key={product._id}
                  className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
                >
                  <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[185px] w-[185px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
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
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isLeftButtonVisibleMobile ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollMobile(200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isRightButtonVisibleMobile ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
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
            className="grid grid-flow-col grid-rows-2 items-start justify-between gap-3 overflow-x-auto scroll-smooth py-1 scrollbar-hide xl:gap-5"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[185px] w-[185px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
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
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isLeftButtonVisibleIpad ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollIpad(200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isRightButtonVisibleIpad ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  Window */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Window
          </p>
          <div
            ref={scrollRefWindow}
            className="flex flex-row items-start justify-between gap-3 overflow-x-auto scroll-smooth py-1 scrollbar-hide xl:gap-5"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[185px] w-[185px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
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
              onClick={() => scrollWindow(-200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isLeftButtonVisibleWindow ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollWindow(200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isRightButtonVisibleWindow ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  MacBook */}
        <div className="relative">
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            MacBook
          </p>
          <div
            ref={scrollRefMacbook}
            className="flex flex-row items-start justify-between gap-3 overflow-x-auto scroll-smooth py-1 scrollbar-hide xl:gap-5"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                  <img
                    className="h-[185px] w-[185px] rounded-md object-cover xl:h-[220px] xl:w-[220px]"
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
              onClick={() => scrollMacbook(-200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isLeftButtonVisibleMacbook ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollMacbook(200)}
              className={`rounded-full border-none bg-primary bg-opacity-80  py-0 px-[5px] text-white shadow-none dark:text-primary ${isRightButtonVisibleMacbook ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default HomePage;
