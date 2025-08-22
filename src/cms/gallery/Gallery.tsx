import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarGallery from '../../components/admin/gallery/SidebarGallery';
import NavbarAdmin from '../../components/admin/NavbarAdminDesktop ';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import { GalleryContext } from '../../context/gallery/GalleryContext';

const Gallery: React.FC<{}> = () => {
  const { getAllGallerys } = useContext(GalleryContext);
  useEffect(() => {
    // Title Tag
    document.title = `Trang Quản Trị Gallery`;
    const initializeData = async () => {
      try {
        await Promise.all([getAllGallerys()]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F2F7] dark:bg-gray-900">
      <div className="flex flex-1">
        <div className="hidden xl:block">
          <SidebarGallery />
        </div>
        <div className="flex-1 xl:p-6">
          <div className="xl:ml-64">
            <div>
              <NavbarAdmin />
            </div>
            <div>
              <ScrollToTopButton />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
