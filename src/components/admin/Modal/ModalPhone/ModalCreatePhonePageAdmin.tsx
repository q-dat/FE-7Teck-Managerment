import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { PhoneContext } from '../../../../context/PhoneContext';
import { IPhone } from '../../../../types/type/phone/phone';
import Select, { MultiValue } from 'react-select';

interface ModalCreatePhoneProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePhonePageAdmin: React.FC<ModalCreatePhoneProps> = ({
  isOpen,
  onClose
}) => {
  const { loading, createPhone, getAllPhones, error } =
    useContext(PhoneContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset, setValue } = useForm<IPhone>();

  // Các options cho select
  const specialFeaturesOptions = [
    { value: 'Waterproof', label: 'Waterproof' },
    { value: '5G', label: '5G' },
    { value: 'Dual SIM', label: 'Dual SIM' }
    // Các lựa chọn khác...
  ];

  const wifiOptions = [
    { value: 'Wi-Fi 5', label: 'Wi-Fi 5' },
    { value: 'Wi-Fi 6', label: 'Wi-Fi 6' }
    // Các lựa chọn khác...
  ];

  // Hàm xử lý submit
  const onSubmit: SubmitHandler<IPhone> = async formData => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone_catalog_id', formData.phone_catalog_id);
    data.append('status', formData.status);
    data.append('price', formData.price.toString());
    data.append('des', formData.des || '');

    // Thêm các file ảnh (nếu có)
    if (formData.img && formData.img[0]) {
      data.append('img', formData.img[0]);
    }
    if (formData.thumbnail && formData.thumbnail[0]) {
      data.append('thumbnail', formData.thumbnail[0]);
    }

    // Xử lý trường mảng đặc biệt (specialFeatures) chọn qua react-select
    if (formData.specialFeatures) {
      formData.specialFeatures.forEach(feature => {
        data.append('specialFeatures[]', feature); // Chỉ cần lưu giá trị feature (chuỗi)
      });
    }

    // Xử lý các mảng khác như wifi, gps...
    if (formData.connectivity?.wifi) {
      formData.connectivity.wifi.forEach(wifi => {
        data.append('connectivity[wifi][]', wifi); // Chỉ cần lưu giá trị wifi (chuỗi)
      });
    }

    try {
      await createPhone(data);
      Toastify('Tạo sản phẩm thành công!', 201);
      reset();
      getAllPhones();
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
              {...register('phone_catalog_id', { required: true })}
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

            {/* React Select cho specialFeatures */}
            <div className="my-2">
              <label className="block text-sm">Các tính năng đặc biệt</label>
              <Select
                isMulti
                name="specialFeatures"
                options={specialFeaturesOptions}
                onChange={(
                  selectedOptions: MultiValue<{ value: string; label: string }>
                ) => {
                  const selectedValues = selectedOptions.map(
                    option => option.value
                  ); // Lấy giá trị 'value'
                  setValue('specialFeatures', selectedValues); // Cập nhật form với mảng chuỗi
                }}
              />
            </div>

            {/* React Select cho Wi-Fi */}
            <div className="my-2">
              <label className="block text-sm">Wi-Fi</label>
              <Select
                isMulti
                name="wifi"
                options={wifiOptions}
                onChange={(
                  selectedOptions: MultiValue<{ value: string; label: string }>
                ) => {
                  const selectedValues = selectedOptions.map(
                    wifi => wifi.value
                  ); // Lấy giá trị 'value'
                  setValue('connectivity.wifi', selectedValues); // Cập nhật form với mảng chuỗi
                }}
              />
            </div>
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

export default ModalCreatePhonePageAdmin;
