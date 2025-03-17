import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo
} from 'react';
import { AxiosResponse } from 'axios';

import {
  getAllTabletsApi,
  getTabletByIdApi,
  createTabletApi,
  updateTabletApi,
  deleteTabletApi
} from '../../axios/api/tabletApi';
import { ITablet } from '../../types/type/tablet/tablet';

interface TabletContextType {
  tablets: ITablet[];
  countTablet: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllTablets: () => void;
  getTabletById: (_id: string) => Promise<ITablet | undefined>;
  createTablet: (tabletData: FormData) => Promise<AxiosResponse<any>>;
  updateTablet: (
    _id: string,
    tabletData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateTabletView: (_id: string) => Promise<void>;
  deleteTablet: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: TabletContextType = {
  tablets: [],
  countTablet: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllTablets: () => {},
  getTabletById: async () => undefined,
  createTablet: async () => ({ data: { tablet: null } }) as AxiosResponse,
  updateTablet: async () => ({ data: { tablet: null } }) as AxiosResponse,
  updateTabletView: async () => Promise.resolve(),
  deleteTablet: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const TabletContext =
  createContext<TabletContextType>(defaultContextValue);

export const TabletProvider = ({ children }: { children: ReactNode }) => {
  const [tablets, setTablets] = useState<ITablet[]>([]);
  const [countTablet, setCountTablet] = useState<number>(0);
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

  // Get All Tablets
  const getAllTablets = useCallback(async () => {
    await fetchData(
      getAllTabletsApi,
      data => {
        setTablets(data?.tablets || []);
        setCountTablet(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Tablet By Id
  const getTabletById = useCallback(
    async (id: string): Promise<ITablet | undefined> => {
      const cachedTablet = tablets.find(t => t._id === id);
      if (cachedTablet) return cachedTablet;
      const response = await fetchData(
        () => getTabletByIdApi(id),
        data => {
          if (data?.t) {
            setTablets(prevTablets => [...prevTablets, data.t]);
          }
        },
        'getAll'
      );
      return response.data?.t;
    },
    [tablets]
  );

  // Create Tablet
  const createTablet = useCallback(
    async (tabletData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createTabletApi(tabletData),
        data => {
          if (data?.tabletData) {
            setTablets(prevTablets => [...prevTablets, data?.tabletData]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Tablet
  const updateTablet = useCallback(
    async (_id: string, tabletData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateTabletApi(_id, tabletData),
        data => {
          if (data?.tabletData) {
            setTablets(prevTablets =>
              prevTablets.map(t => (t._id === _id ? data?.tabletData : t))
            );
          }
        },
        'update'
      );
    },
    []
  );
  // updateTabletView
  const updateTabletView = useCallback(
    async (_id: string) => {
      try {
        // Tìm sản phẩm trong danh sách
        const tablet = tablets.find(p => p._id === _id);
        if (!tablet) return;

        // Cập nhật nhanh trong UI để tránh delay
        setTablets(prevTablets =>
          prevTablets.map(t =>
            t._id === _id ? { ...t, tablet_view: (t.tablet_view ?? 0) + 1 } : t
          )
        );

        // Gọi API cập nhật tablet_view trên server
        const updatedData = new FormData();
        updatedData.append(
          'tablet_view',
          String((tablet.tablet_view ?? 0) + 1)
        );

        const response = await updateTabletApi(_id, updatedData);

        // Nếu API thành công, cập nhật lại state với dữ liệu từ server
        if (response.data?.tablet) {
          setTablets(prevTablets =>
            prevTablets.map(t => (t._id === _id ? response.data.tablet : t))
          );
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật tablet_view:', error);

        // Rollback nếu API thất bại
        setTablets(prevTablets =>
          prevTablets.map(t =>
            t._id === _id ? { ...t, tablet_view: (t.tablet_view ?? 0) - 1 } : t
          )
        );
      }
    },
    [tablets]
  );

  // Delete Tablet
  const deleteTablet = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteTabletApi(id),
        () => setTablets(prevTablets => prevTablets.filter(t => t._id !== id)),
        'delete'
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      tablets,
      countTablet,
      loading,
      error,
      getAllTablets,
      getTabletById,
      createTablet,
      updateTablet,
      updateTabletView,
      deleteTablet
    }),
    [tablets, countTablet, loading, error]
  );
  return (
    <TabletContext.Provider value={value}>{children}</TabletContext.Provider>
  );
};
