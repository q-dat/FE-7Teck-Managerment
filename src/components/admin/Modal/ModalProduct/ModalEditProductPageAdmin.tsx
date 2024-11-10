import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { ProductContext } from '../../../../context/ProductContext';
import { IProduct } from '../../../../types/type/product/product';

interface ModalEditProductProps {
  isOpen: boolean;
  onClose: () => void;
  ProductId: string;
}

const ModalEditProductPageAdmin: React.FC<ModalEditProductProps> = ({
  isOpen,
  onClose,
  ProductId
}) => {
  const { getAllProducts, products, getProductById, error, updateProduct } =
    useContext(ProductContext);

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<IProduct>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<
    string | undefined
  >('');

  useEffect(() => {
    if (ProductId) {
      getProductById(ProductId);
    }
  }, [ProductId, getProductById]);

  useEffect(() => {
    const productData = products.find(product => product._id === ProductId);
    if (productData) {
      setValue('name', productData.name);
      setValue('product_catalog_id', productData.product_catalog_id);
      setValue('status', productData.status);
      setValue('price', productData.price);
      setValue('quantity', productData.quantity);
      setValue('des', productData.des);
      setValue('img', productData.img);
      setValue('thumbnail', productData.thumbnail);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(productData.img);
      setExistingThumbnail(productData.thumbnail);
    }
  }, [products, ProductId, setValue]);

  const onSubmit: SubmitHandler<IProduct> = async formData => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name || '');
    formDataToSend.append(
      'product_catalog_id',
      formData.product_catalog_id || ''
    );
    formDataToSend.append('status', formData.status || '');
    formDataToSend.append('price', formData.price?.toString() || '');
    formDataToSend.append('quantity', formData.quantity?.toString() || '');
    formDataToSend.append('des', formData.des || '');

    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      formDataToSend.append('img', imgFile[0]);
    } else {
      if (existingImg) {
        formDataToSend.append('img', existingImg);
      }
    }

    const thumbnailFile = watch('thumbnail');
    if (thumbnailFile && thumbnailFile[0]) {
      formDataToSend.append('thumbnail', thumbnailFile[0]);
    } else {
      if (existingThumbnail) {
        formDataToSend.append('thumbnail', existingThumbnail);
      }
    }

    try {
      await updateProduct(ProductId, formDataToSend);
      Toastify('Chỉnh sửa sản phẩm thành công!', 200);
      reset();
      getAllProducts();
      onClose();
    } catch (err) {
      console.error('Error during product update:', err);
      Toastify(`Lỗi: ${error}`, 500);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

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
            <InputModal
              type="text"
              {...register('name')}
              placeholder="Tên sản phẩm"
            />
            <InputModal
              type="text"
              {...register('product_catalog_id')}
              placeholder="Danh mục"
            />
            <InputModal
              type="text"
              {...register('status')}
              placeholder="Trạng thái"
            />
            <InputModal
              type="number"
              {...register('price')}
              placeholder="Giá"
            />
            <InputModal
              type="number"
              {...register('quantity')}
              placeholder="Số lượng"
            />
            <InputModal
              type="text"
              {...register('des')}
              placeholder="Mô tả sản phẩm"
            />
            <InputModal
              type="file"
              {...register('img')}
              placeholder="Ảnh sản phẩm"
            />
            <InputModal
              type="file"
              {...register('thumbnail')}
              placeholder="Ảnh thumbnail (Tùy chọn)"
            />
          </div>

          <div className="space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button color="primary" type="submit" className="text-white">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditProductPageAdmin;

