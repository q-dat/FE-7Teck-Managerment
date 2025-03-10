import React, { lazy, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';
import { WindowsContext } from '../../context/windows/WindowsContext';
const UsedWindowsByCatalogPage = lazy(
  () =>
    import('../../pages/user/usedProductsByCatalog/UsedWindowsByCatalogPage')
);

const UsedWindowsByCatalogPageSEO: React.FC = () => {
  const { windows } = useContext(WindowsContext);
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
  const filteredWindows = windows.filter(
    win => slugify(win?.windows_name) === catalog
  );
  useSeo({
    title:
      filteredWindows.length > 0
        ? `${filteredWindows[0]?.windows_name}`
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
  return <UsedWindowsByCatalogPage />;
};

export default UsedWindowsByCatalogPageSEO;

