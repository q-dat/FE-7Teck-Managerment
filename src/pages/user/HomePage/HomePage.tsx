import React, { useContext } from 'react';
import {
  TbDeviceMobileCog,
  TbDeviceMobileDollar,
  TbDeviceMobileSearch,
  TbDeviceMobileUp,
  TbTruckDelivery
} from 'react-icons/tb';
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
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';
import { IoIosArrowForward } from 'react-icons/io';
import {
  BannerDesktop,
  BannerMobile,
  BannerTablet,
  bgBlog,
  bgFixed
} from '../../../assets/images';
import ParallaxSectionFC from './ParallaxSectionFC';

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
  const { posts } = useContext(PostContext);
  const navigate = useNavigate();

  // Handle Click Post To Post Detail
  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post?.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/tin-tuc/${titleSlug}`);
  };
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="pt-[60px] xl:pt-0">
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[60%] md:bottom-4 md:left-[10%] md:top-[30%] lg:top-[30%]">
            <h1 className="bg-gradient-to-r from-white to-white bg-clip-text text-[25px] font-extrabold italic text-transparent xl:text-[40px]">
              Đổi Điện Thoại Cũ, <br /> Nhận Ngay Giá Tốt Nhất!
            </h1>
            <h2 className="bg-gradient-to-r from-white to-white bg-clip-text text-[20px] font-thin text-transparent">
              up to 90%
            </h2>
          </div>
          <img
            src={BannerDesktop}
            className="hidden h-full w-full object-cover xl:block"
            alt="BannerDesktop"
          />
          <img
            src={BannerTablet}
            className="hidden h-full w-full object-cover md:block xl:hidden"
            alt="BannerTablet"
          />
          <img
            src={BannerMobile}
            className="h-full w-full object-cover md:hidden"
            alt="BannerMobile"
          />
        </div>
        {/* Benefits Section */}
        <div className="w-full">
          {/*   Mobile */}
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
                  <div className="text-md my-4 flex flex-col items-center gap-2 text-center">
                    <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4">
                      <div>
                        {React.cloneElement(item.icon, {
                          className: 'text-[100px] text-white'
                        })}
                      </div>
                    </div>
                    <div className="text-black">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/*  Desktop */}
          <div className="mx-0 my-5 hidden flex-row items-start justify-between gap-2 rounded-2xl py-5 md:flex xl:mx-[100px]">
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
        {/* Section Product */}
        <div data-aos="fade-down" className="mt-10 p-0 xl:px-[100px]">
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
        {/* Sale */}
        <div data-aos="fade-up" className="mt-10 p-0 xl:px-[100px]">
          <IPadFC />
        </div>
        <div data-aos="fade-up" className="mt-10 p-0 xl:px-[100px]">
          <WindowFC />
        </div>
        <div data-aos="fade-up" className="mt-10 p-0 xl:px-[100px]">
          <MacbookFC />
        </div>
        {/* ParallaxSection */}
        <div className="my-10 flex flex-col items-center justify-between p-0 xl:flex-row xl:px-[100px]">
          <div className="w-full">
            <ParallaxSectionFC />
          </div>
          <div className="w-full"></div>
        </div>
        {/* Post */}
        <div
          style={{
            backgroundImage: `url(${bgBlog})`
          }}
          className={`relative mt-10 bg-cover bg-fixed bg-center bg-no-repeat py-5 ${posts.length === 0 ? 'hidden' : ''}`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <section
            className="relative z-10"
            role="region"
            aria-label=" Bản tin mới nhất"
          >
            <h3 className="mb-2 bg-white bg-opacity-20 text-center text-xl font-semibold uppercase text-white">
              Bản tin mới nhất
            </h3>
            <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-[100px]">
              {posts.slice(0, 4).map(post => (
                <div
                  key={post?._id}
                  className="relative flex cursor-pointer flex-col items-start justify-start gap-2 rounded border border-gray-50 bg-white p-2 shadow-inner hover:shadow-lg xl:flex-row"
                  onClick={() => handlePostClick(post)}
                >
                  <p className="absolute left-1 top-1 z-20 rounded-sm bg-primary px-2 text-[12px] text-white">
                    {post?.catalog}
                  </p>
                  <div className="relative h-[100px] w-full overflow-hidden">
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-0 h-full w-full rounded-sm object-cover blur-sm filter"
                    />
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-10 h-full w-full rounded-sm object-contain"
                    />
                  </div>
                  <p className="line-clamp-6 w-full py-1 text-sm text-black">
                    {post?.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <div role="region" aria-label="Xem thêm bản tin">
            <Link to="/tin-tuc-moi-nhat">
              <button
                role="button"
                className="relative z-10 mt-2 flex w-full items-center justify-center gap-1 bg-gradient-to-r from-white via-secondary to-white py-1 text-sm text-white"
              >
                Xem Thêm Bản Tin
                <span>
                  <IoIosArrowForward />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
