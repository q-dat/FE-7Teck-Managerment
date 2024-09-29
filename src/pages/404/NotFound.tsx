import React from 'react';
import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { NotFounds } from '../../assets/image-represent';

const NotFound: React.FC<{}> = () => {
  return (
    <div>
      <Hero
        className="h-screen w-full"
        style={{
          backgroundImage: `url(${NotFounds})`
        }}
      >
        <Hero.Overlay />
        <Hero.Content className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">

            404 NOT FOUND            </h1>
            <p className="py-6 text-white">Trang bạn tìm hiện không có, xin lỗi vì sự bất tiện này</p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/">
                <Button color="primary" className="text-white">
Trang Chính                </Button>
              </Link>

              <Link to="/auth/login">
                <Button color="secondary" className="text-white">
Đăng Nhập                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>
    </div>
  );
};

export default NotFound;
