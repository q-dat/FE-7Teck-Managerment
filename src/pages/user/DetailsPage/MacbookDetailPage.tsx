import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import HeaderResponsive from '../../../components/userPage/HeaderResponsive';
import { macbookFieldMap } from '../../../types/type/optionsData/macbookFieldMap';
import { MacbookContext } from '../../../context/macbook/MacbookContext';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';
import {
  scrollBy,
  updateScrollButtons,
  handleScrollButtons,
  handleThumbnailClick
} from '../../../components/utils/DetailPage/scrollUtils';
import Zoom from '../../../lib/Zoom';
import { contact, hotlineUrl } from '../../../components/utils/socialLinks';
import { LoadingLocal } from '../../../components/orther/loading';

const MacbookDetailPage: React.FC = () => {
  const { id } = useParams();
  const { getMacbookById, macbookDetails } = useContext(MacbookContext);
  const [mac, setMac] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);
  const [activeTab, setActiveTab] = useState<string>('specs');
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null!);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    if (!id) return;

    setLoading(true);

    getMacbookById(id)
      .then(fetchedData => {
        if (fetchedData) {
          setMac(fetchedData);
          setSelectedImage(fetchedData.macbook_img);
        } else {
          console.warn('Không tìm thấy sản phẩm với id:', id);
        }
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu sản phẩm:', error))
      .finally(() => setLoading(false));
  };

  useLayoutEffect(() => {
    updateScrollButtons(scrollRef, setIsLeftVisible, setIsRightVisible);
  }, [mac, mac?.macbook_thumbnail]);

  useEffect(() => {
    scrollToTopSmoothly();
    fetchData();
    const cleanup = handleScrollButtons(scrollRef, Object.keys(macbookDetails).length, () =>
      updateScrollButtons(scrollRef, setIsLeftVisible, setIsRightVisible)
    );
    return cleanup;
  }, []);

  if (loading || !mac || !mac?.macbook_catalog_id) {
    return <LoadingLocal />;
  }

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Thông Tin Sản Phẩm" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-desktop-padding">
          <ul className="font-light">
            <li>
              <Link role="navigation" aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link role="navigation" aria-label="Thông tin sản phẩm" to="">
                Thông Tin Sản Phẩm
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-2 px-2 xl:px-[150px]">
          <div className="flex flex-col items-start justify-start gap-5 xl:flex-row">
            {/* IMG */}
            <div className="flex w-full flex-col gap-5">
              <div className="relative w-full">
                <div className="h-[500px] w-full overflow-hidden object-cover">
                  <img
                    loading="lazy"
                    src={selectedImage || mac?.macbook_img}
                    alt={mac?.macbook_name || 'Hình ảnh'}
                    className="absolute left-0 top-0 z-0 h-full w-full rounded-md object-cover blur-xl filter"
                  />
                  <Zoom>
                    <img
                      loading="lazy"
                      src={selectedImage || mac?.macbook_img}
                      alt={mac?.macbook_name || 'Hình ảnh'}
                      className="absolute left-0 top-0 z-10 h-full w-full rounded-md object-contain"
                    />
                  </Zoom>
                </div>
              </div>
              {/* Thumbnails */}
              <div className="relative rounded-md p-1">
                <div
                  ref={scrollRef}
                  className="flex w-full flex-row items-start justify-start gap-2 overflow-x-auto scroll-smooth scrollbar-hide xl:w-[550px]"
                >
                  {mac?.macbook_thumbnail && Array.isArray(mac?.macbook_thumbnail) ? (
                    mac?.macbook_thumbnail.map((thumb: string, index: number) => (
                      <img
                        loading="lazy"
                        key={index}
                        src={thumb}
                        alt="Ảnh thu nhỏ"
                        className="h-[70px] w-[70px] cursor-pointer rounded-md border object-cover"
                        onClick={() => handleThumbnailClick(scrollRef, thumb, index, setSelectedImage)}
                      />
                    ))
                  ) : (
                    <span>Không có ảnh thu nhỏ</span>
                  )}
                </div>
                {/* Navigation Button  */}
                <div role="button" className="absolute left-0 top-4 flex w-full items-center justify-between">
                  <div className="relative w-full">
                    <button
                      aria-label="Cuộn sang trái"
                      onClick={() => scrollBy(scrollRef, -70)}
                      className={`absolute -left-1 z-[100] rounded-xl bg-black bg-opacity-20 py-2 text-white xl:-left-2 ${isLeftVisible ? '' : 'hidden'}`}
                    >
                      <MdArrowBackIosNew className="text-2xl" />
                    </button>
                    <button
                      aria-label="Cuộn sang phải"
                      onClick={() => scrollBy(scrollRef, 70)}
                      className={`absolute -right-1 z-[100] rounded-xl bg-black bg-opacity-20 py-2 text-white xl:-right-2 ${isRightVisible ? '' : 'hidden'}`}
                    >
                      <MdArrowForwardIos className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="flex w-full flex-col gap-5">
              {/* Info */}
              <div className="flex h-full flex-col items-start justify-between gap-5 rounded-md border border-gray-50 bg-white p-2 leading-10 xl:h-[490px]">
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-black">Laptop {mac?.macbook_name}</h1>
                  <p className="text-3xl font-semibold text-red-500">
                    <span>{(mac?.macbook_price * 1000).toLocaleString('vi-VN')}₫</span>
                    {mac?.macbook_sale && (
                      <del className="text-sm font-light text-gray-100">
                        {(mac?.macbook_sale * 1000).toLocaleString('vi-VN')} ₫
                      </del>
                    )}
                  </p>
                  {mac?.macbook_color && (
                    <p className="space-x-1 text-gray-500">
                      <span>Màu sắc:</span>
                      <strong className="text-black">{mac?.macbook_color}</strong>
                    </p>
                  )}
                  {mac?.macbook_status && (
                    <p className="space-x-1 text-gray-500">
                      <span>Tình trạng:</span>
                      <strong className="text-black">{mac?.macbook_status}</strong>
                    </p>
                  )}
                  {mac?.macbook_des && (
                    <p className="text-lg text-blue-500">
                      <span>{mac?.macbook_des}</span>
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-1">
                  <Link to="/thanh-toan">
                    <Button
                      size="sm"
                      className="w-[300px] rounded-md border-none bg-primary text-white hover:bg-primary hover:bg-opacity-60 xl:w-[400px]"
                    >
                      Mua ngay
                    </Button>
                  </Link>
                  <i className="w-full text-start text-sm font-light text-secondary">
                    *Nhấn "Mua ngay" để xác nhận sản phẩm bạn muốn mua!
                  </i>
                </div>
              </div>
              {/* Note */}
              <Link role="navigation" aria-label="Hotline" to={hotlineUrl}>
                <div className="h-[80px] w-full rounded-md border border-gray-50 bg-blue-900 p-2">
                  <p className="text-center text-white">
                    <span className="text-2xl font-bold uppercase xl:text-3xl">Quan tâm</span>
                    <span className="font-bol text-xs">&nbsp; (Ấn để gọi ngay)</span>
                  </p>
                  <i className="text-lg text-white">*Call ngay {contact} để có giá tốt nhất!</i>
                </div>
              </Link>
            </div>
          </div>
          {/* Tab */}
          <div className="w-full">
            <div className="mt-5 flex flex-row items-center justify-center rounded-md border-b-2 border-primary uppercase">
              <div
                className={`w-full cursor-pointer rounded-l-md py-2 text-center font-light transition-all duration-500 ease-in-out ${activeTab === 'specs' ? 'bg-primary font-semibold text-white' : 'bg-white text-primary'}`}
                onClick={() => setActiveTab('specs')}
              >
                <p>Thông số kĩ thuật</p>
              </div>
              <div
                className={`w-full cursor-pointer rounded-r-md py-2 text-center font-light transition-all duration-500 ease-in-out ${activeTab === 'details' ? 'bg-primary font-semibold text-white' : 'bg-white text-primary'}`}
                onClick={() => setActiveTab('details')}
              >
                <p>Thông tin sản phẩm</p>
              </div>
            </div>
            {/*  */}
            <div className="w-full">
              {/* Details */}
              {activeTab === 'specs' && (
                <div className="mt-5 divide-y-[1px] divide-primary divide-opacity-20 rounded-md border border-primary bg-white leading-10 text-black">
                  <h1 className="rounded-sm rounded-b-none bg-primary p-2 text-center text-lg font-light uppercase text-white">
                    Các thông số chi tiết
                  </h1>
                  {macbookFieldMap.map(group => (
                    <div key={group?.group}>
                      <details className="group transform divide-y-[1px] bg-primary bg-opacity-5">
                        <summary className="flex cursor-pointer items-center justify-between p-2">
                          <span className="font-semibold text-primary">{group?.name}</span>
                          <span className="transform text-primary transition-transform duration-300 ease-in-out group-open:rotate-180">
                            <IoIosArrowDropdownCircle className="text-2xl" />
                          </span>
                        </summary>
                        {group?.fields
                          .filter(field => mac?.macbook_catalog_id?.[group?.group]?.[field?.field])
                          .map(field => {
                            const fieldValue = mac?.macbook_catalog_id?.[group?.group]?.[field?.field];
                            return (
                              <div
                                className="flex w-full flex-row items-start justify-between rounded-md bg-white p-2"
                                key={field?.field}
                              >
                                <p>{field?.name}</p>
                                <p className="font-light italic text-gray-700">
                                  {Array.isArray(fieldValue) ? <span>{fieldValue.join(',')}</span> : fieldValue}
                                </p>
                              </div>
                            );
                          })}
                      </details>
                    </div>
                  ))}
                </div>
              )}
              {/* Detailed description */}
              {activeTab === 'details' && (
                <p
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: mac?.macbook_catalog_id?.content
                  }}
                ></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacbookDetailPage;
