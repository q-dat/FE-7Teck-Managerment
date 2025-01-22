import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import Select from 'react-select';
import LabelForm from '../../LabelForm';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { optionsData } from '../../../orther/data/optionsData';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phone-catalog';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePhoneCatalogPageAdmin: React.FC<ModalCreateAdminProps> = ({
  isOpen,
  onClose
}) => {
  const { loading, createPhoneCatalog, getAllPhoneCatalogs } =
    useContext(PhoneCatalogContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset, setValue } = useForm<IPhoneCatalog>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  const onSubmit: SubmitHandler<IPhoneCatalog> = async formData => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('status', formData.status.toString());
    data.append('content', editorValue);

    // Append ảnh
    if (formData.img && formData.img[0]) {
      data.append('img', formData.img[0]);
    }

    // Append các trường trong configuration_and_memory
    if (formData.configuration_and_memory) {
      Object.entries(formData.configuration_and_memory).forEach(
        ([key, value]) => {
          data.append(`configuration_and_memory[${key}]`, value);
        }
      );
    }

    // Append các trường trong camera_and_screen
    if (formData.camera_and_screen) {
      Object.entries(formData.camera_and_screen).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item =>
            data.append(`camera_and_screen[${key}][]`, item)
          );
        } else {
          data.append(`camera_and_screen[${key}]`, value);
        }
      });
    }

    // Append các trường trong battery_and_charging
    if (formData.battery_and_charging) {
      Object.entries(formData.battery_and_charging).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item =>
            data.append(`battery_and_charging[${key}][]`, item)
          );
        } else {
          data.append(`battery_and_charging[${key}]`, value);
        }
      });
    }

    // Append các trường trong features
    if (formData.features) {
      Object.entries(formData.features).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => data.append(`features[${key}][]`, item));
        } else {
          data.append(`features[${key}]`, value);
        }
      });
    }

    // Append các trường trong connectivity
    if (formData.connectivity) {
      Object.entries(formData.connectivity).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => data.append(`connectivity[${key}][]`, item));
        } else {
          data.append(`connectivity[${key}]`, value);
        }
      });
    }

    // Append các trường trong design_and_material
    if (formData.design_and_material) {
      Object.entries(formData.design_and_material).forEach(([key, value]) => {
        data.append(`design_and_material[${key}]`, value);
      });
    }

    try {
      await createPhoneCatalog(data);
      reset();
      getAllPhoneCatalogs();
      Toastify('Tạo danh mục thành công!', 201);
      onClose();
    } catch (err) {
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
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-2/3">
          <p className="font-bold text-black dark:text-white">
            Tạo danh mục mới
          </p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên danh mục sản phẩm*'} />
              <InputModal
                type="text"
                {...register('name', { required: true })}
                placeholder="Nhập tên danh mục sản phẩm"
              />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('price', { required: true })}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <LabelForm title={'Trạng thái*'} />
              <InputModal
                type="number"
                {...register('status', { required: true })}
                placeholder="Chọn: 0(Mới) / 1(Cũ)"
              />
              <LabelForm title={'Hình ảnh*'} />
              <InputModal
                type="file"
                {...register('img', { required: true })}
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
            <div className="w-full">
              <ReactQuill
                value={editorValue}
                onChange={setEditorValue}
                theme="snow"
                modules={modules}
                placeholder="Nội dung mô tả..."
              />
            </div>
          </div>
          <div className="mt-5 flex flex-row items-center justify-center space-x-5 text-center">
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {isLoading ? 'Đang tạo...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreatePhoneCatalogPageAdmin;
