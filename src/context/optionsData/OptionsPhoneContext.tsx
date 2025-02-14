import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import { IOptionPhoneData } from '../../types/type/optionsData/optionsPhoneData';
import {
  getAllOptionPhonesApi,
  getOptionPhoneByIdApi,
  createOptionPhoneApi,
  updateOptionPhoneApi,
  deleteOptionPhoneApi
} from '../../axios/api/optionsDataApi/optionsPhoneApi';

interface OptionPhoneContextType {
  optionPhones: IOptionPhoneData[];
  countOptionPhoneData: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllOptionPhones: () => void;
  getOptionPhoneById: (_id: string) => Promise<IOptionPhoneData | undefined>;
  createOptionPhone: (phoneOptionData: FormData) => Promise<AxiosResponse<any>>;
  updateOptionPhone: (
    _id: string,
    optionPhoneData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteOptionPhone: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: OptionPhoneContextType = {
  optionPhones: [],
  countOptionPhoneData: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllOptionPhones: () => {},
  getOptionPhoneById: async () => undefined,
  createOptionPhone: async () =>
    ({ data: { optionPhones: null } }) as AxiosResponse,
  updateOptionPhone: async () =>
    ({ data: { optionPhones: null } }) as AxiosResponse,
  deleteOptionPhone: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const OptionPhoneContext =
  createContext<OptionPhoneContextType>(defaultContextValue);

export const OptionPhoneProvider = ({ children }: { children: ReactNode }) => {
  const [optionPhones, setOptionPhones] = useState<IOptionPhoneData[]>([]);
  const [countOptionPhoneData, setCountOptionPhoneData] = useState<number>(0);
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

  // Get All OptionPhones
  const getAllOptionPhones = useCallback(() => {
    fetchData(
      getAllOptionPhonesApi,
      data => {
        setOptionPhones(data?.optionPhones || []);
        setCountOptionPhoneData(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get OptionPhone By Id
  const getOptionPhoneById = useCallback(
    async (id: string): Promise<IOptionPhoneData | undefined> => {
      const cachedOptionPhone = optionPhones.find(op => op._id === id);
      if (cachedOptionPhone) return cachedOptionPhone;
      const response = await fetchData(
        () => getOptionPhoneByIdApi(id),
        data => {
          if (data?.op) {
            setOptionPhones(prevOptionPhones => [...prevOptionPhones, data.p]);
          }
        },
        'getAll'
      );
      return response.data?.op;
    },
    [optionPhones]
  );

  // Create OptionPhone
  const createOptionPhone = useCallback(
    async (optionPhoneData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createOptionPhoneApi(optionPhoneData),
        data => {
          if (data?.op) {
            setOptionPhones(prevOptionPhones => [
              ...prevOptionPhones,
              data?.op
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update OptionPhone
  const updateOptionPhone = useCallback(
    async (
      _id: string,
      optionPhoneData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateOptionPhoneApi(_id, optionPhoneData),
        data => {
          if (data?.optionPhoneData) {
            setOptionPhones(prevOptionPhones =>
              prevOptionPhones.map(op =>
                op._id === _id ? data?.optionPhoneData : op
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete OptionPhone
  const deleteOptionPhone = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteOptionPhoneApi(id),
        () =>
          setOptionPhones(prevOptionPhones =>
            prevOptionPhones.filter(op => op._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllOptionPhones();
  }, [getAllOptionPhones]);

  return (
    <OptionPhoneContext.Provider
      value={{
        optionPhones,
        countOptionPhoneData,
        loading,
        error,
        getAllOptionPhones,
        getOptionPhoneById,
        createOptionPhone,
        updateOptionPhone,
        deleteOptionPhone
      }}
    >
      {children}
    </OptionPhoneContext.Provider>
  );
};
