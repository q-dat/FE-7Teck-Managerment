import React, { lazy } from 'react';
import useSeo from '../hooks/useSeo';
const TipsAndTricksPage = lazy(
  () => import('../pages/user/post/TipsAndTricksPage')
);

const TipsAndTricksPageSEO: React.FC = () => {
  useSeo({
    title: 'Thủ Thuật Công Nghệ Và Mẹo Hay',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <TipsAndTricksPage />;
};

export default TipsAndTricksPageSEO;

