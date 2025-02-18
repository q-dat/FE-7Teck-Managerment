import React, { lazy, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneContext } from '../context/phone/PhoneContext';
import useSeo from '../hooks/useSeo';
const UsedPhoneByCatalogPage = lazy(
  () => import('../pages/user/usedPhone/UsedPhoneByCatalogPage')
);

const PhoneByCatalogPageSEO: React.FC = () => {
  const { phones } = useContext(PhoneContext);
  const { catalog } = useParams();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  const filteredPhones = phones.filter(
    phone => slugify(phone?.name) === catalog
  );
  useSeo({
    title:
      filteredPhones.length > 0
        ? `${filteredPhones[0]?.name}`
        : 'Không tìm thấy sản phẩm!',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, điện thoại, laptop, máy tính bảng' }
    ]
  });
  return <UsedPhoneByCatalogPage />;
};

export default PhoneByCatalogPageSEO;

