import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/NavbarAdminDesktop ';
import SidebarPost from '../../components/admin/post/SidebarPost';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import { PostCatalogContext } from '../../context/post-catalog/PostCatalogContext';
import { PostContext } from '../../context/post/PostContext';
import { PriceListContext } from '../../context/price-list/PriceListContext';

const Post: React.FC<{}> = () => {
  const { getAllPostCatalogs } = useContext(PostCatalogContext);
  const { getAllPosts } = useContext(PostContext);
  const { getAllPriceLists } = useContext(PriceListContext);
  useEffect(() => {
    // Title Tag
    document.title = `Trang Quản Trị Bài Viết`;
    const initializeData = async () => {
      try {
        await Promise.all([getAllPostCatalogs(), getAllPosts(), getAllPriceLists()]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);
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
              <ScrollToTopButton />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
