import React from 'react';
import ContactPage from '../pages/user/ContactPage';
import useSeo from '../hooks/useSeo';

const ContactPageSEO: React.FC = () => {
  useSeo({
    title: 'Chính Sách Bảo Hành - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <ContactPage />;
};

export default ContactPageSEO;

