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

interface WindowsCatalogContextType {
  windowsCatalogs: IWindowsCatalog[];
  countWindowsCatalog: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllWindowsCatalogs: () => void;
  getWindowsCatalogById: (_id: string) => Promise<IWindowsCatalog | undefined>;
  createWindowsCatalog: (
    windowsCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateWindowsCatalog: (
    _id: string,
    windowsCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteWindowsCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: WindowsCatalogContextType = {
  windowsCatalogs: [],
  countWindowsCatalog: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllWindowsCatalogs: () => {},
  getWindowsCatalogById: async () => undefined,
  createWindowsCatalog: async () =>
    ({ data: { windowsCatalog: null } }) as AxiosResponse,
  updateWindowsCatalog: async () =>
    ({ data: { windowsCatalog: null } }) as AxiosResponse,
  deleteWindowsCatalog: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const WindowsCatalogContext =
  createContext<WindowsCatalogContextType>(defaultContextValue);

export const WindowsCatalogProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [windowsCatalogs, setWindowsCatalog] = useState<IWindowsCatalog[]>([]);
  const [countWindowsCatalog, setCountWindowsCatalog] = useState<number>(0);
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

  // Get All WindowsCatalog
  const getAllWindowsCatalogs = useCallback(() => {
    fetchData(
      getAllWindowsCatalogsApi,
      data => {setWindowsCatalog(data?.windowsCatalogs || [])
        setCountWindowsCatalog(data?.count || 0)
      },
      'getAll'
    );
  }, []);

  // Get WindowsCatalog By Id
  const getWindowsCatalogById = useCallback(
    async (id: string): Promise<IWindowsCatalog | undefined> => {
      const cachedWindowsCatalog = windowsCatalogs.find(wc => wc._id === id);
      if (cachedWindowsCatalog) return cachedWindowsCatalog;
      const response = await fetchData(
        () => getWindowsCatalogByIdApi(id),
        data => {
          if (data?.wc) {
            setWindowsCatalog(prevWindowsCatalog => [
              ...prevWindowsCatalog,
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

  // Create WindowsCatalog
  const createWindowsCatalog = useCallback(
    async (windowsCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createWindowsCatalogApi(windowsCatalogData),
        data => {
          if (data?.wc) {
            setWindowsCatalog(prevWindowsCatalog => [
              ...prevWindowsCatalog,
              data?.wc
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update WindowsCatalog
  const updateWindowsCatalog = useCallback(
    async (
      _id: string,
      windowsCatalogData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateWindowsCatalogApi(_id, windowsCatalogData),
        data => {
          if (data?.windowsCatalogData) {
            setWindowsCatalog(prevWindowsCatalog =>
              prevWindowsCatalog.map(wc => (wc._id === _id ? data?.windowsCatalogData : wc))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete WindowsCatalog
  const deleteWindowsCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteWindowsCatalogApi(id),
        () =>
          setWindowsCatalog(prevWindowsCatalog =>
            prevWindowsCatalog.filter(wc => wc._id !== id)
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
    <WindowsCatalogContext.Provider
      value={{
        windowsCatalogs,
        countWindowsCatalog,
        loading,
        error,
        getAllWindowsCatalogs,
        getWindowsCatalogById,
        createWindowsCatalog,
        updateWindowsCatalog,
        deleteWindowsCatalog
      }}
    >
      {children}
    </WindowsCatalogContext.Provider>
  );
};
