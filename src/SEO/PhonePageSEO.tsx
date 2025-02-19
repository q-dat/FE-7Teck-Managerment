import React, { lazy } from 'react';
import useSeo from '../hooks/useSeo';
const PhonePage = lazy(() => import('../pages/user/ProductsPage/PhonePage'));

const PhonePageSEO: React.FC = () => {
  useSeo({
    title: 'Điện thoại iPhone - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PhonePage />;
};

export default PhonePageSEO;

