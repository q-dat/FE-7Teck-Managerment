import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import SidebarGallery from '../../components/admin/gallery/SidebarGallery';
const Gallery: React.FC<{}> = () => {
    // Title Tag
    useEffect(() => {
      document.title = `Trang Quản Trị Gallery`;
    });
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
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
