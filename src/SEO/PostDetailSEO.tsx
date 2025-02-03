import React, { lazy, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/post/PostContext';
import useSeo from '../hooks/useSeo';
const PostDetail = lazy(() => import('../pages/user/post/PostDetail'));

const PostDetailSEO: React.FC = () => {
  const { posts } = useContext(PostContext);
  const { title } = useParams<{ title: string }>();
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  useEffect(() => {
    // Fetch Data By Title
    if (posts.length > 0 && title) {
      const post = posts.find(
        post =>
          post?.title
            .toString()
            .replace(/đ/g, 'd')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') === title.toLowerCase()
      );
      setSelectedPost(post || null);
    }
  }, [selectedPost, posts, title]);

  useSeo({
    title: `${selectedPost?.title} - 7Teck`,
    canonical: selectedPost
      ? `${window.location.origin}/tin-tuc/${selectedPost.title.toLowerCase().replace(/\s+/g, '-')}`
      : window.location.href,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PostDetail />;
};

export default PostDetailSEO;

