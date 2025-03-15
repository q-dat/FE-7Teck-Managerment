import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../../components/UserPage/Pagination';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-daisyui';
import { Placeholder } from 'semantic-ui-react';
import { WindowsContext } from '../../../context/windows/WindowsContext';
import { slugify } from '../../../components/utils/slugify';

const WindowsPage: React.FC = () => {
  const { windows } = useContext(WindowsContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (windows.length > 0) {
      setLoading(false);
    }
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [windows, currentPage]);
  // Handle Click Windows To Windows Detail
  const navigate = useNavigate();
  // Panigation
  const itemsPerPage = 12;

  const totalPages = Math.ceil(windows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWindowss = windows.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Laptop Windows" />
      <div className="py-[60px] xl:pt-0">
        <div className="xl:px-desktop-padding breadcrumbs px-[10px] py-2 text-sm text-black shadow">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Laptop Windows" to="">
                Laptop Windows
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="xl:px-desktop-padding space-y-10 px-2">
          <div className="mt-5 w-full">
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6">
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="w-[195px] p-2">
                      <Placeholder>
                        <Placeholder.Image square />
                        <Placeholder.Line />
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder>
                    </div>
                  ))
                : currentWindowss.map(windows => {
                    const windowsUrl = slugify(windows?.windows_name);
                    const subUrl = windows?._id;
                    return (
                      <section
                        key={windows?._id}
                        className="group flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                      >
                        <div
                          onClick={() =>
                            navigate(`/windows/${windowsUrl}/${subUrl}`)
                          }
                          className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none"
                        >
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                            src={windows?.windows_img}
                          />
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                            src={windows?.windows_img}
                          />
                        </div>
                        {/*  */}
                        <div className="flex w-full flex-col items-start justify-between">
                          <div
                            className="w-full cursor-pointer p-1"
                            onClick={() => navigate(`/windows/${windowsUrl}`)}
                          >
                            <p className="xl:group-hover:text-secondary">
                              Laptop {windows?.windows_name}
                            </p>
                          </div>
                          <div className="w-full p-1">
                            <p className="text-gray-700">
                              Từ:&nbsp;
                              <span className="text-red-700">
                                {(windows?.windows_price * 1000).toLocaleString(
                                  'vi-VN'
                                )}
                                ₫
                              </span>
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
                      </section>
                    );
                  })}
            </div>
          </div>
          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </div>
    </div>
  );
};

export default WindowsPage;
