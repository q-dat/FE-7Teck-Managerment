import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { IPhone } from '../../../../types/type/phone/phone';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ ReactSelect';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  phoneId: string;
}

interface Option {
  value: string;
  label: string;
}

const ModalEditPhonePageAdmin: React.FC<ModalEditPageAdminProps> = ({
  isOpen,
  onClose,
  phoneId
}) => {
  const { phones, getAllPhones, updatePhone } = useContext(PhoneContext);
  const { phoneCatalogs } = useContext(PhoneCatalogContext);

  //react-select
  const phoneCatalog: Option[] = phoneCatalogs.map(phoneCatalog => ({
    value: phoneCatalog._id,
    label: phoneCatalog.name
  }));
  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<IPhone>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<
    string[] | undefined
  >([]);

  useEffect(() => {
    const phoneData = phones.find(phone => phone._id === phoneId);
    if (phoneData) {
      setValue('name', phoneData.name);
      setValue('phone_catalog_id', phoneData.phone_catalog_id);
      setValue('color', phoneData.color);
      setValue('price', phoneData.price);
      setValue('sale', phoneData.sale);
      setValue('status', phoneData.status);
      setValue('des', phoneData.des);
      setValue('note', phoneData.note);
      setValue('img', phoneData.img);
      setValue('thumbnail', phoneData.thumbnail);
      setValue('createdAt', phoneData.createdAt);
      setValue('updatedAt', phoneData.updatedAt);

      setExistingImg(phoneData.img);
      setExistingThumbnail(phoneData.thumbnail);
    }
  }, [phones, phoneId, setValue]);

  const onSubmit: SubmitHandler<IPhone> = async formData => {
    const data = new FormData();

    data.append('name', formData.name || '');
    data.append('phone_catalog_id', formData.phone_catalog_id._id);
    data.append('color', formData.color);
    data.append('price', formData.price?.toString() || '');
    data.append('sale', formData.sale?.toString() || '');
    data.append('status', formData.status || '');
    data.append('des', formData.des || '');
    data.append('note', formData.note || '');

    // Thêm ảnh chính
    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      data.append('img', imgFile[0]);
    } else if (existingImg) {
      data.append('img', existingImg);
    }

    // Thêm nhiều ảnh thu nhỏ
    const thumbnailFiles = watch('thumbnail');
    if (thumbnailFiles && thumbnailFiles.length > 0) {
      Array.from(thumbnailFiles).forEach(file => {
        data.append('thumbnail', file);
      });
    } else if (existingThumbnail && existingThumbnail.length > 0) {
      existingThumbnail.forEach(thumbnail => {
        data.append('thumbnail', thumbnail);
      });
    }

    try {
      await updatePhone(phoneId, data);
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
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="font-bold text-black dark:text-white">
            Cập nhật sản phẩm
          </p>
          <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
          <InputModal
            className="bg-yellow-400 px-2"
            type="text"
            {...register('note')}
            placeholder="Điền ghi chú..."
          />
          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tên danh mục'} />
              <InputModal
                type="text"
                {...register('name', { required: true })}
                placeholder="Tên danh mục"
              />
              <LabelForm title={'Danh mục'} />
              <div className="flex w-full items-center">
                <ReactSelect
                  placeholder="Chọn danh mục"
                  name="phone_catalog_id._id"
                  control={control}
                  options={phoneCatalog}
                  isMulti={false}
                  className="w-full"
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
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tình trạng'} />
              <InputModal
                type="text"
                {...register('status')}
                placeholder="Tình trạng"
              />
              <LabelForm title={'Mô tả'} />
              <InputModal
                type="text"
                {...register('des')}
                placeholder="Mô tả"
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
              <LabelForm title={'Ảnh thu nhỏ'} />
              {existingThumbnail && existingThumbnail.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                  {existingThumbnail.map((thumbnail, index) => (
                    <img
                      key={index}
                      src={thumbnail}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              <InputModal
                type="file"
                {...register('thumbnail')}
                placeholder="Chèn ảnh thu nhỏ"
                multiple
              />
            </div>
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

export default ModalEditPhonePageAdmin;
