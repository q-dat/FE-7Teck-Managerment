import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import 'react-quill/dist/quill.snow.css';
import { Toastify } from '../../../../helper/Toastify';
import { IPostCatalog } from '../../../../types/type/post-catalog/post-catalog';
import { PostCatalogContext } from '../../../../context/post-catalog/PostCatalogContext';

interface ModalEditPostPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  postCatalogId: string;
}

const ModalEditPostCatalogPageAdmin: React.FC<ModalEditPostPageAdminProps> = ({
  isOpen,
  onClose,
  postCatalogId
}) => {
  const { postCatalogs, updatePostCatalog, getAllPostCatalogs } =
    useContext(PostCatalogContext);
  const { register, handleSubmit, setValue, reset } = useForm<IPostCatalog>();

  useEffect(() => {
    const postData = postCatalogs.find(
      postCatalog => postCatalog._id === postCatalogId
    );
    if (postData) {
      setValue('name', postData.name);
    }
  }, [postCatalogs, postCatalogId, setValue]);

  const onSubmit: SubmitHandler<IPostCatalog> = async formData => {
    try {
      await updatePostCatalog(postCatalogId, formData);
      Toastify('Chỉnh sửa địa điểm thành công!', 200);
      reset();
      getAllPostCatalogs();
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
              Chỉnh sửa danh mục bài viết
            </p>
            <InputModal
              type="text"
              {...register('name')}
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
            <Button color="primary" type="submit" className="group text-white">
              Xác Nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPostCatalogPageAdmin;
