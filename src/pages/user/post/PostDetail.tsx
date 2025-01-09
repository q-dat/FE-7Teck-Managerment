import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { PostContext } from '../../../context/post/PostContext';

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const { title } = useParams<{ title: string }>();
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );

  useEffect(() => {
    if (posts.length > 0 && title) {
      const post = posts.find(
        post =>
          post.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );
      setSelectedPost(post || null);
    }
  }, [posts, title]);

  const handlePostSelect = (post: (typeof posts)[0]) => {
    setSelectedPost(post);
    const titleSlug = encodeURIComponent(
      post.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/post-detail/${titleSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherPosts = posts.filter(post => post._id !== selectedPost?._id);

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Bài viết" />
      <div className="py-[100px] xl:pt-0">
        <div className="breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/news">Tin Tức</Link>
            </li>
          </ul>
        </div>
        <div className="px-2">
          <div className="xl:px-[100px]">
            {selectedPost ? (
              <div className="mb-10">
                <p className="text-[35px] font-bold">{selectedPost.title}</p>
                <p className="text-[14px] text-blue-500">
                  {new Date(selectedPost.updatedAt).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-[14px] font-light">
                  Danh mục:&nbsp;{selectedPost.catalog}
                </p>
                <hr className="my-4" />
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  className="text-[18px] text-black"
                ></div>
              </div>
            ) : (
              <p>Không tìm thấy bài viết</p>
            )}
          </div>
          <div>
            <h1 className="p-1 font-semibold uppercase">Bài viết khác</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
            {otherPosts.slice(0,6).map(post => (
              <div
                key={post._id}
                className="relative cursor-pointer rounded border bg-white p-2 shadow-inner hover:shadow-lg"
                onClick={() => handlePostSelect(post)}
              >
                <p className="absolute left-1 top-1 rounded-sm border bg-primary px-2 text-[12px] text-white">
                  {post.catalog}
                </p>
                <img
                  src={post.imageUrl}
                  alt="Ảnh đại diện"
                  className="h-[200px] w-full rounded-sm border object-fill xl:h-[350px]"
                />
                <p className="line-clamp-3 py-1 text-sm xl:text-[18px] font-bold text-primary">
                  {post.title}
                </p>
                <hr />
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="line-clamp-5 text-xs xl:text-[14px] text-black xl:line-clamp-6"
                ></div>
                <p className="pt-2 text-[12px] text-primary">
                  {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
