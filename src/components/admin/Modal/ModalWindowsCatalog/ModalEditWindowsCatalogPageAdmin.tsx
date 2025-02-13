import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import Select from 'react-select';
import LabelForm from '../../LabelForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { WindowsCatalogContext } from '../../../../context/windows-catalog/WindowsCatalogContext';
import { IWindowsCatalog } from '../../../../types/type/windows-catalog/windows-catalog';
import { optionsWindowsData } from '../../../../types/type/optionsData/optionsWindowsData';

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
  windowsCatalogId: string;
}

const ModalEditWindowsCatalogPageAdmin: React.FC<ModalEditAdminProps> = ({
  isOpen,
  onClose,
  windowsCatalogId
}) => {
  const {
    loading,
    getAllWindowsCatalogs,
    windowsCatalogs,
    updateWindowsCatalog
  } = useContext(WindowsCatalogContext);
  const isLoading = loading.update;
  const { control, register, handleSubmit, reset, setValue, watch } =
    useForm<IWindowsCatalog>();
  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    const tabletData = windowsCatalogs.find(
      winCatalog => winCatalog._id === windowsCatalogId
    );
    if (tabletData) {
      setValue('w_cat_name', tabletData.w_cat_name);
      setValue('w_cat_img', tabletData.w_cat_img);
      setValue('w_cat_price', tabletData.w_cat_price);
      setValue('w_cat_status', tabletData.w_cat_status);
      setValue('w_cat_content', tabletData.w_cat_content || '');
      setEditorValue(tabletData.w_cat_content || '');
      setValue('createdAt', tabletData.createdAt);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(tabletData.w_cat_img);
      // Các trường con trong `w_cat_processor`
      setValue('w_cat_processor.w_cat_cpu_technology', tabletData.w_cat_processor.w_cat_cpu_technology);
      setValue('w_cat_processor.w_cat_core_count', tabletData.w_cat_processor.w_cat_core_count);
      setValue('w_cat_processor.w_cat_thread_count', tabletData.w_cat_processor.w_cat_thread_count);
      setValue('w_cat_processor.w_cat_cpu_speed', tabletData.w_cat_processor.w_cat_cpu_speed);
      setValue('w_cat_processor.w_cat_max_speed', tabletData.w_cat_processor.w_cat_max_speed);

      // Các trường con trong `w_cat_memory_and_storage`
      setValue('w_cat_memory_and_storage.w_cat_ram', tabletData.w_cat_memory_and_storage.w_cat_ram);
      setValue('w_cat_memory_and_storage.w_cat_ram_type', tabletData.w_cat_memory_and_storage.w_cat_ram_type);
      setValue('w_cat_memory_and_storage.w_cat_ram_bus_speed', tabletData.w_cat_memory_and_storage.w_cat_ram_bus_speed);
      setValue('w_cat_memory_and_storage.w_cat_max_ram_support', tabletData.w_cat_memory_and_storage.w_cat_max_ram_support);
      setValue('w_cat_memory_and_storage.w_cat_hard_drive', tabletData.w_cat_memory_and_storage.w_cat_hard_drive);

      // Các trường con trong `w_cat_display`
      setValue('w_cat_display.w_cat_screen_size', tabletData.w_cat_display.w_cat_screen_size);
      setValue('w_cat_display.w_cat_resolution', tabletData.w_cat_display.w_cat_resolution);
      setValue('w_cat_display.w_cat_refresh_rate', tabletData.w_cat_display.w_cat_refresh_rate);
      setValue('w_cat_display.w_cat_color_coverage', tabletData.w_cat_display.w_cat_color_coverage);
      setValue('w_cat_display.w_cat_screen_technology', tabletData.w_cat_display.w_cat_screen_technology);

      // Các trường con trong `w_cat_graphics_and_audio`
      setValue('w_cat_graphics_and_audio.w_cat_gpu', tabletData.w_cat_graphics_and_audio.w_cat_gpu);
      setValue('w_cat_graphics_and_audio.w_cat_audio_technology', tabletData.w_cat_graphics_and_audio.w_cat_audio_technology);

      // Các trường con trong `w_cat_connectivity_and_ports`
      setValue('w_cat_connectivity_and_ports.w_cat_ports', tabletData.w_cat_connectivity_and_ports.w_cat_ports);
      setValue('w_cat_connectivity_and_ports.w_cat_wireless_connectivity', tabletData.w_cat_connectivity_and_ports.w_cat_wireless_connectivity);
      setValue('w_cat_connectivity_and_ports.w_cat_card_reader', tabletData.w_cat_connectivity_and_ports.w_cat_card_reader);
      setValue('w_cat_connectivity_and_ports.w_cat_webcam', tabletData.w_cat_connectivity_and_ports.w_cat_webcam);
      setValue('w_cat_connectivity_and_ports.w_cat_other_features', tabletData.w_cat_connectivity_and_ports.w_cat_other_features);
      setValue('w_cat_connectivity_and_ports.w_cat_keyboard_backlight', tabletData.w_cat_connectivity_and_ports.w_cat_keyboard_backlight);

      // Các trường con trong `w_cat_dimensions_weight_battery`
      setValue('w_cat_dimensions_weight_battery.w_cat_dimensions', tabletData.w_cat_dimensions_weight_battery.w_cat_dimensions);
      setValue('w_cat_dimensions_weight_battery.w_cat_material', tabletData.w_cat_dimensions_weight_battery.w_cat_material);
      setValue('w_cat_dimensions_weight_battery.w_cat_battery_info', tabletData.w_cat_dimensions_weight_battery.w_cat_battery_info);
      setValue('w_cat_dimensions_weight_battery.w_cat_operating_system', tabletData.w_cat_dimensions_weight_battery.w_cat_operating_system);
      setValue('w_cat_dimensions_weight_battery.w_cat_release_date', tabletData.w_cat_dimensions_weight_battery.w_cat_release_date);

      
    }
  }, [windowsCatalogs, windowsCatalogId, setValue]);
  const onSubmit: SubmitHandler<IWindowsCatalog> = async formData => {
    const data = new FormData();

    data.append('w_cat_name', formData.w_cat_name);
    data.append('w_cat_price', formData.w_cat_price.toString());
    data.append('w_cat_status', formData.w_cat_status.toString());
    data.append('w_cat_content', formData.w_cat_content || '');

    const imgFile = watch('w_cat_img');
    if (imgFile && imgFile[0]) {
      data.append('w_cat_img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('t_cat_img', existingImg);
      }
    }

     // Convert nested fields to JSON string
    data.append('w_cat_processor', JSON.stringify(formData.w_cat_processor || {}));
    data.append('w_cat_memory_and_storage', JSON.stringify(formData.w_cat_memory_and_storage || {}));
    data.append('w_cat_display', JSON.stringify(formData.w_cat_display || {}));
    data.append('w_cat_graphics_and_audio', JSON.stringify(formData.w_cat_graphics_and_audio || {}));
    data.append('w_cat_connectivity_and_ports', JSON.stringify(formData.w_cat_connectivity_and_ports || {}));
    data.append('w_cat_dimensions_weight_battery', JSON.stringify(formData.w_cat_dimensions_weight_battery || {}));
    
    try {
      await updateWindowsCatalog(windowsCatalogId, data);
      reset();
      getAllWindowsCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
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
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2">
          <p className="font-bold text-black dark:text-white">
            Cập nhật danh mục
          </p>

          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên danh mục sản phẩm*'} />
              <InputModal
                type="text"
                {...register('w_cat_name', { required: true })}
                placeholder="Nhập tên danh mục sản phẩm"
              />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('w_cat_price', { required: true })}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <LabelForm title={'Trạng thái*'} />
              <InputModal
                type="number"
                {...register('w_cat_status', { required: true })}
                placeholder="Chọn: 0(Mới) / 1(Cũ)"
              />
              <LabelForm title={'Hình ảnh*'} />
              <InputModal
                type="file"
                {...register('w_cat_img', { required: true })}
                placeholder="Chèn hình ảnh"
              />
            </div>
            {/*  Bộ xử lý */}
            <div className="">
              <LabelForm title={'Công nghệ CPU'} />
              <InputModal
                type="text"
                {...register('w_cat_processor.w_cat_cpu_technology')}
                placeholder="Nhập công nghệ CPU"
              />
              <LabelForm title={'Số nhân'} />
              <InputModal
                type="text"
                {...register('w_cat_processor.w_cat_core_count')}
                placeholder="Nhập số nhân"
              />

              <LabelForm title={'Số luồng'} />
              <InputModal
                type="text"
                {...register('w_cat_processor.w_cat_thread_count')}
                placeholder="Nhập số luồng"
              />

              <LabelForm title={'Tốc độ CPU'} />
              <InputModal
                type="text"
                {...register('w_cat_processor.w_cat_cpu_speed')}
                placeholder="Nhập tốc độ CPU"
              />

              <LabelForm title={'Tốc độ tối đa'} />
              <InputModal
                type="text"
                {...register('w_cat_processor.w_cat_max_speed')}
                placeholder="Nhập tốc độ tối đa"
              />
              {/* Bộ nhớ RAM, Ổ cứng */}
              <LabelForm title={'RAM'} />
              <InputModal
                type="text"
                {...register('w_cat_memory_and_storage.w_cat_ram')}
                placeholder="Nhập dung lượng RAM"
              />

              <LabelForm title={'Loại RAM'} />
              <InputModal
                type="text"
                {...register('w_cat_memory_and_storage.w_cat_ram_type')}
                placeholder="Nhập loại RAM"
              />

              <LabelForm title={'Tốc độ Bus RAM'} />
              <InputModal
                type="text"
                {...register('w_cat_memory_and_storage.w_cat_ram_bus_speed')}
                placeholder="Nhập tốc độ Bus RAM"
              />

              <LabelForm title={'Hỗ trợ RAM tối đa'} />
              <InputModal
                type="text"
                {...register('w_cat_memory_and_storage.w_cat_max_ram_support')}
                placeholder="Nhập hỗ trợ RAM tối đa"
              />

              <div className="my-2">
                <LabelForm title={'Ổ cứng'} />
                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_hard_drive}
                  onChange={selected =>
                    setValue(
                      'w_cat_memory_and_storage.w_cat_hard_drive',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              {/* Màn hình */}
              <LabelForm title={'Màn hình'} />
              <InputModal
                type="text"
                {...register('w_cat_display.w_cat_screen_size')}
                placeholder="Nhập màn hình"
              />

              <LabelForm title={'Độ phân giải'} />
              <InputModal
                type="text"
                {...register('w_cat_display.w_cat_resolution')}
                placeholder="Nhập độ phân giải"
              />

              <LabelForm title={'Tần số quét'} />
              <InputModal
                type="text"
                {...register('w_cat_display.w_cat_refresh_rate')}
                placeholder="Nhập tần số quét màn hình"
              />

              <LabelForm title={'Độ phủ màu'} />
              <InputModal
                type="text"
                {...register('w_cat_display.w_cat_color_coverage')}
                placeholder="Nhập độ phủ màu"
              />

              <div className="my-2">
                <LabelForm title={'Công nghệ màn hình'} />
                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_screen_technology}
                  onChange={selected =>
                    setValue(
                      'w_cat_display.w_cat_screen_technology',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              {/* Đồ hoạ và âm thanh */}
              <LabelForm title={'Card màn hình'} />
              <InputModal
                type="text"
                {...register('w_cat_graphics_and_audio.w_cat_gpu')}
                placeholder="Nhập card màn hình"
              />

              <LabelForm title={'Công nghệ âm thanh'} />
              <InputModal
                type="text"
                {...register('w_cat_graphics_and_audio.w_cat_audio_technology')}
                placeholder="Nhập công nghệ âm thanh"
              />
              {/* Cổng kết nối & tính năng mở rộng */}

              <div className="my-2">
                <LabelForm title={'Nhập cổng giao tiếp'} />
                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_ports}
                  onChange={selected =>
                    setValue(
                      'w_cat_connectivity_and_ports.w_cat_ports',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>

              <div className="my-2">
                <LabelForm title={'Kết nối không dây'} />
                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_wireless_connectivity}
                  onChange={selected =>
                    setValue(
                      'w_cat_connectivity_and_ports.w_cat_wireless_connectivity',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Khe đọc thẻ nhớ'} />
              <InputModal
                type="text"
                {...register('w_cat_connectivity_and_ports.w_cat_card_reader')}
                placeholder="Nhập khe đọc thẻ nhớ"
              />

              <LabelForm title={'Webcam'} />
              <InputModal
                type="text"
                {...register('w_cat_connectivity_and_ports.w_cat_webcam')}
                placeholder="Nhập webcam"
              />

              <div className="my-2">
                <LabelForm title={'Tính năng khác'} />
                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_other_features}
                  onChange={selected =>
                    setValue(
                      'w_cat_connectivity_and_ports.w_cat_other_features',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>

              <LabelForm title={'Đèn bàn phím'} />
              <InputModal
                type="text"
                {...register(
                  'w_cat_connectivity_and_ports.w_cat_keyboard_backlight'
                )}
                placeholder="Nhập đèn bàn phím"
              />
              {/* Kích thước - Khối lượng - Pin */}

              <div className="my-2">
                <LabelForm title={'Kích thước'} />

                <Select
                  isMulti
                  options={optionsWindowsData.w_cat_dimensions}
                  onChange={selected =>
                    setValue(
                      'w_cat_dimensions_weight_battery.w_cat_dimensions',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Chất liệu'} />
              <InputModal
                type="text"
                {...register('w_cat_dimensions_weight_battery.w_cat_material')}
                placeholder="Nhập chất liệu"
              />

              <LabelForm title={'Thông tin Pin'} />
              <InputModal
                type="text"
                {...register(
                  'w_cat_dimensions_weight_battery.w_cat_battery_info'
                )}
                placeholder="Nhập thông tin về Pin"
              />

              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register(
                  'w_cat_dimensions_weight_battery.w_cat_operating_system'
                )}
                placeholder="Nhập hệ điều hành"
              />

              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register(
                  'w_cat_dimensions_weight_battery.w_cat_release_date'
                )}
                placeholder="Nhập thời điểm ra mắt"
              />
              {/*  */}
              <div className="flex w-full flex-col items-start justify-center">
                <LabelForm title={'Nội dung'} />
                <Controller
                  name="w_cat_content"
                  control={control}
                  defaultValue={editorValue}
                  render={({ field }) => (
                    <ReactQuill
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
          </div>

          <div className="mt-5 space-x-5 text-center">
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
              className="text-white"
            >
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditWindowsCatalogPageAdmin;
