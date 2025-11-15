import React, { useContext, useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import { Button, Input } from 'react-daisyui';
import { AuthContext } from '../../context/auth/AuthContext';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoChatboxEllipses, IoSearchOutline } from 'react-icons/io5';
import { FaBell, FaGift } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import NavigationBtnAdmin from './NavigationBtnAdmin';

type NavbarAdminDesktopProps = {
  onSearch?: (keyword: string) => void;
};

const NavbarAdminDesktop: React.FC<NavbarAdminDesktopProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const { logoutUser } = useContext(AuthContext);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Lấy dữ liệu từ localStorage khi load trang
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchKeyword');
    if (savedSearch) {
      setSearchInput(savedSearch);
    }
  }, []);

  // Hàm handleSearch: lưu vào localStorage + callback onSearch
  const handleSearch = () => {
    localStorage.setItem('searchKeyword', searchInput);
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="hidden w-full items-center justify-between xl:flex">
        {/* Search Input */}
        <div className="relative mr-4 flex items-center">
          <Input
            autoFocus
            className="min-w-[400px] bg-white text-black placeholder-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && onSearch) {
                handleSearch();
              }
            }}
          />
          <div className="absolute right-2 h-5 w-5 cursor-pointer text-black">
            <button type="submit" onClick={handleSearch}>
              <IoSearchOutline />
            </button>
          </div>
        </div>

        <div className="flex h-full items-center">
          <nav>
            <div className="mx-5 space-x-4">
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
            </div>
          </nav>
          <div
            className="relative z-[99999] ml-4 flex cursor-pointer items-center justify-center gap-2"
            onClick={handleAvatarClick}
          >
            <div className="text-black dark:text-white">
              Xin chào,&nbsp;
              <span className="font-semibold text-red-500">Admin</span>
            </div>
            <Avatar className="h-10 w-10" />
            <div>
              {dropdownVisible && (
                <div className="absolute right-0 top-10 flex flex-col gap-1 border bg-white p-1 text-white">
                  <Button
                    onClick={logoutUser}
                    size="sm"
                    className="rounded-none bg-red-600 font-light shadow-none hover:bg-white hover:text-red-600"
                  >
                    <MdLogout />
                    Đăng Xuất
                  </Button>
                  <div className="flex flex-col gap-1 text-black">
                    <Link
                      className="border border-primary bg-primary p-1 text-sm font-light text-white hover:bg-white hover:text-primary"
                      to="/cms/admin"
                    >
                      Dashboard
                    </Link>
                    <Link
                      className="border border-primary bg-primary p-1 text-sm font-light text-white hover:bg-white hover:text-primary"
                      to="/cms/admin-post"
                    >
                      Post Managerment
                    </Link>
                    <Link
                      className="border border-primary bg-primary p-1 text-sm font-light text-white hover:bg-white hover:text-primary"
                      to="/cms/admin-gallery"
                    >
                      Gallery Managerment
                    </Link>
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

export default NavbarAdminDesktop;
