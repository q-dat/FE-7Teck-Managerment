import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneContext } from '../../../context/phone/PhoneContext';

const PhoneFC: React.FC = () => {
  const { phones } = useContext(PhoneContext);
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
      className={`relative rounded-lg bg-white dark:bg-black ${phones.length === 0 ? 'hidden' : ''}`}
    >
      {/* Title */}
      <div className="my-5 flex w-full flex-col items-center justify-center">
        <p className="font-title bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent dark:from-white dark:via-primary dark:to-white dark:bg-clip-text xl:text-[40px]">
          Điện Thoại Nổi Bật
        </p>
        <div className="h-[1px] w-[150px] animate-ping bg-primary xl:w-[200px]"></div>
      </div>
      <div
        ref={scrollRefPhone}
        className="grid grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth p-2 scrollbar-hide xl:gap-5 xl:p-[22px]"
      >
        {phones.map(phone => (
          <Link to="phone-detail">
            <div
              key={phone._id}
              className="relative rounded-md border border-gray-50 text-black dark:text-white"
            >
              <div className="flex w-[175px] flex-col items-center justify-center xl:w-[200px]">
                <img
                  className="h-[200px] w-[175px] rounded-md rounded-b-none object-cover xl:h-[250px] xl:w-[200px]"
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
          className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isLeftButtonVisiblePhone ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowBackIosNew className="text-4xl" />
        </Button>
        <Button
          onClick={() => scrollPhone(200)}
          className={`rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isRightButtonVisiblePhone ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowForwardIos className="text-4xl" />
        </Button>
      </div>
    </div>
  );
};

export default PhoneFC;

