import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Sale } from '../../../assets/image-represent';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';

const PhoneFC: React.FC = () => {
  const navigate = useNavigate();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD') // Chuyển sang Unicode
      .replace(/\p{Diacritic}/gu, '') // Loại bỏ dấu
      .toLowerCase() // Chuyển tất cả thành chữ thường
      .replace(/[^a-z0-9]+/g, '-') // Thay thế khoảng trắng và ký tự không phải chữ cái bằng dấu gạch ngang
      .replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
  };
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
      className={`relative rounded-none bg-white dark:bg-black xl:rounded-lg ${phoneCatalogs.length === 0 ? 'hidden' : ''}`}
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
        className="grid w-full grid-flow-col grid-rows-2 items-center justify-start gap-[10px] overflow-x-auto scroll-smooth border-[10px] border-transparent pt-0 scrollbar-hide xl:pt-0"
      >
        {phoneCatalogs.map(phone => {
          const phoneUrl = slugify(phone.name);
          return (
            <div
              key={phone._id}
              className="relative flex h-full flex-col justify-between rounded-md border border-[#f2f4f7] text-black dark:text-white"
            >
              <div
                className="w-[175px] cursor-pointer xl:w-[200px]"
                // GetByID
                // onClick={() => navigate(`/phones/${phone._id}`)}
                onClick={() => navigate(`/${phoneUrl}`)}
              >
                <div className="w-full">
                  <img
                    className="h-[200px] w-[175px] rounded-[5px] rounded-b-none object-cover xl:h-[250px] xl:w-full"
                    src={phone.img}
                  />
                </div>
                <div className="px-1">
                  <p>Điện thoại {phone.name}</p>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col items-start justify-center gap-1 p-1">
                <p className="text-gray-500">
                  Từ:&nbsp;
                  <span className="text-red-500">
                    {(phone.price * 1000).toLocaleString('vi-VN')} <sup>đ</sup>
                  </span>
                </p>
                <Link to="checkout" className="z-50 w-full">
                  <Button
                    size="xs"
                    className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary"
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
          );
        })}
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

