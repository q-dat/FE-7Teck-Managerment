import { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { getAllPostsApi, getPostByIdApi, createPostApi, updatePostApi, deletePostApi } from '../../axios/api/postApi';
import { IPost } from '../../types/type/post/post';
import { AxiosResponse } from 'axios';

interface PostContextType {
  posts: IPost[];
  countPost: number;
  loading: {
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPosts: () => Promise<void>;
  getPostById: (_id: string) => Promise<IPost | undefined>;
  createPost: (postData: FormData) => Promise<AxiosResponse<any>>;
  updatePost: (id: string, postData: FormData) => Promise<AxiosResponse<any>>;
  deletePost: (id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PostContextType = {
  posts: [],
  countPost: 0,
  loading: {
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPosts: async () => {},
  getPostById: async () => undefined,
  createPost: async () => ({ data: { post: null } }) as AxiosResponse,
  updatePost: async () => ({ data: { post: null } }) as AxiosResponse,
  deletePost: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PostContext = createContext<PostContextType>(defaultContextValue);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [countPost, setCountPost] = useState<number>(0);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
  ): Promise<AxiosResponse<any>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All Posts
  const getAllPosts = useCallback(async () => {
    await fetchData(
      getAllPostsApi,
      data => {
        setPosts(data?.posts || []);
        setCountPost(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Post By Id
  const getPostById = useCallback(async (_id: string): Promise<IPost | undefined> => {
    try {
      const response = await fetchData(
        () => getPostByIdApi(_id),
        data => {
          if (data?.post) {
            setPosts(prev => {
              const exists = prev.find(p => p._id === _id);
              if (!exists) {
                return [...prev, data.post];
              }
              return prev.map(p => (p._id === _id ? data.post : p));
            });
          }
        },
        'getById'
      );
      return response.data.post;
    } catch (err) {
      return undefined;
    }
  }, []);

  // Create Post
  const createPost = useCallback(async (postData: FormData): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => createPostApi(postData),
      data => {
        if (data?.p) {
          setPosts(prevPosts => [...prevPosts, data?.p]);
        }
      },
      'create'
    );
  }, []);

  // Update Post
  const updatePost = useCallback(async (id: string, postData: FormData): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => updatePostApi(id, postData),
      data => {
        if (data?.postData) {
          setPosts(prevPosts => prevPosts.map(p => (p._id === id ? data?.postData : p)));
        }
      },
      'update'
    );
  }, []);

  // Delete Post
  const deletePost = useCallback(async (id: string): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => deletePostApi(id),
      () => setPosts(prevPosts => prevPosts.filter(p => p._id !== id)),
      'delete'
    );
  }, []);

  const value = useMemo(
    () => ({
      posts,
      countPost,
      loading,
      error,
      getAllPosts,
      getPostById,
      createPost,
      updatePost,
      deletePost
    }),
    [posts, countPost, loading, error, getAllPosts, getPostById, createPost, updatePost, deletePost]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
