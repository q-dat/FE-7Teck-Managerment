import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'react-daisyui';
import { FaChevronDown, FaHome, FaMagic } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import DarkMode from '../orther/darkmode/DarkMode';
import { Logo } from '../../assets/images';
import { RiPagesLine } from 'react-icons/ri';
import { IoLogoFacebook } from 'react-icons/io5';
import { RiExternalLinkFill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}

const Header: React.FC = () => {
  // Translation
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
      name: 'Trang Chủ',
      icon: FaHome,
      link: '/'
    },
    {
      name: 'IPhone',
      link: '/phone-list'
    },
    {
      name: 'Ipad',
      link: '/ipad-list'
    },
    {
      name: 'Window',
      link: '/window-list'
    },
    {
      name: 'Macbook',
      link: '/macbook-list'
    },
    {
      name: 'Bảng Giá Thu Mua',
      link: '/price-list'
    },
    {
      name: 'Tin tức',
      link: 'news',
      submenu: [
        {
          name: 'Bản tin nổi bật',
          icon: RiPagesLine,
          link: '/news'
        },
        {
          name: 'Thủ thuật - Mẹo',
          icon: FaMagic,
          link: '/tips-and-tricks'
        }
      ]
    },
    {
      name: 'Liên Hệ',
      link: '/contact'
    }
  ];

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

  return (
    <div>
      {/* Desktop */}
      <div className="fixed z-[99999] hidden w-full flex-col xl:flex">
        <div
          className={`flex h-[30px] w-full transform flex-row items-center justify-end gap-5 border-b bg-primary px-10 text-xs text-white transition-transform delay-100 duration-300 ease-in-out dark:bg-black ${showMenu ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="flex flex-row items-center justify-center">
            <HiLocationMarker />
            <Link
              to="https://maps.app.goo.gl/pmk3d7i2tmjc3pP8A"
              target="_blank"
              className="flex items-start"
            >
              <p>136/11 Trần Quang Diệu, P.14, Q.3, TP.HCM</p>
              <RiExternalLinkFill className="text-xs" />
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center">
            <IoLogoFacebook />
            Fanpage: &nbsp;
            <Link
              to="https://www.facebook.com/7teck.vn"
              target="_blank"
              className="flex items-start"
            >
              <p>7Teck</p>
              <RiExternalLinkFill className="text-xs" />
            </Link>
          </div>
        </div>
        {/*  */}
        <div
          className={`h-[70px] w-full transform flex-row items-center justify-evenly bg-white py-2 uppercase shadow-md transition-transform delay-100 duration-300 ease-in-out dark:bg-black xl:flex ${showMenu ? 'translate-y-0' : '-translate-y-[30px]'}`}
        >
          <Link to="/">
            <img
              className="block object-cover dark:hidden"
              width={60}
              loading="lazy"
              src={Logo}
              alt="LOGO"
            />
            <img
              className="hidden rounded-full object-cover dark:block"
              width={60}
              loading="lazy"
              src={Logo}
              alt="LOGO"
            />
          </Link>
          <Menu className="flex flex-row items-center justify-center">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <Menu.Item
                  key={item.name}
                  className="group relative"
                  onMouseEnter={() =>
                    item.submenu && handleMouseEnter(item.name)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={item.link}
                    className={`btn relative flex w-full items-center justify-center rounded-none border-none pl-4 ${
                      item.name === activeItem
                        ? 'bg-primary bg-opacity-20 text-sm font-bold text-primary dark:bg-secondary dark:bg-opacity-40 dark:text-white'
                        : 'border-none bg-transparent text-sm font-light text-black shadow-none hover:border hover:border-primary hover:bg-gray-50 hover:bg-opacity-30 hover:text-primary dark:text-white'
                    }`}
                  >
                    <>
                      {item.name === activeItem && (
                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary dark:bg-white" />
                      )}
                      {Icon && (
                        <Icon
                          className={
                            item.name === activeItem
                              ? 'h-5 w-5 text-primary dark:text-white'
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
                            className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm text-white shadow-headerMenu hover:h-[50px] hover:bg-primary hover:bg-opacity-50 dark:hover:bg-opacity-80"
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
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
