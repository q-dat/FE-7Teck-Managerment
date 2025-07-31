import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../../components/userPage/Pagination';
import HeaderResponsive from '../../../components/userPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-daisyui';
import { Placeholder } from 'semantic-ui-react';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import { slugify } from '../../../components/utils/slugify';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { Status } from '../../../assets/image-represent';

const PhonePage: React.FC = () => {
  const { phones, getAllPhones } = useContext(PhoneContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToTopSmoothly();
    if (phones.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllPhones();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  // Handle Click Phone To Phone Detail
  const navigate = useNavigate();
  // Panigation
  const itemsPerPage = 12;
  // const NewiPhones = phones.filter(
  //   phone => phone?.phone_catalog_id?.status === 0
  // );
  const totalPages = Math.ceil(phones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = phones.slice(indexOfFirstItem, indexOfLastItem);

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
  if (!loading && phones.length === 0) {
    return <ErrorLoading />;
  }

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="iPhone" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-desktop-padding">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Điện thoại" to="">
                iPhone
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-10 px-2 xl:px-desktop-padding">
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
                    // Navigate
                    const phoneUrl = slugify(phone.name);
                    const subUrl = phone._id;
                    return (
                      <section
                        key={phone?._id}
                        className="group relative flex h-full w-full flex-col justify-between rounded-md border border-white text-black"
                      >
                        <div
                          onClick={() => navigate(`/dien-thoai/${phoneUrl}/${subUrl}`)}
                          className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none"
                        >
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
                        <div className="flex w-full flex-col items-start justify-between p-1">
                          <div className="w-full cursor-pointer" onClick={() => navigate(`/dien-thoai/${phoneUrl}`)}>
                            <p className="xl:group-hover:text-secondary">Điện Thoại {phone.name}</p>
                          </div>
                          <div className="w-full">
                            <p className="text-gray-700">
                              &nbsp;
                              <span className="font-semibold text-red-700">
                                {(phone?.price * 1000).toLocaleString('vi-VN')}₫
                              </span>
                              &nbsp;
                              {phone?.sale && (
                                <del className="text-xs font-light text-gray-100">
                                  (phone?.sale * 1000).toLocaleString('vi-VN') ₫
                                </del>
                              )}
                            </p>
                            <Link aria-label="Mua ngay" to="/thanh-toan" className="z-50 w-full">
                              <Button
                                size="xs"
                                className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary hover:bg-primary hover:bg-opacity-20"
                              >
                                Mua Ngay
                              </Button>
                            </Link>
                          </div>
                        </div>
                        {phone?.status && (
                          <div className="absolute -left-[3px] top-0 z-20">
                            <img alt="" loading="lazy" width={60} src={Status} />
                            <p className="absolute top-[1px] w-full pl-1 text-xs text-white">{phone?.status}</p>
                          </div>
                        )}
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

export default PhonePage;
