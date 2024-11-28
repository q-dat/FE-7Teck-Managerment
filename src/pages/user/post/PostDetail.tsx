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
      <div className="pb-[20px] xl:pt-[80px]">
        <HeaderResponsive Title_NavbarMobile="Bài viết" />
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
          {selectedPost ? (
            <div className="mb-10">
              <p className="text-[35px] font-bold">{selectedPost.title}</p>
              <p className="text-[14px] font-light">
                Danh mục:&nbsp;{selectedPost.catalog}
              </p>
              <p className="text-[14px]">
                Xuất bản:&nbsp;
                {new Date(selectedPost.updatedAt).toLocaleDateString('vi-VN')}
              </p>
              <hr className="my-4" />
              <div
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                className="text-[18px]"
              ></div>
            </div>
          ) : (
            <p>Không tìm thấy bài viết</p>
          )}
        </div>
        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map(post => (
              <div
                key={post._id}
                className="cursor-pointer rounded border p-4 shadow transition hover:shadow-lg"
                onClick={() => handlePostSelect(post)}
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
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

