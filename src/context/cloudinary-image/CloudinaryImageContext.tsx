import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
    CloudinaryDeleteResult,
    CloudinaryImageApiResponse,
    CloudinaryImageQueryParams,
    ICloudinaryImage
} from '../../types/type/cloudinary/cloudinary-image';
import { deleteCloudinaryImagesApi, getCloudinaryImagesApi } from '../../axios/api/cloudinaryImageApi';

type ApiError = {
    response?: {
        data?: {
            message?: string;
            error?: string;
        };
    };
};

interface CloudinaryImageContextType {
    images: ICloudinaryImage[];
    count: number;
    totalCount: number | null;
    nextCursor: string | null;
    cloudinaryResults: CloudinaryDeleteResult[];
    loading: {
        getAll: boolean;
        delete: boolean;
    };
    error: string | null;
    getCloudinaryImages: (params?: CloudinaryImageQueryParams, append?: boolean) => Promise<void>;
    deleteCloudinaryImages: (urls: string[]) => Promise<AxiosResponse<CloudinaryImageApiResponse>>;
    resetCloudinaryImages: () => void;
}

const defaultContextValue: CloudinaryImageContextType = {
    images: [],
    count: 0,
    totalCount: null,
    nextCursor: null,
    cloudinaryResults: [],
    loading: {
        getAll: false,
        delete: false
    },
    error: null,
    getCloudinaryImages: async () => { },
    deleteCloudinaryImages: async () => {
        throw new Error('CloudinaryImageProvider chưa được bọc vào App.');
    },
    resetCloudinaryImages: () => { }
};

export const CloudinaryImageContext = createContext<CloudinaryImageContextType>(defaultContextValue);

export const CloudinaryImageProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<ICloudinaryImage[]>([]);
    const [count, setCount] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [cloudinaryResults, setCloudinaryResults] = useState<CloudinaryDeleteResult[]>([]);
    const [loading, setLoading] = useState({
        getAll: false,
        delete: false
    });
    const [error, setError] = useState<string | null>(null);

    const getErrorMessage = (err: unknown): string => {
        const apiError = err as ApiError;

        return apiError.response?.data?.message || apiError.response?.data?.error || 'Lỗi cục bộ!';
    };

    const getCloudinaryImages = useCallback(async (params?: CloudinaryImageQueryParams, append = false) => {
        setLoading(prev => ({ ...prev, getAll: true }));
        setError(null);

        try {
            const response = await getCloudinaryImagesApi(params);
            const data = response.data;

            setImages(prevImages => {
                const nextImages = data.images || [];

                if (!append) return nextImages;

                const existsPublicIds = new Set(prevImages.map(image => image.publicId));
                const filteredNextImages = nextImages.filter(image => !existsPublicIds.has(image.publicId));

                return [...prevImages, ...filteredNextImages];
            });

            setCount(data.count || 0);
            setTotalCount(data.totalCount ?? null);
            setNextCursor(data.nextCursor || null);
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, getAll: false }));
        }
    }, []);

    const deleteCloudinaryImages = useCallback(async (urls: string[]) => {
        setLoading(prev => ({ ...prev, delete: true }));
        setError(null);

        try {
            const response = await deleteCloudinaryImagesApi(urls);
            const data = response.data;

            setCloudinaryResults(data.cloudinaryResults || []);

            setImages(prevImages => prevImages.filter(image => !urls.includes(image.secureUrl)));

            return response;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, delete: false }));
        }
    }, []);

    const resetCloudinaryImages = useCallback(() => {
        setImages([]);
        setCount(0);
        setTotalCount(null);
        setNextCursor(null);
        setCloudinaryResults([]);
        setError(null);
    }, []);

    const value = useMemo(
        () => ({
            images,
            count,
            totalCount,
            nextCursor,
            cloudinaryResults,
            loading,
            error,
            getCloudinaryImages,
            deleteCloudinaryImages,
            resetCloudinaryImages
        }),
        [
            images,
            count,
            totalCount,
            nextCursor,
            cloudinaryResults,
            loading,
            error,
            getCloudinaryImages,
            deleteCloudinaryImages,
            resetCloudinaryImages
        ]
    );

    return <CloudinaryImageContext.Provider value={value}>{children}</CloudinaryImageContext.Provider>;
};