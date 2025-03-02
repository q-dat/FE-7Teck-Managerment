import React, { useContext } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { bgBlog } from '../../../assets/images';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';
import { PostContext } from '../../../context/post/PostContext';

const PostSection: React.FC = () => {
  const { posts } = useContext(PostContext);
  const news = posts?.filter(post =>
    post?.catalog.toLowerCase().includes('tin')
  );

  const tricks = posts?.filter(post =>
    post?.catalog.toLowerCase().includes('mẹo')
  );

  const navigate = useNavigate();

  // Handle Click Post To Post Detail
  const handlePostClick = (post: (typeof news)[0]) => {
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
    <div
      style={{
        backgroundImage: `url(${bgBlog})`
      }}
      className={`relative mt-10 bg-cover bg-fixed bg-center bg-no-repeat py-5 ${posts.length === 0 ? 'hidden' : ''}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <section
        className="relative z-10"
        role="region"
        aria-label="Bản tin mới nhất"
      >
        <h1 className="mb-2 bg-gradient-to-tr from-white via-transparent to-transparent px-2 text-start text-xl font-semibold uppercase text-black xl:px-[100px]">
          Tin công nghệ
        </h1>
        <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-[100px]">
          {news.slice(0, 4).map(post => (
            <div
              key={post?._id}
              className="relative flex cursor-pointer flex-row items-start justify-start gap-2 rounded border border-white bg-black bg-opacity-70 p-1 shadow-inner hover:shadow-lg"
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
                <p className="line-clamp-4 w-full py-1 text-sm text-white">
                  {post?.title}
                </p>
                <p className="pt-2 text-[12px] text-white">
                  {new Date(post?.updatedAt).toLocaleDateString('vi-VN')}
                  &nbsp;(
                  <TimeAgo date={post?.updatedAt} />)
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*  */}
      <section
        className="relative z-10"
        role="region"
        aria-label="Thủ thuật và mẹo hay"
      >
        <h1 className="my-2 bg-gradient-to-tr from-white via-transparent to-transparent px-2 text-start text-xl font-semibold uppercase text-black xl:px-[100px]">
          Thủ thuật - Mẹo hay
        </h1>
        <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-[100px]">
          {tricks.slice(0, 4).map(post => (
            <div
              key={post?._id}
              className="relative flex cursor-pointer flex-row items-start justify-start gap-2 rounded border border-white bg-black bg-opacity-70 p-1 shadow-inner hover:shadow-lg"
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
                <p className="line-clamp-4 w-full py-1 text-sm text-white">
                  {post?.title}
                </p>
                <p className="pt-2 text-[12px] text-white">
                  {new Date(post?.updatedAt).toLocaleDateString('vi-VN')}
                  &nbsp;(
                  <TimeAgo date={post?.updatedAt} />)
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div role="region" aria-label="Xem thêm bản tin">
        <Link to="/tin-tuc-moi-nhat">
          <button
            role="button"
            className="text-md relative z-10 mt-2 flex w-full items-center justify-center py-1 text-black underline"
          >
            Xem Thêm Bản Tin
            <span>
              <IoIosArrowForward />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostSection;
