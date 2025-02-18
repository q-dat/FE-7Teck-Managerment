import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneContext } from '../../../context/phone/PhoneContext';

const IPadFC: React.FC = () => {
  const { phones } = useContext(PhoneContext);

  const [isLeftButtonVisibleIpad, setIsLeftButtonVisibleIpad] = useState(true);
  const [isRightButtonVisibleIpad, setIsRightButtonVisibleIpad] =
    useState(true);

  const scrollRefWindow = useRef<HTMLDivElement>(null);
  const scrollRefIpad = useRef<HTMLDivElement>(null);
  const scrollRefMacbook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      checkScrollPosition(
        scrollRefIpad.current,
        setIsLeftButtonVisibleIpad,
        setIsRightButtonVisibleIpad
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

  // scrollRefIpad
  const scrollIpad = (scrollOffset: number) => {
    if (scrollRefIpad.current) {
      scrollRefIpad.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div
      className={`relative rounded-lg bg-white dark:bg-black ${phones.length === 0 ? 'hidden' : ''}`}
    >
      {/* Title */}
      <div className="mt-5 flex w-full flex-col items-center justify-center p-5">
        <p className="font-title bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent dark:from-white dark:via-primary dark:to-white dark:bg-clip-text xl:text-[40px]">
          IPad
        </p>
        <div className="h-[1px] w-[50px] animate-ping bg-primary"></div>
      </div>
      <div
        ref={scrollRefIpad}
        className="grid grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth p-2 pt-0 scrollbar-hide xl:gap-5 xl:p-[22px] xl:pt-0"
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
                  alt={phone.img}
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
          className={`z-[100] rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isLeftButtonVisibleIpad ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowBackIosNew className="text-4xl" />
        </Button>
        <Button
          onClick={() => scrollIpad(200)}
          className={`z-[100] rounded-full border-none bg-black bg-opacity-10 p-0 text-white shadow-none hover:bg-black hover:bg-opacity-10 hover:text-white dark:bg-white dark:bg-opacity-20 ${isRightButtonVisibleIpad ? '' : 'bg-transparent text-transparent dark:bg-transparent'}`}
        >
          <MdArrowForwardIos className="text-4xl" />
        </Button>
      </div>
    </div>
  );
};

export default IPadFC;
