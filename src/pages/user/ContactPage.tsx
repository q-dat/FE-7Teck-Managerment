import React, { useContext } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProductContext } from '../../context/ProductContext';
import { Toastify } from '../../helper/Toastify';
import InputModal from '../../components/admin/InputModal';
import { Button } from 'react-daisyui';
import { IProduct } from '../../types/type/product/product';

const ContactPage: React.FC = () => {
  const { createProduct, getAllProducts, error } = useContext(ProductContext);
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
    } catch (err) {
      Toastify(`Lỗi: ${error}`, 500);
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="breadcrumbs glass mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
        <ul className="font-light">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/contact">Liên Hệ</Link>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          // onClick={handleOverlayClick}
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
                placeholder="Danh mục sản phẩm (ID)"
              />
              <InputModal
                type="text"
                {...register('status')}
                placeholder="Trạng thái sản phẩm (active/inactive)"
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
                placeholder="Ảnh thumbnail (Tùy chọn)"
              />
            </div>

            {/* Các nút điều hướng */}
            <div className="space-x-5 text-center">
              {/* <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button> */}
              <Button color="primary" type="submit" className="text-white">
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
