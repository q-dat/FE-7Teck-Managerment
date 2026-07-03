import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../../helper/Toastify';
import InputModal from '../../../InputModal';
import LabelForm from '../../../LabelForm';
import { PostCatalogFormValues } from '../../../../../types/type/post-catalog/post-catalog';
import { PostCatalogContext } from '../../../../../context/post-catalog/PostCatalogContext';

interface ModalCreatePostCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePostCatalogPageAdmin: React.FC<ModalCreatePostCatalogProps> = ({ isOpen, onClose }) => {
  const { loading, createPostCatalog, getAllPostCatalogs } = useContext(PostCatalogContext);
  const isLoading = loading.create;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PostCatalogFormValues>({
    defaultValues: {
      name: '',
      slug: '',
      catalogId: 1
    }
  });

  const onSubmit: SubmitHandler<PostCatalogFormValues> = async formData => {
    try {
      await createPostCatalog({
        name: formData.name.trim(),
        slug: formData.slug?.trim() || '',
        catalogId: Number(formData.catalogId)
      });

      reset();
      await getAllPostCatalogs();
      Toastify('Tạo danh mục bài viết thành công!', 201);
      onClose();
    } catch (err) {
      await getAllPostCatalogs();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={e => {
        const target = e.target as HTMLElement;

        if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
    >
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="mb-5 font-bold text-black dark:text-white">Tạo danh mục bài viết mới</p>

          <LabelForm title="Tên danh mục bài viết" />
          <InputModal
            type="text"
            {...register('name', { required: 'Vui lòng nhập tên danh mục' })}
            placeholder="VD: Tin tức công nghệ"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}

          <LabelForm title="Slug danh mục" />
          <InputModal type="text" {...register('slug')} placeholder="Để trống server sẽ tự tạo slug" />

          <LabelForm title="Mã danh mục catalogId" />
          <InputModal
            type="number"
            {...register('catalogId', {
              required: 'Vui lòng nhập catalogId',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'catalogId phải lớn hơn 0'
              }
            })}
            placeholder="VD: 1"
          />
          {errors.catalogId && <p className="mt-1 text-sm text-red-500">{errors.catalogId.message}</p>}

          <div className="mt-5 flex flex-row items-center justify-center space-x-5 text-center">
            <Button type="button" onClick={onClose} className="border-gray-50 text-black dark:text-white">
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