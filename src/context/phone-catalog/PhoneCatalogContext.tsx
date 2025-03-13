import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { AxiosResponse } from 'axios';
import {
  getAllPhoneCatalogsApi,
  createPhoneCatalogApi,
  updatePhoneCatalogApi,
  deletePhoneCatalogApi,
  getPhoneCatalogByIdApi
} from '../../axios/api/phoneCatalogApi';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

interface PhoneCatalogContextType {
  phoneCatalogs: IPhoneCatalog[];
  countPhoneCatalog: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPhoneCatalogs: () => void;
  getPhoneCatalogById: (_id: string) => Promise<IPhoneCatalog | undefined>;
  createPhoneCatalog: (
    phoneCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  updatePhoneCatalog: (
    _id: string,
    phoneCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  deletePhoneCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PhoneCatalogContextType = {
  phoneCatalogs: [],
  countPhoneCatalog: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPhoneCatalogs: () => {},
  getPhoneCatalogById: async () => undefined,
  createPhoneCatalog: async () =>
    ({ data: { phoneCatalog: null } }) as AxiosResponse,
  updatePhoneCatalog: async () =>
    ({ data: { phoneCatalog: null } }) as AxiosResponse,
  deletePhoneCatalog: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PhoneCatalogContext =
  createContext<PhoneCatalogContextType>(defaultContextValue);

export const PhoneCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [phoneCatalogs, setPhoneCatalogs] = useState<IPhoneCatalog[]>([]);
  const [countPhoneCatalog, setCountPhoneCatalog] = useState<number>(0);
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

  // Get All PhoneCatalogs
  const getAllPhoneCatalogs = useCallback(() => {
    fetchData(
      getAllPhoneCatalogsApi,
      data => {
        setPhoneCatalogs(data?.phoneCatalogs || []);
        setCountPhoneCatalog(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get PhoneCatalog By Id
  const getPhoneCatalogById = useCallback(
    async (id: string): Promise<IPhoneCatalog | undefined> => {
      const cachedPhone = phoneCatalogs.find(pc => pc._id === id);
      if (cachedPhone) return cachedPhone;
      const response = await fetchData(
        () => getPhoneCatalogByIdApi(id),
        data => {
          if (data?.pc) {
            setPhoneCatalogs(prevPhoneCatalogs => [
              ...prevPhoneCatalogs,
              data.pc
            ]);
          }
        },
        'getAll'
      );
      return response.data?.pc;
    },
    [phoneCatalogs]
  );

  // Create PhoneCatalog
  const createPhoneCatalog = useCallback(
    async (phoneCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPhoneCatalogApi(phoneCatalogData),
        data => {
          if (data?.pc) {
            setPhoneCatalogs(prevPhoneCatalogs => [
              ...prevPhoneCatalogs,
              data?.phoneCatalog
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update PhoneCatalog
  const updatePhoneCatalog = useCallback(
    async (
      _id: string,
      phoneCatalogData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePhoneCatalogApi(_id, phoneCatalogData),
        data => {
          if (data?.phoneCatalogData) {
            setPhoneCatalogs(prevPhoneCatalogs =>
              prevPhoneCatalogs.map(pc =>
                pc._id === _id ? data?.phoneCatalogData : pc
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete PhoneCatalog
  const deletePhoneCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePhoneCatalogApi(id),
        () =>
          setPhoneCatalogs(prevPhoneCatalogs =>
            prevPhoneCatalogs.filter(pc => pc._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPhoneCatalogs();
  }, [getAllPhoneCatalogs]);

  const value = useMemo(
    () => ({
      phoneCatalogs,
      countPhoneCatalog,
      loading,
      error,
      getAllPhoneCatalogs,
      getPhoneCatalogById,
      createPhoneCatalog,
      updatePhoneCatalog,
      deletePhoneCatalog
    }),
    [
      phoneCatalogs,
      countPhoneCatalog,
      loading,
      error,
      getAllPhoneCatalogs,
      getPhoneCatalogById,
      createPhoneCatalog,
      updatePhoneCatalog,
      deletePhoneCatalog
    ]
  );
  return (
    <PhoneCatalogContext.Provider value={value}>
      {children}
    </PhoneCatalogContext.Provider>
  );
};
