import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import NavbarAdmin from '../../components/admin/NavbarAdmin';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import { MacbookCatalogContext } from '../../context/macbook-catalog/MacbookCatalogContext';
import { MacbookContext } from '../../context/macbook/MacbookContext';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { PostCatalogContext } from '../../context/post-catalog/PostCatalogContext';
import { PostContext } from '../../context/post/PostContext';
import { TabletCatalogContext } from '../../context/tablet-catalog/TabletCatalogContext';
import { TabletContext } from '../../context/tablet/TabletContext';
import { WindowsCatalogContext } from '../../context/windows-catalog/WindowsCatalogContext';
import { WindowsContext } from '../../context/windows/WindowsContext';
import { PriceListContext } from '../../context/price-list/PriceListContext';
import { OptionPhoneContext } from '../../context/optionsData/OptionPhoneContext';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
const Admin: React.FC<{}> = () => {
  const { getAllGallerys } = useContext(GalleryContext);
  const { getAllMacbookCatalogs } = useContext(MacbookCatalogContext);
  const { getAllMacbook } = useContext(MacbookContext);
  const { getAllPhoneCatalogs } = useContext(PhoneCatalogContext);
  const { getAllPhones } = useContext(PhoneContext);
  const { getAllPostCatalogs } = useContext(PostCatalogContext);
  const { getAllPosts } = useContext(PostContext);
  const { getAllTabletCatalogs } = useContext(TabletCatalogContext);
  const { getAllTablets } = useContext(TabletContext);
  const { getAllWindowsCatalogs } = useContext(WindowsCatalogContext);
  const { getAllWindows } = useContext(WindowsContext);
  const { getAllPriceLists } = useContext(PriceListContext);
  const { getAllOptionPhones } = useContext(OptionPhoneContext);

  useEffect(() => {
    // Title Tag
    document.title = `Trang Quản Trị`;

    const initializeData = async () => {
      try {
        await Promise.all([
          getAllGallerys(),
          getAllMacbookCatalogs(),
          getAllMacbook(),
          getAllPhoneCatalogs(),
          getAllPhones(),
          getAllPostCatalogs(),
          getAllPosts(),
          getAllTabletCatalogs(),
          getAllTablets(),
          getAllWindowsCatalogs(),
          getAllWindows(),
          getAllPriceLists(),
          getAllOptionPhones()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F2F7] dark:bg-gray-900">
      <div className="flex flex-1">
        <div className="z-10 hidden xl:block">
          <SidebarAdmin />
        </div>
        <div className="flex-1 xl:p-6">
          <div className="xl:ml-64">
            {/* <div>
              <NavbarAdmin />
            </div> */}
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

export default Admin;
