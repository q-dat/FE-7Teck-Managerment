import React from 'react';

import {
  BannerDesktop,
  BannerTablet,
  BannerMobile
} from '../../../assets/images';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import PhoneFC from './PhoneFC';
import IPadFC from './IPadFC';
import WindowFC from './WindowFC';
import MacbookFC from './MacbookFC';

const HomePage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="pt-[60px] xl:pt-0">
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[60%] md:bottom-4 md:left-[10%] md:top-[30%] lg:top-[30%]">
            <p className="bg-gradient-to-r from-primary to-white bg-clip-text text-[25px] font-black italic text-transparent xl:text-[40px]">
              Đổi Điện Thoại Cũ, <br /> Nhận Ngay Giá Tốt Nhất!
            </p>
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-thin text-transparent dark:from-primary dark:to-primary">
              up to 90%
            </p>
          </div>
          {/* Banner IMG */}
          <div>
            <img
              src={BannerDesktop}
              className="hidden w-full xl:block"
              alt="BannerDesktop"
            />
            <img
              src={BannerTablet}
              className="hidden w-full md:block xl:hidden"
              alt="BannerTablet"
            />
            <img
              src={BannerMobile}
              className="w-full md:hidden"
              alt="BannerMobile"
            />
          </div>
        </div>
        <div className="space-y-10 px-2 xl:px-[130px]">
          {/* Phone */}
          <PhoneFC />
          {/* Ipad */}
          <IPadFC />
          {/*  Window */}
          <WindowFC />
          {/*  MacBook */}
          <MacbookFC />
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
