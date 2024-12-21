import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneContext } from '../../../context/phone/PhoneContext';

const MacbookFC: React.FC = () => {
  const { phones } = useContext(PhoneContext);

  const [isLeftButtonVisibleMacbook, setIsLeftButtonVisibleMacbook] =
    useState(true);
  const [isRightButtonVisibleMacbook, setIsRightButtonVisibleMacbook] =
    useState(true);

  const scrollRefWindow = useRef<HTMLDivElement>(null);
  const scrollRefIpad = useRef<HTMLDivElement>(null);
  const scrollRefMacbook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      checkScrollPosition(
        scrollRefMacbook.current,
        setIsLeftButtonVisibleMacbook,
        setIsRightButtonVisibleMacbook
      );
    };

    handleScrollAndResize();
    window.addEventListener('resize', handleScrollAndResize);

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

  // scrollRefMacbook
  const scrollMacbook = (scrollOffset: number) => {
    if (scrollRefMacbook.current) {
      scrollRefMacbook.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className={`relative ${phones.length === 0 ? 'hidden' : ''}`}>
      {/* Title */}
      <div className="my-5 flex w-full flex-col items-center justify-center">
        <p className="font-title bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent xl:text-[40px]">
          MacBook
        </p>
        <div className="h-[1px] w-[100px] animate-ping bg-primary"></div>
      </div>
      <div
        ref={scrollRefMacbook}
        className="flex flex-row items-center justify-start gap-3 overflow-x-auto scroll-smooth px-2 py-1 scrollbar-hide xl:gap-5"
      >
        {phones.map(phone => (
          <Link to="phone-detail">
            <div
              key={phone._id}
              className="relative rounded-md bg-white shadow shadow-gray-50"
            >
              <div className="flex w-[185px] flex-col items-center justify-center xl:w-[220px]">
                <img
                  className="h-[185px] w-[185px] rounded-md object-cover xl:h-[250px] xl:w-[220px]"
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
  );
};

export default MacbookFC;

