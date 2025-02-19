import React, { lazy } from 'react';
import useSeo from '../../hooks/useSeo';
const TabletPage = lazy(() => import('../../pages/user/ProductsPage/TabletPage'));

const TabletPageSEO: React.FC = () => {
  useSeo({
    title: 'Máy tính bảng iPab - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <TabletPage />;
};

export default TabletPageSEO;

