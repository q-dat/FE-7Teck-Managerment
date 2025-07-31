import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../../components/userPage/Pagination';
import { useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';
import { Placeholder } from 'semantic-ui-react';
import { slugify } from '../../../components/utils/slugify';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';

const UsedPhonePage: React.FC = () => {
  const { phoneCatalogs, getAllPhoneCatalogs } = useContext(PhoneCatalogContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToTopSmoothly();
    if (phoneCatalogs.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        await getAllPhoneCatalogs();
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
  const NewiPhoneCatalogs = phoneCatalogs.filter(
    phoneCatalog => phoneCatalog?.status === 1 && phoneCatalog?.phoneCount >= 1 // status = 1 (Cũ) phoneCount: số lượng sản phẩm theo danh mục
  );
  const totalPages = Math.ceil(NewiPhoneCatalogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = NewiPhoneCatalogs.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="py-2 text-2xl font-semibold">iPhone</div>
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
        ) : currentPhones.length === 0 ? (
          <>Không có dữ liệu!</>
        ) : (
          currentPhones.map(phoneCatalog => {
            const phoneCatalogUrl = slugify(phoneCatalog.name);
            return (
              <div
                key={phoneCatalog?._id}
                onClick={() => navigate(`/dien-thoai/${phoneCatalogUrl}`)}
                className="group flex h-full w-full flex-col justify-between rounded-md border border-white bg-white text-black"
              >
                <div className="relative h-[200px] w-full cursor-pointer overflow-hidden rounded-md rounded-b-none">
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-xl filter"
                    src={phoneCatalog?.img}
                  />
                  <img
                    alt="Hình ảnh"
                    loading="lazy"
                    className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={phoneCatalog?.img}
                  />
                </div>
                {/*  */}
                <div className="flex w-full flex-col items-start justify-between">
                  <div className="w-full cursor-pointer p-1">
                    <p className="w-[75px] rounded-sm bg-gray-100 text-center text-[10px] text-white">
                      {phoneCatalog?.phoneCount > 99 ? '99+' : phoneCatalog?.phoneCount} {' Sản phẩm'}
                    </p>

                    <p className="xl:group-hover:text-secondary">Điện Thoại {phoneCatalog.name}</p>
                  </div>
                  <div className="w-full p-1">
                    <p className="text-gray-700">
                      Từ:&nbsp;
                      <span className="font-semibold text-red-700">
                        {(phoneCatalog.price * 1000).toLocaleString('vi-VN')}₫
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

export default UsedPhonePage;
