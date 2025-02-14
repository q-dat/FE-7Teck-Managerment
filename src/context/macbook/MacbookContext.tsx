import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
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
  countMacbook: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllMacbook: () => void;
  getMacbookById: (_id: string) => Promise<IMacbook | undefined>;
  createMacbook: (macbookData: FormData) => Promise<AxiosResponse<any>>;
  updateMacbook: (
    _id: string,
    macbookData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateMacbookView: (_id: string) => Promise<void>;
  deleteMacbook: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: MacbookContextType = {
  macbook: [],
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

export const MacbookContext =
  createContext<MacbookContextType>(defaultContextValue);

export const MacbookProvider = ({ children }: { children: ReactNode }) => {
  const [macbook, setMacbook] = useState<IMacbook[]>([]);
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
  const getAllMacbook = useCallback(() => {
    fetchData(
      getAllMacbookApi,
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
      const cachedMacbook = macbook.find(m => m._id === id);
      if (cachedMacbook) return cachedMacbook;
      const response = await fetchData(
        () => getMacbookByIdApi(id),
        data => {
          if (data?.m) {
            setMacbook(prevLaptopMacbook => [...prevLaptopMacbook, data.m]);
          }
        },
        'getAll'
      );
      return response.data?.m;
    },
    [macbook]
  );

  // Create Macbook
  const createMacbook = useCallback(
    async (macbookData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createMacbookApi(macbookData),
        data => {
          if (data?.macbookData) {
            setMacbook(prevLaptopMacbook => [
              ...prevLaptopMacbook,
              data?.macbookData
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Macbook
  const updateMacbook = useCallback(
    async (_id: string, macbookData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateMacbookApi(_id, macbookData),
        data => {
          if (data?.macbookData) {
            setMacbook(prevLaptopMacbook =>
              prevLaptopMacbook.map(m =>
                m._id === _id ? data?.macbookData : m
              )
            );
          }
        },
        'update'
      );
    },
    []
  );
  // updateMacbookView
  const updateMacbookView = useCallback(
    async (_id: string) => {
      try {
        const laptopMacbook = macbook.find(m => m._id === _id);
        if (!laptopMacbook) return;

        const updatedData = new FormData();
        updatedData.append(
          'view',
          String((laptopMacbook.macbook_view ?? 0) + 1)
        );

        await fetchData(
          () => updateMacbookApi(_id, updatedData),
          data => {
            if (data?.updatedData) {
              setMacbook(prevLaptopMacbook =>
                prevLaptopMacbook.map(m =>
                  m._id === _id ? data.updatedData : m
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
    [macbook]
  );

  // Delete Macbook
  const deleteMacbook = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteMacbookApi(id),
        () =>
          setMacbook(prevLaptopMacbook =>
            prevLaptopMacbook.filter(m => m._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllMacbook();
  }, [getAllMacbook]);

  return (
    <MacbookContext.Provider
      value={{
        macbook,
        countMacbook,
        loading,
        error,
        getAllMacbook,
        getMacbookById,
        createMacbook,
        updateMacbook,
        updateMacbookView,
        deleteMacbook
      }}
    >
      {children}
    </MacbookContext.Provider>
  );
};
