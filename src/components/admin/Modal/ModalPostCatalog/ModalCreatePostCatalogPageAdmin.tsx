import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { IPostCatalog } from '../../../../types/type/post-catalog/post-catalog';
import { PostCatalogContext } from '../../../../context/post-catalog/PostCatalogContext';

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePostCatalogPageAdmin: React.FC<ModalCreatePostProps> = ({
  isOpen,
  onClose
}) => {
  const {loading, createPostCatalog, getAllPostCatalogs } =
    useContext(PostCatalogContext);
    const isLoading = loading.create
  const { register, handleSubmit, reset } = useForm<IPostCatalog>();
  //
  const onSubmit: SubmitHandler<IPostCatalog> = async formData => {
    try {
      await createPostCatalog(formData);
      reset();
      getAllPostCatalogs();
      Toastify('Tạo danh mục bài viết thành công!', 201);
      onClose();
    } catch (err) {
      getAllPostCatalogs();
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
              Tạo danh mục bài viết mới
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên danh mục bài viết"
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

export default ModalCreatePostCatalogPageAdmin;
