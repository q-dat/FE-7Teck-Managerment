import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { ProductContext } from '../../../../context/ProductContext';
import { IProduct } from '../../../../types/type/product/product';

interface ModalCreateProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateProductPageAdmin: React.FC<ModalCreateProductProps> = ({
  isOpen,
  onClose
}) => {
  const { loading, createProduct, getAllProducts, error } =
    useContext(ProductContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = async formData => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('product_catalog_id', formData.product_catalog_id);
    data.append('status', formData.status);
    data.append('price', formData.price.toString());
    data.append(
      'quantity',
      formData.quantity ? formData.quantity.toString() : ''
    );
    data.append('des', formData.des || '');

    // Thêm các file ảnh (nếu có)
    if (formData.img && formData.img[0]) {
      data.append('img', formData.img[0]);
    }
    if (formData.thumbnail && formData.thumbnail[0]) {
      data.append('thumbnail', formData.thumbnail[0]);
    }

    try {
      await createProduct(data);
      Toastify('Tạo sản phẩm thành công!', 201);
      reset();
      getAllProducts();
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${error}`, 500);
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
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo sản phẩm mới
            </p>
            {/* Các trường đầu vào */}
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên sản phẩm"
            />
            <InputModal
              type="text"
              {...register('product_catalog_id', { required: true })}
              placeholder="Danh mục"
            />
            <InputModal
              type="text"
              {...register('status')}
              placeholder="Trạng thái"
            />
            <InputModal
              type="number"
              {...register('price', { required: true })}
              placeholder="Giá"
            />
            <InputModal
              type="number"
              {...register('quantity', { required: true })}
              placeholder="Số lượng"
            />
            <InputModal
              type="text"
              {...register('des')}
              placeholder="Mô tả sản phẩm"
            />
            <InputModal
              type="file"
              {...register('img', { required: true })}
              placeholder="Ảnh sản phẩm"
            />
            <InputModal
              type="file"
              {...register('thumbnail')}
              placeholder="Ảnh thumbnail"
            />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {isLoading ? (
                <div className="flex cursor-progress flex-row items-center justify-center bg-primary text-white group-hover:bg-opacity-10">
                  <span>Đang tạo...</span>
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                'Xác nhận'
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreateProductPageAdmin;

