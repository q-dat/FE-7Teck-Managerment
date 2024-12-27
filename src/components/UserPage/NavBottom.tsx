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
    <div className="fixed bottom-0 left-0 w-full xl:hidden">
      <div className="flex w-full text-xs  gap-[1px] justify-between bg-white">
        {navLink.map(item => (
          <Link to={item.link} className="flex-grow">
            <button className="h-full w-full text-white bg-black py-2 px-1 uppercase">
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBottom;

