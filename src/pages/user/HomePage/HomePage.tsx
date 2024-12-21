import React from 'react';
import {
  TbDeviceMobileCog,
  TbDeviceMobileSearch,
  TbDeviceMobileUp,
  TbTruckDelivery
} from 'react-icons/tb';
import {
  BannerDesktop,
  BannerTablet,
  BannerMobile,
  Logo
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
        <div className="relative mx-2 my-10 flex flex-col items-center justify-between gap-2 rounded-2xl bg-gradient-to-tr from-primary to-black py-5 font-sub uppercase text-white shadow-headerMenu shadow-black md:flex-row xl:mx-[100px]">
          <div className="absolute right-1 top-1 block md:hidden">
            <img
              src={Logo}
              className="h-[50px] w-[50px] rounded-box"
              alt="7Teck"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2 text-lg md:text-xs xl:text-lg">
            <TbDeviceMobileSearch className="text-[50px]" />
            <p className="bg-gradient-to-tl from-primary via-white to-white bg-clip-text text-transparent">
              Bao test 7 ngày.
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-2 text-lg md:text-xs xl:text-lg">
            <TbDeviceMobileUp className="text-[50px]" />
            <p className="bg-gradient-to-tl from-primary via-white to-white bg-clip-text text-transparent">
              Thu cũ đổi mới <br />
              hỗ trợ giá lên đời.
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-2 text-lg md:text-xs xl:text-lg">
            <TbDeviceMobileCog className="text-[50px]" />
            <p className="bg-gradient-to-tl from-primary via-white to-white bg-clip-text text-transparent">
              Bảo hành
              <br /> 3 tháng/ 6 tháng/ 1 năm.
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-2 px-2 text-lg md:px-0 md:text-xs xl:text-lg">
            <TbTruckDelivery className="text-[50px]" />
            <p className="bg-gradient-to-tl from-primary via-white to-white bg-clip-text text-transparent">
              FreeShip thành phố HCM <br />
              và các tỉnh lân cận.
            </p>
          </div>
        </div>
        <div className="space-y-10 px-2 xl:px-[100px]">
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
