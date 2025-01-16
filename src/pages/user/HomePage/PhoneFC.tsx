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

  useLayoutEffect(() => {
    updateScrollButtons();
  }, [phoneCatalogs]);
  //
  const updateScrollButtons = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 1);
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
      className={`relative rounded-none bg-white xl:rounded-lg ${phoneCatalogs.length === 0 ? 'hidden' : ''}`}
    >
      {/* Title */}
      <div className="flex w-full flex-col items-center justify-center py-5 xl:rounded-t-lg">
        <p className="bg-gradient-to-tr from-black via-primary to-black bg-clip-text p-2 text-3xl font-bold text-transparent xl:text-[30px]">
         Nổi Bật
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
              className="group relative flex h-full w-[185px] flex-col justify-between rounded-md border border-[#f2f4f7] text-black"
            >
              <div
                className="relative min-h-[245px] w-full cursor-pointer"
                // GetByID
                // onClick={() => navigate(`/phone/${phone._id}`)}
                onClick={() => navigate(`/iphone/${phoneUrl}`)}
              >
                <img
                  loading="lazy"
                  className="h-full w-full rounded-[5px] rounded-b-none object-contain"
                  src={phone.img}
                />
                <p className="absolute bottom-0 right-0">
                  <TbZoomExclamationFilled className="text-lg text-white" />
                </p>
              </div>
              {/*  */}
              <div className="flex h-full w-full flex-col items-start justify-between gap-1 p-1">
                <div className="w-full">
                  <p className="w-[75px] rounded-sm bg-gray-100 p-[2px] text-center text-[10px] text-white">
                    {phone?.phoneCount > 99 ? '99+' : phone?.phoneCount} Sản
                    phẩm
                  </p>

                  <p className="xl:group-hover:text-secondary">
                    Điện thoại {phone.name}
                  </p>
                </div>
                <div className="w-full">
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
              </div>
              {/*  */}
            </div>
          );
        })}
      </div>
      <Link to="/phone-list">
        <p className="flex cursor-pointer items-center justify-center bg-gradient-to-r from-white via-secondary to-white py-1 text-sm text-white xl:rounded-b-lg">
          Xem Thêm Điện Thoại
          {/* ({phoneCatalogs.length}) */}
          <IoIosArrowForward className="text-xl" />
        </p>
      </Link>
      {/* Navigation Button  */}
      <div className="absolute top-1/2 flex w-full items-center justify-between">
        <div className="relative w-full">
          <button
            onClick={() => scrollBy(-380)}
            className={`absolute left-0 z-[100] mt-7 rounded-full border-none bg-black bg-opacity-20 text-white ${isLeftVisible ? '' : 'hidden'}`}
          >
            <MdArrowBackIosNew className="text-4xl" />
          </button>
          <button
            onClick={() => scrollBy(380)}
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
