import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { PostContext } from '../../../context/post/PostContext';
import { FaArrowLeftLong } from 'react-icons/fa6';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';
const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const { title } = useParams<{ title: string }>();
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  // Title Tag
  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost?.title} - 7Teck`;
    }
  }, [selectedPost]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (posts.length > 0 && title) {
      const post = posts.find(
        post =>
          post?.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );
      setSelectedPost(post || null);
    }
  }, [posts, title]);

  const handlePostSelect = (post: (typeof posts)[0]) => {
    setSelectedPost(post);
    const titleSlug = encodeURIComponent(
      post?.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/tin-tuc/${titleSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherPosts = posts.filter(post => post?._id !== selectedPost?._id);
  8;

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Bài viết" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              {selectedPost ? (
                <Link to="">{selectedPost?.title}</Link>
              ) : (
                <Link to="">Chi Tiết</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="px-2">
          <div className="xl:px-20">
            <Link
              to="/tin-tuc-moi-nhat"
              className="flex items-center justify-start text-secondary"
            >
              <FaArrowLeftLong />
              Trở về trang tin tức
            </Link>
            <>
              {selectedPost ? (
                <div className="mb-10">
                  <p className="text-[35px] font-bold">{selectedPost?.title}</p>
                  <p className="text-[14px] text-blue-500">
                    {new Date(selectedPost?.updatedAt).toLocaleDateString(
                      'vi-VN'
                    )}
                  </p>
                  <p className="text-[14px] font-light">
                    Danh mục:&nbsp;{selectedPost?.catalog}
                  </p>
                  <hr className="my-4" />
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedPost?.content }}
                    className="text-[18px] text-black"
                  ></div>
                </div>
              ) : (
                <p className="my-3 rounded-md bg-white p-2 text-center text-2xl font-light text-primary">
                  Bài viết này không tồn tại!
                  <br />
                  <span className="text-xl">
                    Xin lỗi vì sự bất tiện này. Quý độc giả vui lòng theo dõi
                    các bài viết khác trên trang.
                  </span>
                </p>
              )}
            </>
          </div>
          <div className="px-0 xl:px-20">
            <h1 className="p-1 font-semibold uppercase">
              Bài viết nổi bật khác
            </h1>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {otherPosts.slice(0, 8).map(post => (
                <div
                  key={post?._id}
                  className="relative cursor-pointer rounded border border-gray-50 bg-white p-2 shadow-inner hover:shadow-lg"
                  onClick={() => handlePostSelect(post)}
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
                  <p className="line-clamp-3 py-1 text-sm font-bold text-primary">
                    {post?.title}
                  </p>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                    className="line-clamp-4 text-xs text-black"
                  ></div>
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
    </div>
  );
};

export default PostDetail;
