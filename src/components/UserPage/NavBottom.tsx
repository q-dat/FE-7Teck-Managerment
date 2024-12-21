import React from 'react';
import { Link } from 'react-router-dom';

const NavBottom: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white bg-gradient-to-r from-primary to-black box-decoration-clone xl:hidden">
      <div className="flex flex-row items-end justify-start text-xs text-white">
        <Link to="/price-list">
          <button className="bg-gradient-to-tr from-primary to-black p-2 uppercase">
            Giá thu cũ
          </button>
        </Link>
        <Link to="/phone-list">
          <button className=" uppercase bg-gradient-to-tr from-primary to-black p-2">
            IPhone
          </button>
        </Link>
        <Link to="/ipad-list">
          <button className=" uppercase bg-gradient-to-tr from-primary to-black p-2">
            IPad
          </button>
        </Link>
        <Link to="/window-list">
          <button className=" uppercase bg-gradient-to-tr from-primary to-black p-2">
            Window
          </button>
        </Link>
        <Link to="/macbook-list">
          <button className=" uppercase bg-gradient-to-tr from-primary to-black p-2">
            Macbook
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBottom;

