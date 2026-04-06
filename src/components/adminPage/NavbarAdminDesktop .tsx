import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Avatar from 'boring-avatars';
import { Button, Input } from 'react-daisyui';
import { AuthContext } from '../../context/auth/AuthContext';
import { MdLogout } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { IoChatboxEllipses, IoSearchOutline } from 'react-icons/io5';
import { FaBell, FaGift } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import NavigationBtnAdmin from './NavigationBtnAdmin';
import { MacbookContext } from '../../context/macbook/MacbookContext';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { TabletContext } from '../../context/tablet/TabletContext';
import { WindowsContext } from '../../context/windows/WindowsContext';

const NavbarAdminDesktop: React.FC = () => {
  const { phones } = useContext(PhoneContext);
  const { tablets } = useContext(TabletContext);
  const { windows } = useContext(WindowsContext);
  const { macbook } = useContext(MacbookContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get('q') ?? '');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchPopupVisible, setSearchPopupVisible] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { logoutUser } = useContext(AuthContext);

  const searchSuggestions = useMemo(() => {
    const phoneNames = phones?.map(p => p.name) ?? [];
    const tabletNames = tablets?.map(t => t.tablet_name) ?? [];
    const windowNames = windows?.map(w => w.windows_name) ?? [];
    const macbookNames = macbook?.map(m => m.macbook_name) ?? [];

    const merged = [...phoneNames, ...tabletNames, ...windowNames, ...macbookNames];

    // remove duplicate + limit size (tránh lag UI)
    return Array.from(new Set(merged)).slice(0, 200);
  }, [phones, tablets, windows, macbook]);

  const handleAvatarClick = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleSearch = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      searchParams.delete('q');
      setSearchParams(searchParams);
      setSearchPopupVisible(false);
      return;
    }

    setSearchParams(prev => {
      prev.set('q', trimmedValue);
      return prev;
    });

    setSearchPopupVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);

      // Mở popup search bằng phím F
      if (event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping) {
        event.preventDefault();
        setSearchPopupVisible(true);
      }

      // Đóng popup bằng ESC
      if (event.key === 'Escape') {
        setSearchPopupVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchPopupVisible) return;

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [searchPopupVisible]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="hidden w-full items-center justify-between xl:flex">
          {/* Search Input */}
          <div className="relative mr-4 flex items-center">
            <Input
              // autoFocus
              className="min-w-[400px] bg-white text-black placeholder-black focus:outline-none"
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="Bấm F để tìm kiếm nhanh..."
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

              {dropdownVisible && (
                <div className="absolute right-0 top-10 flex flex-col gap-1 border bg-white p-1 text-white shadow-xl">
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

      {searchPopupVisible && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-base-300 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">Search</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Nhấn Enter để tìm kiếm, ESC để đóng 🚀</p>
              </div>

              <button
                type="button"
                onClick={() => setSearchPopupVisible(false)}
                className="rounded-xl px-3 py-2 text-sm text-gray-500 transition hover:bg-base-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="relative">
              <Input
                ref={searchInputRef}
                list="admin-search-suggestions"
                className="h-14 w-full rounded-2xl border-none bg-base-200 pr-14 text-base text-black shadow-none focus:outline-none dark:bg-gray-700 dark:text-white"
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="Từ khóa tìm kiếm..."
              />

              <datalist id="admin-search-suggestions">
                {searchSuggestions.map(item => (
                  <option key={item} value={item} />
                ))}
              </datalist>

              <button
                type="button"
                onClick={handleSearch}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-white transition hover:scale-105"
              >
                <IoSearchOutline className="text-lg" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {searchSuggestions.slice(0, 6).map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setValue(item);
                    searchInputRef.current?.focus();
                  }}
                  className="rounded-full bg-base-200 px-3 py-2 text-sm text-black transition hover:bg-primary hover:text-white dark:bg-gray-700 dark:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarAdminDesktop;
