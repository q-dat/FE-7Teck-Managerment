import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import { IWindowsCatalog } from '../../types/type/windows-catalog/windows-catalog';
import {
  getAllWindowsCatalogsApi,
  getWindowsCatalogByIdApi,
  createWindowsCatalogApi,
  updateWindowsCatalogApi,
  deleteWindowsCatalogApi
} from '../../axios/api/windowsCatalogApi';

interface WindowsCatalogsContextType {
  windowsCatalogs: IWindowsCatalog[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllWindowsCatalogs: () => void;
  getWindowsCatalogsById: (_id: string) => Promise<IWindowsCatalog | undefined>;
  createWindowsCatalogs: (
    windowsCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateWindowsCatalogs: (
    _id: string,
    windowsCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteWindowsCatalogs: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: WindowsCatalogsContextType = {
  windowsCatalogs: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllWindowsCatalogs: () => {},
  getWindowsCatalogsById: async () => undefined,
  createWindowsCatalogs: async () =>
    ({ data: { windowsCatalogs: null } }) as AxiosResponse,
  updateWindowsCatalogs: async () =>
    ({ data: { windowsCatalogs: null } }) as AxiosResponse,
  deleteWindowsCatalogs: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const WindowsCatalogsContext =
  createContext<WindowsCatalogsContextType>(defaultContextValue);

export const WindowsCatalogsProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [windowsCatalogs, setWindowsCatalogs] = useState<IWindowsCatalog[]>([]);
  const [loading, setLoading] = useState({
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

  // Get All WindowsCatalogs
  const getAllWindowsCatalogs = useCallback(() => {
    fetchData(
      getAllWindowsCatalogsApi,
      data => setWindowsCatalogs(data?.windowsCatalogs || []),
      'getAll'
    );
  }, []);

  // Get WindowsCatalogs By Id
  const getWindowsCatalogsById = useCallback(
    async (id: string): Promise<IWindowsCatalog | undefined> => {
      const cachedWindowsCatalogs = windowsCatalogs.find(wc => wc._id === id);
      if (cachedWindowsCatalogs) return cachedWindowsCatalogs;
      const response = await fetchData(
        () => getWindowsCatalogByIdApi(id),
        data => {
          if (data?.wc) {
            setWindowsCatalogs(prevWindowsCatalogs => [
              ...prevWindowsCatalogs,
              data.wc
            ]);
          }
        },
        'getAll'
      );
      return response.data?.wc;
    },
    [windowsCatalogs]
  );

  // Create WindowsCatalogs
  const createWindowsCatalogs = useCallback(
    async (windowsCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createWindowsCatalogApi(windowsCatalogData),
        data => {
          if (data?.wc) {
            setWindowsCatalogs(prevWindowsCatalogs => [
              ...prevWindowsCatalogs,
              data?.wc
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update WindowsCatalogs
  const updateWindowsCatalogs = useCallback(
    async (
      _id: string,
      windowsCatalogData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateWindowsCatalogApi(_id, windowsCatalogData),
        data => {
          if (data?.windowsCatalogData) {
            setWindowsCatalogs(prevWindowsCatalogs =>
              prevWindowsCatalogs.map(wc => (wc._id === _id ? data?.windowsCatalogData : wc))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete WindowsCatalogs
  const deleteWindowsCatalogs = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteWindowsCatalogApi(id),
        () =>
          setWindowsCatalogs(prevWindowsCatalogs =>
            prevWindowsCatalogs.filter(wc => wc._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllWindowsCatalogs();
  }, [getAllWindowsCatalogs]);

  return (
    <WindowsCatalogsContext.Provider
      value={{
        windowsCatalogs,
        loading,
        error,
        getAllWindowsCatalogs,
        getWindowsCatalogsById,
        createWindowsCatalogs,
        updateWindowsCatalogs,
        deleteWindowsCatalogs
      }}
    >
      {children}
    </WindowsCatalogsContext.Provider>
  );
};
