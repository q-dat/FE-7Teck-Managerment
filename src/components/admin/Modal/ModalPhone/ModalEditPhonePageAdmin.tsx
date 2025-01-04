import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import 'react-quill/dist/quill.snow.css';
import { Toastify } from '../../../../helper/Toastify';
import LabelForm from '../../LabelForm';
import { IPhone } from '../../../../types/type/phone/phone';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import ReactSelect from '../../../orther/react-select/ ReactSelect';

interface ModalEditPostPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  PhoneId: string;
}
interface Option {
  value: string;
  label: string;
}

const ModalEditPhonePageAdmin: React.FC<ModalEditPostPageAdminProps> = ({
  isOpen,
  onClose,
  PhoneId
}) => {
  const { phones, getPhoneById, getAllPhones, updatePhone } =
    useContext(PhoneContext);
  // PhoneCatalog
  const { phoneCatalogs, getAllPhoneCatalogs } =
    useContext(PhoneCatalogContext);

  useEffect(() => {
    getAllPhoneCatalogs();
  }, []);
  //react-select
  const phoneCatalog: Option[] = phoneCatalogs.map(phoneCatalog => ({
    value: phoneCatalog._id,
    label: phoneCatalog.name
  }));
  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<IPhone>();
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
      setValue('color', phoneData.color);
      setValue('price', phoneData.price);
      setValue('sale', phoneData.sale);
      setValue('status', phoneData.status);
      setValue('des', phoneData.des);
      setValue('img', phoneData.img);
      setValue('thumbnail', phoneData.thumbnail);
      setValue('createdAt', phoneData.createdAt);
      setValue('updatedAt', phoneData.updatedAt);

      setExistingImg(phoneData.img);
      setExistingThumbnail(phoneData.thumbnail);
    }
  }, [phones, PhoneId, setValue]);

  const onSubmit: SubmitHandler<IPhone> = async formData => {
    const data = new FormData();

    data.append('name', formData.name || '');
    data.append('phone_catalog_id', formData.phone_catalog_id._id);
    data.append('color', formData.color);
    data.append('price', formData.price?.toString() || '');
    data.append('sale', formData.sale?.toString() || '');
    data.append('status', formData.status || '');
    data.append('des', formData.des || '');

    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      data.append('img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('img', existingImg);
      }
    }
    const thumbnailFile = watch('thumbnail');
    if (thumbnailFile && thumbnailFile[0]) {
      data.append('thumbnail', thumbnailFile[0]);
    } else {
      if (existingThumbnail) {
        data.append('thumbnail', existingThumbnail);
      }
    }
    try {
      await updatePhone(PhoneId, data);
      reset();
      getAllPhones();
      Toastify('Sản phẩm đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllPhones();
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
              Cập nhật sản phẩm
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên danh mục"
            />
            <LabelForm title={'Danh mục'} />
            <div className="flex items-center">
              <ReactSelect
                placeholder="Chọn danh mục"
                name="phone_catalog_id._id"
                control={control}
                options={phoneCatalog}
                isMulti={false}
                className=""
              />
            </div>
            <LabelForm title={'Giá'} />
            <InputModal
              type="number"
              {...register('price', { required: true })}
              placeholder="Giá"
            />
            <LabelForm title={'Giá giảm'} />
            <InputModal
              type="number"
              {...register('sale')}
              placeholder="Nhập giá giảm"
            />
            <LabelForm title={'Màu sắc'} />
            <InputModal
              type="text"
              {...register('color')}
              placeholder="Nhập màu"
            />
            <LabelForm title={'Trạng thái'} />
            <InputModal
              type="text"
              {...register('status')}
              placeholder="Trạng thái(*Không bắt buộc!)"
            />
            <LabelForm title={'Mô tả'} />
            <InputModal
              type="text"
              {...register('des')}
              placeholder="Mô tả (*Không bắt buộc!)"
            />
            <LabelForm title={'Hình ảnh'} />
            {existingImg && (
              <div className="my-2">
                <img
                  src={existingImg}
                  className="h-10 w-10 rounded-md object-cover"
                />
              </div>
            )}
            <InputModal
              type="file"
              {...register('img')}
              placeholder="Chèn ảnh hình ảnh"
            />
          </div>
          <LabelForm title={'Ảnh thu nhỏ'} />
          {existingThumbnail && (
            <div className="my-2">
              <img
                src={existingThumbnail}
                className="h-10 w-10 rounded-md object-cover"
              />
            </div>
          )}
          <InputModal
            type="file"
            {...register('thumbnail')}
            placeholder="Chèn ảnh thu nhỏ"
            multiple
          />
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

export default ModalEditPhonePageAdmin;
