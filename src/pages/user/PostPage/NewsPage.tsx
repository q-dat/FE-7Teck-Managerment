import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';
import { scrollToTopSmoothly } from '../../../components/utils/scrollToTopSmoothly';

const NewsPage: React.FC = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [loading, setLoading] = useState(true);

  const news = posts?.filter(post =>
    post?.catalog.toLowerCase().includes('tin')
  );

  useEffect(() => {
    scrollToTopSmoothly();
    if (posts.length === 0) {
      const fetchData = async () => {
        await getAllPosts();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  // Handle Click Post To Post Detail
  const navigate = useNavigate();
  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post?.title
        .toString()
        .replace(/đ/g, 'd')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    );
    navigate(`/tin-tuc/${titleSlug}`);
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Tin Công Nghệ" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-desktop-padding">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Tin công nghệ" to="">
                Tin Công Nghệ
              </Link>
            </li>
          </ul>
        </div>
        {loading ? (
          <>Đang tải...</>
        ) : (
          <div className="mt-5 px-2 xl:px-desktop-padding">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {news.map(post => (
                <div
                  key={post?._id}
                  className="relative cursor-pointer rounded border border-gray-50 bg-white p-2 shadow-inner hover:shadow-lg"
                  onClick={() => handlePostClick(post)}
                >
                  <p className="absolute left-1 top-1 z-10 rounded-sm bg-primary px-2 text-[12px] text-white">
                    {post?.catalog}
                  </p>
                  <div className="overflow-hidden">
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="h-auto w-full rounded-sm border transition-transform duration-1000 ease-in-out hover:scale-110"
                    />
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default NewsPage;
