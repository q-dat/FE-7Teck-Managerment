import React from 'react';
import { Table } from 'react-daisyui';
import NavtableAdmin from './NavtableAdmin';

interface TableListAdminProps {
  table_head: React.ReactNode;
  table_body: React.ReactNode;
  Title_TableListAdmin: string;
  className?: React.ReactNode;
}
const TableListAdmin: React.FC<TableListAdminProps> = ({ className, table_head, table_body, Title_TableListAdmin }) => {
  return (
    <div className="dark:bg-opacity-8 w-full bg-white dark:bg-gray-800 md:rounded-md">
      {/* Navbar Admin */}
      <NavtableAdmin Title_NavtableAdmin={Title_TableListAdmin} />
      <div className={`w-screen overflow-x-auto overflow-y-hidden scrollbar-hide xl:w-full ${className}`}>
        {/* Phần Bảng */}
        <Table zebra className="table-xs w-full text-black 2xl:table-sm dark:text-white">
          {table_head}
          {table_body}
        </Table>
      </div>
    </div>
  );
};

export default TableListAdmin;
