import React from 'react';
import UsedProductsPage from '../pages/user/usedPhone/UsedProductsPage';
import useSeo from '../hooks/useSeo';

const UsedProductsPageSEO: React.FC = () => {
  useSeo({
    title: 'Điện thoại iPhone cũ - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <UsedProductsPage />;
};

export default UsedProductsPageSEO;

