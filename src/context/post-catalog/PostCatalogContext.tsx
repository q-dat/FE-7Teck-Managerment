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
      data => setPostCatalogs(data.postCatalogs || []),
      'getAll'
    );
  }, []);

  // Get PostCatalog By Id
  const getPostCatalogById = useCallback(
    (id: string) => {
      return postCatalogs.find(postCatalog => postCatalog._id === id);
    },
    [postCatalogs]
  );

  // Create PostCatalog
  const createPostCatalog = useCallback(
    async (postCatalog: IPostCatalog): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPostCatalogApi(postCatalog),
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
      postCatalog: IPostCatalog
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePostCatalogApi(id, postCatalog),
        data => {
          if (data.postCatalog) {
            setPostCatalogs(prevPostCatalogs =>
              prevPostCatalogs.map(loc =>
                loc._id === id ? data.postCatalog : loc
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
            prevPostCatalogs.filter(postCatalog => postCatalog._id !== id)
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

