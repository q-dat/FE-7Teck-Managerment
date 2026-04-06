import React, { useState, useEffect, useContext } from 'react';
import { Menu } from 'react-daisyui';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import DarkModeToggle from '../common/darkmode/DarkMode';
import { Logo } from '../../assets/images';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { FaWindows } from 'react-icons/fa6';
import { BsApple } from 'react-icons/bs';
import { TabletContext } from '../../context/tablet/TabletContext';
import { WindowsContext } from '../../context/windows/WindowsContext';
import { MacbookContext } from '../../context/macbook/MacbookContext';
import { LuFileJson } from 'react-icons/lu';
import { MdImageSearch } from 'react-icons/md';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';

type SidebarAdminProps = {
  collapsed?: boolean;
};

type MenuItem = {
  name: string;
  icon?: React.ElementType;
  link?: string;
  query?: Record<string, string>;
  toastify?: number;
  children?: MenuItem[];
};

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ collapsed = false }) => {
  const { countPhone } = useContext(PhoneContext);
  const { countTablet } = useContext(TabletContext);
  const { countWindows } = useContext(WindowsContext);
  const { countMacbook } = useContext(MacbookContext);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const location = useLocation();
  const { pathname, search } = location;

  // build url từ link + query
  const buildPath = (item: MenuItem): string => {
    if (!item.link) return '#';

    if (!item.query) return item.link;

    const params = new URLSearchParams(item.query).toString();
    return `${item.link}?${params}`;
  };

  // active cho item (strict)
  const isActiveRoute = (item: MenuItem): boolean => {
    if (!item.link) return false;

    if (pathname !== item.link) return false;

    const params = new URLSearchParams(search);

    if (!item.query) {
      return params.toString() === '';
    }

    return Object.entries(item.query).every(([key, value]) => params.get(key) === value);
  };

  // active cho parent (loose)
  const isParentActive = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => isActiveRoute(child));
  };
  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: FaHome,
      link: '/cms/admin'
    },
    {
      name: 'Điện Thoại',
      icon: FaMobileAlt,
      children: [
        {
          name: 'Tất Cả',
          link: '/cms/admin/phone-manager',
          toastify: countPhone
        },
        {
          name: 'New Seal',
          link: '/cms/admin/phone-manager',
          query: { status: '0' }
        },
        {
          name: 'Used',
          link: '/cms/admin/phone-manager',
          query: { status: '1' }
        }
      ]
    },
    {
      name: ' Máy Tính Bảng',
      icon: FaTabletAlt,
      children: [
        {
          name: 'Tất Cả',
          link: '/cms/admin/tablet-manager',
          toastify: countTablet
        },
        {
          name: 'New Seal',
          link: '/cms/admin/tablet-manager',
          query: { status: '0' }
        },
        {
          name: 'Used',
          link: '/cms/admin/tablet-manager',
          query: { status: '1' }
        }
      ]
    },
    {
      name: 'Macbook',
      icon: BsApple,
      children: [
        {
          name: 'Tất Cả',
          link: '/cms/admin/macbook-manager',
          toastify: countMacbook
        },
        {
          name: 'New Seal',
          link: '/cms/admin/macbook-manager',
          query: { status: '0' }
        },
        {
          name: 'Used',
          link: '/cms/admin/macbook-manager',
          query: { status: '1' }
        }
      ]
    },
    {
      name: 'Windows',
      icon: FaWindows,
      children: [
        {
          name: 'Tất Cả',
          link: '/cms/admin/windows-manager',
          toastify: countWindows
        },
        {
          name: 'New Seal',
          link: '/cms/admin/windows-manager',
          query: { status: '0' }
        },
        {
          name: 'Used',
          link: '/cms/admin/windows-manager',
          query: { status: '1' }
        }
      ]
    },
    {
      name: 'Json Preview (Phones)',
      icon: LuFileJson,
      link: '/cms/admin/json-preview'
    },
    {
      name: 'Image Collector',
      icon: MdImageSearch,
      link: '/cms/admin/image-collector'
    }
  ];

  // auto open menu theo route
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};

    menuItems.forEach(item => {
      if (item.children && isParentActive(item)) {
        newOpenMenus[item.name] = true;
      }
    });

    setOpenMenus(prev => ({ ...prev, ...newOpenMenus }));
  }, [pathname]);

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between gap-10 bg-white transition-all duration-300 dark:bg-gray-800 xl:fixed xl:h-full xl:shadow-lg ${
        collapsed ? 'xl:w-[80px]' : 'xl:w-64'
      }`}
    >
      <div className="w-full">
        <div className="mt-8 flex w-full items-center justify-between p-2">
          <Link to="/cms/admin">
            <div className="flex items-center gap-2">
              <img
                loading="lazy"
                width={60}
                height={60}
                src={Logo}
                className="rounded-full shadow-headerMenu shadow-primary dark:hidden"
                alt="7Teck"
              />
              <img
                loading="lazy"
                width={60}
                height={60}
                src={Logo}
                className="hidden rounded-xl dark:block"
                alt="7Teck"
              />
              {!collapsed && (
                <div>
                  <p className="text-base font-bold text-primary dark:text-white">7Teck</p>
                  <p className="text-xs font-light dark:text-white">Product Management</p>
                </div>
              )}
            </div>
          </Link>

          {!collapsed && <DarkModeToggle />}
        </div>

        <div className="mt-2 h-[70vh] overflow-y-scroll scrollbar-hide">
          <Menu className="m-0 w-full flex-grow p-0 xl:px-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isOpen = openMenus[item.name];

              if (item.children) {
                return (
                  <div key={item.name}>
                    <div
                      onClick={() => toggleMenu(item.name)}
                      className={`btn flex w-full items-center justify-between border-none text-black shadow-none dark:text-white ${
                        collapsed ? 'justify-center px-2' : 'justify-start pl-4'
                      }`}
                    >
                      <div className="flex items-center">
                        {Icon && <Icon className="mr-2 h-5 w-5" />}
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed && (
                        <span>
                          {isOpen ? (
                            <IoIosArrowDropdownCircle className="text-lg" />
                          ) : (
                            <IoIosArrowDropupCircle className="text-lg" />
                          )}
                        </span>
                      )}
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                      {item.children.map(sub => {
                        const active = isActiveRoute(sub);

                        return (
                          <Menu.Item key={sub.name} className="ml-4">
                            <NavLink
                              to={buildPath(sub)}
                              className={`btn flex w-full items-center border-none shadow-none ${
                                active
                                  ? 'bg-base-200 font-bold text-primary dark:bg-white/20 dark:text-white'
                                  : 'bg-transparent font-light text-black dark:text-white'
                              } ${collapsed ? 'justify-center px-2' : 'justify-start pl-4'}`}
                            >
                              <div className="flex w-full items-center justify-between">
                                <span>{!collapsed && sub.name}</span>

                                {sub.toastify && sub.toastify > 0 && (
                                  <div className="flex w-fit justify-center rounded-md bg-secondary p-1 min-w-5">
                                    <p className="text-xs font-light text-white">
                                      {sub.toastify > 999 ? '999+' : sub.toastify}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </NavLink>
                          </Menu.Item>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const active = isActiveRoute(item);

              return (
                <Menu.Item key={item.name} className="relative">
                  <NavLink
                    to={buildPath(item)}
                    className={`btn flex w-full items-center border-none shadow-none dark:bg-gray-800 ${
                      active
                        ? 'bg-base-200 font-bold text-primary dark:bg-white'
                        : 'bg-transparent font-light text-black dark:text-white'
                    } ${collapsed ? 'justify-center px-2' : 'justify-start pl-4'}`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        {active && <div className="absolute left-0 top-0 h-full w-1 bg-primary" />}
                        {Icon && <Icon className={active ? 'mr-2 h-5 w-5 text-primary' : 'mr-2 h-5 w-5'} />}
                        {!collapsed && <p>{item.name}</p>}
                      </div>

                      {item.toastify && item.toastify > 0 && (
                        <div className="flex w-fit justify-center rounded-md bg-secondary p-1 min-w-5">
                          <p className="text-xs font-light text-white">
                            {item.toastify > 999 ? '999+' : item.toastify}
                          </p>
                        </div>
                      )}
                    </div>
                  </NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </div>

      {!collapsed && (
        <div className="py-4 text-xs text-black dark:text-white">
          <p className="font-bold">
            Quản trị <span className="text-primary">7Teck</span>
          </p>
          <p className="font-light">© 2026 Điểu Quốc Đạt</p>
        </div>
      )}
    </div>
  );
};

export default SidebarAdmin;
