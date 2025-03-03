import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';

import {
  getAllGallerysApi,
  getGalleryByIdApi,
  createGalleryApi,
  updateGalleryApi,
  deleteGalleryApi
} from '../../axios/api/galleryApi';
import { IGallery } from '../../types/type/gallery/gallery';

interface GalleryContextType {
  galleries: IGallery[];
  countGallery: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllGallerys: () => void;
  getGalleryById: (_id: string) => Promise<IGallery | undefined>;
  createGallery: (galleryData: FormData) => Promise<AxiosResponse<any>>;
  updateGallery: (
    _id: string,
    galleryData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteGallery: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: GalleryContextType = {
  galleries: [],
  countGallery: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllGallerys: () => {},
  getGalleryById: async () => undefined,
  createGallery: async () => ({ data: { gallery: null } }) as AxiosResponse,
  updateGallery: async () => ({ data: { gallery: null } }) as AxiosResponse,
  deleteGallery: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const GalleryContext =
  createContext<GalleryContextType>(defaultContextValue);

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [galleries, setGallerys] = useState<IGallery[]>([]);
  const [countGallery, setCountGallery] = useState(0);
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

  // Get All Galleries
  const getAllGallerys = useCallback(() => {
    fetchData(
      getAllGallerysApi,
      data => {
        setGallerys(data?.galleries || []), setCountGallery(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Gallery By Id
  const getGalleryById = useCallback(
    async (id: string): Promise<IGallery | undefined> => {
      const cachedGallery = galleries.find(gallery => gallery._id === id);
      if (cachedGallery) return cachedGallery;
      const response = await fetchData(
        () => getGalleryByIdApi(id),
        data => {
          if (data?.gallery) {
            setGallerys(prevGallerys => [...prevGallerys, data.gallery]);
          }
        },
        'getAll'
      );
      return response.data?.gallery;
    },
    [galleries]
  );

  // Create Gallery
  const createGallery = useCallback(
    async (galleryData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createGalleryApi(galleryData),
        data => {
          if (data?.gallery) {
            setGallerys(prevGallerys => [...prevGallerys, data?.gallery]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Gallery
  const updateGallery = useCallback(
    async (_id: string, galleryData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateGalleryApi(_id, galleryData),
        data => {
          if (data?.gallery) {
            setGallerys(prevGallerys =>
              prevGallerys.map(prod =>
                prod._id === _id ? data?.gallery : prod
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Gallery
  const deleteGallery = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteGalleryApi(id),
        () =>
          setGallerys(prevGallerys =>
            prevGallerys.filter(gallery => gallery._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllGallerys();
  }, [getAllGallerys]);

  return (
    <GalleryContext.Provider
      value={{
        galleries,
        countGallery,
        loading,
        error,
        getAllGallerys,
        getGalleryById,
        createGallery,
        updateGallery,
        deleteGallery
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
