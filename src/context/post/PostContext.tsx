import { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { getAllPostsApi, getPostByIdApi, createPostApi, updatePostApi, deletePostApi } from '../../axios/api/postApi';
import { IPost, PostApiResponse, PostQueryParams } from '../../types/type/post/post';

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

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
  getAllPosts: (params?: PostQueryParams) => Promise<void>;
  getPostById: (_id: string) => Promise<IPost | undefined>;
  createPost: (postData: FormData) => Promise<AxiosResponse<PostApiResponse>>;
  updatePost: (id: string, postData: FormData) => Promise<AxiosResponse<PostApiResponse>>;
  deletePost: (id: string) => Promise<AxiosResponse<PostApiResponse>>;
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
  getAllPosts: async () => { },
  getPostById: async () => undefined,
  createPost: async () => ({ data: { message: '', post: undefined } }) as AxiosResponse<PostApiResponse>,
  updatePost: async () => ({ data: { message: '', post: undefined } }) as AxiosResponse<PostApiResponse>,
  deletePost: async () => ({ data: { message: '', deletedPost: undefined } }) as AxiosResponse<PostApiResponse>
};

export const PostContext = createContext<PostContextType>(defaultContextValue);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [countPost, setCountPost] = useState<number>(0);
  const [loading, setLoading] = useState({
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    const apiError = err as ApiError;
    setError(apiError.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<PostApiResponse>>,
    onSuccess: (data: PostApiResponse) => void,
    requestType: keyof typeof loading
  ): Promise<AxiosResponse<PostApiResponse>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);

    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  const getAllPosts = useCallback(async (params?: PostQueryParams) => {
    await fetchData(
      () => getAllPostsApi(params),
      data => {
        setPosts(data.posts || []);
        setCountPost(data.count || 0);
      },
      'getAll'
    );
  }, []);

  const getPostById = useCallback(async (_id: string): Promise<IPost | undefined> => {
    try {
      const response = await fetchData(
        () => getPostByIdApi(_id),
        data => {
          if (data.post) {
            setPosts(prevPosts => {
              const exists = prevPosts.some(post => post._id === _id);

              if (!exists) {
                return [data.post as IPost, ...prevPosts];
              }

              return prevPosts.map(post => (post._id === _id ? (data.post as IPost) : post));
            });
          }
        },
        'getById'
      );

      return response.data.post;
    } catch {
      return undefined;
    }
  }, []);

  const createPost = useCallback(async (postData: FormData) => {
    return await fetchData(
      () => createPostApi(postData),
      data => {
        if (data.post) {
          setPosts(prevPosts => [data.post as IPost, ...prevPosts]);
          setCountPost(prev => prev + 1);
        }
      },
      'create'
    );
  }, []);

  const updatePost = useCallback(async (id: string, postData: FormData) => {
    return await fetchData(
      () => updatePostApi(id, postData),
      data => {
        if (data.post) {
          setPosts(prevPosts => prevPosts.map(post => (post._id === id ? (data.post as IPost) : post)));
        }
      },
      'update'
    );
  }, []);

  const deletePost = useCallback(async (id: string) => {
    return await fetchData(
      () => deletePostApi(id),
      () => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
        setCountPost(prev => Math.max(prev - 1, 0));
      },
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