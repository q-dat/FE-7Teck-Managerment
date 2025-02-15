import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { Placeholder } from 'semantic-ui-react';

const UsedProductsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (phoneCatalogs.length > 0) {
      setLoading(false);
    }
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [phoneCatalogs, currentPage]);
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
  const NewiPhoneCatalogs = phoneCatalogs.filter(
    phoneCatalog => phoneCatalog?.status === 1 //1 (Cũ)
  );
  const totalPages = Math.ceil(NewiPhoneCatalogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = NewiPhoneCatalogs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      <HeaderResponsive Title_NavbarMobile="Thiết Bị Đã Qua Sử Dụng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Thiết bị qua sử dụng" to="">
                Thiết bị đã qua sử dụng
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
                : currentPhones.map(phone => {
                    const phoneUrl = slugify(phone.name);
                    return (
                      <div
                        key={phone?._id}
                        onClick={() =>
                          navigate(`/iphone-da-qua-su-dung/${phoneUrl}`)
                        }
                        className="group flex h-full w-full flex-col justify-between rounded-md border border-white bg-white text-black"
                      >
                        <div className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none">
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                            src={phone?.img}
                          />
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                            src={phone?.img}
                          />
                        </div>
                        {/*  */}
                        <div className="flex w-full flex-col items-start justify-between gap-1">
                          <div className="w-full cursor-pointer p-1">
                            <p className="w-[75px] rounded-sm bg-gray-100 p-[2px] text-center text-[10px] text-white">
                              {phone?.phoneCount > 99
                                ? '99+'
                                : phone?.phoneCount}{' '}
                              Sản phẩm
                            </p>

                            <p className="xl:group-hover:text-secondary">
                              Điện Thoại {phone.name}
                            </p>
                          </div>
                          <div className="w-full p-1">
                            <p className="text-gray-500">
                              Từ:&nbsp;
                              <span className="text-red-500">
                                {(phone.price * 1000).toLocaleString('vi-VN')}₫
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
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

export default UsedProductsPage;

