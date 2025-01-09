import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../components/UserPage/Pagination';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { Button } from 'react-daisyui';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { TbZoomExclamationFilled } from 'react-icons/tb';

const PhonePage: React.FC = () => {
  const { loading, error, phoneCatalogs } = useContext(PhoneCatalogContext);
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
  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Điện Thoại" />
      <div className="py-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/phone-list">Điện Thoại</Link>
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
                    className="flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                  >
                    <div
                      onClick={() => navigate(`/${phoneUrl}`)}
                      className="relative h-full w-full rounded-md rounded-b-none bg-white"
                    >
                      <img
                        className="h-full w-full rounded-[5px] rounded-b-none object-contain"
                        src={phone?.img}
                      />
                      <p className="absolute bottom-0 right-0">
                        <TbZoomExclamationFilled className="text-2xl text-white" />
                      </p>
                    </div>
                    {/*  */}
                    <div className="flex flex-col items-start justify-center gap-1 p-1">
                      <p>Điện thoại {phone?.name}</p>

                      <p className="text-gray-500">
                        Từ:&nbsp;
                        <span className="text-red-500">
                          {(phone?.price * 1000).toLocaleString('vi-VN')}{' '}
                          <sup>đ</sup>
                        </span>
                      </p>
                      <Link to="checkout" className="z-50 w-full">
                        <Button
                          size="xs"
                          className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary"
                        >
                          Mua Ngay
                        </Button>
                      </Link>
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
