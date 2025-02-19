import React, { lazy } from 'react';
import useSeo from '../../hooks/useSeo';
const MacbookPage = lazy(
  () => import('../../pages/user/ProductsPage/MacbookPage')
);

const MacbookPageSEO: React.FC = () => {
  useSeo({
    title: 'Laptop Macbook - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <MacbookPage />;
};

export default MacbookPageSEO;

