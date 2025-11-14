import React, { useContext } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { Select as SelectDaisyUi } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { IWindowsCatalog } from '../../../../types/type/windows-catalog/windows-catalog';
import { WindowsCatalogContext } from '../../../../context/windows-catalog/WindowsCatalogContext';
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
interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateWindowsCatalogPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createWindowsCatalog, getAllWindowsCatalogs } = useContext(WindowsCatalogContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<IWindowsCatalog>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  const onSubmit: SubmitHandler<IWindowsCatalog> = async formData => {
    const data = new FormData();
    data.append('w_cat_name', formData.w_cat_name);
    data.append('w_cat_price', formData.w_cat_price.toString());
    data.append('w_cat_status', formData.w_cat_status.toString());
    data.append('w_cat_content', editorValue);

    // Append ảnh
    if (formData.w_cat_img && formData.w_cat_img[0]) {
      data.append('w_cat_img', formData.w_cat_img[0]);
    }

    // Convert nested fields to JSON string
    const nestedFields = [
      'w_cat_processor',
      'w_cat_memory_and_storage',
      'w_cat_display',
      'w_cat_graphics_and_audio',
      'w_cat_connectivity_and_ports',
      'w_cat_dimensions_weight_battery'
    ] as const; // Giúp TypeScript hiểu đây là danh sách các key hợp lệ

    nestedFields.forEach(field => {
      const fieldData = formData[field as keyof IWindowsCatalog]; // Ép kiểu an toàn
      if (fieldData) {
        Object.entries(fieldData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => data.append(`${field}[${key}][]`, item));
          } else {
            data.append(`${field}[${key}]`, value);
          }
        });
      }
    });

    try {
      await createWindowsCatalog(data);
      reset();
      getAllWindowsCatalogs();
      Toastify('Tạo danh mục thành công!', 201);
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
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-2/3">
          <p className="font-bold text-black dark:text-white">Tạo danh mục mới</p>
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
              <div>
                <LabelForm title={'Trạng thái*'} />
                <SelectDaisyUi
                  className="my-2 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  defaultValue={''}
                  {...register('w_cat_status', { required: true })}
                >
                  <option disabled value={''}>
                    Chọn trạng thái
                  </option>
                  <option value={0}>New</option>
                  <option value={1}>Đã sử dụng</option>
                </SelectDaisyUi>
              </div>
              <LabelForm title={'Hình ảnh*'} />
              <InputModal type="file" {...register('w_cat_img', { required: true })} placeholder="Chèn hình ảnh" />
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
              <InputModal type="number" {...register('w_cat_processor.w_cat_core_count')} placeholder="Nhập số nhân" />

              <LabelForm title={'Số luồng'} />
              <InputModal
                type="number"
                {...register('w_cat_processor.w_cat_thread_count')}
                placeholder="Nhập số luồng"
              />

              <LabelForm title={'Tốc độ CPU'} />
              <InputModal type="text" {...register('w_cat_processor.w_cat_cpu_speed')} placeholder="Nhập tốc độ CPU" />

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

              <div className="col-span-full w-full">
                <LabelForm title={'Ổ cứng'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_memory_and_storage.w_cat_hard_drive')}
                  placeholder="Nhập ổ cứng"
                />
              </div>
              {/* Màn hình */}
              <LabelForm title={'Màn hình'} />
              <InputModal type="text" {...register('w_cat_display.w_cat_screen_size')} placeholder="Nhập màn hình" />

              <LabelForm title={'Độ phân giải'} />
              <InputModal type="text" {...register('w_cat_display.w_cat_resolution')} placeholder="Nhập độ phân giải" />

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

              <div className="col-span-full w-full">
                <LabelForm title={'Công nghệ màn hình'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_display.w_cat_screen_technology')}
                  placeholder="Nhập công nghệ màn hình"
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

              <div className="col-span-full w-full">
                <LabelForm title={'Nhập cổng giao tiếp'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_connectivity_and_ports.w_cat_ports')}
                  placeholder="Nhập cổng giao tiếp"
                />
              </div>

              <div className="col-span-full w-full">
                <LabelForm title={'Kết nối không dây'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_connectivity_and_ports.w_cat_wireless_connectivity')}
                  placeholder="Nhập kết nối không dây"
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

              <div className="col-span-full w-full">
                <LabelForm title={'Tính năng khác'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_connectivity_and_ports.w_cat_other_features')}
                  placeholder="Nhập tính năng khác"
                />
              </div>

              <LabelForm title={'Đèn bàn phím'} />
              <InputModal
                type="text"
                {...register('w_cat_connectivity_and_ports.w_cat_keyboard_backlight')}
                placeholder="Nhập đèn bàn phím"
              />
              {/* Kích thước - Khối lượng - Pin */}

              <div className="col-span-full w-full">
                <LabelForm title={'Kích thước'} />

                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('w_cat_dimensions_weight_battery.w_cat_dimensions')}
                  placeholder="Nhập kích thước"
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
                {...register('w_cat_dimensions_weight_battery.w_cat_battery_info')}
                placeholder="Nhập thông tin về Pin"
              />

              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register('w_cat_dimensions_weight_battery.w_cat_operating_system')}
                placeholder="Nhập hệ điều hành"
              />

              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register('w_cat_dimensions_weight_battery.w_cat_release_date')}
                placeholder="Nhập thời điểm ra mắt"
              />

              {/*  */}
              <div className="w-full">
                <QuillEditor
                  value={editorValue}
                  onChange={setEditorValue}
                  theme="snow"
                  modules={modules}
                  placeholder="Nội dung mô tả..."
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row items-center justify-center space-x-5 text-center">
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

export default ModalCreateWindowsCatalogPageAdmin;
