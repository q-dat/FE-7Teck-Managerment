import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';

import { AxiosResponse } from 'axios';
import { IPostCatalog } from '../../types/type/post-catalog/post-catalog';
import {
  getAllPostCatalogsApi,
  createPostCatalogApi,
  updatePostCatalogApi,
  deletePostCatalogApi
} from '../../axios/api/postCatalogApi';
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
  getAllPostCatalogs: () => void;
  getPostCatalogById: (_id: string) => IPostCatalog | undefined;
  createPostCatalog: (postCatalog: IPostCatalog) => Promise<AxiosResponse<any>>;
  updatePostCatalog: (
    _id: string,
    postCatalog: IPostCatalog
  ) => Promise<AxiosResponse<any>>;
  deletePostCatalog: (_id: string) => Promise<AxiosResponse<any>>;
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
  getAllPostCatalogs: () => {},
  getPostCatalogById: () => undefined,
  createPostCatalog: async () =>
    ({ data: { savedPostCatalog: null } }) as AxiosResponse,
  updatePostCatalog: async () =>
    ({ data: { postCatalog: null } }) as AxiosResponse,
  deletePostCatalog: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PostCatalogContext =
  createContext<PostCatalogContextType>(defaultContextValue);

export const PostCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [postCatalogs, setPostCatalogs] = useState<IPostCatalog[]>([]);
  const [countPostCatalog, setCountPostCatalog] = useState<number>(0);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
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
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
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

  // Get All PostCatalog
  const getAllPostCatalogs = useCallback(() => {
    fetchData(
      getAllPostCatalogsApi,
      data => {setPostCatalogs(data.postCatalogs || [])
        setCountPostCatalog(data.count || 0)
      },
      'getAll'
    );
  }, []);

  // Get PostCatalog By Id
  const getPostCatalogById = useCallback(
    (id: string) => {
      return postCatalogs.find(pc => pc._id === id);
    },
    [postCatalogs]
  );

  // Create PostCatalog
  const createPostCatalog = useCallback(
    async (postCatalogData: IPostCatalog): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPostCatalogApi(postCatalogData),
        data => {
          if (data.savedPostCatalog) {
            setPostCatalogs(prevPostCatalogs => [
              ...prevPostCatalogs,
              data.savedPostCatalog
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update PostCatalog
  const updatePostCatalog = useCallback(
    async (
      id: string,
      postCatalogData: IPostCatalog
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePostCatalogApi(id, postCatalogData),
        data => {
          if (data.postCatalogData) {
            setPostCatalogs(prevPostCatalogs =>
              prevPostCatalogs.map(pc =>
                pc._id === id ? data.postCatalogData : pc
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete PostCatalog
  const deletePostCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePostCatalogApi(id),
        () =>
          setPostCatalogs(prevPostCatalogs =>
            prevPostCatalogs.filter(pc => pc._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPostCatalogs();
  }, [getAllPostCatalogs]);

  return (
    <PostCatalogContext.Provider
      value={{
        postCatalogs,
        countPostCatalog,
        loading,
        error,
        getAllPostCatalogs,
        getPostCatalogById,
        createPostCatalog,
        updatePostCatalog,
        deletePostCatalog
      }}
    >
      {children}
    </PostCatalogContext.Provider>
  );
};
