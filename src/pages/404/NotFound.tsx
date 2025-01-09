import React from 'react';
import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { NotFounds } from '../../assets/image-represent';
import { TbMoodSadDizzy } from 'react-icons/tb';

const NotFound: React.FC<{}> = () => {
  return (
    <div>
      <Hero
        className="h-screen w-full select-none"
        style={{
          backgroundImage: `url(${NotFounds})`
        }}
      >
        <Hero.Overlay />
        <Hero.Content className="text-center">
          <div className="max-w-md">
            <h1 className="flex items-center justify-center gap-1 text-4xl font-bold text-white xl:text-5xl">
              404 NOT FOUND <TbMoodSadDizzy />
            </h1>
            <p className="py-6 text-white">
              Trang bạn tìm hiện không có, xin lỗi vì sự bất tiện này!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/">
                <Button className="rounded-md border-none bg-gradient-to-r from-primary to-black text-white">
                  Trở về trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>
    </div>
  );
};

export default NotFound;
