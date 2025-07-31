import { createContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { IMacbook } from '../../types/type/macbook/macbook';
import {
  getAllMacbookApi,
  getMacbookByIdApi,
  createMacbookApi,
  updateMacbookApi,
  deleteMacbookApi
} from '../../axios/api/macbookApi';

interface MacbookContextType {
  macbook: IMacbook[];
  macbookDetails: { [key: string]: IMacbook };
  countMacbook: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllMacbook: (filter?: { macbook_status?: number }) => void;
  getMacbookById: (_id: string) => Promise<IMacbook | undefined>;
  createMacbook: (macbookData: FormData) => Promise<AxiosResponse<any>>;
  updateMacbook: (_id: string, macbookData: FormData) => Promise<AxiosResponse<any>>;
  updateMacbookView: (_id: string) => Promise<void>;
  deleteMacbook: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: MacbookContextType = {
  macbook: [],
  macbookDetails: {},
  countMacbook: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllMacbook: () => {},
  getMacbookById: async () => undefined,
  createMacbook: async () => ({ data: { macbook: null } }) as AxiosResponse,
  updateMacbook: async () => ({ data: { macbook: null } }) as AxiosResponse,
  updateMacbookView: async () => Promise.resolve(),
  deleteMacbook: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const MacbookContext = createContext<MacbookContextType>(defaultContextValue);

export const MacbookProvider = ({ children }: { children: ReactNode }) => {
  const [macbook, setMacbook] = useState<IMacbook[]>([]);
  const [macbookDetails, setMacbookDetails] = useState<{
    [key: string]: IMacbook;
  }>({});
  const [countMacbook, setCountMacbook] = useState<number>(0);
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

  // Get All Macbook
  const getAllMacbook = useCallback(async (filter?: { macbook_status?: number }) => {
    await fetchData(
      () => getAllMacbookApi(filter),
      data => {
        setMacbook(data?.macbook || []);
        setCountMacbook(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Macbook By Id
  const getMacbookById = useCallback(
    async (id: string): Promise<IMacbook | undefined> => {
      if (macbookDetails[id]) {
        return macbookDetails[id];
      }

      try {
        const response = await getMacbookByIdApi(id);
        const phone = response.data?.macbook;
        if (phone) {
          setMacbookDetails(prev => ({ ...prev, [id]: phone }));
          return phone;
        }
      } catch (error) {
        handleError(error);
      }
      return undefined;
    },
    [macbookDetails]
  );

  // Create Macbook
  const createMacbook = useCallback(async (macbookData: FormData): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => createMacbookApi(macbookData),
      data => {
        if (data?.macbookData) {
          setMacbook(prevLaptopMacbook => [...prevLaptopMacbook, data?.macbookData]);
        }
      },
      'create'
    );
  }, []);

  // Update Macbook
  const updateMacbook = useCallback(async (_id: string, macbookData: FormData): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => updateMacbookApi(_id, macbookData),
      data => {
        if (data?.macbookData) {
          setMacbook(prevLaptopMacbook => prevLaptopMacbook.map(m => (m._id === _id ? data?.macbookData : m)));
        }
      },
      'update'
    );
  }, []);
  // updateMacbookView
  const updateMacbookView = useCallback(
    async (_id: string) => {
      try {
        // Tìm sản phẩm trong danh sách
        const mac = macbook.find(m => m._id === _id);
        if (!mac) return;

        // Cập nhật nhanh trong UI để tránh delay
        setMacbook(prevLaptopMacbook =>
          prevLaptopMacbook.map(m => (m._id === _id ? { ...m, macbook_view: (m.macbook_view ?? 0) + 1 } : m))
        );

        // Gọi API cập nhật view trên server
        const updatedData = new FormData();
        updatedData.append('macbook_view', String((mac.macbook_view ?? 0) + 1));

        const response = await updateMacbookApi(_id, updatedData);

        // Nếu API thành công, cập nhật lại state với dữ liệu từ server
        if (response.data?.mac) {
          setMacbook(prevLaptopMacbook => prevLaptopMacbook.map(m => (m._id === _id ? response.data.mac : m)));
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật macbook_view:', error);

        // Rollback nếu API thất bại
        setMacbook(prevLaptopMacbook =>
          prevLaptopMacbook.map(m => (m._id === _id ? { ...m, view: (m.macbook_view ?? 0) - 1 } : m))
        );
      }
    },
    [macbook]
  );

  // Delete Macbook
  const deleteMacbook = useCallback(async (id: string): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => deleteMacbookApi(id),
      () => setMacbook(prevLaptopMacbook => prevLaptopMacbook.filter(m => m._id !== id)),
      'delete'
    );
  }, []);

  const value = useMemo(
    () => ({
      macbook,
      macbookDetails,
      countMacbook,
      loading,
      error,
      getAllMacbook,
      getMacbookById,
      createMacbook,
      updateMacbook,
      updateMacbookView,
      deleteMacbook
    }),
    [macbook, macbookDetails, countMacbook, loading, error]
  );
  return <MacbookContext.Provider value={value}>{children}</MacbookContext.Provider>;
};
