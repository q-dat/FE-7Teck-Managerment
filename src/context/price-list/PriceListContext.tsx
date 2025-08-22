import { createContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import {
  getAllPriceListsApi,
  getPriceListByIdApi,
  createPriceListApi,
  updatePriceListApi,
  deletePriceListApi
} from '../../axios/api/priceListApi';
import { ICreatePriceListPayload, IPriceListApi } from '../../types/type/price-list/price-list';

interface PriceListsContextType {
  priceLists: IPriceListApi[];
  countPriceList: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPriceLists: () => Promise<void>;
  getPriceListsById: (_id: string) => Promise<IPriceListApi | undefined>;
  createPriceLists: (payload: ICreatePriceListPayload) => Promise<AxiosResponse<IPriceListApi>>;
  updatePriceLists: (_id: string, priceListData: ICreatePriceListPayload) => Promise<AxiosResponse<IPriceListApi>>;
  deletePriceLists: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PriceListsContextType = {
  priceLists: [],
  countPriceList: 0,
  loading: { getAll: false, create: false, update: false, delete: false },
  error: null,
  getAllPriceLists: async () => {},
  getPriceListsById: async () => undefined,
  createPriceLists: async () => Promise.reject(),
  updatePriceLists: async () => Promise.reject(),
  deletePriceLists: async () => Promise.reject()
};

export const PriceListContext = createContext<PriceListsContextType>(defaultContextValue);

export const PriceListProvider = ({ children }: { children: ReactNode }) => {
  const [priceLists, setPriceLists] = useState<IPriceListApi[]>([]);
  const [countPriceList, setCount] = useState<number>(0);
  const [loading, setLoading] = useState({ getAll: false, create: false, update: false, delete: false });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
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

  // Get All
  const getAllPriceLists = useCallback(async () => {
    await fetchData(
      getAllPriceListsApi,
      data => {
        setPriceLists(data.priceLists || []);
        setCount(data.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get By Id
  const getPriceListsById = useCallback(
    async (id: string): Promise<IPriceListApi | undefined> => {
      const cached = priceLists.find(p => p._id === id);
      if (cached) return cached;
      const response = await fetchData(
        () => getPriceListByIdApi(id),
        data => {
          if (data?.priceList) setPriceLists(prev => [...prev, data.priceList]);
        },
        'getAll'
      );
      return response.data?.priceList;
    },
    [priceLists]
  );

  // Create
  const createPriceLists = useCallback(
    async (payload: ICreatePriceListPayload): Promise<AxiosResponse<IPriceListApi>> => {
      return await fetchData(
        () => createPriceListApi(payload),
        data => {
          if (data?.newPriceList) setPriceLists(prev => [...prev, data.newPriceList]);
        },
        'create'
      );
    },
    []
  );

  // Update
const updatePriceLists = useCallback(
  async (_id: string, priceListData: ICreatePriceListPayload): Promise<AxiosResponse<IPriceListApi>> => {
    return await fetchData(
      () => updatePriceListApi(_id, priceListData),
      (data) => {
        if (data?.updatedPriceList) {
          setPriceLists((prev) => prev.map((p) => (p._id === _id ? data.updatedPriceList : p)));
        }
      },
      'update'
    );
  },
  []
);

  // Delete
  const deletePriceLists = useCallback(async (id: string): Promise<AxiosResponse<any>> => {
    return await fetchData(
      () => deletePriceListApi(id),
      () => setPriceLists(prev => prev.filter(p => p._id !== id)),
      'delete'
    );
  }, []);

  const value = useMemo(
    () => ({
      priceLists,
      countPriceList,
      loading,
      error,
      getAllPriceLists,
      getPriceListsById,
      createPriceLists,
      updatePriceLists,
      deletePriceLists
    }),
    [
      priceLists,
      countPriceList,
      loading,
      error,
      getAllPriceLists,
      getPriceListsById,
      createPriceLists,
      updatePriceLists,
      deletePriceLists
    ]
  );

  return <PriceListContext.Provider value={value}>{children}</PriceListContext.Provider>;
};
