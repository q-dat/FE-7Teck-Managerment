import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';

const PhoneFC: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  // const salePhones = phones.filter(phone => phone.status === 'sale');
  const [isLeftButtonVisiblePhone, setIsLeftButtonVisiblePhone] =
    useState(true);
  const [isRightButtonVisiblePhone, setIsRightButtonVisiblePhone] =
    useState(true);

  const scrollRefPhone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      checkScrollPosition(
        scrollRefPhone.current,
        setIsLeftButtonVisiblePhone,
        setIsRightButtonVisiblePhone
      );
    };

    handleScrollAndResize();
    window.addEventListener('resize', handleScrollAndResize);

    if (scrollRefPhone.current) {
      scrollRefPhone.current.addEventListener('scroll', handleScrollAndResize);
    }

    return () => {
      window.removeEventListener('resize', handleScrollAndResize);

      if (scrollRefPhone.current) {
        scrollRefPhone.current.removeEventListener(
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

  return (
    <div
      className={`relative rounded-lg bg-white dark:bg-black ${phoneCatalogs.length === 0 ? 'hidden' : ''}`}
    >
      {/* Title */}
      <div className="mt-5 flex w-full flex-col items-center justify-center p-5">
        <p className="font-title bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent dark:from-white dark:via-primary dark:to-white dark:bg-clip-text xl:text-[40px]">
          Điện Thoại Nổi Bật
        </p>
        <div className="h-[1px] w-[150px] animate-ping bg-primary xl:w-[200px]"></div>
      </div>
      <div
        ref={scrollRefPhone}
        className="grid grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth p-2 pt-0 scrollbar-hide xl:gap-5 xl:p-[22px] xl:pt-0"
      >
        {phoneCatalogs.map(phone => (
          <Link to="phone-detail">
            <div
              key={phone._id}
              className="relative rounded-md border border-gray-50 text-black dark:text-white"
            >
              <div className="flex w-[175px] flex-col items-start justify-center xl:w-[200px]">
                <img
                  className="h-[200px] w-[175px] rounded-md rounded-b-none object-cover xl:h-[250px] xl:w-[200px]"
                  src={phone.img}
                />
                <div className="px-1">
                  <p>Điện thoại {phone.name}</p>
                  <p className="text-gray-500">
                    Từ:
                    <span className="font-bold text-red-700">
                      {' '}
                      {(phone.price * 1000).toLocaleString('vi-VN')}đ
                    </span>
                  </p>
                </div>
                <Link to="checkout" className="z-50 w-full p-1">
                  <Button
                    size="xs"
                    className="w-full rounded-md border border-primary border-opacity-30 bg-primary bg-opacity-20 text-primary"
                  >
                    Mua Ngay
                  </Button>
                </Link>
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
          className={`z-[100] rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isLeftButtonVisiblePhone ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowBackIosNew className="text-4xl" />
        </Button>
        <Button
          onClick={() => scrollPhone(200)}
          className={`z-[100] rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isRightButtonVisiblePhone ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowForwardIos className="text-4xl" />
        </Button>
      </div>
    </div>
  );
};

export default PhoneFC;

