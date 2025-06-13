import React, { memo, useContext, useEffect, useState } from 'react';
import { Button, Input, Menu } from 'react-daisyui';
import { FaChevronDown } from 'react-icons/fa';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/images';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { IoLogoFacebook, IoSearch } from 'react-icons/io5';
import { RiExternalLinkFill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { HiPhoneArrowUpRight } from 'react-icons/hi2';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';
import { TbPigMoney } from 'react-icons/tb';
import { GiRibbonMedal } from 'react-icons/gi';
import menuItems from '../utils/menuItems';
import { handleSearch } from '../utils/searchUtils';
import { slugify } from '../utils/slugify';

const items = [
  {
    icon: <RiArrowLeftRightFill />,
    text: (
      <>
        <p className="font-bold">Thu cũ</p> đổi mới{' '}
        <p className="font-bold">lên tới 90%</p>
      </>
    )
  },
  {
    icon: <GiRibbonMedal />,
    text: (
      <>
        Sản phẩm <p className="font-bold">Chính hãng</p>
      </>
    )
  },
  {
    icon: <TbPigMoney />,
    text: (
      <>
        Hỗ trợ <p className="font-bold">Trả góp</p>
      </>
    )
  }
];
const Header: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const navigate = useNavigate();
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IPhoneCatalog[]>([]);
  // Translation
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  // SubMenu
  const handleMouseEnter = (name: string) => {
    setOpenSubmenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };
  // Naviga Active
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();
  //
  // const [showMenu, setShowMenu] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  //
  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(
      item =>
        item.link === pathname ||
        item.submenu?.some(sub => sub.link === pathname)
    );
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);
  //
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrollY && currentScrollY > 50) {
  //       setShowMenu(false);
  //     } else {
  //       setShowMenu(true);
  //     }
  //     setLastScrollY(currentScrollY);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

  return (
    <div className="fixed z-[99999] hidden w-full flex-col xl:block">
      {/* Benefits */}
      <div className="h-[30px] bg-[#FFC107] text-black xl:px-desktop-padding">
        <div className="flex h-full w-full flex-row items-center justify-around">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-1 font-light"
            >
              {React.cloneElement(item.icon, {
                className: 'text-xl text-black'
              })}
              <>{item.text}</>
            </div>
          ))}
        </div>
      </div>
      {/* */}
      <div
        // className={`flex h-[40px] w-full transform flex-row items-center justify-between border-b bg-primary px-10 text-xs text-white transition-transform delay-100 duration-300 ease-in-out hover:text-white ${showMenu ? 'translate-y-0' : '-translate-y-full'}`}
        className={`flex h-[40px] w-full transform flex-row items-center justify-between border-b bg-primary text-xs text-white transition-transform delay-100 duration-300 ease-in-out hover:text-white xl:px-desktop-padding`}
      >
        <div className="w-full">
          <div className="flex items-center">
            <Link
              to="https://maps.app.goo.gl/pmk3d7i2tmjc3pP8A"
              target="_blank"
              className="flex items-center gap-[1px]"
            >
              <HiLocationMarker />
              <p>136/11 Trần Quang Diệu, P.14, Q.3, TP.HCM</p>
              <sup>
                <RiExternalLinkFill className="text-xs" />
              </sup>
            </Link>
          </div>
        </div>
        {/* Input Search */}
        <div className="relative flex w-full flex-row items-center justify-center gap-1 rounded-full bg-white pl-2">
          <IoSearch className="text-xl text-primary" />
          <Input
            size="sm"
            value={searchQuery}
            onChange={e =>
              handleSearch(
                e.target.value,
                phoneCatalogs,
                setSearchQuery,
                setSearchResults
              )
            }
            className="w-full border-none bg-transparent pl-1 text-sm text-black placeholder-primary shadow-none focus:placeholder-black focus:outline-none"
            placeholder="Bạn muốn tìm gì..."
          />
          {/* Search Result */}
          <div>
            {searchResults.length > 0 && (
              <div className="absolute left-0 top-[95px] z-[99999] max-h-[210px] w-full divide-y-[1px] divide-primary overflow-y-auto bg-white p-1 font-light text-black shadow scrollbar-hide">
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
                      className="flex h-[60px] cursor-pointer items-center justify-start gap-2 p-3 hover:bg-primary hover:bg-opacity-10"
                    >
                      <img
                        loading="lazy"
                        src={phoneCatalog.img}
                        className="h-10 w-10 object-cover"
                      />
                      <p>{phoneCatalog.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-5">
          {/*  */}
          <div className="flex items-center">
            <Link
              to="https://www.facebook.com/7teck.vn"
              target="_blank"
              className="flex items-center gap-[1px]"
            >
              <IoLogoFacebook className="text-xs" />
              Fanpage: &nbsp;
              <p>7Teck</p>
              <sup>
                <RiExternalLinkFill className="text-xs" />
              </sup>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="tel:0983699993"
              className="flex items-center gap-[1px] font-light"
            >
              <HiPhoneArrowUpRight className="text-xs" /> (+84) 983.699.993
            </Link>
          </div>
        </div>
      </div>
      {/* Menu */}
      <header
        // className={`h-[60px] w-full transform flex-row items-center justify-evenly bg-white py-2 shadow-md transition-transform delay-100 duration-300 ease-in-out xl:flex ${showMenu ? 'translate-y-0' : '-translate-y-[40px]'}`}
        className={`h-[60px] w-full transform flex-row items-center justify-between bg-white py-2 shadow-md transition-transform delay-100 duration-300 ease-in-out xl:flex xl:px-desktop-padding`}
      >
        <nav className="h-full">
          <Link
            aria-label="Home"
            to="/"
            onClick={() => setActiveItem('Trang Chủ')}
          >
            <img
              className="h-full w-full rounded-full object-contain filter"
              loading="lazy"
              src={Logo}
              alt="LOGO"
            />
          </Link>
        </nav>
        <Menu className="flex flex-row items-center justify-center gap-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Menu.Item
                key={item.name}
                className="group relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={item.link || window.location}
                  className={`btn relative flex w-full items-center justify-center gap-1 rounded-none border-none ${
                    item.name === activeItem
                      ? 'bg-primary bg-opacity-20 text-sm font-bold text-primary'
                      : 'border-none bg-transparent text-sm font-light text-primary shadow-none hover:scale-110 hover:border hover:border-primary hover:bg-gray-50 hover:bg-opacity-30'
                  }`}
                >
                  <>
                    {item.name === activeItem && (
                      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
                    )}
                    {Icon && (
                      <Icon
                        className={
                          item.name === activeItem
                            ? 'h-5 w-5 text-primary'
                            : 'h-5 w-5'
                        }
                      />
                    )}
                    <span className={Icon ? '' : ''}>{item.name}</span>
                    {item.submenu && (
                      <FaChevronDown
                        className={`m-0 h-4 w-4 p-0 ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </>
                </NavLink>
                {/* SubMenu */}
                {item.submenu && (
                  <Menu className="absolute top-full m-0 hidden w-[260px] transform flex-col gap-2 rounded-sm bg-white bg-opacity-90 p-1 shadow-mainMenu transition-transform duration-300 ease-in-out group-hover:flex">
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.link}
                        className="flex flex-row gap-0"
                      >
                        <Button
                          size="sm"
                          className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm font-light text-white shadow-headerMenu hover:h-[50px] hover:bg-primary hover:bg-opacity-50"
                        >
                          {subItem.icon && <subItem.icon />}
                          {subItem.name}
                        </Button>
                      </Link>
                    ))}
                  </Menu>
                )}
              </Menu.Item>
            );
          })}
        </Menu>
        <div className="flex items-center justify-center gap-5">
          {/* DarkMode Button */}
          {/* <DarkMode /> */}
        </div>
      </header>
    </div>
  );
};

export default memo(Header);
