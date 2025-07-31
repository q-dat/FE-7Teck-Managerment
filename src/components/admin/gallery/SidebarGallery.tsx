import React, { useState, useEffect, useContext } from 'react';
import { Menu } from 'react-daisyui';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import DarkModeToggle from '../../orther/darkmode/DarkMode';
import { GalleryContext } from '../../../context/gallery/GalleryContext';
import { GrGallery } from 'react-icons/gr';

const SidebarGallery: React.FC<{}> = () => {
  const { countGallery } = useContext(GalleryContext);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const location = useLocation();

  const menuItems = [
    {
      name: 'Quản lý Gallery',
      icon: GrGallery,
      link: '/cms/admin-gallery/gallery-manager',
      toastify: countGallery
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
                <p className="text-base font-bold text-primary dark:text-white">7Teck</p>
                <p className="text-xs font-light dark:text-white">Product Management</p>
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
                          {item.name === activeItem && <div className="absolute left-0 top-0 h-full w-1 bg-primary" />}
                          <Icon className={item.name === activeItem ? 'mr-2 h-5 w-5 text-primary' : 'mr-2 h-5 w-5'} />
                          <div className="flex items-center justify-between gap-2">
                            <div className="">
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {item.toastify && item.toastify > 0 ? (
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
        <div className="py-4 text-xs text-black dark:text-white">
          <p className="font-bold">Quản trị 7Teck </p>
          <p className="font-light">© 2025 Điểu Quốc Đạt</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarGallery;
