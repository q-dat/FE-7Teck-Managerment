import React, { useContext, useEffect, useRef, useState } from 'react';
import { BannerDesktop, BannerTablet, BannerMobile } from '../../assets/images';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../assets/image-represent';
import { PhoneContext } from '../../context/phone/PhoneContext';

const HomePage: React.FC = () => {
  const { phones } = useContext(PhoneContext);
  // const salePhones = phones.filter(phone => phone.status === 'sale');
  const [isLeftButtonVisiblePhone, setIsLeftButtonVisiblePhone] =
    useState(true);
  const [isRightButtonVisiblePhone, setIsRightButtonVisiblePhone] =
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

  const scrollRefPhone = useRef<HTMLDivElement>(null);
  const scrollRefWindow = useRef<HTMLDivElement>(null);
  const scrollRefIpad = useRef<HTMLDivElement>(null);
  const scrollRefMacbook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      checkScrollPosition(
        scrollRefPhone.current,
        setIsLeftButtonVisiblePhone,
        setIsRightButtonVisiblePhone
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

    if (scrollRefPhone.current) {
      scrollRefPhone.current.addEventListener('scroll', handleScrollAndResize);
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

      if (scrollRefPhone.current) {
        scrollRefPhone.current.removeEventListener(
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

  // scrollRefPhone
  const scrollPhone = (scrollOffset: number) => {
    if (scrollRefPhone.current) {
      scrollRefPhone.current.scrollLeft += scrollOffset;
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
        <div className='relative'>
          <div className="absolute bottom-0 left-2 top-[60%] md:bottom-4 md:left-[10%] md:top-[30%] lg:top-[30%]">
            <p className="bg-gradient-to-r from-primary to-white bg-clip-text text-[25px] font-black italic text-transparent xl:text-[40px]">
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
      {/* Body */}
      <div className="space-y-10 px-2 xl:px-[130px]">
        {/* Phone */}
        <div className={`relative ${phones.length === 0 ? 'hidden' : ''}`}>
          <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
            Điện Thoại Nổi Bật
          </p>
          <div
            ref={scrollRefPhone}
            className="grid grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth px-2 py-1 scrollbar-hide xl:gap-5"
          >
            {phones.map(phone => (
              <Link to="phone-detail">
                <div
                  key={phone._id}
                  className="relative rounded-2xl bg-white shadow shadow-gray-50"
                >
                  <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[185px] w-[185px] rounded-2xl object-cover xl:h-[250px] xl:w-[220px]"
                      src={phone.img}
                    />
                    <p>{phone.name}</p>
                    <p>Giá:{(phone.price * 1000).toLocaleString('vi-VN')}đ</p>
                  </div>
                  {phone.status === 'sale' && (
                    <>
                      <img
                        width={60}
                        src={Sale}
                        className="absolute -left-[3px] top-0"
                        alt="Sale"
                      />
                      <p className="absolute top-0 w-full text-sm text-white">
                        Giảm 20%
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollPhone(-200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isLeftButtonVisiblePhone ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollPhone(200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isRightButtonVisiblePhone ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/* Ipad */}
        <div className={`relative ${phones.length === 0 ? 'hidden' : ''}`}>
          <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
            Ipad
          </p>
          <div
            ref={scrollRefIpad}
            className="grid grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth px-2 py-1 scrollbar-hide xl:gap-5"
          >
            {phones.map(phone => (
              <Link to="phone-detail">
                <div
                  key={phone._id}
                  className="relative rounded-2xl bg-white shadow shadow-gray-50"
                >
                  <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[185px] w-[185px] rounded-2xl object-cover xl:h-[250px] xl:w-[220px]"
                      src={phone.img}
                    />
                    <p>{phone.name}</p>
                    <p>Giá:{(phone.price * 1000).toLocaleString('vi-VN')}đ</p>
                  </div>
                  {phone.status === 'sale' && (
                    <>
                      <img
                        width={60}
                        src={Sale}
                        className="absolute -left-[3px] top-0"
                        alt="Sale"
                      />
                      <p className="absolute top-0 w-full text-sm text-white">
                        Giảm 20%
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollIpad(-200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isLeftButtonVisibleIpad ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollIpad(200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isRightButtonVisibleIpad ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  Window */}
        <div className={`relative ${phones.length === 0 ? 'hidden' : ''}`}>
          <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
            Window
          </p>
          <div
            ref={scrollRefWindow}
            className="flex flex-row items-center justify-start gap-3 overflow-x-auto scroll-smooth px-2 py-1 scrollbar-hide xl:gap-5"
          >
            {phones.map(phone => (
              <Link to="phone-detail">
                <div
                  key={phone._id}
                  className="relative rounded-2xl bg-white shadow shadow-gray-50"
                >
                  <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[185px] w-[185px] rounded-2xl object-cover xl:h-[250px] xl:w-[220px]"
                      src={phone.img}
                    />
                    <p>{phone.name}</p>
                    <p>Giá:{(phone.price * 1000).toLocaleString('vi-VN')}đ</p>
                  </div>
                  {phone.status === 'sale' && (
                    <>
                      <img
                        width={60}
                        src={Sale}
                        className="absolute -left-[3px] top-0"
                        alt="Sale"
                      />
                      <p className="absolute top-0 w-full text-sm text-white">
                        Giảm 20%
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollWindow(-200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isLeftButtonVisibleWindow ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollWindow(200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isRightButtonVisibleWindow ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </Button>
          </div>
        </div>
        {/*  MacBook */}
        <div className={`relative ${phones.length === 0 ? 'hidden' : ''}`}>
          <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
            MacBook
          </p>
          <div
            ref={scrollRefMacbook}
            className="flex flex-row items-center justify-start gap-3 overflow-x-auto scroll-smooth px-2 py-1 scrollbar-hide xl:gap-5"
          >
            {phones.map(phone => (
              <Link to="phone-detail">
                <div
                  key={phone._id}
                  className="relative rounded-2xl bg-white shadow shadow-gray-50"
                >
                  <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                    <img
                      className="h-[185px] w-[185px] rounded-2xl object-cover xl:h-[250px] xl:w-[220px]"
                      src={phone.img}
                    />
                    <p>{phone.name}</p>
                    <p>Giá:{(phone.price * 1000).toLocaleString('vi-VN')}đ</p>
                  </div>
                  {phone.status === 'sale' && (
                    <>
                      <img
                        width={60}
                        src={Sale}
                        className="absolute -left-[3px] top-0"
                        alt="Sale"
                      />
                      <p className="absolute top-0 w-full text-sm text-white">
                        Giảm 20%
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scrollMacbook(-200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isLeftButtonVisibleMacbook ? '' : 'bg-transparent text-transparent'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </Button>
            <Button
              onClick={() => scrollMacbook(200)}
              className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-50 hover:text-white ${isRightButtonVisibleMacbook ? '' : 'bg-transparent text-transparent'}`}
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
