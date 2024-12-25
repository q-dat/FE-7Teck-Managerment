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
  BannerMobile
} from '../../../assets/images';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import PhoneFC from './PhoneFC';
import IPadFC from './IPadFC';
import WindowFC from './WindowFC';
import MacbookFC from './MacbookFC';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// Items Data
const items = [
  { icon: <TbDeviceMobileSearch />, text: 'Bao test 7 ngày.' },
  {
    icon: <TbDeviceMobileUp />,
    text: (
      <>
        Thu cũ đổi mới <br />
        hỗ trợ giá lên đời.
      </>
    )
  },
  {
    icon: <TbDeviceMobileCog />,
    text: (
      <>
        Bảo hành
        <br /> 3 tháng/ 6 tháng/ 1 năm.
      </>
    )
  },
  {
    icon: <TbTruckDelivery />,
    text: (
      <>
        FreeShip nội thành HCM <br />
        và các tỉnh lân cận.
      </>
    )
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[100px]">
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

        {/*  Mobile */}
        <div className="block md:hidden">
          <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="my-5 flex flex-col items-center gap-2 text-center text-lg font-semibold text-primary">
                  <div>
                    {React.cloneElement(item.icon, {
                      className:
                        'rounded-full bg-gradient-to-tr from-primary via-primary to-black text-[120px] text-white'
                    })}
                  </div>
                  <p>{item.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop */}
        <div className="mx-2 my-5 hidden flex-col items-center justify-between gap-2 rounded-2xl from-primary to-black py-5 font-sub uppercase text-primary shadow-headerMenu shadow-black md:flex md:flex-row md:bg-gradient-to-tr md:text-white xl:mx-[100px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center gap-2 text-center text-lg md:flex-row md:items-start md:text-start md:text-xs xl:text-lg"
            >
              <div>
                {React.cloneElement(item.icon, {
                  className:
                    'rounded-full bg-gradient-to-tr from-primary via-primary to-black text-[120px] text-white md:rounded-none md:bg-transparent md:from-transparent md:to-transparent md:text-[50px]'
                })}
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-10 px-2 xl:px-[100px]">
          {/* Phone */}
          <PhoneFC />
          {/* Ipad */}
          <IPadFC />
          {/* Window */}
          <WindowFC />
          {/* MacBook */}
          <MacbookFC />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
