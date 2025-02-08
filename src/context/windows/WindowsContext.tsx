import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
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
  const [windows, setWindowss] = useState<IWindows[]>([]);
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
  const getAllWindows = useCallback(() => {
    fetchData(
      getAllWindowsApi,
      data => setWindowss(data?.windows || []),
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
            setWindowss(prevLaptopWindows => [...prevLaptopWindows, data.w]);
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
            setWindowss(prevLaptopWindows => [
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
            setWindowss(prevLaptopWindows =>
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
        const laptopWindows = windows.find(w => w._id === _id);
        if (!laptopWindows) return;

        const updatedData = new FormData();
        updatedData.append(
          'view',
          String((laptopWindows.windows_view ?? 0) + 1)
        );

        await fetchData(
          () => updateWindowsApi(_id, updatedData),
          data => {
            if (data?.updatedData) {
              setWindowss(prevLaptopWindows =>
                prevLaptopWindows.map(w =>
                  w._id === _id ? data.updatedData : w
                )
              );
            }
          },
          'update'
        );
      } catch (error) {
        console.error('Lỗi khi cập nhật view:', error);
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
          setWindowss(prevLaptopWindows =>
            prevLaptopWindows.filter(w => w._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllWindows();
  }, [getAllWindows]);

  return (
    <WindowsContext.Provider
      value={{
        windows,
        loading,
        error,
        getAllWindows,
        getWindowsById,
        createWindows,
        updateWindows,
        updateWindowsView,
        deleteWindows
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};

