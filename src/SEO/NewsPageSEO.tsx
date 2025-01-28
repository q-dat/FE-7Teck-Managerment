import React from 'react'
import useSeo from '../hooks/useSeo';
import NewsPage from '../pages/user/post/NewsPage';

const NewsPageSEO:React.FC = () => {
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
}

export default NewsPageSEO
