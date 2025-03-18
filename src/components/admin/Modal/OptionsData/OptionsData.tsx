import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IOptionPhoneData } from '../../../../types/type/optionsData/optionsPhoneData';
import { OptionPhoneContext } from '../../../../context/optionsData/OptionPhoneContext';
import { Toastify } from '../../../../helper/Toastify';
import { Button } from 'react-daisyui';
interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}
const fields: (keyof IOptionPhoneData)[] = [
  'rear_camera_video',
  'rear_camera_features',
  'front_camera_features',
  'battery_technology',
  'advanced_security',
  'special_features',
  'wifiOptions',
  'gpsOptions',
  'voice_recording',
  'radio',
  'music_playback'
];
const OptionsData: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const {  handleSubmit, reset } = useForm<IOptionPhoneData>();
  const { loading, getAllOptionPhones, createOptionPhone } =
    useContext(OptionPhoneContext);
  const isLoading = loading.create;

  const onSubmit: SubmitHandler<IOptionPhoneData> = async formData => {
    const data = new FormData();

    fields.forEach(field => {
      if (formData[field]) {
        Object.entries(formData[field]).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item =>
              data.append(`${field}[${key}][]`, item.value)
            );
          } else {
            data.append(`${field}[${key}]`, value.value);
          }
        });
      }
    });
    try {
      await createOptionPhone(data);
      reset();
      getAllOptionPhones();
      Toastify('Tạo danh mục thành công!', 201);
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${err}`, 500);
      console.error(err);
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
    <div
      onClick={handleOverlayClick}
      className="modal-overlay fixed inset-0 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-5/6"
      >
        <h1>Danh mục options thông tin sản phẩm!</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>OptionsPhoneDate</h1>

            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {isLoading ? 'Đang tạo...' : 'Xác nhận'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OptionsData;
