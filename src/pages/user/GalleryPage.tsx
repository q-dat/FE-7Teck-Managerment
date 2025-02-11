import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Pagination from '../../components/UserPage/Pagination';

const GalleryPage: React.FC = () => {
  const { gallerys } = useContext(GalleryContext);
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

  const totalPages = Math.ceil(gallerys.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGallerys = gallerys.slice(indexOfFirstItem, indexOfLastItem);

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
      <HeaderResponsive Title_NavbarMobile="Hành Trình Khách Hàng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Hành trình khách hàng" to="">
                Hành Trình Khách Hàng
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div role="region" aria-label="Hành trình khác hàng">
          <h1 className="py-5 text-center text-[30px] font-bold text-primary">
            Hành Trình Khách Hàng
          </h1>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-2 px-2 md:grid-cols-3 xl:grid-cols-6 xl:px-20">
          {currentGallerys.map(gallery => (
            <Zoom>
              <div className="w-full overflow-hidden">
                <img
                  alt=""
                  src={`${gallery.gallery}`}
                  className="h-auto w-full rounded-md object-cover border shadow transition-transform duration-1000 ease-in-out hover:scale-110"
                />
              </div>
            </Zoom>
          ))}
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
