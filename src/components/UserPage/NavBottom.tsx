import React from 'react';
import { Link } from 'react-router-dom';

const NavBottom: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white bg-gradient-to-r from-primary  to-black   box-decoration-clone xl:hidden">
      <div className="flex flex-row items-end justify-start text-xs text-white ">
       <Link to="/price-list">
        <button className="bg-gradient-to-r from-transparent to-black p-2">Giá thu cũ</button>
        </Link> 
        <button className="bg-gradient-to-r from-transparent to-black p-2">IPhone</button>
        <button className="bg-gradient-to-r from-transparent to-black p-2">Ipad</button>
        <button className="bg-gradient-to-r from-transparent to-black p-2">Window</button>
        <button className="bg-gradient-to-r from-transparent to-black p-2">Macbook</button>
      </div>
    </div>
  );
};

export default NavBottom;

