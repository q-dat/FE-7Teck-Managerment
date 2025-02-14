import React, { useState, useEffect, useContext } from 'react';
import { Button, Menu } from 'react-daisyui';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import DarkModeToggle from '../orther/darkmode/DarkMode';
import { Logo } from '../../assets/images';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { FaList, FaWindows } from 'react-icons/fa6';
import { BsApple } from 'react-icons/bs';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { TabletContext } from '../../context/tablet/TabletContext';
import { TabletCatalogContext } from '../../context/tablet-catalog/TabletCatalogContext';
import { WindowsCatalogContext } from '../../context/windows-catalog/WindowsCatalogContext';
import { WindowsContext } from '../../context/windows/WindowsContext';
import { MacbookContext } from '../../context/macbook/MacbookContext';
import { MacbookCatalogContext } from '../../context/macbook-catalog/MacbookCatalogContext';
import OptionsData from './Modal/OptionsData/OptionsData';

const SidebarAdmin: React.FC<{}> = () => {
  const { countPhoneCatalog } = useContext(PhoneCatalogContext);
  const { countPhone } = useContext(PhoneContext);
  const { countTabletCatalog } = useContext(TabletCatalogContext);
  const { countTablet } = useContext(TabletContext);
  const { countWindowsCatalog } = useContext(WindowsCatalogContext);
  const { countWindows } = useContext(WindowsContext);
  const { countMacbookCatalog } = useContext(MacbookCatalogContext);
  const { countMacbook } = useContext(MacbookContext);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: FaHome,
      link: '/cms/admin'
    },
    {
      name: 'DM Điện Thoại',
      icon: FaList,
      link: '/cms/admin/phone-catalog-manager',
      toastify: countPhoneCatalog
    },
    {
      name: 'Điện Thoại',
      icon: FaMobileAlt,
      link: '/cms/admin/phone-manager',
      toastify: countPhone
    },
    {
      name: 'DM Máy Tính Bảng',
      icon: FaList,
      link: '/cms/admin/tablet-catalog-manager',
      toastify: countTabletCatalog
    },
    {
      name: ' Máy Tính Bảng',
      icon: FaTabletAlt,
      link: '/cms/admin/tablet-manager',
      toastify: countTablet
    },
    {
      name: 'DM Windows',
      icon: FaList,
      link: '/cms/admin/windows-catalog-manager',
      toastify: countWindowsCatalog
    },
    {
      name: 'Windows',
      icon: FaWindows,
      link: '/cms/admin/windows-manager',
      toastify: countWindows
    },
    {
      name: 'DM Macbook',
      icon: FaList,
      link: '/cms/admin/macbook-catalog-manager',
      toastify: countMacbookCatalog
    },
    {
      name: 'Macbook',
      icon: BsApple,
      link: '/cms/admin/macbook-manager',
      toastify: countMacbook
    }
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(item => pathname === item.link);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-10 bg-white dark:bg-gray-800 xl:fixed xl:h-full xl:w-64 xl:shadow-lg">
      <div className="w-full">
        {/*  */}
        <div className="mt-8 flex w-full items-center justify-between p-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                loading="lazy"
                width={60}
                height={60}
                src={Logo}
                className="rounded-full shadow-headerMenu shadow-primary dark:hidden"
                alt="7Teck ."
              />
              <img
                loading="lazy"
                width={60}
                height={60}
                src={Logo}
                className="hidden rounded-xl dark:block"
                alt="7Teck ."
              />
              <div className="">
                <p className="text-base font-bold text-primary dark:text-white">
                  7Teck
                </p>
                <p className="text-xs font-light dark:text-white">
                  Product Management
                </p>
              </div>
            </div>
          </Link>
          <div className="">
            <DarkModeToggle />
          </div>
        </div>
        {/*  */}
        <div className="relative flex w-full flex-col justify-between bg-white dark:bg-gray-800 dark:text-white">
          <div className="mt-2 h-[280px] overflow-y-scroll scrollbar-hide md:h-[500px]">
            <Menu className="m-0 w-full flex-grow p-0 xl:px-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Menu.Item key={item.name} className="relative">
                    <NavLink
                      to={item.link}
                      className={`btn flex w-full items-center justify-start border-none shadow-white dark:bg-gray-800 dark:shadow-none ${
                        item.name === activeItem
                          ? 'bg-base-200 font-bold text-primary dark:bg-white'
                          : 'bg-transparent bg-white font-light text-black dark:text-white'
                      } relative pl-4`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          {item.name === activeItem && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                          )}
                          <Icon
                            className={
                              item.name === activeItem
                                ? 'mr-2 h-5 w-5 text-primary'
                                : 'mr-2 h-5 w-5'
                            }
                          />
                          <div className="flex items-center justify-between gap-2">
                            <div className="">
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {item.toastify ? (
                            <div className="flex w-[22px] justify-center rounded-md bg-secondary py-1">
                              <p className="text-xs font-light text-white">
                                {item.toastify > 99 ? '99+' : item.toastify}
                              </p>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-primary p-4 text-center text-white">
          <p className="w-40 text-center text-xs">
            Chọn nút bên dưới để thêm options thông tin sản phẩm!
          </p>
          <Button
            onClick={openModalCreateAdmin}
            className="my-4 rounded-lg bg-white text-primary hover:bg-white"
          >
            +Thêm Options
          </Button>
        </div>
        <div className="py-4 text-xs text-black dark:text-white">
          <p className="font-bold">Quản trị 7Teck </p>
          <p className="font-light">© 2025 Điểu Quốc Đạt</p>
        </div>
      </div>
      <div>
        <OptionsData
          isOpen={isModalCreateOpen}
          onClose={closeModalCreateAdmin}
        />
      </div>
    </div>
  );
};

export default SidebarAdmin;
