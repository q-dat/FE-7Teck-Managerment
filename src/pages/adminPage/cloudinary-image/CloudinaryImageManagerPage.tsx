import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { CloudinaryImageContext } from '../../../context/cloudinary-image/CloudinaryImageContext';
import { Toastify } from '../../../helper/Toastify';
import { ICloudinaryImage } from '../../../types/type/cloudinary/cloudinary-image';

const folderOptions = ['', 'products', 'phones', 'posts', 'tablets', 'macbooks', 'windows'];
const maxResultOptions = [50, 100, 200, 500];

type DeleteMode = 'single' | 'multiple';
type DragSelectMode = 'select' | 'deselect';

interface DeleteState {
    mode: DeleteMode;
    images: ICloudinaryImage[];
}

interface DeleteImageModalProps {
    deleteState: DeleteState | null;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const controlClass =
    'h-11 min-h-11 w-full rounded-2xl border-gray-100 bg-white text-sm text-black focus:outline-none dark:border-white/10 dark:bg-gray-800 dark:text-white';

const buttonControlClass = 'h-11 min-h-11 rounded-2xl text-sm font-semibold';

const formatDateTime = (value: string): string => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString('vi-VN');
};

const formatTotalSize = (bytes: number): string => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';

    const sizeMb = bytes / 1024 / 1024;

    return `${sizeMb.toFixed(sizeMb >= 10 ? 1 : 2)} MB`;
};

const DeleteImageModal: React.FC<DeleteImageModalProps> = ({ deleteState, loading, onClose, onConfirm }) => {
    if (!deleteState) return null;

    const isMultiple = deleteState.mode === 'multiple';
    const images = deleteState.images;
    const firstImage = images[0];
    const previewImages = images.slice(0, 6);

    if (!firstImage) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm">
            <div
                onClick={e => e.stopPropagation()}
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
            >
                {isMultiple ? (
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-2 dark:bg-gray-800">
                        {previewImages.map(image => (
                            <div key={image.publicId} className="aspect-square overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700">
                                <img src={image.secureUrl} alt={image.filename} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                        <img src={firstImage.secureUrl} alt={firstImage.filename} className="h-full w-full object-cover" />
                    </div>
                )}

                <div className="p-4">
                    <p className="text-lg font-bold text-black dark:text-white">
                        {isMultiple ? `Xóa ${images.length} ảnh Cloudinary?` : 'Xóa ảnh Cloudinary?'}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-300">
                        Ảnh sẽ bị xóa khỏi Cloudinary. Không nên xóa nếu ảnh đang được sản phẩm hoặc bài viết sử dụng.
                    </p>

                    <div className="mt-3 rounded-2xl bg-gray-50 p-3 text-xs dark:bg-gray-800">
                        {isMultiple ? (
                            <>
                                <p className="font-semibold text-black dark:text-white">Đã chọn {images.length} ảnh</p>
                                <p className="mt-1 text-gray-500 dark:text-gray-400">Chỉ hiển thị tối đa 6 ảnh xem trước trong modal.</p>
                            </>
                        ) : (
                            <>
                                <p className="line-clamp-1 font-semibold text-black dark:text-white">{firstImage.filename}</p>
                                <p className="mt-1 line-clamp-1 text-gray-500 dark:text-gray-400">{firstImage.publicId}</p>
                            </>
                        )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button type="button" onClick={onClose} disabled={loading} className={`${buttonControlClass} border-gray-100 text-black dark:text-white`}>
                            Hủy
                        </Button>

                        <Button type="button" color="error" onClick={onConfirm} disabled={loading} className={`${buttonControlClass} text-white`}>
                            {loading ? 'Đang xóa...' : 'Xác nhận xóa'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CloudinaryImageManagerPage: React.FC = () => {
    const {
        images,
        totalCount,
        nextCursor,
        loading,
        error,
        getCloudinaryImages,
        deleteCloudinaryImages,
        resetCloudinaryImages
    } = useContext(CloudinaryImageContext);

    const [folder, setFolder] = useState<string>('products');
    const [keyword, setKeyword] = useState<string>('');
    const [maxResults, setMaxResults] = useState<number>(100);
    const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
    const [deleteState, setDeleteState] = useState<DeleteState | null>(null);

    const dragSelectModeRef = useRef<DragSelectMode | null>(null);

    const selectedUrlSet = useMemo(() => new Set(selectedUrls), [selectedUrls]);

    const selectedImages = useMemo(() => {
        return images.filter(image => selectedUrlSet.has(image.secureUrl));
    }, [images, selectedUrlSet]);

    const isAllVisibleSelected = images.length > 0 && images.every(image => selectedUrlSet.has(image.secureUrl));

    const imageStats = useMemo(() => {
        const totalSize = images.reduce((total, image) => total + image.bytes, 0);

        return {
            currentCount: images.length,
            totalSizeText: formatTotalSize(totalSize)
        };
    }, [images]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setSelectedUrls([]);

            void getCloudinaryImages({
                folder: folder || undefined,
                keyword: keyword.trim() || undefined,
                maxResults
            });
        }, 350);

        return () => {
            window.clearTimeout(timer);
        };
    }, [folder, keyword, maxResults, getCloudinaryImages]);

    useEffect(() => {
        const stopDragSelecting = () => {
            dragSelectModeRef.current = null;
        };

        window.addEventListener('mouseup', stopDragSelecting);

        return () => {
            window.removeEventListener('mouseup', stopDragSelecting);
        };
    }, []);

    useEffect(() => {
        return () => {
            resetCloudinaryImages();
        };
    }, [resetCloudinaryImages]);

    const loadMoreImages = async () => {
        if (!nextCursor) return;

        await getCloudinaryImages(
            {
                folder: folder || undefined,
                keyword: keyword.trim() || undefined,
                maxResults,
                nextCursor
            },
            true
        );
    };

    const updateSelectedImage = (imageUrl: string, mode: DragSelectMode) => {
        setSelectedUrls(prevUrls => {
            const alreadySelected = prevUrls.includes(imageUrl);

            if (mode === 'select') {
                if (alreadySelected) return prevUrls;

                return [...prevUrls, imageUrl];
            }

            if (!alreadySelected) return prevUrls;

            return prevUrls.filter(url => url !== imageUrl);
        });
    };

    const handleCardMouseDown = (event: React.MouseEvent<HTMLDivElement>, imageUrl: string) => {
        const target = event.target as HTMLElement;

        if (target.closest('[data-ignore-drag-select="true"]')) {
            return;
        }

        event.preventDefault();

        const nextMode: DragSelectMode = selectedUrlSet.has(imageUrl) ? 'deselect' : 'select';

        dragSelectModeRef.current = nextMode;
        updateSelectedImage(imageUrl, nextMode);
    };

    const handleCardMouseEnter = (imageUrl: string) => {
        if (!dragSelectModeRef.current) return;

        updateSelectedImage(imageUrl, dragSelectModeRef.current);
    };

    const toggleSelectAllVisible = () => {
        if (isAllVisibleSelected) {
            setSelectedUrls([]);
            return;
        }

        setSelectedUrls(images.map(image => image.secureUrl));
    };

    const copyText = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            Toastify('Đã copy link ảnh!', 200);
        } catch {
            Toastify('Không thể copy link ảnh!', 400);
        }
    };

    const openDeleteSingleModal = (image: ICloudinaryImage) => {
        setDeleteState({
            mode: 'single',
            images: [image]
        });
    };

    const openDeleteMultipleModal = () => {
        if (selectedImages.length === 0) {
            Toastify('Vui lòng chọn ảnh cần xóa!', 400);
            return;
        }

        setDeleteState({
            mode: 'multiple',
            images: selectedImages
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteState) return;

        const urls = deleteState.images.map(image => image.secureUrl);

        if (urls.length === 0) return;

        try {
            await deleteCloudinaryImages(urls);
            setSelectedUrls(prevUrls => prevUrls.filter(url => !urls.includes(url)));
            setDeleteState(null);
            Toastify(deleteState.mode === 'multiple' ? 'Xóa nhiều ảnh Cloudinary thành công!' : 'Xóa ảnh Cloudinary thành công!', 200);
        } catch {
            Toastify('Xóa ảnh Cloudinary thất bại!', 500);
        }
    };

    const renderImageCard = (image: ICloudinaryImage) => {
        const isSelected = selectedUrlSet.has(image.secureUrl);

        return (
            <div
                key={image.publicId}
                onMouseDown={event => handleCardMouseDown(event, image.secureUrl)}
                onMouseEnter={() => handleCardMouseEnter(image.secureUrl)}
                className={`group cursor-pointer select-none overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:bg-gray-900 ${isSelected ? 'border-primary bg-primary/5 ring-2 ring-primary/40 dark:bg-primary/10' : 'border-gray-100 dark:border-white/10'
                    }`}
            >
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={image.secureUrl}
                        alt={image.filename}
                        loading="lazy"
                        draggable={false}
                        className={`h-full w-full object-cover transition-all duration-300 ${isSelected ? 'scale-105 blur-[2px] brightness-75' : 'group-hover:scale-105'
                            }`}
                    />

                    {isSelected && (
                        <>
                            <div className="absolute inset-0 bg-primary/20" />

                            <div className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow">
                                Đã chọn
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-primary shadow-lg dark:bg-gray-950/90">
                                    ✓
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        type="button"
                        data-ignore-drag-select="true"
                        onClick={() => openDeleteSingleModal(image)}
                        className="absolute right-2 top-2 h-7 min-h-7 rounded-full bg-red-500 px-3 text-[10px] font-bold text-white shadow-lg transition-all duration-200 hover:bg-red-600"
                    >
                        Xóa
                    </button>

                    <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase text-white">
                        {image.format}
                    </div>

                    <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                        {image.width}x{image.height}
                    </div>
                </div>

                <div className="space-y-1.5 p-2">
                    <p className="line-clamp-1 text-xs font-bold text-black dark:text-white">{image.filename}</p>

                    <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                        <span className="line-clamp-1">{image.folder || 'root'}</span>
                        <span className="shrink-0 font-semibold text-black dark:text-white">{image.sizeText}</span>
                    </div>

                    <p className="line-clamp-1 text-[10px] text-gray-400">{image.publicId}</p>

                    <p className="text-[10px] text-gray-400">{formatDateTime(image.createdAt)}</p>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                            type="button"
                            data-ignore-drag-select="true"
                            onClick={() => copyText(image.secureUrl)}
                            className="h-8 min-h-8 rounded-xl bg-primary px-2 text-[11px] font-semibold text-white transition-all duration-200 hover:opacity-90"
                        >
                            Copy
                        </button>

                        <a
                            href={image.secureUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-ignore-drag-select="true"
                            className="flex h-8 min-h-8 items-center justify-center rounded-xl border border-gray-100 bg-white px-2 text-center text-[11px] font-semibold text-black transition-all duration-200 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                            Xem
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 dark:bg-gray-950">
            <div className="sticky top-0 z-40 rounded-3xl border border-gray-100 bg-white/95 p-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/95">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h1 className="text-base font-bold text-black dark:text-white xl:text-lg">Quản lý ảnh Cloudinary</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Click vào ảnh để chọn hoặc bỏ chọn. Giữ chuột và vuốt qua ảnh để chọn nhiều ảnh nhanh.
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] xl:flex xl:items-center">
                            <div className="rounded-2xl bg-gray-100 px-2 py-1.5 dark:bg-gray-800">
                                <p className="font-bold text-black dark:text-white">{imageStats.currentCount}</p>
                                <p className="text-gray-500 dark:text-gray-400">Hiển thị</p>
                            </div>

                            <div className="rounded-2xl bg-gray-100 px-2 py-1.5 dark:bg-gray-800">
                                <p className="font-bold text-black dark:text-white">{totalCount ?? '---'}</p>
                                <p className="text-gray-500 dark:text-gray-400">Tổng</p>
                            </div>

                            <div className="rounded-2xl bg-gray-100 px-2 py-1.5 dark:bg-gray-800">
                                <p className="font-bold text-black dark:text-white">{imageStats.totalSizeText}</p>
                                <p className="text-gray-500 dark:text-gray-400">Dung lượng</p>
                            </div>

                            <div className="rounded-2xl bg-primary/10 px-2 py-1.5 dark:bg-white/10">
                                <p className="font-bold text-primary dark:text-white">{selectedUrls.length}</p>
                                <p className="text-gray-500 dark:text-gray-400">Đã chọn</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-[170px_1fr_130px_130px_130px]">
                        <Select value={folder} onChange={e => setFolder(e.target.value)} className={controlClass}>
                            {folderOptions.map(item => (
                                <option key={item || 'all'} value={item}>
                                    {item ? item : 'Tất cả folder'}
                                </option>
                            ))}
                        </Select>

                        <Input
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            placeholder="Tìm publicId..."
                            className={`${controlClass} placeholder:text-gray-400`}
                        />

                        <Select value={maxResults} onChange={e => setMaxResults(Number(e.target.value))} className={controlClass}>
                            {maxResultOptions.map(item => (
                                <option key={item} value={item}>
                                    {item} ảnh
                                </option>
                            ))}
                        </Select>

                        <Button type="button" onClick={toggleSelectAllVisible} className={`${buttonControlClass} border-gray-100 text-black dark:text-white`}>
                            {isAllVisibleSelected ? 'Bỏ chọn' : 'Chọn tất cả'}
                        </Button>

                        <Button
                            type="button"
                            color="error"
                            className={`${buttonControlClass} text-white`}
                            disabled={loading.delete || selectedUrls.length === 0}
                            onClick={openDeleteMultipleModal}
                        >
                            {loading.delete ? 'Đang xóa' : `Xóa ${selectedUrls.length || ''}`}
                        </Button>
                    </div>

                    {loading.getAll && <p className="text-xs font-medium text-primary">Đang tải ảnh...</p>}
                    {error && <p className="rounded-xl bg-red-50 px-2 py-1.5 text-sm font-medium text-red-500">{error}</p>}
                </div>
            </div>

            <div className="pt-2">
                {images.length === 0 && !loading.getAll ? (
                    <div className="rounded-3xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300">
                        Chưa có ảnh Cloudinary để hiển thị.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
                        {images.map(image => renderImageCard(image))}
                    </div>
                )}

                <div className="flex justify-center py-4">
                    {nextCursor ? (
                        <Button
                            type="button"
                            color="primary"
                            className={`${buttonControlClass} px-5 text-white`}
                            disabled={loading.getAll}
                            onClick={loadMoreImages}
                        >
                            {loading.getAll ? 'Đang tải...' : 'Tải thêm ảnh'}
                        </Button>
                    ) : (
                        images.length > 0 && <p className="text-xs text-gray-400">Đã tải hết danh sách hiện tại.</p>
                    )}
                </div>
            </div>

            <DeleteImageModal
                deleteState={deleteState}
                loading={loading.delete}
                onClose={() => setDeleteState(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default CloudinaryImageManagerPage;