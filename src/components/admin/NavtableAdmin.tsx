import React from 'react';
// import { Input, Select } from 'react-daisyui';
// import { IoSearchOutline } from 'react-icons/io5';

const NavtableAdmin: React.FC<{ Title_NavtableAdmin: string }> = ({ Title_NavtableAdmin }) => {
  // const [value, setValue] = React.useState('default');
  return (
    <div className="hidden items-center justify-between rounded-t-md bg-white px-4 py-5 dark:bg-primary dark:bg-opacity-50 md:flex">
      <div>
        <h2 className="text-lg font-bold text-black dark:text-white">{Title_NavtableAdmin}</h2>
        <p className="mt-1 text-sm text-primary dark:text-white">Đang sử dụng</p>
      </div>
      {/* <div className="flex items-center">
        <div className="relative mr-4 flex items-center">
          <Input
            className="min-w-[300px] bg-white text-black placeholder-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <div className="absolute right-2 h-5 w-5 cursor-pointer">
            <IoSearchOutline />
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg">
          <label className="text-sm text-gray-600 dark:text-white">
            Sắp xếp theo:
          </label>
          <Select
            className="bg-white text-black focus:outline-none"
            value={value}
            onChange={e => setValue(e.target.value)}
          >
            <option value="default">Cũ nhất</option>
            <option value="1">Mới nhất</option>
          </Select>
        </div>
      </div> */}
    </div>
  );
};

export default NavtableAdmin;
