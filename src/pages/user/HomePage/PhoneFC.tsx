import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';

const PhoneFC: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  // const salePhones = phones.filter(phone => phone.status === 'sale');
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    if (phoneCatalogs.length > 0) updateScrollButtons();

    const handleResize = () => updateScrollButtons();
    const scrollContainer = scrollRef.current;

    window.addEventListener('resize', handleResize);
    scrollContainer?.addEventListener('scroll', updateScrollButtons);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollContainer?.removeEventListener('scroll', updateScrollButtons);
    };
  }, [phoneCatalogs]);

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
        ref={scrollRef}
        className="grid w-full grid-flow-col grid-rows-2 items-center justify-start gap-3 overflow-x-auto scroll-smooth pt-0 scrollbar-hide xl:gap-5 xl:border-[22px] xl:border-transparent xl:pt-0"
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
        <div className="relative w-full">
          <button
            onClick={() => scrollBy(-370)}
            className={`absolute left-0 z-[100] mt-7 rounded-full border-none bg-black bg-opacity-20 text-white dark:bg-white dark:bg-opacity-40 dark:text-black ${isLeftVisible ? '' : 'hidden'}`}
          >
            <MdArrowBackIosNew className="text-4xl" />
          </button>
          <button
            onClick={() => scrollBy(370)}
            className={`absolute right-0 z-[100] mt-7 rounded-full border-none bg-black bg-opacity-20 text-white dark:bg-white dark:bg-opacity-40 dark:text-black ${isRightVisible ? '' : 'hidden'}`}
          >
            <MdArrowForwardIos className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneFC;

