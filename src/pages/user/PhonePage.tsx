import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { Button } from 'react-daisyui';

const PhonePage: React.FC = () => {
  // Title Tag
  useEffect(() => {
    document.title = `Điện Thoại iPhone - 7Teck`;
  });
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const [currentPage, setCurrentPage] = useState(1);
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
      <HeaderResponsive Title_NavbarMobile="Điện Thoại" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="">Điện Thoại</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-10 px-2 xl:px-20">
          <div>
            <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
              {/* Danh Sách Điện Thoại */}
            </p>
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6">
              {currentPhones.map(phone => {
                const phoneUrl = slugify(phone.name);
                return (
                  <div
                    key={phone?._id}
                    className="group flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                  >
                    <div
                      onClick={() => navigate(`/iphone/${phoneUrl}`)}
                      className="min-h-[270px] w-full cursor-pointer rounded-md rounded-b-none bg-white"
                    >
                      <img
                        loading="lazy"
                        className="h-full w-full rounded-[5px] rounded-b-none object-contain"
                        src={phone?.img}
                      />
                    </div>
                    {/*  */}
                    <div className="flex h-full w-full flex-col items-start justify-between gap-1">
                      <div
                        className="w-full cursor-pointer p-1"
                        onClick={() => navigate(`/iphone/${phoneUrl}`)}
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
                        <Link to="/thanh-toan" className="z-50 w-full">
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

export default PhonePage;
