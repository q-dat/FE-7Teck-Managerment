import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import Select from 'react-select';
import { Select as SelectDaisyUi } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phone-catalog';
import { optionsPhoneData } from '../../../../types/type/optionsData/optionsPhoneData';
import QuillEditor from '../../../../lib/ReactQuill';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean'],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }]
  ]
};
interface ModalEditAdminProps {
  isOpen: boolean;
  onClose: () => void;
  phoneCatalogId: string;
}

const fields = [
  // Cấu hình và bộ nhớ
  'configuration_and_memory.operating_system',
  'configuration_and_memory.cpu_chip',
  'configuration_and_memory.cpu_speed',
  'configuration_and_memory.gpu',
  'configuration_and_memory.ram',
  'configuration_and_memory.storage_capacity',
  'configuration_and_memory.remaining_capacity',
  'configuration_and_memory.memory_card',
  'configuration_and_memory.contacts',

  // Camera và màn hình
  'camera_and_screen.rear_camera_resolution',
  'camera_and_screen.rear_camera_video',
  'camera_and_screen.rear_camera_flash',
  'camera_and_screen.rear_camera_features',
  'camera_and_screen.front_camera_resolution',
  'camera_and_screen.front_camera_features',
  'camera_and_screen.screen_technology',
  'camera_and_screen.screen_resolution',
  'camera_and_screen.screen_size',
  'camera_and_screen.max_brightness',
  'camera_and_screen.touchscreen_glass',

  // Pin và sạc
  'battery_and_charging.battery_capacity',
  'battery_and_charging.battery_type',
  'battery_and_charging.max_charging_support',
  'battery_and_charging.battery_technology',

  // Tiện ích
  'features.advanced_security',
  'features.special_features',
  'features.water_dust_resistant',
  'features.voice_recording',
  'features.radio',
  'features.video_playback',
  'features.music_playback',

  // Kết nối
  'connectivity.mobile_network',
  'connectivity.sim',
  'connectivity.wifi',
  'connectivity.gps',
  'connectivity.bluetooth',
  'connectivity.charging_connection_port',
  'connectivity.headphone_jack',
  'connectivity.other_connectivity',

  // Thiết kế và chất liệu
  'design_and_material.design',
  'design_and_material.material',
  'design_and_material.dimensions_and_weight',
  'design_and_material.release_date',
  'design_and_material.brand'
];
const ModalEditPhoneCatalogPageAdmin: React.FC<ModalEditAdminProps> = ({ isOpen, onClose, phoneCatalogId }) => {
  const { loading, getAllPhoneCatalogs, phoneCatalogs, updatePhoneCatalog } = useContext(PhoneCatalogContext);
  const isLoading = loading.update;
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<IPhoneCatalog>();
  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    const phoneData = phoneCatalogs.find(phoneCatalog => phoneCatalog._id === phoneCatalogId);
    if (phoneData) {
      setValue('name', phoneData.name);
      setValue('img', phoneData.img);
      setValue('price', phoneData.price);
      setValue('status', phoneData.status);
      setValue('content', phoneData.content || '');
      setEditorValue(phoneData.content || '');
      setValue('createdAt', phoneData.createdAt);

      // Save image path
      setExistingImg(phoneData.img);

      fields.forEach(field => {
        const keys = field.split('.'); // ex: ['m_cat_processor','m_cat_cpu_technology']
        let value: any = phoneData;
        // ex: m_cat_processor: { m_cat_cpu_technology: 'value123'}, Lấy value cuối cùng: value123
        for (const key of keys) {
          if (value && typeof value === 'object') {
            value = value[key];
          } else {
            value = undefined;
            break;
          }
        }
        setValue(field as keyof IPhoneCatalog, value);
      });
    }
  }, [phoneCatalogs, phoneCatalogId, setValue]);
  const onSubmit: SubmitHandler<IPhoneCatalog> = async formData => {
    const data = new FormData();

    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('status', formData.status.toString());
    data.append('content', formData.content || '');

    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      data.append('img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('img', existingImg);
      }
    }

    // Convert nested fields to JSON string
    const nestedFields = [
      'configuration_and_memory',
      'camera_and_screen',
      'battery_and_charging',
      'features',
      'connectivity',
      'design_and_material'
    ];

    nestedFields.forEach(field => {
      data.append(field, JSON.stringify(formData[field as keyof IPhoneCatalog] || {}));
    });

    try {
      await updatePhoneCatalog(phoneCatalogId, data);
      reset();
      getAllPhoneCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${err}`, 500);
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2">
          <p className="font-bold text-black dark:text-white">
            Cập nhật danh mục:
            <span className="text-2xl font-bold text-primary ml-2">{watch('name') || 'Tên sản phẩm chưa có'}</span>
          </p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên sản phẩm'} />
              <InputModal type="text" {...register('name')} placeholder="Nhập tên sản phẩm" />
              <LabelForm title={'Giá'} />
              <InputModal type="number" {...register('price')} placeholder="Nhập giá" />
              <div>
                <LabelForm title={'Trạng thái*'} />
                <SelectDaisyUi
                  className="my-2 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  defaultValue={''}
                  {...register('status')}
                >
                  <option disabled value={''}>
                    Chọn trạng thái
                  </option>
                  <option value={0}>New</option>
                  <option value={1}>Đã sử dụng</option>
                </SelectDaisyUi>
              </div>
              <LabelForm title={'Hình ảnh'} />
              {existingImg && (
                <div className="my-2">
                  <img src={existingImg} className="h-10 w-10 rounded-md object-cover" />
                </div>
              )}
              <InputModal type="file" {...register('img')} placeholder="Chèn ảnh hình ảnh" />
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
              <InputModal type="text" {...register('configuration_and_memory.ram')} placeholder="Nhập RAM" />
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
              <InputModal type="text" {...register('configuration_and_memory.contacts')} placeholder="Nhập danh bạ" />

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
                    options={optionsPhoneData.rear_camera_video}
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
                    options={optionsPhoneData.rear_camera_features}
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
                  options={optionsPhoneData.front_camera_features}
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
              <InputModal type="text" {...register('camera_and_screen.screen_size')} placeholder="Nhập màn hình rộng" />
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
              <InputModal type="text" {...register('battery_and_charging.battery_type')} placeholder="Nhập loại pin" />
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
                  options={optionsPhoneData.battery_technology}
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
                  options={optionsPhoneData.advanced_security}
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
                  options={optionsPhoneData.special_features}
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
                  options={optionsPhoneData.voice_recording}
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
                  options={optionsPhoneData.radio}
                  onChange={selected =>
                    setValue(
                      'features.radio',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Xem phim'} />
              <InputModal type="text" {...register('features.video_playback')} placeholder="Nhập xem phim" />
              <div className="my-2">
                <LabelForm title={'Nghe nhạc'} />
                <Select
                  isMulti
                  options={optionsPhoneData.music_playback}
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
              <InputModal type="text" {...register('connectivity.mobile_network')} placeholder="Nhập mạng di động" />
              <LabelForm title={'Sim'} />
              <InputModal type="text" {...register('connectivity.sim')} placeholder="Nhập Sim" />
              <div className="my-2">
                <LabelForm title={'Wi-Fi'} />
                <Select
                  isMulti
                  options={optionsPhoneData.wifiOptions}
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
                  options={optionsPhoneData.gpsOptions}
                  onChange={selected =>
                    setValue(
                      'connectivity.gps',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Bluetooth'} />
              <InputModal type="text" {...register('connectivity.bluetooth')} placeholder="Nhập bluetooth" />
              <LabelForm title={'Cổng kết nối/sạc'} />
              <InputModal
                type="text"
                {...register('connectivity.charging_connection_port')}
                placeholder="Nhập cổng kết nối/sạc"
              />
              <LabelForm title={'Jack tai nghe'} />
              <InputModal type="text" {...register('connectivity.headphone_jack')} placeholder="Nhập jack tai nghe" />
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
              <InputModal type="text" {...register('design_and_material.design')} placeholder="Nhập thiết kế" />
              <LabelForm title={'Chất liệu'} />
              <InputModal type="text" {...register('design_and_material.material')} placeholder="Nhập chất liệu" />
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
              <InputModal type="text" {...register('design_and_material.brand')} placeholder="Nhập hãng" />
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Nội dung'} />
              <Controller
                name="content"
                control={control}
                defaultValue={editorValue}
                render={({ field }) => (
                  <QuillEditor
                    className="w-full bg-white text-black"
                    value={field.value || ''}
                    onChange={value => field.onChange(value)}
                    theme="snow"
                    modules={modules}
                    placeholder="Nội dung mô tả..."
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-5 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black dark:text-white">
              Hủy
            </Button>
            <Button disabled={isLoading} color="primary" type="submit" className="text-white">
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPhoneCatalogPageAdmin;
