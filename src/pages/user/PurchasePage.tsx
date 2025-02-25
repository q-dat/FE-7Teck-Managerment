import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

const PurchasePage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Mua Hàng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Mua Hàng" to="">
                Mua Hàng
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="px-2 xl:px-20"></div>
      </div>
    </div>
  );
};

export default PurchasePage;
