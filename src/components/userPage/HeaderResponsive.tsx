import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Drawer, Input, Menu } from 'react-daisyui';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaChevronDown } from 'react-icons/fa';
import { Logo } from '../../assets/images';
import { SlClose } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import menuItems from '../utils/menuItems';
import { handleSearch } from '../utils/searchUtils';
import { slugify } from '../utils/slugify';

interface HeaderResponsiveProps {
  Title_NavbarMobile: ReactNode;
}
const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({ Title_NavbarMobile }) => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const navigate = useNavigate();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [rightVisible, setRightVisible] = useState(false);
  // SearchToggle Input
  const [openSearch, setOpenSearch] = useState(false);
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IPhoneCatalog[]>([]);

  // Naviga Active
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();
  //
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  //
  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(
      item => item.link === pathname || item.submenu?.some(sub => sub.link === pathname)
    );
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname]);
  //
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  const toggleRightVisible = () => setRightVisible(prev => !prev);
  // Search Input
  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <div className="fixed z-[99999] block w-full bg-gradient-to-b from-white to-primary xl:hidden">
      <header
        className={`fixed h-[60px] w-full bg-gradient-to-r from-primary via-primary to-primary px-2 transition-all delay-200 duration-300 ease-in-out ${showMenu ? 'top-0' : 'top-0'}`}
      >
        <div className="flex flex-row items-center justify-between">
          <Link aria-label="Trang chủ" to="/">
            <FaHome className="text-2xl text-white" />
          </Link>
          <p className="font-semibold text-white">{Title_NavbarMobile}</p>
          {/* Search Toggle*/}
          <div className="absolute right-[50px]">
            <div className="relative" onClick={handleSearchToggle}>
              <IoSearch className="animate-bounce text-xl text-white" />
              <div>
                {openSearch && (
                  <div className="absolute -right-[50px] top-10 h-screen w-screen bg-black bg-opacity-50">
                    <Input
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value, phoneCatalogs, setSearchQuery, setSearchResults)}
                      type="text"
                      className="w-screen animate-exfadeIn rounded-none border-none text-black placeholder-primary focus:outline-none"
                      autoFocus
                      placeholder="Bạn muốn tìm gì..."
                    />
                  </div>
                )}
              </div>
              {/* Search Result */}
              <div>
                {openSearch && searchResults.length > 0 && (
                  <div className="absolute -right-[50px] top-[85px] z-[99999] max-h-[330px] w-screen divide-y-[1px] divide-gray-50 overflow-y-auto px-2 font-light text-black scrollbar-hide">
                    {searchResults.map((phoneCatalog, index) => {
                      const phoneUrl = slugify(phoneCatalog.name);
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            navigate(`/dien-thoai/${phoneUrl}`);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="flex h-[60px] cursor-pointer items-center justify-start gap-2 bg-white p-3 hover:bg-primary hover:bg-opacity-10"
                        >
                          <img loading="lazy" src={phoneCatalog.img} className="h-10 w-10 object-cover" />
                          <p>{phoneCatalog.name}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* RightVisible */}
          <div className="z-50">
            <Drawer
              open={rightVisible}
              onClickOverlay={toggleRightVisible}
              aria-hidden={!rightVisible}
              tabIndex={rightVisible ? 0 : -1}
              side={
                <Menu role="menu" className="fixed h-full w-2/3 bg-white">
                  {/* LOGO */}
                  <Link aria-label="Trang chủ" to="/" onClick={() => setActiveItem('Trang Chủ')}>
                    <img className="h-full w-[80px]" loading="lazy" src={Logo} alt="LOGO" />
                  </Link>
                  {/* Menu */}
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="relative"
                        onClick={() => item.submenu && handleMenuClick(item.name)}
                      >
                        <Menu.Item role="menuitem" className="group relative">
                          <NavLink
                            to={item.link}
                            className={`btn relative mt-2 flex w-full flex-row items-center justify-start rounded-none border-none ${
                              item.name === activeItem
                                ? 'bg-primary bg-opacity-30 text-sm font-bold text-primary'
                                : 'border-none bg-primary bg-opacity-10 text-sm font-light text-black shadow-headerMenu'
                            } `}
                          >
                            <>
                              {item.name === activeItem && (
                                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
                              )}
                              {Icon && (
                                <div className={item.name === activeItem ? 'text-xl text-primary' : ''}>
                                  <Icon />
                                </div>
                              )}
                              <span className={Icon ? '' : ''}>{item.name}</span>
                              {item.submenu && (
                                <div className={` ${openSubmenu === item.name ? 'rotate-180' : ''}`}>
                                  <FaChevronDown />
                                </div>
                              )}
                            </>
                          </NavLink>
                        </Menu.Item>
                        {/* SubMenu */}
                        {item.submenu && openSubmenu === item.name && (
                          <div className="relative w-full transform space-y-2 rounded-sm bg-white p-1 shadow-md transition-transform duration-300 ease-in-out">
                            {item.submenu.map((subItem, index) => (
                              <Link key={index} to={subItem.link} className="block">
                                <Button
                                  size="sm"
                                  className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm font-light text-white shadow-headerMenu hover:bg-primary/80"
                                >
                                  {subItem.icon && <subItem.icon />}
                                  {subItem.name}
                                </Button>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Menu>
              }
            >
              {/*  */}
              <button
                aria-expanded={rightVisible}
                aria-controls="drawer-menu"
                onClick={toggleRightVisible}
                className="flex flex-row items-center justify-center gap-2 py-4 text-2xl xl:hidden"
              >
                <div
                  className={`transform rounded-md text-[25px] text-white transition-transform duration-300 ease-in-out ${
                    rightVisible ? 'rotate-180 animate-ping' : 'rotate-0'
                  }`}
                >
                  <p>{rightVisible ? <SlClose /> : <RxHamburgerMenu />}</p>
                </div>
              </button>
            </Drawer>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderResponsive;
