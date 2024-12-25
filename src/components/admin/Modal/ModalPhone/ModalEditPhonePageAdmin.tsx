import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { PhoneContext } from '../../../../context/phone/PhoneContext';
import { IPhone } from '../../../../types/type/phone/phone';
import Select from 'react-select';
import LabelForm from '../../LabelForm';

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
      setValue('createdAt', phoneData.createdAt);
      setValue('updatedAt', phoneData.updatedAt);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(phoneData.img);
      setExistingThumbnail(phoneData.thumbnail);

      // Các trường con trong `configuration_and_memory`
      setValue(
        'configuration_and_memory.operating_system',
        phoneData.configuration_and_memory.operating_system
      );
      setValue(
        'configuration_and_memory.cpu_chip',
        phoneData.configuration_and_memory.cpu_chip
      );
      setValue(
        'configuration_and_memory.cpu_speed',
        phoneData.configuration_and_memory.cpu_speed
      );
      setValue(
        'configuration_and_memory.gpu',
        phoneData.configuration_and_memory.gpu
      );
      setValue(
        'configuration_and_memory.ram',
        phoneData.configuration_and_memory.ram
      );
      setValue(
        'configuration_and_memory.storage_capacity',
        phoneData.configuration_and_memory.storage_capacity
      );
      setValue(
        'configuration_and_memory.remaining_capacity',
        phoneData.configuration_and_memory.remaining_capacity
      );
      setValue(
        'configuration_and_memory.memory_card',
        phoneData.configuration_and_memory.memory_card
      );
      setValue(
        'configuration_and_memory.contacts',
        phoneData.configuration_and_memory.contacts
      );

      // Các trường con trong `camera_and_screen`
      setValue(
        'camera_and_screen.rear_camera_resolution',
        phoneData.camera_and_screen.rear_camera_resolution
      );
      setValue(
        'camera_and_screen.rear_camera_video',
        phoneData.camera_and_screen.rear_camera_video
      );
      setValue(
        'camera_and_screen.rear_camera_flash',
        phoneData.camera_and_screen.rear_camera_flash
      );
      setValue(
        'camera_and_screen.rear_camera_features',
        phoneData.camera_and_screen.rear_camera_features
      );
      setValue(
        'camera_and_screen.front_camera_resolution',
        phoneData.camera_and_screen.front_camera_resolution
      );
      setValue(
        'camera_and_screen.front_camera_features',
        phoneData.camera_and_screen.front_camera_features
      );
      setValue(
        'camera_and_screen.screen_technology',
        phoneData.camera_and_screen.screen_technology
      );
      setValue(
        'camera_and_screen.screen_resolution',
        phoneData.camera_and_screen.screen_resolution
      );
      setValue(
        'camera_and_screen.screen_size',
        phoneData.camera_and_screen.screen_size
      );
      setValue(
        'camera_and_screen.max_brightness',
        phoneData.camera_and_screen.max_brightness
      );
      setValue(
        'camera_and_screen.touchscreen_glass',
        phoneData.camera_and_screen.touchscreen_glass
      );

      // Các trường con trong `battery_and_charging`
      setValue(
        'battery_and_charging.battery_capacity',
        phoneData.battery_and_charging.battery_capacity
      );
      setValue(
        'battery_and_charging.battery_type',
        phoneData.battery_and_charging.battery_type
      );
      setValue(
        'battery_and_charging.max_charging_support',
        phoneData.battery_and_charging.max_charging_support
      );
      setValue(
        'battery_and_charging.battery_technology',
        phoneData.battery_and_charging.battery_technology
      );

      // Các trường con trong `features`
      setValue(
        'features.advanced_security',
        phoneData.features.advanced_security
      );
      setValue(
        'features.special_features',
        phoneData.features.special_features
      );
      setValue(
        'features.water_dust_resistant',
        phoneData.features.water_dust_resistant
      );
      setValue('features.voice_recording', phoneData.features.voice_recording);
      setValue('features.radio', phoneData.features.radio);
      setValue('features.video_playback', phoneData.features.video_playback);
      setValue('features.music_playback', phoneData.features.music_playback);

      // Các trường con trong `connectivity`
      setValue(
        'connectivity.mobile_network',
        phoneData.connectivity.mobile_network
      );
      setValue('connectivity.sim', phoneData.connectivity.sim);
      setValue('connectivity.wifi', phoneData.connectivity.wifi);
      setValue('connectivity.gps', phoneData.connectivity.gps);
      setValue('connectivity.bluetooth', phoneData.connectivity.bluetooth);
      setValue(
        'connectivity.charging_connection_port',
        phoneData.connectivity.charging_connection_port
      );
      setValue(
        'connectivity.headphone_jack',
        phoneData.connectivity.headphone_jack
      );
      setValue(
        'connectivity.other_connectivity',
        phoneData.connectivity.other_connectivity
      );

      // Các trường con trong `design_and_material`
      setValue(
        'design_and_material.design',
        phoneData.design_and_material.design
      );
      setValue(
        'design_and_material.material',
        phoneData.design_and_material.material
      );
      setValue(
        'design_and_material.dimensions_and_weight',
        phoneData.design_and_material.dimensions_and_weight
      );
      setValue(
        'design_and_material.release_date',
        phoneData.design_and_material.release_date
      );
      setValue(
        'design_and_material.brand',
        phoneData.design_and_material.brand
      );
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
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2">
          <p className="font-bold text-black dark:text-white">Sửa sản phẩm</p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên sản phẩm'} />
              <InputModal
                type="text"
                {...register('name')}
                placeholder="Nhập tên sản phẩm"
              />

              <LabelForm title={'Danh mục'} />
              <InputModal
                type="text"
                {...register('phone_catalog_id')}
                placeholder="Nhập danh mục"
              />
              <LabelForm title={'Trạng thái'} />
              <InputModal
                type="text"
                {...register('status')}
                placeholder="Nhập trạng thái"
              />
              <LabelForm title={'Giá'} />
              <InputModal
                type="number"
                {...register('price')}
                placeholder="Nhập giá"
              />
              <LabelForm title={'Mô tả'} />
              <InputModal
                type="text"
                {...register('des')}
                placeholder="Nhập mô tả"
              />
              <LabelForm title={'Hình ảnh'} />
              <InputModal
                type="file"
                {...register('img')}
                placeholder="Chèn ảnh thu nhỏ"
              />
              <LabelForm title={'Ảnh thu nhỏ'} />

              <InputModal
                type="file"
                {...register('thumbnail')}
                placeholder="Chèn ảnh thu nhỏ"
              />
            </div>
            {/* Cấu hình và bộ nhớ */}
            <div className="">
              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.operating_system')}
                placeholder="Nhập hệ điều hành"
              />
              <LabelForm title={'Chip xử lý CPU'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.cpu_chip')}
                placeholder="Nhập chip xử lý CPU"
              />

              <LabelForm title={'Tốc độ CPU'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.cpu_speed')}
                placeholder="Nhập tốc độ CPU"
              />
              <LabelForm title={'Chip đồ hoạ GPU'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.gpu')}
                placeholder="Nhập chip đồ họa GPU"
              />
              <LabelForm title={'RAM'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.ram')}
                placeholder="Nhập RAM"
              />
              <LabelForm title={'Dung lượng lưu trữ'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.storage_capacity')}
                placeholder="Nhập dung lượng lưu trữ"
              />
              <LabelForm title={'Dung lượng còn lại/Dung lượng khả dụng'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.remaining_capacity')}
                placeholder="Nhập dung lượng còn lại/Dung lượng khả dụng"
              />
              <LabelForm title={'Thẻ nhớ'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.memory_card')}
                placeholder="Nhập thẻ nhớ"
              />
              <LabelForm title={'Danh bạ'} />
              <InputModal
                type="text"
                {...register('configuration_and_memory.contacts')}
                placeholder="Nhập danh bạ"
              />

              {/* Camera và màn hình */}
              <div className="">
                <LabelForm title={' Độ phân giải camera sau'} />
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_resolution')}
                  placeholder="Nhập độ phân giải camera sau"
                />
                <div className="my-2">
                  <LabelForm title={'Quay phim camera sau'} />
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
                <LabelForm title={'Đèn Flash camera sau'} />
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_flash')}
                  placeholder="Nhập đèn Flash camera sau"
                />
                <div className="my-2">
                  <LabelForm title={'Tính năng camera sau'} />
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
              <LabelForm title={'Độ phân giải camera trước'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.front_camera_resolution')}
                placeholder="Nhập độ phân giải camera trước"
              />
              <div className="my-2">
                <LabelForm title={'Tính năng camera trước'} />
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
              <LabelForm title={'Công nghệ màn hình'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_technology')}
                placeholder="Nhập công nghệ màn hình"
              />
              <LabelForm title={'Độ phân giải màn hình'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_resolution')}
                placeholder="Nhập độ phân giải màn hình"
              />
              <LabelForm title={'Màn hình rộng'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.screen_size')}
                placeholder="Nhập màn hình rộng"
              />
              <LabelForm title={'Độ sáng tối đa'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.max_brightness')}
                placeholder="Nhập độ sáng tối đa"
              />
              <LabelForm title={'Mặt kính cảm ứng'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.touchscreen_glass')}
                placeholder="Nhập mặt kính cảm ứng"
              />
            </div>
            {/* Pin và sạc */}
            <div className="">
              <LabelForm title={'Dung lượng pin'} />
              <InputModal
                type="text"
                {...register('battery_and_charging.battery_capacity')}
                placeholder="Nhập dung lượng pin"
              />
              <LabelForm title={'Loại pin'} />
              <InputModal
                type="text"
                {...register('battery_and_charging.battery_type')}
                placeholder="Nhập loại pin"
              />
              <LabelForm title={'Hỗ trợ sạc tối đa'} />
              <InputModal
                type="text"
                {...register('battery_and_charging.max_charging_support')}
                placeholder="Nhập hỗ trợ sạc tối đa"
              />
              <div className="my-2">
                <LabelForm title={'Công nghệ pin'} />
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
                <LabelForm title={'Bảo mật nâng cao'} />
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
                <LabelForm title={'Tính năng đặc biệt'} />
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
              <LabelForm title={'Tên sản phẩm'} />
              <InputModal
                type="text"
                {...register('features.water_dust_resistant')}
                placeholder="Nhập Kháng nước/bụi"
              />
              <div className="my-2">
                <LabelForm title={'Ghi âm'} />
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
                <LabelForm title={'Radio'} />
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
              <LabelForm title={'Xem phim'} />
              <InputModal
                type="text"
                {...register('features.video_playback')}
                placeholder="Nhập xem phim"
              />
              <div className="my-2">
                <LabelForm title={'Nghe nhạc'} />
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
              <LabelForm title={'Mạng di động'} />
              <InputModal
                type="text"
                {...register('connectivity.mobile_network')}
                placeholder="Nhập mạng di động"
              />
              <LabelForm title={'Sim'} />
              <InputModal
                type="text"
                {...register('connectivity.sim')}
                placeholder="Nhập Sim"
              />
              <div className="my-2">
                <LabelForm title={'Wi-Fi'} />
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
                <LabelForm title={'GPS'} />
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
              <LabelForm title={'Bluetooth'} />
              <InputModal
                type="text"
                {...register('connectivity.bluetooth')}
                placeholder="Nhập bluetooth"
              />
              <LabelForm title={'Cổng kết nối/sạc'} />
              <InputModal
                type="text"
                {...register('connectivity.charging_connection_port')}
                placeholder="Nhập cổng kết nối/sạc"
              />
              <LabelForm title={'Jack tai nghe'} />
              <InputModal
                type="text"
                {...register('connectivity.headphone_jack')}
                placeholder="Nhập jack tai nghe"
              />
              <LabelForm title={'Kết nối khác'} />
              <InputModal
                type="text"
                {...register('connectivity.other_connectivity')}
                placeholder="Nhập kết nối khác"
              />
            </div>
            {/* Thiết kế và chất liệu */}
            <div className="">
              <LabelForm title={'Thiết kế'} />
              <InputModal
                type="text"
                {...register('design_and_material.design')}
                placeholder="Nhập thiết kế"
              />
              <LabelForm title={'Chất liệu'} />
              <InputModal
                type="text"
                {...register('design_and_material.material')}
                placeholder="Nhập chất liệu"
              />
              <LabelForm title={'Kích thước và khối lượng'} />
              <InputModal
                type="text"
                {...register('design_and_material.dimensions_and_weight')}
                placeholder="Nhập kích thước và khối lượng"
              />
              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register('design_and_material.release_date')}
                placeholder="Nhập thời điểm ra mắt"
              />
              <LabelForm title={'Hãng'} />
              <InputModal
                type="text"
                {...register('design_and_material.brand')}
                placeholder="Nhập hãng"
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
