import React, { memo, useContext, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { bgBlog } from '../../../assets/images';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';
import { PostContext } from '../../../context/post/PostContext';
import { Button } from 'react-daisyui';
import { slugify } from '../../../components/utils/slugify';

const PostSection: React.FC = () => {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  const news = posts?.filter(post =>
    post?.catalog.toLowerCase().includes('tin')
  );

  const tricks = posts?.filter(post =>
    post?.catalog.toLowerCase().includes('mẹo')
  );

  const navigate = useNavigate();

  const handlePostClick = (post: (typeof news)[0]) => {
    const titleSlug = encodeURIComponent(slugify(post?.title));
    navigate(`/tin-tuc/${titleSlug}/${post._id}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgBlog})`
      }}
      className="relative mt-10 bg-cover bg-fixed bg-center bg-no-repeat pb-10 pt-5"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10">
        {news.length > 0 && (
          <section role="region" aria-label="Bản tin mới nhất">
            <div
              className="my-2 flex flex-row items-center justify-between px-2 text-white xl:px-desktop-padding"
              aria-label="Thanh tiêu đề Tin công nghệ và liên kết xem tất cả"
            >
              <div>
                <h1 className="text-xl font-semibold uppercase">
                  Tin công nghệ
                </h1>
              </div>
              <Link to="/tin-tuc-moi-nhat">
                <Button
                  role="button"
                  size="sm"
                  className="flex items-center justify-center gap-0 border-none px-0 py-1 font-semibold underline shadow-none"
                >
                  Xem Thêm
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-desktop-padding">
              {news.slice(0, 4).map(post => (
                <div
                  key={post?._id}
                  className="relative flex cursor-pointer flex-row items-start justify-start gap-2 rounded border border-white bg-white bg-opacity-70 p-1 text-black shadow-inner hover:shadow-lg"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-0 h-full w-full rounded-sm object-cover blur-2xl filter"
                    />
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-10 h-full w-full rounded-sm object-contain"
                    />
                  </div>
                  <div className="w-full">
                    <p className="line-clamp-4 w-full py-1 text-sm font-semibold">
                      {post?.title}
                    </p>
                    <p className="pt-2 text-[12px]">
                      {new Date(post?.updatedAt).toLocaleDateString('vi-VN')} (
                      <TimeAgo date={post?.updatedAt} />)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tricks.length > 0 && (
          <section role="region" aria-label="Thủ thuật và mẹo hay">
            <div
              className="my-2 flex flex-row items-center justify-between px-2 text-white xl:px-desktop-padding"
              aria-label="Thanh tiêu đề Thủ thuật và liên kết xem tất cả"
            >
              <div>
                <h1 className="text-xl font-semibold uppercase">
                  Thủ thuật - Mẹo hay
                </h1>
              </div>
              <Link to="/thu-thuat-va-meo-hay">
                <Button
                  role="button"
                  size="sm"
                  className="flex items-center justify-center gap-0 border-none px-0 py-1 font-semibold underline shadow-none"
                >
                  Xem Thêm
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-desktop-padding">
              {tricks.slice(0, 4).map(post => (
                <div
                  key={post?._id}
                  className="relative flex cursor-pointer flex-row items-start justify-start gap-2 rounded border border-white bg-white bg-opacity-70 p-1 text-black shadow-inner hover:shadow-lg"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-0 h-full w-full rounded-sm object-cover blur-2xl filter"
                    />
                    <img
                      loading="lazy"
                      src={post?.imageUrl}
                      alt="Ảnh đại diện"
                      className="absolute left-0 top-0 z-10 h-full w-full rounded-sm object-contain"
                    />
                  </div>
                  <div className="w-full">
                    <p className="line-clamp-4 w-full py-1 text-sm font-semibold">
                      {post?.title}
                    </p>
                    <p className="pt-2 text-[12px]">
                      {new Date(post?.updatedAt).toLocaleDateString('vi-VN')} (
                      <TimeAgo date={post?.updatedAt} />)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default memo(PostSection);
