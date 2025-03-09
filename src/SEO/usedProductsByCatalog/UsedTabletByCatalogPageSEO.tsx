import React, { lazy, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TabletContext } from '../../context/tablet/TabletContext';
import useSeo from '../../hooks/useSeo';
const UsedTabletByCatalogPage = lazy(
  () => import('../../pages/user/usedProductsByCatalog/UsedTabletByCatalogPage')
);

const TabletByCatalogPageSEO: React.FC = () => {
  const { tablets } = useContext(TabletContext);
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
  const filteredTablets = tablets.filter(
    tablet => slugify(tablet?.tablet_name) === catalog
  );
  useSeo({
    title:
      filteredTablets.length > 0
        ? `${filteredTablets[0]?.tablet_name}`
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
  return <UsedTabletByCatalogPage />;
};

export default TabletByCatalogPageSEO;
