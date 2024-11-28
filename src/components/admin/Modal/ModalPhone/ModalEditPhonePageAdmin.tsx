import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { IPhone } from '../../../../types/type/phone/phone';

interface ModalEditPhoneProps {
  isOpen: boolean;
  onClose: () => void;
  PhoneId: string;
}

const ModalEditPhonePageAdmin: React.FC<ModalEditPhoneProps> = ({
  isOpen,
  onClose,
  PhoneId
}) => {
  const { getAllPhones, phones, getPhoneById, error, updatePhone } =
    useContext(PhoneContext);

  const { register, handleSubmit, reset, setValue, watch } = useForm<IPhone>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<
    string | undefined
  >('');

  useEffect(() => {
    if (PhoneId) {
      getPhoneById(PhoneId);
    }
  }, [PhoneId, getPhoneById]);

  useEffect(() => {
    const phoneData = phones.find(phone => phone._id === PhoneId);
    if (phoneData) {
      setValue('name', phoneData.name);
      setValue('phone_catalog_id', phoneData.phone_catalog_id);
      setValue('status', phoneData.status);
      setValue('price', phoneData.price);
      setValue('des', phoneData.des);
      setValue('img', phoneData.img);
      setValue('thumbnail', phoneData.thumbnail);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(phoneData.img);
      setExistingThumbnail(phoneData.thumbnail);
    }
  }, [phones, PhoneId, setValue]);

  const onSubmit: SubmitHandler<IPhone> = async formData => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name || '');
    formDataToSend.append('Phone_catalog_id', formData.phone_catalog_id || '');
    formDataToSend.append('status', formData.status || '');
    formDataToSend.append('price', formData.price?.toString() || '');
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
      await updatePhone(PhoneId, formDataToSend);
      reset();
      getAllPhones();
      Toastify('Chỉnh sửa sản phẩm thành công!', 200);
      onClose();
    } catch (err) {
      getAllPhones();
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
              {...register('phone_catalog_id')}
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

export default ModalEditPhonePageAdmin;
