import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';
import { TbZoomExclamationFilled } from 'react-icons/tb';
import { IoIosArrowForward } from 'react-icons/io';

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

  useLayoutEffect(() => {
    updateScrollButtons();
  }, [phoneCatalogs]);
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
      className={`relative rounded-none bg-white xl:rounded-lg ${phoneCatalogs.length === 0 ? 'hidden' : ''}`}
    >
      {/* Title */}
      <div className="flex w-full flex-col items-center justify-center p-5 xl:rounded-t-lg">
        <p className="font-title bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent xl:text-[30px]">
          Điện Thoại Nổi Bật
        </p>
        <span className="h-[1px] w-[150px] animate-ping bg-primary"></span>
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
              className="group relative flex h-full flex-col justify-between rounded-md border border-[#f2f4f7] text-black"
            >
              <div
                className="relative h-full w-[175px] cursor-pointer xl:w-[200px]"
                // GetByID
                // onClick={() => navigate(`/phone/${phone._id}`)}
                onClick={() => navigate(`/phone/${phoneUrl}`)}
              >
                <img
                  className="h-full w-full rounded-[5px] rounded-b-none object-contain"
                  src={phone.img}
                />
                <p className="absolute bottom-0 right-0">
                  <TbZoomExclamationFilled className="text-2xl text-white" />
                </p>
              </div>
              {/*  */}
              <div className="flex flex-col items-start justify-center gap-1 p-1">
                <p className="group-hover:text-secondary">
                  Điện thoại {phone.name}
                </p>
                <p className="text-gray-500">
                  Từ:&nbsp;
                  <span className="text-red-500">
                    {(phone.price * 1000).toLocaleString('vi-VN')}₫
                  </span>
                </p>
                <Link to="/checkout" className="z-50 w-full">
                  <Button
                    size="xs"
                    className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary hover:bg-primary hover:bg-opacity-20"
                  >
                    Mua Ngay
                  </Button>
                </Link>
              </div>
              {/*  */}
            </div>
          );
        })}
      </div>
      <Link to="/phone-list">
        <p className="flex cursor-pointer items-center justify-center py-2 text-sm font-semibold text-secondary xl:rounded-b-lg">
          Xem Thêm Điện Thoại
          {/* ({phoneCatalogs.length}) */}
          <IoIosArrowForward className="text-xl" />
        </p>
      </Link>
      {/* Navigation Button  */}
      <div className="absolute top-1/2 flex w-full items-center justify-between">
        <div className="relative w-full">
          <button
            onClick={() => scrollBy(-370)}
            className={`absolute left-0 z-[100] mt-7 rounded-full border-none bg-black bg-opacity-20 text-white ${isLeftVisible ? '' : 'hidden'}`}
          >
            <MdArrowBackIosNew className="text-4xl" />
          </button>
          <button
            onClick={() => scrollBy(370)}
            className={`absolute right-0 z-[100] mt-7 rounded-full border-none bg-black bg-opacity-20 text-white ${isRightVisible ? '' : 'hidden'}`}
          >
            <MdArrowForwardIos className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneFC;
