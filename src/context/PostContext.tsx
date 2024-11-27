import { createContext, useState, useCallback, ReactNode } from 'react';
import { createPostApi, getAllPostsApi, updatePostApi, deletePostApi } from '../axios/api/postApi'; // Các API quản lý bài viết
import { IPost } from '../types/type/post/post';

interface PostContextType {
  posts: IPost[];
  loading: boolean;
  error: string | null;
  getAllPosts: () => void;
  createPost: (post: FormData) => void;
  updatePost: (id: string, post: FormData) => void;
  deletePost: (id: string) => void;
}

const defaultContextValue: PostContextType = {
  posts: [],
  loading: false,
  error: null,
  getAllPosts: () => {},
  createPost: () => {},
  updatePost: () => {},
  deletePost: () => {}
};

export const PostContext = createContext<PostContextType>(defaultContextValue);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  // Fetch all posts
  const getAllPosts = useCallback(() => {
    setLoading(true);
    getAllPostsApi()
      .then((response) => setPosts(response.data.posts))
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  // Create new post
  const createPost = useCallback((post: FormData) => {
    setLoading(true);
    createPostApi(post)
      .then((response) => setPosts((prev) => [...prev, response.data.post]))
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  // Update post
  const updatePost = useCallback((id: string, post: FormData) => {
    setLoading(true);
    updatePostApi(id, post)
      .then((response) => {
        setPosts((prev) =>
          prev.map((p) => (p._id === id ? response.data.post : p))
        );
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  // Delete post
  const deletePost = useCallback((id: string) => {
    setLoading(true);
    deletePostApi(id)
      .then(() => setPosts((prev) => prev.filter((p) => p._id !== id)))
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        getAllPosts,
        createPost,
        updatePost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
