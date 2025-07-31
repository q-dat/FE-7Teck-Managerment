import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { bannerBackground, bannerForeground } from '../../assets/images';

const ParallaxSectionFC: React.FC = () => {
  return (
    <ParallaxBanner
      layers={[
        { image: `${bannerBackground}`, speed: -20 },
        {
          speed: -15,
          children: (
            <div
              role="region"
              aria-label=" Các ưu đãi đặc biệt tại 7Teck"
              className="absolute inset-0 flex items-center justify-center"
            >
              <h1 className="text-3xl font-extralight text-white xl:text-5xl">Các ưu đãi đặc biệt tại 7Teck</h1>
            </div>
          )
        },
        { image: `${bannerForeground}`, speed: -10 }
      ]}
      className="aspect-[2/1] h-[300px] xl:rounded-md"
    />
  );
};

export default ParallaxSectionFC;
