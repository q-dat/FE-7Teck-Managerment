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

// import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
// import { TabletCatalogContext } from '../../context/tablet-catalog/TabletCatalogContext';
// import { WindowsCatalogContext } from '../../context/windows-catalog/WindowsCatalogContext';
// import { MacbookCatalogContext } from '../../context/macbook-catalog/MacbookCatalogContext';
type SidebarAdminProps = {
  collapsed?: boolean;
};

type MenuItem = {
  name: string;
  icon?: React.ElementType;
  link?: string;
  toastify?: number;
  children?: MenuItem[];
};

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ collapsed = false }) => {
  //  const { countPhoneCatalog } = useContext(PhoneCatalogContext);
  //  const { countTabletCatalog } = useContext(TabletCatalogContext);
  //  const { countWindowsCatalog } = useContext(WindowsCatalogContext);
  //  const { countMacbookCatalog } = useContext(MacbookCatalogContext);
  const { countPhone } = useContext(PhoneContext);
  const { countTablet } = useContext(TabletContext);
  const { countWindows } = useContext(WindowsContext);
  const { countMacbook } = useContext(MacbookContext);

  const [activeItem, setActiveItem] = useState('Dashboard');
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const location = useLocation();

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
    // {
    //   name: 'DM Điện Thoại',
    //   icon: FaList,
    //   link: '/cms/admin/phone-catalog-manager',
    //   toastify: countPhoneCatalog
    // },
    {
      name: 'Điện Thoại',
      icon: FaMobileAlt,
      children: [
        {
          name: 'Danh Sách Điện Thoại',
          link: '/cms/admin/phone-manager',
          toastify: countPhone
        },
        {
          name: 'New Seal',
          link: '/cms/admin/phone-manager?status=0'
        },
        {
          name: 'Used',
          link: '/cms/admin/phone-manager?status=1'
        }
      ]
    },
    // {
    //   name: 'DM Máy Tính Bảng',
    //   icon: FaList,
    //   link: '/cms/admin/tablet-catalog-manager',
    //   toastify: countTabletCatalog
    // },
    {
      name: ' Máy Tính Bảng',
      icon: FaTabletAlt,
      link: '/cms/admin/tablet-manager',
      children: [
        {
          name: 'Danh Sách Máy Tính Bảng',
          link: '/cms/admin/tablet-manager',
          toastify: countTablet
        },
        {
          name: 'New Seal',
          link: '/cms/admin/tablet-manager?status=0'
        },
        {
          name: 'Used',
          link: '/cms/admin/tablet-manager?status=1'
        }
      ]
    },
    // {
    //   name: 'DM Macbook',
    //   icon: FaList,
    //   link: '/cms/admin/macbook-catalog-manager',
    //   toastify: countMacbookCatalog
    // },
    {
      name: 'Macbook',
      icon: BsApple,
      link: '/cms/admin/macbook-manager',
      children: [
        {
          name: 'Danh Sách Macbook',
          link: '/cms/admin/macbook-manager',
          toastify: countMacbook
        },
        {
          name: 'New Seal',
          link: '/cms/admin/macbook-manager?status=0'
        },
        {
          name: 'Used',
          link: '/cms/admin/macbook-manager?status=1'
        }
      ]
    },
    // {
    //   name: 'DM Windows',
    //   icon: FaList,
    //   link: '/cms/admin/windows-catalog-manager',
    //   toastify: countWindowsCatalog
    // },
    {
      name: 'Windows',
      icon: FaWindows,
      link: '/cms/admin/windows-manager',
      children: [
        {
          name: 'Danh Sách Windows',
          link: '/cms/admin/windows-manager',
          toastify: countWindows
        },
        {
          name: 'New Seal',
          link: '/cms/admin/windows-manager?status=0'
        },
        {
          name: 'Used',
          link: '/cms/admin/windows-manager?status=1'
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

  useEffect(() => {
    const pathname = location.pathname;

    const findActive = (items: MenuItem[]): string | null => {
      for (const item of items) {
        if (item.link === pathname) return item.name;
        if (item.children) {
          const found = item.children.find(child => child.link === pathname);
          if (found) return found.name;
        }
      }
      return null;
    };

    const active = findActive(menuItems);
    if (active) setActiveItem(active);
  }, [location.pathname]);

  useEffect(() => {
    const pathname = location.pathname;

    const findParent = (items: MenuItem[]): string | null => {
      for (const item of items) {
        if (item.children) {
          const found = item.children.find(child => child.link === pathname);
          if (found) return item.name;
        }
      }
      return null;
    };

    const parent = findParent(menuItems);
    if (parent) {
      setOpenMenus(prev => ({ ...prev, [parent]: true }));
    }
  }, [location.pathname]);

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
                      className={`btn flex w-full items-center justify-between border-none text-black shadow-none dark:bg-gray-800 dark:text-white ${
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
                      {item.children.map(sub => (
                        <Menu.Item key={sub.name} className="ml-4">
                          <NavLink
                            to={sub.link!}
                            className={`btn flex w-full items-center border-none shadow-none ${
                              sub.name === activeItem
                                ? 'bg-base-200 font-bold text-primary dark:bg-white'
                                : 'bg-transparent font-light text-black dark:text-white'
                            } ${collapsed ? 'justify-center px-2' : 'justify-start pl-4'}`}
                          >
                            {!collapsed && <span>{sub.name}</span>}
                          </NavLink>
                        </Menu.Item>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Menu.Item key={item.name} className="relative">
                  <NavLink
                    to={item.link!}
                    className={`btn flex w-full items-center border-none shadow-none dark:bg-gray-800 ${
                      item.name === activeItem
                        ? 'bg-base-200 font-bold text-primary dark:bg-white'
                        : 'bg-transparent font-light text-black dark:text-white'
                    } ${collapsed ? 'justify-center px-2' : 'justify-start pl-4'} `}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        {item.name === activeItem && <div className="absolute left-0 top-0 h-full w-1 bg-primary" />}
                        {Icon && (
                          <Icon className={item.name === activeItem ? 'mr-2 h-5 w-5 text-primary' : 'mr-2 h-5 w-5'} />
                        )}
                        {!collapsed && <p>{item.name}</p>}
                      </div>

                      {item.toastify && item.toastify > 0 ? (
                        <div className="flex w-[22px] justify-center rounded-md bg-secondary py-1">
                          <p className="text-xs font-light text-white">{item.toastify > 99 ? '99+' : item.toastify}</p>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col items-center">
        {/* <div className="rounded-lg bg-primary p-4 text-center text-white">
          <p className="w-40 text-center text-xs">Chọn nút bên dưới để thêm sản phẩm!</p>
          <Button className="my-4 rounded-lg bg-white text-primary hover:bg-white">+Thêm</Button>
        </div> */}
        {!collapsed && (
          <div className="py-4 text-xs text-black dark:text-white">
            <p className="font-bold">
              Quản trị <span className="text-primary">7Teck</span>
            </p>
            <p className="font-light">© 2026 Điểu Quốc Đạt</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarAdmin;
