import React from 'react';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { bannerBackground, bannerForeground } from '../../assets/images';

const ParallaxBannerFC: React.FC = () => {
  const background: BannerLayer = {
    image: `${bannerBackground}`,
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    scale: [1, 1.05, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: true,
    children: (
      <div
        role="region"
        aria-label="Thu cũ đổi mới, hỗ trợ giá lên đời.  Up to 90%"
        className="absolute inset-0 flex -translate-y-5 animate-fadeIn flex-col items-start justify-center gap-1 px-2 xl:translate-y-10 xl:px-5"
      >
        <h1 className="text-[34px] font-semibold text-white md:text-6xl xl:text-[75px]">
          Thu cũ đổi mới, hỗ trợ giá lên đời.
        </h1>
        <h2 className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-extralight text-transparent md:text-2xl xl:text-4xl xl:font-thin">
          Up to 90%
        </h2>
      </div>
    )
  };

  const foreground: BannerLayer = {
    image: `${bannerForeground}`,
    translateY: [0, 15],
    scale: [1, 1.1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 0.9],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
  };

  return (
    <section role="banner" aria-label="Banner quảng cáo Thu cũ đổi mới">
      <ParallaxBanner
        layers={[background, headline, foreground, gradientOverlay]}
        className="h-[400px] bg-gray-900 xl:aspect-[2/1] xl:h-[480px]"
      />
    </section>
  );
};

export default ParallaxBannerFC;
