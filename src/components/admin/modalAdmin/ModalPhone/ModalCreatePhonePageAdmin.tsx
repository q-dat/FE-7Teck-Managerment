import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import { IPhone } from '../../../../types/type/phone/phone';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  value: string;
  label: string;
}

const ModalCreatePhonePageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createPhone, getAllPhones } = useContext(PhoneContext);
  const isLoading = loading.create;
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<IPhone>();

  // PhoneCatalog
  const { phoneCatalogs } = useContext(PhoneCatalogContext);

  // react-select
  const phoneCatalog: Option[] = phoneCatalogs.map(phoneCatalog => ({
    value: phoneCatalog._id,
    label: `${phoneCatalog.name}  \u00A0
    ${phoneCatalog?.status === 0 ? '(New)' : phoneCatalog?.status === 1 ? '(Đã sử dụng)' : phoneCatalog?.status}`
  }));

  // Theo dõi giá trị của phone_catalog_id
  const selectedCatalogId = watch('phone_catalog_id._id');

  // Cập nhật name khi danh mục được chọn
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = phoneCatalogs.find(catalog => catalog._id === selectedCatalogId);
      if (selectedCatalog) {
        setValue('name', selectedCatalog.name);
      }
    }
  }, [selectedCatalogId, phoneCatalogs, setValue]);

  const onSubmit: SubmitHandler<IPhone> = async formData => {
    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('phone_catalog_id', formData.phone_catalog_id._id);
    data.append('color', formData.color);
    data.append('price', formData.price?.toString() || '');
    data.append('sale', formData.sale?.toString() || '');
    data.append('status', formData.status || '');
    data.append('des', formData.des || '');

    // Thêm ảnh chính
    if (formData.img && formData.img[0]) {
      data.append('img', formData.img[0]);
    }

    // Thêm nhiều ảnh thu nhỏ
    if (formData.thumbnail && formData.thumbnail.length > 0) {
      Array.from(formData.thumbnail).forEach(file => {
        data.append('thumbnail', file); // Thêm từng file vào FormData
      });
    }

    try {
      await createPhone(data);
      reset();
      getAllPhones();
      Toastify('Tạo sản phẩm thành công!', 201);
      onClose();
    } catch (err) {
      getAllPhones();
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
          e.preventDefault(); // Ngăn default Enter behavior trong input
          handleSubmit(onSubmit)(); // Gọi submit thủ công
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
          <div>
            <p className="font-bold text-black dark:text-white">Tạo sản phẩm mới</p>
            <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
            <InputModal
              className="bg-yellow-400 px-2"
              type="text"
              {...register('note')}
              placeholder="Điền ghi chú..."
            />
            <div className="flex items-center">
              <ReactSelect
                placeholder="Chọn danh mục*"
                name="phone_catalog_id._id"
                control={control}
                options={phoneCatalog}
                isMulti={false}
                className=""
              />
            </div>
            <InputModal
              // className="hidden"
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên sản phẩm*"
            />
            <InputModal type="text" {...register('color', { required: true })} placeholder="Nhập màu*" />

            <InputModal
              type="number"
              {...register('price', { required: true })}
              placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
            />
            <InputModal type="number" {...register('sale')} placeholder="Nhập giá giảm (Hệ số x1000: 1triệu = 1000)" />

            <InputModal type="text" {...register('status', { required: true })} placeholder="Tình trạng*" />
            <Textarea className="w-full border p-2 focus:outline-none" {...register('des')} placeholder="Mô tả" />
            <LabelForm title={'Hình ảnh*'} />
            <InputModal type="file" {...register('img', { required: true })} placeholder="Hình ảnh*" />
            <LabelForm title={'Ảnh thu nhỏ'} />
            <InputModal type="file" {...register('thumbnail')} placeholder="Chèn ảnh thu nhỏ" multiple />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black dark:text-white">
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

export default ModalCreatePhonePageAdmin;
