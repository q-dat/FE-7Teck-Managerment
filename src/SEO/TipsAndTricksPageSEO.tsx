import React, { lazy } from 'react';
import useSeo from '../hooks/useSeo';
const TipsAndTricksPage = lazy(
  () => import('../pages/user/PostPage/TipsAndTricksPage')
);

const TipsAndTricksPageSEO: React.FC = () => {
  useSeo({
    title: 'Thủ thuật công nghệ và mẹo hay',
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

