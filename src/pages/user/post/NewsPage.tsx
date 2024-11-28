import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';

const NewsPage: React.FC = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (posts.length > 0 && !selectedPost) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);

  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/post-detail/${titleSlug}`);
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Bản tin nổi bật" />
      <div className="breadcrumbs glass mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
        <ul className="font-light">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/news">Tin Tức</Link>
          </li>
        </ul>
      </div>
      <div className="px-2 dark:bg-white xl:px-[100px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post._id}
              className="cursor-pointer rounded border p-4 shadow transition hover:shadow-lg"
              onClick={() => handlePostClick(post)}
            >
              <img
                src={post.imageUrl}
                alt="Ảnh đại diện"
                className="h-[250px] w-full object-cover"
              />
              <p className="text-[30px] font-bold">{post.title}</p>
              <p className="text-[14px] font-light">
                Danh mục:&nbsp;{post.catalog}
              </p>
              <p className="text-[14px]">
                Xuất bản:&nbsp;
                {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="line-clamp-6 text-[18px]"
              ></div>{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

