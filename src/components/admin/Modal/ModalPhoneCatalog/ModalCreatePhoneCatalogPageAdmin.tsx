import React, { useContext } from 'react';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phoneCatalog';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalCreatePhoneCatalogPageAdmin: React.FC<ModalCreatePostProps> = ({
  isOpen,
  onClose
}) => {
  const { createPhoneCatalog, getAllPhoneCatalogs } =
    useContext(PhoneCatalogContext);
  const { register, handleSubmit, reset } = useForm<IPhoneCatalog>();

  const onSubmit: SubmitHandler<IPhoneCatalog> = async formData => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('des', formData.des || '');
    data.append('status', formData.status || '');
    if (formData.img) {
      data.append('img', formData.img[0]);
    }

    try {
      await createPhoneCatalog(data);
      reset();
      getAllPhoneCatalogs();
      Toastify('Tạo danh mục thành công!', 201);
      onClose();
    } catch (err) {
      getAllPhoneCatalogs();
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
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo danh mục mới
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên danh mục"
            />
            <InputModal
              type="number"
              {...register('price', { required: true })}
              placeholder="Giá"
            />
            <InputModal
              type="text"
              {...register('status')}
              placeholder="Trạng thái(*Không bắt buộc!)"
            />
            <InputModal
              type="text"
              {...register('des')}
              placeholder="Mô tả (*Không bắt buộc!)"
            />
            <InputModal
              type="file"
              {...register('img')}
              placeholder="Hình ảnh"
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

export default ModalCreatePhoneCatalogPageAdmin;
