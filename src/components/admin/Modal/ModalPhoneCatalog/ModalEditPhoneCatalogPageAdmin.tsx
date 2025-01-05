import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import Select from 'react-select';
import LabelForm from '../../LabelForm';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { optionsData } from '../../../orther/data/optionsData';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phone-catalog';

interface ModalEditAdminProps {
  isOpen: boolean;
  onClose: () => void;
  PhoneCatalogId: string;
}

const ModalEditPhoneCatalogPageAdmin: React.FC<ModalEditAdminProps> = ({
  isOpen,
  onClose,
  PhoneCatalogId
}) => {
  const {
    getAllPhoneCatalogs,
    phoneCatalogs,
    getPhoneCatalogById,
    updatePhoneCatalog
  } = useContext(PhoneCatalogContext);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<IPhoneCatalog>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  useEffect(() => {
    if (PhoneCatalogId) {
      getPhoneCatalogById(PhoneCatalogId);
    }
  }, [PhoneCatalogId, getPhoneCatalogById]);

  useEffect(() => {
    const phoneData = phoneCatalogs.find(
      phoneCatalog => phoneCatalog._id === PhoneCatalogId
    );
    if (phoneData) {
      setValue('name', phoneData.name);
      setValue('img', phoneData.img);
      setValue('price', phoneData.price);
      setValue('status', phoneData.status);
      setValue('des', phoneData.des);
      setValue('createdAt', phoneData.createdAt);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(phoneData.img);

      // Các trường con trong `configuration_and_memory`
      setValue(
        'configuration_and_memory.operating_system',
        phoneData.configuration_and_memory?.operating_system
      );
      setValue(
        'configuration_and_memory.cpu_chip',
        phoneData.configuration_and_memory?.cpu_chip
      );
      setValue(
        'configuration_and_memory.cpu_speed',
        phoneData.configuration_and_memory?.cpu_speed
      );
      setValue(
        'configuration_and_memory.gpu',
        phoneData.configuration_and_memory?.gpu
      );
      setValue(
        'configuration_and_memory.ram',
        phoneData.configuration_and_memory?.ram
      );
      setValue(
        'configuration_and_memory.storage_capacity',
        phoneData.configuration_and_memory?.storage_capacity
      );
      setValue(
        'configuration_and_memory.remaining_capacity',
        phoneData.configuration_and_memory?.remaining_capacity
      );
      setValue(
        'configuration_and_memory.memory_card',
        phoneData.configuration_and_memory?.memory_card
      );
      setValue(
        'configuration_and_memory.contacts',
        phoneData.configuration_and_memory?.contacts
      );

      // Các trường con trong `camera_and_screen`
      setValue(
        'camera_and_screen.rear_camera_resolution',
        phoneData.camera_and_screen?.rear_camera_resolution
      );
      setValue(
        'camera_and_screen.rear_camera_video',
        phoneData.camera_and_screen?.rear_camera_video
      );
      setValue(
        'camera_and_screen.rear_camera_flash',
        phoneData.camera_and_screen?.rear_camera_flash
      );
      setValue(
        'camera_and_screen.rear_camera_features',
        phoneData.camera_and_screen?.rear_camera_features
      );
      setValue(
        'camera_and_screen.front_camera_resolution',
        phoneData.camera_and_screen?.front_camera_resolution
      );
      setValue(
        'camera_and_screen.front_camera_features',
        phoneData.camera_and_screen?.front_camera_features
      );
      setValue(
        'camera_and_screen.screen_technology',
        phoneData.camera_and_screen?.screen_technology
      );
      setValue(
        'camera_and_screen.screen_resolution',
        phoneData.camera_and_screen?.screen_resolution
      );
      setValue(
        'camera_and_screen.screen_size',
        phoneData.camera_and_screen?.screen_size
      );
      setValue(
        'camera_and_screen.max_brightness',
        phoneData.camera_and_screen?.max_brightness
      );
      setValue(
        'camera_and_screen.touchscreen_glass',
        phoneData.camera_and_screen?.touchscreen_glass
      );

      // Các trường con trong `battery_and_charging`
      setValue(
        'battery_and_charging.battery_capacity',
        phoneData.battery_and_charging?.battery_capacity
      );
      setValue(
        'battery_and_charging.battery_type',
        phoneData.battery_and_charging?.battery_type
      );
      setValue(
        'battery_and_charging.max_charging_support',
        phoneData.battery_and_charging?.max_charging_support
      );
      setValue(
        'battery_and_charging.battery_technology',
        phoneData.battery_and_charging?.battery_technology
      );

      // Các trường con trong `features`
      setValue(
        'features.advanced_security',
        phoneData.features?.advanced_security
      );
      setValue(
        'features.special_features',
        phoneData.features?.special_features
      );
      setValue(
        'features.water_dust_resistant',
        phoneData.features?.water_dust_resistant
      );
      setValue('features.voice_recording', phoneData.features?.voice_recording);
      setValue('features.radio', phoneData.features?.radio);
      setValue('features.video_playback', phoneData.features?.video_playback);
      setValue('features.music_playback', phoneData.features?.music_playback);

      // Các trường con trong `connectivity`
      setValue(
        'connectivity.mobile_network',
        phoneData.connectivity?.mobile_network
      );
      setValue('connectivity.sim', phoneData.connectivity?.sim);
      setValue('connectivity.wifi', phoneData.connectivity?.wifi);
      setValue('connectivity.gps', phoneData.connectivity?.gps);
      setValue('connectivity.bluetooth', phoneData.connectivity?.bluetooth);
      setValue(
        'connectivity.charging_connection_port',
        phoneData.connectivity?.charging_connection_port
      );
      setValue(
        'connectivity.headphone_jack',
        phoneData.connectivity?.headphone_jack
      );
      setValue(
        'connectivity.other_connectivity',
        phoneData.connectivity?.other_connectivity
      );

      // Các trường con trong `design_and_material`
      setValue(
        'design_and_material.design',
        phoneData.design_and_material?.design
      );
      setValue(
        'design_and_material.material',
        phoneData.design_and_material?.material
      );
      setValue(
        'design_and_material.dimensions_and_weight',
        phoneData.design_and_material?.dimensions_and_weight
      );
      setValue(
        'design_and_material.release_date',
        phoneData.design_and_material?.release_date
      );
      setValue(
        'design_and_material.brand',
        phoneData.design_and_material?.brand
      );
    }
  }, [phoneCatalogs, PhoneCatalogId, setValue]);
  const onSubmit: SubmitHandler<IPhoneCatalog> = async formData => {
    const data = new FormData();

    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('des', formData.des || '');
    data.append('status', formData.status || '');

    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      data.append('img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('img', existingImg);
      }
    }

    // Convert nested fields to JSON string
    data.append(
      'configuration_and_memory',
      JSON.stringify(formData.configuration_and_memory || {})
    );
    data.append(
      'camera_and_screen',
      JSON.stringify(formData.camera_and_screen || {})
    );
    data.append(
      'battery_and_charging',
      JSON.stringify(formData.battery_and_charging || {})
    );
    data.append('features', JSON.stringify(formData.features || {}));
    data.append('connectivity', JSON.stringify(formData.connectivity || {}));
    data.append(
      'design_and_material',
      JSON.stringify(formData.design_and_material || {})
    );

    try {
      await updatePhoneCatalog(PhoneCatalogId, data);
      reset();
      getAllPhoneCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllPhoneCatalogs();
      Toastify(`Lỗi: ${err}`, 500);
      console.error(err);
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
          <p className="font-bold text-black dark:text-white">
            Cập nhật danh mục
          </p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên sản phẩm'} />
              <InputModal
                type="text"
                {...register('name')}
                placeholder="Nhập tên sản phẩm"
              />
              <LabelForm title={'Giá'} />
              <InputModal
                type="number"
                {...register('price')}
                placeholder="Nhập giá"
              />
              <LabelForm title={'Trạng thái'} />
              <InputModal
                type="text"
                {...register('status')}
                placeholder="Nhập trạng thái"
              />
              <LabelForm title={'Mô tả'} />
              <InputModal
                type="text"
                {...register('des')}
                placeholder="Nhập mô tả"
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
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
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

export default ModalEditPhoneCatalogPageAdmin;
