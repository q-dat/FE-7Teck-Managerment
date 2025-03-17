import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo
} from 'react';
import { AxiosResponse } from 'axios';
import { IWindows } from '../../types/type/windows/windows';
import {
  getAllWindowsApi,
  getWindowsByIdApi,
  createWindowsApi,
  updateWindowsApi,
  deleteWindowsApi
} from '../../axios/api/windowsApi';

interface WindowsContextType {
  windows: IWindows[];
  countWindows: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllWindows: () => void;
  getWindowsById: (_id: string) => Promise<IWindows | undefined>;
  createWindows: (windowsData: FormData) => Promise<AxiosResponse<any>>;
  updateWindows: (
    _id: string,
    windowsData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateWindowsView: (_id: string) => Promise<void>;
  deleteWindows: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: WindowsContextType = {
  windows: [],
  countWindows: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllWindows: () => {},
  getWindowsById: async () => undefined,
  createWindows: async () => ({ data: { windows: null } }) as AxiosResponse,
  updateWindows: async () => ({ data: { windows: null } }) as AxiosResponse,
  updateWindowsView: async () => Promise.resolve(),
  deleteWindows: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const WindowsContext =
  createContext<WindowsContextType>(defaultContextValue);

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<IWindows[]>([]);
  const [countWindows, setCountWindows] = useState(0);
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

  // Get All Windowss
  const getAllWindows = useCallback(async () => {
    await fetchData(
      getAllWindowsApi,
      data => {
        setWindows(data?.windows || []);
        setCountWindows(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Windows By Id
  const getWindowsById = useCallback(
    async (id: string): Promise<IWindows | undefined> => {
      const cachedWindows = windows.find(w => w._id === id);
      if (cachedWindows) return cachedWindows;
      const response = await fetchData(
        () => getWindowsByIdApi(id),
        data => {
          if (data?.w) {
            setWindows(prevLaptopWindows => [...prevLaptopWindows, data.w]);
          }
        },
        'getAll'
      );
      return response.data?.w;
    },
    [windows]
  );

  // Create Windows
  const createWindows = useCallback(
    async (windowsData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createWindowsApi(windowsData),
        data => {
          if (data?.windowsData) {
            setWindows(prevLaptopWindows => [
              ...prevLaptopWindows,
              data?.windowsData
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Windows
  const updateWindows = useCallback(
    async (_id: string, windowsData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateWindowsApi(_id, windowsData),
        data => {
          if (data?.windowsData) {
            setWindows(prevLaptopWindows =>
              prevLaptopWindows.map(w =>
                w._id === _id ? data?.windowsData : w
              )
            );
          }
        },
        'update'
      );
    },
    []
  );
  // updateWindowsView
  const updateWindowsView = useCallback(
    async (_id: string) => {
      try {
        // Tìm sản phẩm trong danh sách
        const win = windows.find(w => w._id === _id);
        if (!win) return;

        // Cập nhật nhanh trong UI để tránh delay
        setWindows(prevWindows =>
          prevWindows.map(w =>
            w._id === _id
              ? { ...w, windows_view: (w.windows_view ?? 0) + 1 }
              : w
          )
        );

        // Gọi API cập nhật view trên server
        const updatedData = new FormData();
        updatedData.append('windows_view', String((win.windows_view ?? 0) + 1));

        const response = await updateWindowsApi(_id, updatedData);

        // Nếu API thành công, cập nhật lại state với dữ liệu từ server
        if (response.data?.win) {
          setWindows(prevWindows =>
            prevWindows.map(w => (w._id === _id ? response.data.win : w))
          );
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật view:', error);

        // Rollback nếu API thất bại
        setWindows(prevWindows =>
          prevWindows.map(w =>
            w._id === _id ? { ...w, view: (w.windows_view ?? 0) - 1 } : w
          )
        );
      }
    },
    [windows]
  );

  // Delete Windows
  const deleteWindows = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteWindowsApi(id),
        () =>
          setWindows(prevLaptopWindows =>
            prevLaptopWindows.filter(w => w._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      windows,
      countWindows,
      loading,
      error,
      getAllWindows,
      getWindowsById,
      createWindows,
      updateWindows,
      updateWindowsView,
      deleteWindows
    }),
    [windows, countWindows, loading, error]
  );
  return (
    <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
  );
};
