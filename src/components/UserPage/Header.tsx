import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Menu } from 'react-daisyui';
import { FaChevronDown, FaMagic } from 'react-icons/fa';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { Logo } from '../../assets/images';
import { RiPagesLine } from 'react-icons/ri';
import { IoLogoFacebook, IoSearch } from 'react-icons/io5';
import { RiExternalLinkFill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { FaWindows } from 'react-icons/fa';
import { RiMacbookFill } from 'react-icons/ri';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}

const Header: React.FC = () => {
  const { phoneCatalogs } = useContext(PhoneCatalogContext);
  const navigate = useNavigate();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
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
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems: MenuItem[] = [
    {
      name: 'Thiết bị đã qua sử dụng',
      link: '/thiet-bi-da-qua-su-dung'
    },
    {
      name: 'iPhone',
      link: '/iphone'
    },
    {
      name: 'iPad',
      link: '/ipad'
    },
    {
      name: 'Laptop',
      link: '/window',
      submenu: [
        {
          icon: FaWindows,
          name: 'Window',
          link: '/window'
        },
        {
          icon: RiMacbookFill,
          name: 'Macbook',
          link: '/macbook'
        }
      ]
    },
    {
      name: 'Bảng Giá Thu Mua',
      link: '/bang-gia-thu-mua'
    },
    {
      name: 'Tin tức',
      link: '/tin-tuc-moi-nhat',
      submenu: [
        {
          name: 'Tin tức nổi bật',
          icon: RiPagesLine,
          link: '/tin-tuc-moi-nhat'
        },
        {
          name: 'Thủ thuật - Mẹo',
          icon: FaMagic,
          link: '/thu-thuat-meo'
        }
      ]
    },
    {
      name: 'Hành trình',
      link: '/hanh-trinh'
    },
    {
      name: 'Chính sách bảo hành',
      link: '/chinh-sach-bao-hanh'
    }
  ];
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
  }, [lastScrollY]);

  //
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    const phoneCatalogResults = phoneCatalogs.filter(phoneCatalog =>
      phoneCatalog.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(phoneCatalogResults);
  };
  return (
    <div className="fixed z-[99999] hidden w-full flex-col xl:block">
      {/* Menu 1 */}
      <div
        className={`flex h-[40px] w-full transform flex-row items-center justify-between border-b bg-primary px-10 text-xs text-white transition-transform delay-100 duration-300 ease-in-out ${showMenu ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="w-full"></div>
        {/* Input Search */}
        <div className="relative flex w-full flex-row items-center justify-center gap-1 rounded-md bg-white pl-2">
          <IoSearch className="text-xl text-primary" />
          <Input
            size="sm"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
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
                        navigate(`/iphone/${phoneUrl}`);
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
          <div className="flex items-center">
            <HiLocationMarker />
            <Link
              to="https://maps.app.goo.gl/pmk3d7i2tmjc3pP8A"
              target="_blank"
              className="flex items-start gap-[1px]"
            >
              <p>136/11 Trần Quang Diệu, P.14, Q.3, TP.HCM</p>
              <RiExternalLinkFill className="text-xs" />
            </Link>
          </div>
          <div className="flex items-center">
            <IoLogoFacebook />
            Fanpage: &nbsp;
            <Link
              to="https://www.facebook.com/7teck.vn"
              target="_blank"
              className="flex items-start gap-[1px]"
            >
              <p>7Teck</p>
              <RiExternalLinkFill className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className={`h-[60px] w-full transform flex-row items-center justify-evenly bg-white py-2 shadow-md transition-transform delay-100 duration-300 ease-in-out xl:flex ${showMenu ? 'translate-y-0' : '-translate-y-[40px]'}`}
      >
        <div>
          <Link to="/" onClick={() => setActiveItem('Trang Chủ')}>
            <img
              className="rounded-full object-cover"
              loading="lazy"
              width={60}
              src={Logo}
              alt="LOGO"
            />
          </Link>
        </div>
        <Menu className="flex flex-row items-center justify-center">
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
                  to={item.link}
                  className={`btn relative flex w-full items-center justify-center rounded-none border-none pl-4 ${
                    item.name === activeItem
                      ? 'bg-primary bg-opacity-20 text-sm font-bold text-primary'
                      : 'border-none bg-transparent text-sm font-light text-black shadow-none hover:border hover:border-primary hover:bg-gray-50 hover:bg-opacity-30 hover:text-primary'
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
                          className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm text-white shadow-headerMenu hover:h-[50px] hover:bg-primary hover:bg-opacity-50"
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
      </div>
    </div>
  );
};

export default Header;
