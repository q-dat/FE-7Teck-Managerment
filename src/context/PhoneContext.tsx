import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { getAllPhonesApi, createPhoneApi, updatePhoneApi, deletePhoneApi } from '../axios/api/phoneApi';
import { IPhone } from '../types/type/phone/phone';

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
  createPhone: (phone: FormData) => Promise<void>;
  updatePhone: (_id: string, phone: FormData) => Promise<void>;
  deletePhone: (_id: string) => Promise<void>;
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
  createPhone: async () => {},
  updatePhone: async () => {},  
  deletePhone: async () => {}
};

export const PhoneContext = createContext<PhoneContextType>(defaultContextValue);

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
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
  ) => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All Phones
  const getAllPhones = useCallback(() => {
    fetchData(
      getAllPhonesApi,
      data => setPhones(data.phones || []),
      'getAll'
    );
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
    async (PhoneData: FormData): Promise<void> => {
      await fetchData(
        () => createPhoneApi(PhoneData), 
        data => {
          if (data.phone) {
            setPhones(prevPhones => [...prevPhones, data.phone]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Phone
  const updatePhone = useCallback(
    async (_id: string, phone: FormData): Promise<void> => {  
      await fetchData(
        () => updatePhoneApi(_id, phone), 
        data => {
          if (data.Phone) {
            setPhones(prevPhones =>
              prevPhones.map(prod => (prod._id === _id ? data.phone : prod))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Phone
  const deletePhone = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deletePhoneApi(id),
      () =>
        setPhones(prevPhones =>
          prevPhones.filter(phone => phone._id !== id)
        ),
      'delete'
    );
  }, []);

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
