import React from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import UsedPhonePage from './UsedPhonePage';
import UsedTabletPage from './UsedTabletPage';

const UsedProductsPage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Thiết Bị Đã Qua Sử Dụng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Thiết bị qua sử dụng" to="">
                Thiết bị đã qua sử dụng
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="mt-5 px-2 xl:px-20">
          <UsedPhonePage />
          <UsedTabletPage/>
        </div>
      </div>
    </div>
  );
};

export default UsedProductsPage;
