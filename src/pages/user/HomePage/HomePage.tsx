import React from 'react';
import {
  TbDeviceMobileCog,
  TbDeviceMobileDollar,
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
import 'swiper/css/autoplay';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

// Items Data
const items = [
  {
    icon: <TbDeviceMobileSearch />,
    text: (
      <>
        Đổi trả <br />
        Bao test 7 ngày.
      </>
    )
  },
  {
    icon: <TbDeviceMobileDollar />,
    text: (
      <>
        Hỗ trợ trả góp <br />
        qua thẻ tín dụng.
      </>
    )
  },
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
        và các tỉnh thành lân cận.
      </>
    )
  }
];

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="pt-[100px] xl:pt-0">
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
            pagination={{ dynamicBullets: true, clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false // Vẫn giữ autoplay sau khi người dùng tương tác
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-md my-4 flex flex-col items-center gap-2 text-center font-semibold text-primary dark:text-white">
                  <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4">
                    <div>
                      {React.cloneElement(item.icon, {
                        className: 'text-[100px] text-white'
                      })}
                    </div>
                  </div>
                  <div>
                    <p>{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop */}
        <div className="mx-0 my-5 hidden flex-row items-start justify-between gap-2 rounded-2xl py-5 font-sub md:flex xl:mx-[100px]">
          <Swiper
            slidesPerView={4}
            pagination={{ dynamicBullets: true, clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {' '}
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-start gap-4 text-center md:text-xs xl:text-lg"
                >
                  <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4 text-white">
                    <p>
                      {React.cloneElement(item.icon, {
                        className: 'text-[90px]'
                      })}
                    </p>
                  </div>
                  <div className="text-primary">
                    <p>{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-10 p-0 xl:px-[100px]">
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
