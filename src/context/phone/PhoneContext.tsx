import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import { IPhone } from '../../types/type/phone/phone';
import {
  getAllPhonesApi,
  createPhoneApi,
  updatePhoneApi,
  deletePhoneApi
} from '../../axios/api/phoneApi';

interface PhoneContextType {
  phones: IPhone[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPhones: () => void;
  getPhoneById: (_id: string) => IPhone | undefined;
  createPhone: (phone: FormData) => Promise<AxiosResponse<any>>;
  updatePhone: (_id: string, phone: FormData) => Promise<AxiosResponse<any>>;
  deletePhone: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PhoneContextType = {
  phones: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPhones: () => {},
  getPhoneById: () => undefined,
  createPhone: async () => ({ data: { phone: null } }) as AxiosResponse,
  updatePhone: async () => ({ data: { phone: null } }) as AxiosResponse,
  deletePhone: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PhoneContext =
  createContext<PhoneContextType>(defaultContextValue);

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phones, setPhones] = useState<IPhone[]>([]);
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
  const getAllPhones = useCallback(() => {
    fetchData(getAllPhonesApi, data => setPhones(data?.phones || []), 'getAll');
  }, []);

  // Get Phone By Id
  const getPhoneById = useCallback(
    (id: string) => {
      return phones.find(phone => phone._id === id);
    },
    [phones]
  );

  // Create Phone
  const createPhone = useCallback(
    async (phoneData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPhoneApi(phoneData),
        data => {
          if (data?.phone) {
            setPhones(prevPhones => [...prevPhones, data?.phone]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Phone
  const updatePhone = useCallback(
    async (_id: string, phone: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePhoneApi(_id, phone),
        data => {
          if (data?.phone) {
            setPhones(prevPhones =>
              prevPhones.map(prod => (prod._id === _id ? data?.phone : prod))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Phone
  const deletePhone = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePhoneApi(id),
        () =>
          setPhones(prevPhones => prevPhones.filter(phone => phone._id !== id)),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPhones();
  }, [getAllPhones]);

  return (
    <PhoneContext.Provider
      value={{
        phones,
        loading,
        error,
        getAllPhones,
        getPhoneById,
        createPhone,
        updatePhone,
        deletePhone
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};
