import React from 'react';
import useSeo from '../hooks/useSeo';
import GalleryPage from '../pages/user/GalleryPage';

const GalleryPageSEO: React.FC = () => {
  useSeo({
    title: 'Hành Trình Khách Hàng',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <GalleryPage />;
};

export default GalleryPageSEO;

