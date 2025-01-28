import React from 'react'
import useSeo from '../hooks/useSeo';
import PhonePage from '../pages/user/PhonePage';

const PhonePageSEO:React.FC = () => {
    useSeo({
        title: 'Điện Thoại iPhone - 7Teck',
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
}

export default PhonePageSEO
