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
      <div className="flex w-full text-xs text-white ">
        {navLink.map(item => (
          <Link to={item.link} className="flex-grow">
            <button className="h-full w-full bg-gradient-to-tr from-primary to-black p-2 uppercase">
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBottom;

