import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../../../components/admin/NavbarAdmin';
import SidebarPost from '../../../components/admin/post/SidebarPost';

const Post: React.FC<{}> = () => {
  // Title Tag
  useEffect(() => {
    document.title = `Trang Quản Trị Bài Viết`;
  });
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F2F7] dark:bg-gray-900">
      <div className="flex flex-1">
        <div className="hidden xl:block">
          <SidebarPost />
        </div>
        <div className="flex-1 xl:p-6">
          <div className="xl:ml-64">
            <div>
              <NavbarAdmin />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

