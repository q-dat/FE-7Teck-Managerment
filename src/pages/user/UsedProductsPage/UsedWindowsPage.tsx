import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../../components/userPage/Pagination';
import { useNavigate } from 'react-router-dom';
import { Placeholder } from 'semantic-ui-react';
import { WindowsCatalogContext } from '../../../context/windows-catalog/WindowsCatalogContext';
import { slugify } from '../../../components/utils/slugify';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';

const UsedWindowsPage: React.FC = () => {
  const { windowsCatalogs, getAllWindowsCatalogs } = useContext(WindowsCatalogContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToTopSmoothly();
    if (windowsCatalogs.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllWindowsCatalogs();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const navigate = useNavigate();
  // Panigation
  const itemsPerPage = 12;
  const NewiPhoneCatalogs = windowsCatalogs.filter(
    windowsCatalog => windowsCatalog?.w_cat_status === 1 && windowsCatalog?.w_cat_windowsCount >= 1 // status = 1 (Cũ) w_cat_windowsCount số lượng sản phẩm theo danh mục
  );
  const totalPages = Math.ceil(NewiPhoneCatalogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWindows = NewiPhoneCatalogs.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="my-5 rounded-md bg-white p-2">
      <div className="py-2 text-2xl font-semibold">Windows</div>
      <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="w-[195px] p-2">
              <Placeholder>
                <Placeholder.Image square />
                <Placeholder.Line />
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder>
            </div>
          ))
        ) : currentWindows.length === 0 ? (
          <>Không có dữ liệu!</>
        ) : (
          currentWindows.map(windowsCatalog => {
            const windowsCatalogUrl = slugify(windowsCatalog.w_cat_name);
            return (
              <div
                key={windowsCatalog?._id}
                onClick={() => navigate(`/windows/${windowsCatalogUrl}`)}
                className="group flex h-full w-full flex-col justify-between rounded-md border border-white bg-white text-black"
              >
                <div className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none">
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                    src={windowsCatalog?.w_cat_img}
                  />
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={windowsCatalog?.w_cat_img}
                  />
                </div>
                {/*  */}
                <div className="flex w-full flex-col items-start justify-between">
                  <div className="w-full cursor-pointer p-1">
                    <p className="w-[75px] rounded-sm bg-gray-100 text-center text-[10px] text-white">
                      {windowsCatalog?.w_cat_windowsCount > 99 ? '99+' : windowsCatalog?.w_cat_windowsCount}{' '}
                      {' Sản phẩm'}
                    </p>

                    <p className="xl:group-hover:text-secondary">Laptop {windowsCatalog.w_cat_name}</p>
                  </div>
                  <div className="w-full p-1">
                    <p className="text-gray-700">
                      Từ:&nbsp;
                      <span className="font-semibold text-red-700">
                        {(windowsCatalog.w_cat_price * 1000).toLocaleString('vi-VN')}₫
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default UsedWindowsPage;
