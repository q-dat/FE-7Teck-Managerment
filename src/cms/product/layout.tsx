import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/adminPage/SidebarAdmin';
import ScrollToTopButton from '../../components/common/scrollToTop/ScrollToTopButton';

import { GalleryContext } from '../../context/gallery/GalleryContext';
import { MacbookCatalogContext } from '../../context/macbook-catalog/MacbookCatalogContext';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { PostCatalogContext } from '../../context/post-catalog/PostCatalogContext';
import { TabletCatalogContext } from '../../context/tablet-catalog/TabletCatalogContext';
import { WindowsCatalogContext } from '../../context/windows-catalog/WindowsCatalogContext';
import { PriceListContext } from '../../context/price-list/PriceListContext';

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    return saved === 'true';
  });

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement;

    const isTyping =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement instanceof HTMLSelectElement ||
      (activeElement instanceof HTMLElement && activeElement.isContentEditable);

    if (isTyping) return;

    if (event.key.toLowerCase() === 'b' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      toggleSidebar();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const { getAllGallerys } = useContext(GalleryContext);
  const { getAllMacbookCatalogs } = useContext(MacbookCatalogContext);
  const { getAllPhoneCatalogs } = useContext(PhoneCatalogContext);
  const { getAllPostCatalogs } = useContext(PostCatalogContext);
  const { getAllTabletCatalogs } = useContext(TabletCatalogContext);
  const { getAllWindowsCatalogs } = useContext(WindowsCatalogContext);
  const { getAllPriceLists } = useContext(PriceListContext);

  useEffect(() => {
    document.title = 'Trang Quản Trị';

    const preloadMetadata = async () => {
      try {
        await Promise.all([
          getAllGallerys(),
          getAllMacbookCatalogs(),
          getAllPhoneCatalogs(),
          getAllPostCatalogs(),
          getAllTabletCatalogs(),
          getAllWindowsCatalogs(),
          getAllPriceLists()
        ]);
      } catch (error) {
        console.error('Admin preload error:', error);
      }
    };

    preloadMetadata();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#F3F2F7] dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen border-r bg-white transition-all duration-300 dark:bg-gray-950 ${collapsed ? 'w-[80px]' : 'w-64'} hidden xl:block`}
      >
        <SidebarAdmin collapsed={collapsed} />

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute left-0 top-0 w-full p-1 text-center text-xs text-black shadow-sm shadow-white dark:text-white ${collapsed ? 'w-[80px]' : 'w-64'}`}
        >
          Phím tắt: B
        </button>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'xl:ml-16' : 'xl:ml-64'} xl:p-6`}>
        <ScrollToTopButton />
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
