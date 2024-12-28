import React from 'react';
import { FaMobileAlt, FaTabletAlt, FaWindows } from 'react-icons/fa';
import { MdListAlt } from 'react-icons/md';
import { RiMacbookFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const navLink = [
  {
    icon: MdListAlt,
    name: 'Giá thu cũ',
    link: '/price-list'
  },
  {
    icon: FaMobileAlt,
    name: 'iPhone',
    link: '/phone-list'
  },
  {
    icon: FaTabletAlt,
    name: 'ipad',
    link: '/ipad-list'
  },
  {
    icon: RiMacbookFill,
    name: 'Macbook',
    link: '/macbook-list'
  },
  {
    icon: FaWindows,
    name: 'Window',
    link: '/window-list'
  }
];
const NavBottom: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-[99999] w-full xl:hidden">
      <div className="flex h-[40px] w-full justify-between gap-[1px] bg-white text-xs">
        {navLink.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} to={item.link} className="flex-grow">
              <button className="flex h-full w-full flex-col items-center justify-center bg-black p-1 text-white">
                {Icon && <Icon className="text-lg" />}
                {item.name}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBottom;

