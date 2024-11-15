import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="breadcrumbs glass mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
        <ul className="font-light">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/contact">Liên Hệ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
