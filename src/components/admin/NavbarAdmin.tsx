import React, { useContext, useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import { Button } from 'react-daisyui';
import { AuthContext } from '../../context/auth/AuthContext';
import { MdLogout } from 'react-icons/md';
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
import { Link } from 'react-router-dom';

const NavbarAdmin: React.FC<{}> = () => {
  const { logoutUser } = useContext(AuthContext);
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

  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
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
  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="hidden w-full items-center justify-between xl:flex">
        {/* Search Input */}
        <div className="relative mr-4 flex items-center">
          {/* <Input
            className="min-w-[400px] bg-white text-black placeholder-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <div className="absolute right-2 h-5 w-5 cursor-pointer text-black">
            <IoSearchOutline />
          </div> */}
        </div>

        <div className="flex h-full items-center">
          <nav>
            {/* <div className="mx-5 space-x-4">
              <NavigationBtnAdmin
                badgeNumber={1}
                Icons={<FaBell />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={2}
                Icons={<IoChatboxEllipses />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={3}
                Icons={<FaGift />}
                style=" bg-[#5E6C9326] text-[#5E6C93]"
                bg_span="bg-[#5E6C93]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={4}
                Icons={<FaGear />}
                style=" bg-[#FF5B5B26] text-[#FF5B5B]"
                bg_span="bg-[#FF5B5B]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div> */}
          </nav>
          <div
            className="relative ml-4 flex cursor-pointer items-center justify-center gap-2 z-[99999]"
            onClick={handleAvatarClick}
          >
            <div className="text-black dark:text-white">
              Xin chào,&nbsp;
              <span className="font-semibold text-red-500">Admin</span>
            </div>
            <Avatar className="h-10 w-10" />
            <div>
              {dropdownVisible && (
                <div className="absolute right-0 top-10 flex flex-col bg-white p-1 text-white border gap-1">
                  <Button
                    onClick={logoutUser}
                    size="sm"
                    className="rounded-none bg-red-600 font-light shadow-none hover:bg-white hover:text-red-600"
                  >
                    <MdLogout />
                    Đăng Xuất
                  </Button>
                  <div className='text-black flex flex-col gap-1 '>
                  <Link className='bg-primary text-white p-1 font-light text-sm hover:bg-white hover:text-primary border border-primary' to='/cms/admin'>Dashboard</Link>
                  <Link className='bg-primary text-white p-1 font-light text-sm hover:bg-white hover:text-primary border border-primary'  to='/cms/admin-post'>Post Managerment</Link>
                  <Link  className='bg-primary text-white p-1 font-light text-sm hover:bg-white hover:text-primary border border-primary'  to='/cms/admin-gallery'>Gallery Managerment</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
