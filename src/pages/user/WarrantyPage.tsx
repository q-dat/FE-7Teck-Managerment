import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

const WarrantyPage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Chính Sách Bảo Hành" />
      <div className="py-[60px] xl:pt-0">
        <div className="xl:px-desktop-padding breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow dark:text-white">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Chính sách bảo hành" to="">
                Chính Sách Bảo Hành
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;
