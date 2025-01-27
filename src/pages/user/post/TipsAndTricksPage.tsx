import React, { useContext, useEffect } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';

const TipsAndTricksPage: React.FC = () => {
  const { posts } = useContext(PostContext);

  useEffect(() => {
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [posts]);
  //
  const navigate = useNavigate();
  // Handle Click Post To Post Detail
  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post?.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/tin-tuc/${titleSlug}`);
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Thủ Thuật - Mẹo" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Thủ thuật và mẹo" to="">
                Thủ Thuật - Mẹo
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-2 xl:px-20">
          <h1
            role="region"
            aria-label="Thủ thuật công nghệ và mẹo hay"
            className="py-5 text-center text-[30px] font-bold text-primary"
          >
            Thủ Thuật Công Nghệ Và Mẹo Hay
          </h1>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map(post => (
              <div
                key={post?._id}
                className="relative cursor-pointer rounded border border-gray-50 bg-white p-2 shadow-inner hover:shadow-lg"
                onClick={() => handlePostClick(post)}
              >
                <p className="absolute left-1 top-1 rounded-sm bg-primary px-2 text-[12px] text-white">
                  {post?.catalog}
                </p>
                <img
                  loading="lazy"
                  src={post?.imageUrl}
                  alt="Ảnh đại diện"
                  className="h-[200px] w-full rounded-sm border object-cover xl:h-[300px]"
                />
                <p className="line-clamp-3 py-1 text-base text-black">
                  {post?.title}
                </p>
                <hr />
                <p className="pt-2 text-[12px] text-primary">
                  {new Date(post?.updatedAt).toLocaleDateString('vi-VN')}
                  &nbsp;(
                  <TimeAgo date={post?.updatedAt} />)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsAndTricksPage;
