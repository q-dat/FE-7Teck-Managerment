import React from 'react';
import { Link } from 'react-router-dom';
const navLink = [
  {
    name: 'Giá thu cũ',
    link: '/price-list'
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
  }
];
const NavBottom: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-[99999] w-full xl:hidden">
      <div className="flex w-full justify-between gap-[1px] bg-white text-xs">
        {navLink.map((item, index) => (
          <Link key={index + 1} to={item.link} className="flex-grow">
            <button className="h-full w-full bg-black px-1 py-2 uppercase text-white">
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBottom;

