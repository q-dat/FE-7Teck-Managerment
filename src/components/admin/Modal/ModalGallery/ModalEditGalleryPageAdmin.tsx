import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { IGallery } from '../../../../types/type/gallery/gallery';
import { GalleryContext } from '../../../../context/gallery/GalleryContext';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  galleryId: string;
}

const ModalEditGalleryPageAdmin: React.FC<ModalEditPageAdminProps> = ({
  isOpen,
  onClose,
  galleryId
}) => {
  const { loading, gallerys, getAllGallerys, updateGallery } =
    useContext(GalleryContext);
  const isLoading = loading.update;
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<IGallery>();

  const [existingGallery, setExistingGallery] = useState<string[] | undefined>(
    []
  );

  useEffect(() => {
    const galleryData = gallerys.find(gallery => gallery._id === galleryId);
    if (galleryData) {
      setValue('name', galleryData.name);
      setValue('gallery', galleryData.gallery);
      setValue('des', galleryData.des);
      setValue('createdAt', galleryData.createdAt);
      setValue('updatedAt', galleryData.updatedAt);

      setExistingGallery(galleryData.gallery);
    }
  }, [gallerys, galleryId, setValue]);

  const onSubmit: SubmitHandler<IGallery> = async formData => {
    const data = new FormData();

    data.append('name', formData.name || '');
    data.append('des', formData.des || '');

    // Thêm nhiều ảnh thu nhỏ
    const galleryFiles = watch('gallery');
    if (galleryFiles && galleryFiles.length > 0) {
      Array.from(galleryFiles).forEach(file => {
        data.append('gallery', file);
      });
    } else if (existingGallery && existingGallery.length > 0) {
      existingGallery.forEach(gallery => {
        data.append('gallery', gallery);
      });
    }

    try {
      await updateGallery(galleryId, data);
      reset();
      getAllGallerys();
      Toastify('Sản phẩm đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllGallerys();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="font-bold text-black dark:text-white">
            Cập nhật hình ảnh
          </p>

          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tên hình ảnh'} />
              <InputModal
                type="text"
                {...register('name')}
                placeholder="Tên hình ảnh"
              />
              <LabelForm title={'Mô tả'} />
              <InputModal
                type="text"
                {...register('des')}
                placeholder="Mô tả"
              />
              <LabelForm title={'Hình ảnh'} />
              {existingGallery && existingGallery.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                  {existingGallery.map((gallery, index) => (
                    <img
                      key={index}
                      src={gallery}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              <InputModal
                type="file"
                {...register('gallery')}
                placeholder="Chèn hình ảnh"
                multiple
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditGalleryPageAdmin;
