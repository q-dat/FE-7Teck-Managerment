import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Menu } from 'react-daisyui';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSettingsSharp } from 'react-icons/io5';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaChevronDown, FaMagic } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import DarkMode from '../orther/darkmode/DarkMode';
import { Logo } from '../../assets/images';
import { RiPagesLine } from 'react-icons/ri';

interface HeaderResponsiveProps {
  Title_NavbarMobile: ReactNode;
}
interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}

const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({
  Title_NavbarMobile
}) => {
  const [leftVisible, setLeftVisible] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [rightVisible, setRightVisible] = useState(false);

  // Naviga Active
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      name: 'Trang Chủ',
      icon: FaHome,
      link: '/'
    },
    {
      name: 'Điện Thoại',
      link: '/phone-list'
    },
    {
      name: 'Bảng Giá Thu Mua',
      link: '/price-list'
    },
    {
      name: 'Tin tức',
      link: '',
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

  const handleMenuClick = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  const toggleLeftVisible = useCallback(() => {
    setLeftVisible(visible => !visible);
  }, []);

  const toggleRightVisible = useCallback(() => {
    setRightVisible(visible => !visible);
  }, []);

  return (
    <div className="flex flex-col px-2 xl:hidden xl:px-0">
      <div className="flex items-center justify-between">
        <div className="z-50">
          <Drawer
            open={leftVisible}
            onClickOverlay={toggleLeftVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white dark:bg-gray-800">
                {/* LOGO */}
                <div className="flex items-center justify-center">
                  <img
                    className="-mb-0.5 rounded-full object-cover"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                {/* Menu */}
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="relative">
                      <Menu.Item
                        className="group relative"
                        onClick={() =>
                          item.submenu && handleMenuClick(item.name)
                        }
                      >
                        <NavLink
                          to={item.link}
                          className={`btn relative mt-2 flex w-full flex-row items-center justify-between rounded-none border-none pl-4 pr-3 ${
                            item.name === activeItem
                              ? 'bg-primary bg-opacity-30 text-sm font-bold text-primary dark:bg-opacity-50 dark:text-white'
                              : 'border-none bg-primary bg-opacity-10 text-sm font-light text-black shadow-headerMenu dark:text-white'
                          } `}
                        >
                          <>
                            {item.name === activeItem && (
                              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary dark:bg-white" />
                            )}
                            {Icon && (
                              <div
                                className={
                                  item.name === activeItem
                                    ? 'h-5 w-5 text-primary dark:text-white'
                                    : 'h-5 w-5'
                                }
                              >
                                <Icon />
                              </div>
                            )}
                            <span className={Icon ? '' : ''}>{item.name}</span>
                            {item.submenu && (
                              <div
                                className={`ml-2 h-4 w-4 ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                              >
                                <FaChevronDown />
                              </div>
                            )}
                          </>
                        </NavLink>
                      </Menu.Item>
                      {/* SubMenu */}
                      {item.submenu && openSubmenu === item.name && (
                        <div className="relative w-full space-y-2 rounded-sm bg-white p-4 shadow-md dark:bg-gray-700 dark:bg-opacity-80">
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.link}
                              className="block"
                            >
                              <Button
                                size="sm"
                                className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm uppercase text-white shadow-headerMenu"
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
            <div
              onClick={toggleLeftVisible}
              className="flex flex-row items-center justify-center gap-2 py-4 text-2xl text-black dark:text-white xl:hidden"
            >
              <div className="rounded-md p-1 text-[25px] text-primary">
                <RxHamburgerMenu />
              </div>
            </div>
          </Drawer>
        </div>
        {/* Title */}
        <p className="text-base font-bold uppercase text-primary">
          {Title_NavbarMobile}
        </p>
        {/* RightVisible */}
        <div className="z-50">
          <Drawer
            open={rightVisible}
            onClickOverlay={toggleRightVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white dark:bg-gray-800">
                {/* LOGO */}
                <div className="flex items-center justify-center">
                  <img
                    className="mb-5 rounded-full object-cover"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                <div className="w-full space-y-5">
                  <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 p-2">
                    <p className="text-lg font-light text-black dark:text-white">
                      Giao Diện
                    </p>
                    <DarkMode />
                  </div>
                </div>
              </Menu>
            }
          >
            <div
              onClick={toggleRightVisible}
              className="flex flex-row items-center justify-center gap-2 py-4 text-2xl text-black dark:text-white xl:hidden"
            >
              <div className="rounded-md p-1 text-[20px] text-primary">
                <IoSettingsSharp />
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      {/* Input Search */}
      {/* <div className="relative flex items-center">
        <Input
          className="w-full text-black focus:outline-none dark:border-white dark:bg-transparent dark:text-white"
          type="text"
        />
        <div className="absolute right-2 h-5 w-5 cursor-pointer text-gray-50">
          <IoSearchOutline />
        </div>
      </div> */}
    </div>
  );
};

export default HeaderResponsive;
