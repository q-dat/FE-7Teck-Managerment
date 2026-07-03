import { createContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import {
  IPostCatalog,
  PostCatalogApiResponse,
  PostCatalogFormValues,
  PostCatalogQueryParams
} from '../../types/type/post-catalog/post-catalog';
import {
  getAllPostCatalogsApi,
  createPostCatalogApi,
  updatePostCatalogApi,
  deletePostCatalogApi
} from '../../axios/api/postCatalogApi';

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

interface PostCatalogContextType {
  postCatalogs: IPostCatalog[];
  countPostCatalog: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPostCatalogs: (params?: PostCatalogQueryParams) => Promise<void>;
  getPostCatalogById: (_id: string) => IPostCatalog | undefined;
  createPostCatalog: (postCatalog: PostCatalogFormValues) => Promise<AxiosResponse<PostCatalogApiResponse>>;
  updatePostCatalog: (_id: string, postCatalog: PostCatalogFormValues) => Promise<AxiosResponse<PostCatalogApiResponse>>;
  deletePostCatalog: (_id: string) => Promise<AxiosResponse<PostCatalogApiResponse>>;
}

const defaultContextValue: PostCatalogContextType = {
  postCatalogs: [],
  countPostCatalog: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPostCatalogs: async () => { },
  getPostCatalogById: () => undefined,
  createPostCatalog: async () => ({ data: { message: '', postCatalog: undefined } }) as AxiosResponse<PostCatalogApiResponse>,
  updatePostCatalog: async () => ({ data: { message: '', postCatalog: undefined } }) as AxiosResponse<PostCatalogApiResponse>,
  deletePostCatalog: async () =>
    ({ data: { message: '', deletedPostCatalog: undefined } }) as AxiosResponse<PostCatalogApiResponse>
};

export const PostCatalogContext = createContext<PostCatalogContextType>(defaultContextValue);

export const PostCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [postCatalogs, setPostCatalogs] = useState<IPostCatalog[]>([]);
  const [countPostCatalog, setCountPostCatalog] = useState<number>(0);
  const [loading, setLoading] = useState({
    getAll: false,
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
    apiCall: () => Promise<AxiosResponse<PostCatalogApiResponse>>,
    onSuccess: (data: PostCatalogApiResponse) => void,
    requestType: keyof typeof loading
  ): Promise<AxiosResponse<PostCatalogApiResponse>> => {
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

  const getAllPostCatalogs = useCallback(async (params?: PostCatalogQueryParams) => {
    await fetchData(
      () => getAllPostCatalogsApi(params),
      data => {
        setPostCatalogs(data.postCatalogs || []);
        setCountPostCatalog(data.count || 0);
      },
      'getAll'
    );
  }, []);

  const getPostCatalogById = useCallback(
    (id: string) => {
      return postCatalogs.find(postCatalog => postCatalog._id === id);
    },
    [postCatalogs]
  );

  const createPostCatalog = useCallback(async (postCatalogData: PostCatalogFormValues) => {
    return await fetchData(
      () => createPostCatalogApi(postCatalogData),
      data => {
        if (data.postCatalog) {
          setPostCatalogs(prevPostCatalogs => [data.postCatalog as IPostCatalog, ...prevPostCatalogs]);
          setCountPostCatalog(prev => prev + 1);
        }
      },
      'create'
    );
  }, []);

  const updatePostCatalog = useCallback(async (id: string, postCatalogData: PostCatalogFormValues) => {
    return await fetchData(
      () => updatePostCatalogApi(id, postCatalogData),
      data => {
        if (data.postCatalog) {
          setPostCatalogs(prevPostCatalogs =>
            prevPostCatalogs.map(postCatalog =>
              postCatalog._id === id ? (data.postCatalog as IPostCatalog) : postCatalog
            )
          );
        }
      },
      'update'
    );
  }, []);

  const deletePostCatalog = useCallback(async (id: string) => {
    return await fetchData(
      () => deletePostCatalogApi(id),
      () => {
        setPostCatalogs(prevPostCatalogs => prevPostCatalogs.filter(postCatalog => postCatalog._id !== id));
        setCountPostCatalog(prev => Math.max(prev - 1, 0));
      },
      'delete'
    );
  }, []);

  const value = useMemo(
    () => ({
      postCatalogs,
      countPostCatalog,
      loading,
      error,
      getAllPostCatalogs,
      getPostCatalogById,
      createPostCatalog,
      updatePostCatalog,
      deletePostCatalog
    }),
    [
      postCatalogs,
      countPostCatalog,
      loading,
      error,
      getAllPostCatalogs,
      getPostCatalogById,
      createPostCatalog,
      updatePostCatalog,
      deletePostCatalog
    ]
  );

  return <PostCatalogContext.Provider value={value}>{children}</PostCatalogContext.Provider>;
};