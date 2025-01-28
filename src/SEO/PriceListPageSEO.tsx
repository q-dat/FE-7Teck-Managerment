import React, { lazy } from 'react';
import useSeo from '../hooks/useSeo';
const PriceListPage = lazy(() => import('../pages/user/PriceListPage'));

const PriceListPageSEO: React.FC = () => {
  useSeo({
    title: 'Bảng Giá Thu Mua - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PriceListPage />;
};

export default PriceListPageSEO;

