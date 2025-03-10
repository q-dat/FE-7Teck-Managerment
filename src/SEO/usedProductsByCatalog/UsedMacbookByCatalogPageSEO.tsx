import React, { lazy, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';
import { MacbookContext } from '../../context/macbook/MacbookContext';
const UsedMacbookByCatalogPage = lazy(
  () =>
    import('../../pages/user/usedProductsByCatalog/UsedMacbookByCatalogPage')
);

const UsedMacbookByCatalogPageSEO: React.FC = () => {
  const { macbook } = useContext(MacbookContext);
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
  const filteredMacbook = macbook.filter(
    mac => slugify(mac?.macbook_name) === catalog
  );
  useSeo({
    title:
      filteredMacbook.length > 0
        ? `${filteredMacbook[0]?.macbook_name}`
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
  return <UsedMacbookByCatalogPage />;
};

export default UsedMacbookByCatalogPageSEO;

