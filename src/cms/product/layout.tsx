import React, { useContext, useEffect } from 'react';
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
  // ===== Catalog / metadata only =====
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
    <div className="flex min-h-screen w-full flex-col bg-[#F3F2F7] dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar desktop */}
        <aside className="z-10 hidden xl:block">
          <SidebarAdmin />
        </aside>

        {/* Main content */}
        <main className="flex-1 xl:p-6">
          <div className="xl:ml-64">
            <ScrollToTopButton />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
