import React, { useContext, useState } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import { Button } from 'react-daisyui';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { PhoneContext } from '../../context/phone/PhoneContext';

const PhonePage: React.FC = () => {
  const { phones } = useContext(PhoneContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(phones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = phones.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Sản Phẩm" />
      <div className="breadcrumbs glass mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
        <ul className="font-light">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/phone-list">Sản Phẩm</Link>
          </li>
        </ul>
      </div>
      <div className="space-y-10 px-2 xl:px-[100px]">
        <div>
          <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
            Danh Sách Sản Phẩm
          </p>
          <div className="grid grid-flow-row grid-cols-2 items-start justify-between gap-x-5 gap-y-5 md:grid-cols-5">
            {currentPhones.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-2xl bg-white shadow shadow-gray-50"
              >
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <img
                    className="h-[200px] w-full rounded-2xl object-cover xl:h-[250px]"
                    src={product.img}
                  />
                  <p>{product.name}</p>
                  <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                  <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <Button size="sm">Mua Ngay</Button>
                    <Button size="sm">Xem Thêm</Button>
                  </div>
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
  );
};

export default PhonePage;
