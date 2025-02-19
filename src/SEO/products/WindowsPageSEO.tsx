import React, { lazy } from 'react';
import useSeo from '../../hooks/useSeo';
const WindowsPage = lazy(
  () => import('../../pages/user/ProductsPage/WindowsPage')
);

const WindowsPageSEO: React.FC = () => {
  useSeo({
    title: 'Laptop Windows - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <WindowsPage />;
};

export default WindowsPageSEO;
