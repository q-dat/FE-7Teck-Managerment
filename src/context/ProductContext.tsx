import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { getAllProductsApi, createProductApi, updateProductApi, deleteProductApi } from '../axios/api/productApi';
import { IProduct } from '../types/type/product/product';

interface ProductContextType {
  products: IProduct[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllProducts: () => void;
  getProductById: (_id: string) => IProduct | undefined;
  createProduct: (product: FormData) => Promise<void>;
  updateProduct: (_id: string, product: FormData) => Promise<void>;
  deleteProduct: (_id: string) => Promise<void>;
}

const defaultContextValue: ProductContextType = {
  products: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllProducts: () => {},
  getProductById: () => undefined,
  createProduct: async () => {},
  updateProduct: async () => {},  
  deleteProduct: async () => {}
};

export const ProductContext = createContext<ProductContextType>(defaultContextValue);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
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

  // Get All Products
  const getAllProducts = useCallback(() => {
    fetchData(
      getAllProductsApi,
      data => setProducts(data.products || []),
      'getAll'
    );
  }, []);

  // Get Product By Id
  const getProductById = useCallback(
    (id: string) => {
      return products.find(product => product._id === id);
    },
    [products]
  );

  // Create Product
  const createProduct = useCallback(
    async (productData: FormData): Promise<void> => {
      await fetchData(
        () => createProductApi(productData), 
        data => {
          if (data.product) {
            setProducts(prevProducts => [...prevProducts, data.product]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Product
  const updateProduct = useCallback(
    async (_id: string, product: FormData): Promise<void> => {  
      await fetchData(
        () => updateProductApi(_id, product), 
        data => {
          if (data.product) {
            setProducts(prevProducts =>
              prevProducts.map(prod => (prod._id === _id ? data.product : prod))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Product
  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteProductApi(id),
      () =>
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== id)
        ),
      'delete'
    );
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct, 
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
