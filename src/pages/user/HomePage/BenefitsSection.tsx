import React, { memo } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import {
  TbDeviceMobileSearch,
  TbDeviceMobileDollar,
  TbDeviceMobileUp,
  TbDeviceMobileCog,
  TbTruckDelivery
} from 'react-icons/tb';

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
const BenefitsSection: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Mobile */}
      <div className="block md:hidden">
        <Swiper
          pagination={{ dynamicBullets: true, clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: false
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper min-h-[200px] w-full"
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="text-md my-4 flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4">
                  {React.cloneElement(item.icon, {
                    className: 'text-[100px] text-white'
                  })}
                </div>
                <div className="text-black">
                  <p>{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop */}
      <div className="mx-0 my-5 hidden flex-row items-start justify-between gap-2 rounded-2xl py-5 md:flex xl:mx-[100px]">
        <Swiper
          slidesPerView={4}
          pagination={{ dynamicBullets: true, clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper min-h-[200px] w-full"
        >
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
                <div className="text-black">
                  <p>{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(BenefitsSection);
