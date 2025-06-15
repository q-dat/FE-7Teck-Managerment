import React, { memo, useContext, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Placeholder } from 'semantic-ui-react';
import { Button } from 'react-daisyui';
import { Status } from '../../../assets/image-represent';
import { WindowsContext } from '../../../context/windows/WindowsContext';
import { useScroll } from '../../../hooks/useScroll';
import { slugify } from '../../../components/utils/slugify';

const WindowsFC: React.FC = () => {
  const { windows, getAllWindows, updateWindowsView } =
    useContext(WindowsContext);
  const { scrollRef, isLeftVisible, isRightVisible, scrollBy } = useScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (windows.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllWindows();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const sortedWindows = windows.filter(win => win.windows_sale);

  return (
    <div className={`p-0 xl:px-desktop-padding`}>
      {/* Title */}
      <div
        role="region"
        aria-label="Danh sách giảm giá mạnh"
        className="flex w-full flex-col items-start justify-center px-2 xl:rounded-t-lg"
      >
        <h1 className="py-2 text-2xl font-semibold">
          {loading ? (
            <>Đang tải</>
          ) : sortedWindows.length === 0 ? (
            <></>
          ) : (
            <>Windows - Giảm giá mạnh</>
          )}
        </h1>
      </div>
      <div className="relative">
        <section
          ref={scrollRef}
          className="grid w-full grid-flow-col grid-rows-1 items-center justify-start gap-[10px] overflow-x-auto scroll-smooth rounded-none border-[10px] border-transparent bg-white pt-0 scrollbar-hide xl:rounded-t-lg xl:pt-0"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-[195px] p-2">
                <Placeholder>
                  <Placeholder.Image square />
                  <Placeholder.Line />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder>
              </div>
            ))
          ) : sortedWindows.length === 0 ? (
            <></>
          ) : (
            sortedWindows.map(win => {
              const tabletUrl = slugify(win.windows_name);
              return (
                <div
                  onClick={() => updateWindowsView(win._id)}
                  key={win._id}
                  className="group relative flex h-full w-[195px] flex-col justify-between rounded-md border border-[#f2f4f7] text-black"
                >
                  <Link
                    aria-label="Xem chi tiết sản phẩm khi ấn vào hình ảnh"
                    to={`/windows/${tabletUrl}/${win?._id}`}
                  >
                    <div className="relative h-[200px] w-full cursor-pointer overflow-hidden">
                      <img
                        alt="Hình ảnh"
                        loading="lazy"
                        className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                        src={win.windows_img}
                      />
                      <img
                        alt="Hình ảnh"
                        loading="lazy"
                        className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                        src={win.windows_img}
                      />
                    </div>
                  </Link>

                  {/*  */}
                  <div className="flex h-full w-full flex-col items-start justify-between p-1">
                    <Link
                      aria-label="Xem chi tiết sản phẩm khi nhấn vào tên sản phẩm"
                      className="w-full cursor-pointer"
                      to={`/windows/${tabletUrl}/${win?._id}`}
                    >
                      <p className="xl:group-hover:text-secondary">
                        Điện Thoại {win.windows_name}
                      </p>
                    </Link>
                    <div className="w-full">
                      <p className="text-red-700">
                        {(win?.windows_price * 1000).toLocaleString('vi-VN')}₫
                        &nbsp;
                        {win?.windows_sale && (
                          <del className="text-xs font-light text-gray-500">
                            (win?.windows_sale * 1000).toLocaleString('vi-VN') ₫
                          </del>
                        )}
                      </p>
                      <Link
                        aria-label="Mua ngay"
                        to="/thanh-toan"
                        className="z-50 w-full"
                      >
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
                  {win?.windows_status && (
                    <div className="absolute -left-[3px] top-0 z-20">
                      <img
                        alt=""
                        loading="lazy"
                        className="h-full w-[60px]"
                        src={Status}
                      />
                      <p className="absolute top-[1px] w-full pl-2 text-xs text-white">
                        {win?.windows_status}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>

        {/* Navigation Button  */}
        <div className="absolute top-1/2 flex w-full items-center justify-between">
          <div className="relative w-full">
            <button
              aria-label="Cuộn sang trái"
              onClick={() => scrollBy(-380)}
              className={`absolute -top-2 left-0 z-[100] rounded-full border-none bg-black bg-opacity-20 text-white ${isLeftVisible ? '' : 'hidden'}`}
            >
              <MdArrowBackIosNew className="text-4xl" />
            </button>
            <button
              aria-label="Cuộn sang phải"
              onClick={() => scrollBy(380)}
              className={`absolute -top-2 right-0 z-[100] rounded-full border-none bg-black bg-opacity-20 text-white ${isRightVisible ? '' : 'hidden'}`}
            >
              <MdArrowForwardIos className="text-4xl" />
            </button>
          </div>
        </div>
      </div>
      {/* See more */}
      <Link to="/windows" aria-label="Xem thêm sản phẩm laptop Windows">
        <>
          {loading ? (
            <>Đang tải...</>
          ) : sortedWindows.length === 0 ? (
            <></>
          ) : (
            <button className="flex w-full cursor-pointer items-center justify-center bg-gradient-to-r from-white via-secondary to-white py-1 text-sm text-white xl:rounded-b-lg">
              Xem Thêm Sản Phẩm Windows
              <IoIosArrowForward className="text-xl" />
            </button>
          )}
        </>
      </Link>
    </div>
  );
};

export default memo(WindowsFC);
