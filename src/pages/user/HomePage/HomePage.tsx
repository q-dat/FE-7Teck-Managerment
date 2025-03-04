import React from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import PhoneFC from './PhoneFC';
import IPadFC from './IPadFC';
import WindowsFC from './WindowsFC';
import MacbookFC from './MacbookFC';

import {
  BannerDesktop,
  BannerMobile,
  BannerTablet,
  bgFixed
} from '../../../assets/images';
import PostSection from './PostSection';
import BenefitsSection from './BenefitsSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="pt-[60px] xl:pt-0">
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-0 top-0 h-full w-full bg-black bg-opacity-10 pl-2 pt-[20%] md:pl-20 md:pt-5 xl:pl-[100px] xl:pt-[4%]">
            <h1 className="text-[25px] font-extrabold text-white xl:text-[40px]">
              Đổi Điện Thoại Cũ , <br />
              Nhận Ngay Giá Tốt Nhất!
            </h1>
            <h2 className="w-[120px] bg-gradient-to-r from-primary via-primary to-transparent text-start text-[20px] font-thin italic text-white">
              up to 90%
            </h2>
          </div>
          <picture>
            {/* Hiển thị BannerDesktop khi màn hình >= 1024px */}
            <source srcSet={BannerDesktop} media="(min-width: 1024px)" />
            {/* Hiển thị BannerTablet khi màn hình từ 601px - 1023px */}
            <source srcSet={BannerTablet} media="(min-width: 601px)" />
            {/* Hiển thị BannerMobile khi màn hình <= 600px */}
            <img
              src={BannerMobile}
              alt="Banner"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </picture>
        </div>
        {/* Benefits Section */}
        <BenefitsSection />
        {/* Product Section */}
        <div data-aos="fade-down">
          <PhoneFC />
        </div>
        {/* Bg Fixed */}
        <div
          className="relative my-10 h-[200px] w-full bg-cover bg-fixed bg-center bg-no-repeat xl:h-[300px]"
          style={{
            backgroundImage: `url(${bgFixed})`
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center bg-black bg-opacity-30 px-2 text-lg font-light text-white xl:px-[100px] xl:text-3xl">
            <h2
              className="font-semibold"
              uk-parallax="opacity: 0,9; y: -50,0; scale: 2,1; end: 50vh + 50%;"
            >
              iPhone 16 Pro Max
            </h2>
            <i
              className="text-center"
              uk-parallax="opacity: 0,9; y: 50,0; scale: 0.5,1; end: 50vh + 50%;"
            >
              Trải nghiệm công nghệ đỉnh cao với thiết kế mới mẻ, hiệu suất vượt
              trội và camera siêu nét.
            </i>
          </div>
        </div>
        {/* Discounted Products Section*/}
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <div data-aos="fade-up" className="w-full">
            <IPadFC />
          </div>
          <div data-aos="fade-up" className="w-full">
            <MacbookFC />
          </div>
          <div data-aos="fade-up" className="w-full">
            <WindowsFC />
          </div>
        </div>
        {/* Post Section */}
        <PostSection />
      </div>
    </div>
  );
};

export default HomePage;
