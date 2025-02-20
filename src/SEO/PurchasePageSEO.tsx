import React, { lazy } from 'react';
const PurchasePage = lazy(() => import('../pages/user/PurchasePage'));
import useSeo from '../hooks/useSeo';

const PurchasePageSEO: React.FC = () => {
  useSeo({
    title: 'Trang mua hàng - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PurchasePage />;
};

export default PurchasePageSEO;

