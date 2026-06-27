import React from 'react';
import InputModal from '../InputModal';
import LabelForm from '../LabelForm';

type ProductImageEditorProps = {
    mainImageUrl: string;
    mainImagePreviewUrl: string;
    keptThumbnailUrls: string[];
    newThumbnailPreviewUrls: string[];
    onMainImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onThumbnailFilesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveKeptThumbnail: (index: number) => void;
    onRemoveNewThumbnail: (index: number) => void;
    onMoveKeptThumbnail: (index: number, direction: 'up' | 'down') => void;
    hideMainImageInput?: boolean;
};

const ProductImageEditor: React.FC<ProductImageEditorProps> = ({
    mainImageUrl,
    mainImagePreviewUrl,
    keptThumbnailUrls,
    newThumbnailPreviewUrls,
    onMainImageChange,
    onThumbnailFilesChange,
    onRemoveKeptThumbnail,
    onRemoveNewThumbnail,
    onMoveKeptThumbnail,
    hideMainImageInput
}) => {
    return (
        <>
            {!hideMainImageInput && (
                <>
                    <LabelForm title={'Hình ảnh'} />

                    {mainImagePreviewUrl ? (
                        <div className="my-2">
                            <img src={mainImagePreviewUrl} className="h-16 w-16 rounded-md object-cover" />
                        </div>
                    ) : mainImageUrl ? (
                        <div className="my-2">
                            <img src={mainImageUrl} className="h-16 w-16 rounded-md object-cover" />
                        </div>
                    ) : null}

                    <InputModal type="file" accept="image/*" onChange={onMainImageChange} placeholder="Chèn ảnh hình ảnh" />
                </>
            )}

            <LabelForm title={'Ảnh thu nhỏ'} />

            {keptThumbnailUrls.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                    {keptThumbnailUrls.map((thumbnail, index) => (
                        <div key={`${thumbnail}-${index}`} className="flex flex-col items-center gap-1 rounded border p-1">
                            <img src={thumbnail} className="h-12 w-12 rounded-md object-cover" />

                            <span className="text-[10px] text-gray-500">#{index + 1}</span>

                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => onMoveKeptThumbnail(index, 'up')}
                                    className="rounded bg-gray-200 px-1 text-[10px] text-black disabled:opacity-40"
                                >
                                    Lên
                                </button>

                                <button
                                    type="button"
                                    disabled={index === keptThumbnailUrls.length - 1}
                                    onClick={() => onMoveKeptThumbnail(index, 'down')}
                                    className="rounded bg-gray-200 px-1 text-[10px] text-black disabled:opacity-40"
                                >
                                    Xuống
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onRemoveKeptThumbnail(index)}
                                    className="rounded bg-red-500 px-1 text-[10px] text-white"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {newThumbnailPreviewUrls.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                    {newThumbnailPreviewUrls.map((thumbnail, index) => (
                        <div key={`${thumbnail}-${index}`} className="flex flex-col items-center gap-1 rounded border p-1">
                            <img src={thumbnail} className="h-12 w-12 rounded-md object-cover" />

                            <span className="text-[10px] text-green-600">Mới #{index + 1}</span>

                            <button
                                type="button"
                                onClick={() => onRemoveNewThumbnail(index)}
                                className="rounded bg-red-500 px-1 text-[10px] text-white"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <InputModal type="file" accept="image/*" placeholder="Chèn ảnh thu nhỏ" multiple onChange={onThumbnailFilesChange} />
        </>
    );
};

export default ProductImageEditor;