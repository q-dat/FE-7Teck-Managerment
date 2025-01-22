import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { IGallery } from '../../../../types/type/gallery/gallery';
import { GalleryContext } from '../../../../context/gallery/GalleryContext';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateGalleryPageAdmin: React.FC<ModalCreateAdminProps> = ({
  isOpen,
  onClose
}) => {
  const {loading, createGallery, getAllGallerys } = useContext(GalleryContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<IGallery>();

  const onSubmit: SubmitHandler<IGallery> = async formData => {
    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('des', formData.des || '');

    if (formData.gallery && formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach(file => {
        data.append('gallery', file);
      });
    }

    try {
      await createGallery(data);
      reset();
      getAllGallerys();
      Toastify('Thêm hình ảnh thành công!', 201);
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
          <div>
            <p className="font-bold text-black dark:text-white">
              Thêm hình ảnh mới
            </p>
            <InputModal
              type="text"
              {...register('name')}
              placeholder="Tên hình ảnh (Không bắt buộc)"
            />{' '}
            <InputModal type="text" {...register('des')} placeholder="Mô tả (Không bắt buộc)" />
            <LabelForm title={'Hình ảnh'} />
            <InputModal
              type="file"
              {...register('gallery', { required: true })}
              placeholder="Chèn hình ảnh"
              multiple
            />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
              Hủy
            </Button>
            <Button disabled={isLoading} color="primary" type="submit" className="group text-white">
            {isLoading ? 'Đang tạo...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreateGalleryPageAdmin;
