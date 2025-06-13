import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderResponsive from '../../components/userPage/HeaderResponsive';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Pagination from '../../components/userPage/Pagination';
import { scrollToTopSmoothly } from '../../components/utils/scrollToTopSmoothly';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import Masonry from 'react-masonry-css';

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
  const itemsPerPage = 24;

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
          <Masonry
            breakpointCols={{
              default: 6,
              1280: 6,
              1024: 4,
              768: 3,
              640: 2
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {currentGallerys.map((gallery, index) => (
              <Zoom key={index}>
                <div className="mb-2 overflow-hidden rounded-md">
                  <img
                    src={`${gallery.gallery}`}
                    alt=""
                    className="w-full rounded-md border border-dashed border-black object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Zoom>
            ))}
          </Masonry>
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
