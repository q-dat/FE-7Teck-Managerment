import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderResponsive from '../../components/userPage/HeaderResponsive';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Pagination from '../../components/userPage/Pagination';
import { scrollToTopSmoothly } from '../../components/utils/scrollToTopSmoothly';
import ErrorLoading from '../../components/orther/error/ErrorLoading';

const GalleryPage: React.FC = () => {
  const { galleries, getAllGallerys } = useContext(GalleryContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToTopSmoothly();
    const fetchData = async () => {
      await getAllGallerys();
    };

    fetchData();
  }, []);

  // Panigation
  const itemsPerPage = 12;

  const totalPages = Math.ceil(galleries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGallerys = galleries.slice(indexOfFirstItem, indexOfLastItem);

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
  if (galleries.length === 0) return <ErrorLoading />;
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Hành Trình Khách Hàng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-desktop-padding">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Hành trình cùng khách hàng" to="">
                Hành Trình Cùng Khách Hàng
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}

        <div className="mt-5 xl:px-desktop-padding">
          <div className="grid grid-flow-row grid-cols-2 gap-2 bg-white p-2 md:grid-cols-3 xl:grid-cols-6 xl:rounded-md">
            {currentGallerys.map((gallery, index) => (
              <Zoom key={index}>
                <div className="w-full overflow-hidden rounded-md">
                  <img
                    alt=""
                    src={`${gallery.gallery}`}
                    className="h-auto w-full rounded-md border border-dashed border-black object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                  />
                </div>
              </Zoom>
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

export default GalleryPage;
