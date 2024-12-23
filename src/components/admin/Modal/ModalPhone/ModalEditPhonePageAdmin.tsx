import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { IPhone } from '../../../../types/type/phone/phone';
import Select from 'react-select';

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
  const optionsData = {
    rear_camera_video: [
      { value: '4K@30fps', label: '4K@30fps' },
      { value: '1080p@60fps', label: '1080p@60fps' }
    ],
    rear_camera_features: [
      { value: 'Auto Focus', label: 'Auto Focus' },
      { value: 'HDR', label: 'HDR' }
    ],
    front_camera_features: [
      { value: 'Portrait Mode', label: 'Portrait Mode' },
      { value: 'Beauty Mode', label: 'Beauty Mode' }
    ],
    battery_technology: [
      { value: 'Fast Charging', label: 'Fast Charging' },
      { value: 'Wireless Charging', label: 'Wireless Charging' }
    ],
    advanced_security: [
      { value: 'Face ID', label: 'Face ID' },
      { value: 'Fingerprint Scanner', label: 'Fingerprint Scanner' }
    ],
    special_features: [
      { value: '5G Support', label: '5G Support' },
      { value: 'Dual SIM', label: 'Dual SIM' }
    ],
    wifiOptions: [
      { value: 'Wi-Fi 5', label: 'Wi-Fi 5' },
      { value: 'Wi-Fi 6', label: 'Wi-Fi 6' }
    ],
    gpsOptions: [
      { value: 'GPS', label: 'GPS' },
      { value: 'GLONASS', label: 'GLONASS' }
    ],
    voice_recording: [
      { value: 'Stereo Recording', label: 'Stereo Recording' },
      { value: 'Mono Recording', label: 'Mono Recording' }
    ],
    radio: [
      { value: 'FM Radio', label: 'FM Radio' },
      { value: 'AM Radio', label: 'AM Radio' }
    ],
    music_playback: [
      { value: 'MP3', label: 'MP3' },
      { value: 'AAC', label: 'AAC' }
    ]
  };

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
        <div className="mx-2 flex w-full xl:w-1/2 flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800">
          <p className="font-bold text-black dark:text-white">Sửa sản phẩm</p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide">
            {/* Các trường cơ bản */}
            <div className="">
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
            </div>
            {/* Cấu hình và bộ nhớ */}
            <div className="">
              <InputModal
                type="text"
                {...register('configuration_and_memory.operating_system')}
                placeholder="Hệ điều hành"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.cpu_chip')}
                placeholder="Chip xử lý CPU"
              />

              <InputModal
                type="text"
                {...register('configuration_and_memory.cpu_speed')}
                placeholder="Tốc độ CPU"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.gpu')}
                placeholder="Chip đồ họa (GPU)"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.ram')}
                placeholder="RAM"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.storage_capacity')}
                placeholder="Dung lượng lưu trữ"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.remaining_capacity')}
                placeholder="Dung lượng còn lại/Dung lượng khả dụng"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.memory_card')}
                placeholder="Thẻ nhớ"
              />
              <InputModal
                type="text"
                {...register('configuration_and_memory.contacts')}
                placeholder="Danh bạ"
              />

              {/* Camera và màn hình */}
              <div className="">
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_resolution')}
                  placeholder="Độ phân giải camera sau"
                />
                <div className="my-2">
                  <label className="block text-sm">Quay phim camera sau</label>
                  <Select
                    isMulti
                    options={optionsData.rear_camera_video}
                    onChange={selected =>
                      setValue(
                        'camera_and_screen.rear_camera_video',
                        selected.map(option => option.value)
                      )
                    }
                  />
                </div>
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_flash')}
                  placeholder="Đèn Flash camera sau"
                />
                <div className="my-2">
                  <label className="block text-sm">Tính năng camera sau</label>
                  <Select
                    isMulti
                    options={optionsData.rear_camera_features}
                    onChange={selected =>
                      setValue(
                        'camera_and_screen.rear_camera_features',
                        selected.map(option => option.value)
                      )
                    }
                  />
                </div>
              </div>
              <InputModal
                type="text"
                {...register('camera_and_screen.front_camera_resolution')}
                placeholder="Độ phân giải camera trước"
              />
              <div className="my-2">
                <label className="block text-sm">Tính năng camera trước</label>
                <Select
                  isMulti
                  options={optionsData.front_camera_features}
                  onChange={selected =>
                    setValue(
                      'camera_and_screen.front_camera_features',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_technology')}
                placeholder="Công nghệ màn hình"
              />
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_resolution')}
                placeholder="Độ phân giải màn hình"
              />
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_size')}
                placeholder="Màn hình rộng"
              />
              <InputModal
                type="text"
                {...register('camera_and_screen.max_brightness')}
                placeholder="Độ sáng tối đa"
              />
              <InputModal
                type="text"
                {...register('camera_and_screen.touchscreen_glass')}
                placeholder="Mặt kính cảm ứng"
              />
            </div>
            {/* Pin và sạc */}
            <div className="">
              <InputModal
                type="text"
                {...register('battery_and_charging.battery_capacity')}
                placeholder="Dung lượng pin"
              />
              <InputModal
                type="text"
                {...register('battery_and_charging.battery_type')}
                placeholder="Loại pin"
              />
              <InputModal
                type="text"
                {...register('battery_and_charging.max_charging_support')}
                placeholder="Hỗ trợ sạc tối đa"
              />
              <div className="my-2">
                <label className="block text-sm">Công nghệ pin</label>
                <Select
                  isMulti
                  options={optionsData.battery_technology}
                  onChange={selected =>
                    setValue(
                      'battery_and_charging.battery_technology',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
            </div>
            {/* Tiện ích */}
            <div className="">
              <div className="my-2">
                <label className="block text-sm">Bảo mật nâng cao</label>
                <Select
                  isMulti
                  options={optionsData.advanced_security}
                  onChange={selected =>
                    setValue(
                      'features.advanced_security',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <div className="my-2">
                <label className="block text-sm">Tính năng đặc biệt</label>
                <Select
                  isMulti
                  options={optionsData.special_features}
                  onChange={selected =>
                    setValue(
                      'features.special_features',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <InputModal
                type="text"
                {...register('features.water_dust_resistant')}
                placeholder="Kháng nước/bụi"
              />
              <div className="my-2">
                <label className="block text-sm">Ghi âm</label>
                <Select
                  isMulti
                  options={optionsData.voice_recording}
                  onChange={selected =>
                    setValue(
                      'features.voice_recording',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <div className="my-2">
                <label className="block text-sm">Radio</label>
                <Select
                  isMulti
                  options={optionsData.radio}
                  onChange={selected =>
                    setValue(
                      'features.radio',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <InputModal
                type="text"
                {...register('features.video_playback')}
                placeholder="Xem phim"
              />
              <div className="my-2">
                <label className="block text-sm">Nghe nhạc</label>
                <Select
                  isMulti
                  options={optionsData.music_playback}
                  onChange={selected =>
                    setValue(
                      'features.music_playback',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
            </div>
            {/* Kết nối */}
            <div className="">
              <InputModal
                type="text"
                {...register('connectivity.mobile_network')}
                placeholder="Mạng di động"
              />
              <InputModal
                type="text"
                {...register('connectivity.sim')}
                placeholder="Sim"
              />
              <div className="my-2">
                <label className="block text-sm">Wi-Fi</label>
                <Select
                  isMulti
                  options={optionsData.wifiOptions}
                  onChange={selected =>
                    setValue(
                      'connectivity.wifi',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <div className="my-2">
                <label className="block text-sm">GPS</label>
                <Select
                  isMulti
                  options={optionsData.gpsOptions}
                  onChange={selected =>
                    setValue(
                      'connectivity.gps',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <InputModal
                type="text"
                {...register('connectivity.bluetooth')}
                placeholder="Bluetooth"
              />
              <InputModal
                type="text"
                {...register('connectivity.charging_connection_port')}
                placeholder="Cổng kết nối/sạc"
              />
              <InputModal
                type="text"
                {...register('connectivity.headphone_jack')}
                placeholder="Jack tai nghe"
              />
              <InputModal
                type="text"
                {...register('connectivity.other_connectivity')}
                placeholder="Kết nối khác"
              />
            </div>
            {/* Thiết kế và chất liệu */}
            <div className="">
              <InputModal
                type="text"
                {...register('design_and_material.design')}
                placeholder="Thiết kế"
              />
              <InputModal
                type="text"
                {...register('design_and_material.material')}
                placeholder="Chất liệu"
              />
              <InputModal
                type="text"
                {...register('design_and_material.dimensions_and_weight')}
                placeholder="Kích thước và khối lượng"
              />
              <InputModal
                type="text"
                {...register('design_and_material.release_date')}
                placeholder="Thời điểm ra mắt"
              />
              <InputModal
                type="text"
                {...register('design_and_material.brand')}
                placeholder="Hãng"
              />
            </div>
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
