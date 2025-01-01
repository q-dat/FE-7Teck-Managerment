import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import {
  getAllPhoneCatalogsApi,
  createPhoneCatalogApi,
  updatePhoneCatalogApi,
  deletePhoneCatalogApi
} from '../../axios/api/phoneCatalogApi';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phoneCatalog';

interface PhoneContextType {
  phoneCatalogs: IPhoneCatalog[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPhoneCatalogs: () => void;
  getPhoneCatalogById: (_id: string) => IPhoneCatalog | undefined;
  createPhoneCatalog: (phone: FormData) => Promise<AxiosResponse<any>>;
  updatePhoneCatalog: (
    _id: string,
    phone: FormData
  ) => Promise<AxiosResponse<any>>;
  deletePhoneCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PhoneContextType = {
  phoneCatalogs: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPhoneCatalogs: () => {},
  getPhoneCatalogById: () => undefined,
  createPhoneCatalog: async () =>
    ({ data: { phoneCatalog: null } }) as AxiosResponse,
  updatePhoneCatalog: async () =>
    ({ data: { phoneCatalog: null } }) as AxiosResponse,
  deletePhoneCatalog: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PhoneCatalogContext =
  createContext<PhoneContextType>(defaultContextValue);

export const PhoneCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [phoneCatalogs, setPhoneCatalogs] = useState<IPhoneCatalog[]>([]);
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

  // Get All Phones
  const getAllPhoneCatalogs = useCallback(() => {
    fetchData(
      getAllPhoneCatalogsApi,
      data => setPhoneCatalogs(data?.phoneCatalogs || []),
      'getAll'
    );
  }, []);

  // Get Phone By Id
  const getPhoneCatalogById = useCallback(
    (id: string) => {
      return phoneCatalogs.find(phoneCatalog => phoneCatalog._id === id);
    },
    [phoneCatalogs]
  );

  // Create Phone
  const createPhoneCatalog = useCallback(
    async (phoneCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPhoneCatalogApi(phoneCatalogData),
        data => {
          if (data?.phoneCatalog) {
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

  // Update Phone
  const updatePhoneCatalog = useCallback(
    async (
      _id: string,
      phoneCatalog: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePhoneCatalogApi(_id, phoneCatalog),
        data => {
          if (data?.phoneCatalog) {
            setPhoneCatalogs(prevPhoneCatalogs =>
              prevPhoneCatalogs.map(prod =>
                prod._id === _id ? data?.phoneCatalog : prod
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Phone
  const deletePhoneCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePhoneCatalogApi(id),
        () =>
          setPhoneCatalogs(prevPhoneCatalogs =>
            prevPhoneCatalogs.filter(phoneCatalog => phoneCatalog._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPhoneCatalogs();
  }, [getAllPhoneCatalogs]);

  return (
    <PhoneCatalogContext.Provider
      value={{
        phoneCatalogs,
        loading,
        error,
        getAllPhoneCatalogs,
        getPhoneCatalogById,
        createPhoneCatalog,
        updatePhoneCatalog,
        deletePhoneCatalog
      }}
    >
      {children}
    </PhoneCatalogContext.Provider>
  );
};

