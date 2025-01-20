import React from 'react';
import NavbarGallery from '../../../components/admin/Reponsive/Mobile/NavbarGallery';

const GalleryManagerPage: React.FC = () => {
  return (
    <div className="w-full">
      <NavbarGallery Title_NavbarGallery="Gallery" />
      <div className="px-2 xl:px-0"></div>
    </div>
  );
};

export default GalleryManagerPage;

