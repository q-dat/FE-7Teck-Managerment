import React, { lazy } from 'react';
const WarrantyPage = lazy(() => import('../pages/user/WarrantyPage'));
import useSeo from '../hooks/useSeo';

const WarrantyPageSEO: React.FC = () => {
  useSeo({
    title: 'Chính sách bảo hành - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <WarrantyPage />;
};

export default WarrantyPageSEO;

