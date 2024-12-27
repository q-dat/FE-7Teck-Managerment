import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { Button } from 'react-daisyui';

const PhonePage: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(phoneCatalogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = phoneCatalogs.slice(indexOfFirstItem, indexOfLastItem);

  // Cuộn lên top khi currentPage thay đổi
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

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
      <HeaderResponsive Title_NavbarMobile="Sản Phẩm" />
      <div className="pt-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/phone-list">Sản Phẩm</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-10 px-2 xl:px-20">
          <div>
            <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
              Danh Sách Sản Phẩm
            </p>
            <div className="grid grid-flow-row grid-cols-2 items-start gap-x-5 gap-y-5 md:grid-cols-4 xl:grid-cols-6">
              {currentPhones.map(phone => (
                <div
                  key={phone._id}
                  className="flex h-full w-full flex-col justify-between rounded-md border border-gray-50 bg-white text-black"
                >
                  <Link to="phone-detail">
                    <div className="flex flex-col items-start">
                      <img
                        className="h-[200px] w-full rounded-md rounded-b-none object-cover xl:h-[250px]"
                        src={phone.img}
                      />

                      <div className="px-1">
                        <p>Điện thoại {phone.name}</p>
                      </div>
                    </div>
                  </Link>
                  {/*  */}
                  <div className="flex flex-col items-start justify-center gap-1 p-1">
                    <p className="text-gray-500">
                      Từ:&nbsp;
                      <span className="text-red-500">
                        {(phone.price * 1000).toLocaleString('vi-VN')}{' '}
                        <sup>đ</sup>
                      </span>
                    </p>
                    <Link to="checkout" className="z-50 w-full">
                      <Button
                        size="xs"
                        className="w-full rounded-md border border-primary border-opacity-30 bg-primary bg-opacity-10 text-primary"
                      >
                        Mua Ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
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

export default PhonePage;
