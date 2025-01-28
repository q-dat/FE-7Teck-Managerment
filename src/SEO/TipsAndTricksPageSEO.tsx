import React from 'react';
import useSeo from '../hooks/useSeo';
import TipsAndTricksPage from '../pages/user/post/TipsAndTricksPage';

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

