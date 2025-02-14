import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';

import { ITabletCatalog } from '../../types/type/tablet-catalog/tablet-catalog';
import {
  getTabletCatalogByIdApi,
  createTabletCatalogApi,
  updateTabletCatalogApi,
  deleteTabletCatalogApi,
  getAllTabletCatalogsApi
} from '../../axios/api/tabletCatalogApi';

interface TabletCatalogContextType {
  tabletCatalogs: ITabletCatalog[];
  countTabletCatalog:number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllTabletCatalogs: () => void;
  getTabletCatalogById: (_id: string) => Promise<ITabletCatalog | undefined>;
  createTabletCatalog: (
    tabletCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateTabletCatalog: (
    _id: string,
    tabletCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteTabletCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: TabletCatalogContextType = {
  tabletCatalogs: [],
  countTabletCatalog: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllTabletCatalogs: () => {},
  getTabletCatalogById: async () => undefined,
  createTabletCatalog: async () =>
    ({ data: { tabletCatalog: null } }) as AxiosResponse,
  updateTabletCatalog: async () =>
    ({ data: { tabletCatalog: null } }) as AxiosResponse,
  deleteTabletCatalog: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const TabletCatalogContext =
  createContext<TabletCatalogContextType>(defaultContextValue);

export const TabletCatalogProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [tabletCatalogs, setTabletCatalogs] = useState<ITabletCatalog[]>([]);
  const [countTabletCatalog, setCountTabletCatalog] = useState<number>(0);
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

  // Get All TabletCatalogs
  const getAllTabletCatalogs = useCallback(() => {
    fetchData(
      getAllTabletCatalogsApi,
      data =>{ setTabletCatalogs(data?.tabletCatalogs || [])
        setCountTabletCatalog(data?.count || 0)
      },
      'getAll'
    );
  }, []);

  // Get TabletCatalog By Id
  const getTabletCatalogById = useCallback(
    async (id: string): Promise<ITabletCatalog | undefined> => {
      const cachedTabletCatalog = tabletCatalogs.find(tc => tc._id === id);
      if (cachedTabletCatalog) return cachedTabletCatalog;
      const response = await fetchData(
        () => getTabletCatalogByIdApi(id),
        data => {
          if (data?.tc) {
            setTabletCatalogs(prevTabletCatalogs => [
              ...prevTabletCatalogs,
              data.tc
            ]);
          }
        },
        'getAll'
      );
      return response.data?.tc;
    },
    [tabletCatalogs]
  );

  // Create TabletCatalog
  const createTabletCatalog = useCallback(
    async (tabletCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createTabletCatalogApi(tabletCatalogData),
        data => {
          if (data?.tc) {
            setTabletCatalogs(prevTabletCatalogs => [
              ...prevTabletCatalogs,
              data?.tc
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update TabletCatalog
  const updateTabletCatalog = useCallback(
    async (
      _id: string,
      tabletCatalogData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateTabletCatalogApi(_id, tabletCatalogData),
        data => {
          if (data?.tabletCatalogData) {
            setTabletCatalogs(prevTabletCatalogs =>
              prevTabletCatalogs.map(tc => (tc._id === _id ? data?.tabletCatalogData : tc))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete TabletCatalog
  const deleteTabletCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteTabletCatalogApi(id),
        () =>
          setTabletCatalogs(prevTabletCatalogs =>
            prevTabletCatalogs.filter(tc => tc._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllTabletCatalogs();
  }, [getAllTabletCatalogs]);

  return (
    <TabletCatalogContext.Provider
      value={{
        tabletCatalogs,
        countTabletCatalog,
        loading,
        error,
        getAllTabletCatalogs,
        getTabletCatalogById,
        createTabletCatalog,
        updateTabletCatalog,
        deleteTabletCatalog
      }}
    >
      {children}
    </TabletCatalogContext.Provider>
  );
};

