import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-daisyui';
import { Placeholder } from 'semantic-ui-react';
import { TabletContext } from '../../context/tablet/TabletContext';

const TabletPage: React.FC = () => {
  const { tablets } = useContext(TabletContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (tablets.length > 0) {
      setLoading(false);
    }
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [tablets, currentPage]);
  // Handle Click Phone To Phone Detail
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
  // Panigation
  const itemsPerPage = 12;

  const totalPages = Math.ceil(tablets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = tablets.slice(indexOfFirstItem, indexOfLastItem);

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
      <HeaderResponsive Title_NavbarMobile="iPad" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="iPad" to="">
                iPad
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-10 px-2 xl:px-20">
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
                : currentPhones.map(tablet => {
                    const phoneUrl = slugify(tablet?.tablet_name);
                    return (
                      <section
                        key={tablet?._id}
                        className="group flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                      >
                        <div
                          onClick={() => navigate(`/ipad/${phoneUrl}`)}
                          className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none"
                        >
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-sm filter"
                            src={tablet?.tablet_img}
                          />
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                            src={tablet?.tablet_img}
                          />
                        </div>
                        {/*  */}
                        <div className="flex w-full flex-col items-start justify-between gap-1">
                          <div
                            className="w-full cursor-pointer p-1"
                            onClick={() => navigate(`/ipad/${phoneUrl}`)}
                          >
                            <p className="xl:group-hover:text-secondary">
                              Máy tính bảng {tablet?.tablet_name}
                            </p>
                          </div>
                          <div className="w-full p-1">
                            <p className="text-gray-500">
                              Từ:&nbsp;
                              <span className="text-red-500">
                                {(tablet?.tablet_price * 1000).toLocaleString(
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
export default TabletPage;

