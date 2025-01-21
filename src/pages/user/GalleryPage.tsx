import React from 'react';
import { Link } from 'react-router-dom';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

const GalleryPage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Hành Trình" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow dark:text-white lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="">Dấu Ấn Khách Hàng</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;

