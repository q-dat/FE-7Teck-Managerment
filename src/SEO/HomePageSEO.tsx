import React from 'react';
import useSeo from '../hooks/useSeo';
import HomePage from '../pages/user/HomePage/HomePage';

const HomePageSEO: React.FC = () => {
  useSeo({
    title:
      '7Teck.vn - Điện thoại, Máy tính bảng, Laptop, PC, Apple chính hãng, Thu cũ đổi mới - Hỗ trợ giá lên đời',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: 'Khám phá các sản phẩm công nghệ mới nhất tại 7Teck.'
      },
      { name: 'keywords', content: '7Teck, công nghệ, điện thoại, laptop' }
    ]
  });
  return <HomePage />;
};

export default HomePageSEO;

