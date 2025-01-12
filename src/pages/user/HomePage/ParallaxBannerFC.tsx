import React from 'react';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
const ParallaxBannerFC: React.FC = () => {
  const background: BannerLayer = {
    image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg',
    translateY: [0, 10],
    opacity: [1, 0.3],
    scale: [1.05, 1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    // translateY: [0, 9],
    scale: [1, 1.05, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: true,
    children: (
      <div className="absolute opacity-0 animate-fadeIn inset-0 flex -translate-y-10 flex-col items-start justify-center px-2 xl:translate-y-0 xl:px-5 gap-1">
        <p className="text-[34px] font-semibold text-white md:text-6xl xl:text-[75px]">
          Đổi điện thoại cũ, hỗ trợ giá lên đời.
        </p>
        <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-extralight xl:font-thin text-transparent md:text-2xl xl:text-4xl">
          up to 90%
        </p>
      </div>
    )
  };

  const foreground: BannerLayer = {
    image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
    translateY: [0, 30],
    scale: [1, 1.1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 0.9],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
    )
  };

  return (
    <ParallaxBanner
      layers={[background, headline, foreground, gradientOverlay]}
      className="h-[400px] bg-gray-900 xl:aspect-[2/1] xl:h-[480px]"
    />
  );
};

export default ParallaxBannerFC;

