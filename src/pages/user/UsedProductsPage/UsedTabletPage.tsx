import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../../components/userPage/Pagination';
import { useNavigate } from 'react-router-dom';
import { Placeholder } from 'semantic-ui-react';
import { TabletCatalogContext } from '../../../context/tablet-catalog/TabletCatalogContext';
import { slugify } from '../../../components/utils/slugify';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';

const UsedTabletPage: React.FC = () => {
  const { tabletCatalogs, getAllTabletCatalogs } = useContext(TabletCatalogContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToTopSmoothly();
    if (tabletCatalogs.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllTabletCatalogs();
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
  const NewiPhoneCatalogs = tabletCatalogs.filter(
    tabletCatalog => tabletCatalog?.t_cat_status === 1 && tabletCatalog?.t_cat_tabletCount >= 1 // status = 1 (Cũ) t_cat_tabletCount: số lượng sản phẩm theo danh mục
  );
  const totalPages = Math.ceil(NewiPhoneCatalogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTablets = NewiPhoneCatalogs.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="py-2 text-2xl font-semibold">iPad</div>
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
        ) : currentTablets.length === 0 ? (
          <>Không có dữ liệu!</>
        ) : (
          currentTablets.map(tabletCatalog => {
            const tabletCatalogUrl = slugify(tabletCatalog.t_cat_name);
            return (
              <div
                key={tabletCatalog?._id}
                onClick={() => navigate(`/may-tinh-bang/${tabletCatalogUrl}`)}
                className="group flex h-full w-full flex-col justify-between rounded-md border border-white bg-white text-black"
              >
                <div className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none">
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                    src={tabletCatalog?.t_cat_img}
                  />
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={tabletCatalog?.t_cat_img}
                  />
                </div>
                {/*  */}
                <div className="flex w-full flex-col items-start justify-between">
                  <div className="w-full cursor-pointer p-1">
                    <p className="w-[75px] rounded-sm bg-gray-100 text-center text-[10px] text-white">
                      {tabletCatalog?.t_cat_tabletCount > 99 ? '99+' : tabletCatalog?.t_cat_tabletCount} {' Sản phẩm'}
                    </p>

                    <p className="xl:group-hover:text-secondary">Máy tính bảng {tabletCatalog.t_cat_name}</p>
                  </div>
                  <div className="w-full p-1">
                    <p className="text-gray-700">
                      Từ:&nbsp;
                      <span className="font-semibold text-red-700">
                        {(tabletCatalog.t_cat_price * 1000).toLocaleString('vi-VN')}₫
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

export default UsedTabletPage;
