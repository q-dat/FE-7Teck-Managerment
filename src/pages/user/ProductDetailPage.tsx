import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Chi Tiết Sản Phẩm" />
      <div className="pt-[60px] xl:pt-0">
        <div className="breadcrumbs shadow mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/product-detail">Chi Tiết Sản Phẩm</Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
