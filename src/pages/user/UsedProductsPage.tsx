import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { Button } from 'react-daisyui';

const UsedProductsPage: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);
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
          <div>
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6">
              {currentPhones.map(phone => {
                return (
                  <div
                    key={phone?._id}
                    className="group flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                  >
                    <Link
                      to={`/iphone-moi/${phone?._id}`}
                      className="h-[200px] w-full cursor-pointer rounded-md rounded-b-none bg-white"
                    >
                      <img
                        alt=""
                        loading="lazy"
                        className="h-full w-full rounded-[5px] rounded-b-none object-cover"
                        src={phone?.img}
                      />
                    </Link>
                    {/*  */}
                    <div className="flex w-full flex-col items-start justify-between gap-1">
                      <div
                        className="w-full cursor-pointer p-1"
                      >
                        <p className="w-[75px] rounded-sm bg-gray-100 p-[2px] text-center text-[10px] text-white">
                          {phone?.phoneCount > 99 ? '99+' : phone?.phoneCount}{' '}
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

