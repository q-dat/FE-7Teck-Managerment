import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import {
  getAllPriceListsApi,
  getPriceListByIdApi,
  createPriceListApi,
  updatePriceListApi,
  deletePriceListApi
} from '../../axios/api/priceListApi';
import { IPriceList } from '../../types/type/price-list/price-list';

interface PriceListsContextType {
  priceLists: IPriceList[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPriceLists: () => void;
  getPriceListsById: (_id: string) => Promise<IPriceList | undefined>;
  createPriceLists: (priceListData: FormData) => Promise<AxiosResponse<any>>;
  updatePriceLists: (
    _id: string,
    priceListData: FormData
  ) => Promise<AxiosResponse<any>>;
  deletePriceLists: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PriceListsContextType = {
  priceLists: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPriceLists: () => {},
  getPriceListsById: async () => undefined,
  createPriceLists: async () =>
    ({ data: { priceList: null } }) as AxiosResponse,
  updatePriceLists: async () =>
    ({ data: { priceList: null } }) as AxiosResponse,
  deletePriceLists: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PriceListsContext =
  createContext<PriceListsContextType>(defaultContextValue);

export const PriceListsProvider = ({ children }: { children: ReactNode }) => {
  const [priceLists, setPriceLists] = useState<IPriceList[]>([]);
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

  // Get All PriceLists
  const getAllPriceLists = useCallback(() => {
    fetchData(
      getAllPriceListsApi,
      data => {
        setPriceLists(data.priceLists || []);
      },
      'getAll'
    );
  }, []);

  // Get PriceLists By Id
  const getPriceListsById = useCallback(
    async (id: string): Promise<IPriceList | undefined> => {
      const cachedPriceLists = priceLists.find(p => p._id === id);
      if (cachedPriceLists) return cachedPriceLists;
      const response = await fetchData(
        () => getPriceListByIdApi(id),
        data => {
          if (data?.p) {
            setPriceLists(prevPriceLists => [...prevPriceLists, data.p]);
          }
        },
        'getAll'
      );
      return response.data?.p;
    },
    [priceLists]
  );

  // Create PriceLists
  const createPriceLists = useCallback(
    async (priceListData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPriceListApi(priceListData),
        data => {
          if (data?.priceListData) {
            setPriceLists(prevPriceLists => [
              ...prevPriceLists,
              data?.priceListData
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update PriceLists
  const updatePriceLists = useCallback(
    async (
      _id: string,
      priceListData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePriceListApi(_id, priceListData),
        data => {
          if (data?.priceListData) {
            setPriceLists(prevPriceLists =>
              prevPriceLists.map(p =>
                p._id === _id ? data?.priceListData : p
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete PriceLists
  const deletePriceLists = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePriceListApi(id),
        () =>
          setPriceLists(prevPriceLists =>
            prevPriceLists.filter(p => p._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPriceLists();
  }, [getAllPriceLists]);

  return (
    <PriceListsContext.Provider
      value={{
        priceLists,
        loading,
        error,
        getAllPriceLists,
        getPriceListsById,
        createPriceLists,
        updatePriceLists,
        deletePriceLists
      }}
    >
      {children}
    </PriceListsContext.Provider>
  );
};
