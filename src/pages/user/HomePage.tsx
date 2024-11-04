import React from 'react';
import { BannerDesktop, BannerTablet, BannerMobile } from '../../assets/images';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

const HomePage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Bảng Giá Thu Mua" />
      <div>
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[20%] xl:top-[40%]">
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[25px] font-bold text-transparent dark:from-primary dark:to-gray-100 md:text-[40px]">
              ll
            </p>
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-light text-transparent dark:from-primary dark:to-primary">
              ll
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
      </div>
    </div>
  );
};

export default HomePage;
