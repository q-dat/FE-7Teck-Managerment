import React, { lazy } from 'react';
import useSeo from '../../hooks/useSeo';
const NewsPage = lazy(() => import('../../pages/user/PostPage/NewsPage'));

const NewsPageSEO: React.FC = () => {
  useSeo({
    title: 'Tin tức mới nhất tại 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <NewsPage />;
};

export default NewsPageSEO;

