import React, { useContext } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { Select as SelectDaisyUi } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phone-catalog';
import QuillEditor from '../../../../lib/ReactQuill';
import { textareaToArray } from '../../../utils/textareaToArray';

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

const ModalCreatePhoneCatalogPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createPhoneCatalog, getAllPhoneCatalogs } = useContext(PhoneCatalogContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<IPhoneCatalog>();
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
    // Convert nested fields to JSON string
    const nestedFields = [
      'configuration_and_memory',
      'camera_and_screen',
      'battery_and_charging',
      'features',
      'connectivity',
      'design_and_material'
    ] as const; // Giúp TypeScript hiểu đây là danh sách các key hợp lệ

    nestedFields.forEach(field => {
      const fieldData = formData[field as keyof IPhoneCatalog]; // Ép kiểu an toàn
      if (fieldData) {
        Object.entries(fieldData).forEach(([key, value]) => {
          // Nếu là textarea → convert thành mảng
          if (typeof value === 'string') {
            const arr = textareaToArray(value);
            if (arr.length > 0) {
              arr.forEach(item => data.append(`${field}[${key}][]`, item));
            } else {
              data.append(`${field}[${key}]`, '');
            }
            return;
          }

          // Nếu FE trả mảng dạng select multiple…
          if (Array.isArray(value)) {
            value.forEach(item => data.append(`${field}[${key}][]`, item));
            return;
          }

          // Nếu là text/number thông thường
          data.append(`${field}[${key}]`, String(value));
        });
      }
    });

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
                {...register('name', { required: true })}
                placeholder="Nhập tên danh mục sản phẩm"
              />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('price', { required: true })}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <div>
                <LabelForm title={'Trạng thái*'} />
                <SelectDaisyUi
                  className="my-2 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  defaultValue={''}
                  {...register('status', { required: true })}
                >
                  <option disabled value={''}>
                    Chọn trạng thái
                  </option>
                  <option value={0}>New</option>
                  <option value={1}>Đã sử dụng</option>
                </SelectDaisyUi>
              </div>
              <LabelForm title={'Hình ảnh*'} />
              <InputModal type="file" {...register('img', { required: true })} placeholder="Chèn hình ảnh" />
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
                <LabelForm title={'Độ phân giải camera sau'} />
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_resolution')}
                  placeholder="Nhập độ phân giải camera sau"
                />
                <div className="col-span-full w-full">
                  <LabelForm title={'Quay phim camera sau'} />
                  <Textarea
                    className="w-full border p-2 focus:outline-none"
                    {...register('camera_and_screen.rear_camera_video')}
                    placeholder="Nhập quay phim camera sau"
                  />
                </div>
                <LabelForm title={'Đèn Flash camera sau'} />
                <InputModal
                  type="text"
                  {...register('camera_and_screen.rear_camera_flash')}
                  placeholder="Nhập đèn Flash camera sau"
                />
                <div className="col-span-full w-full">
                  <LabelForm title={'Tính năng camera sau'} />
                  <Textarea
                    className="w-full border p-2 focus:outline-none"
                    {...register('camera_and_screen.rear_camera_features')}
                    placeholder="Nhập tính năng camera sau"
                  />
                </div>
              </div>

              <LabelForm title={'Độ phân giải camera trước'} />
              <InputModal
                type="text"
                {...register('camera_and_screen.front_camera_resolution')}
                placeholder="Nhập độ phân giải camera trước"
              />
              <div className="col-span-full w-full">
                <LabelForm title={'Tính năng camera trước'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('camera_and_screen.front_camera_features')}
                  placeholder="Nhập tính năng camera trước"
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
              <div className="col-span-full w-full">
                <LabelForm title={'Công nghệ pin'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('battery_and_charging.battery_technology')}
                  placeholder="Nhập công nghệ pin"
                />
              </div>
            </div>

            {/* Tiện ích */}
            <div className="">
              <div className="col-span-full w-full">
                <LabelForm title={'Bảo mật nâng cao'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('features.advanced_security')}
                  placeholder="Nhập bảo mật nâng cao"
                />
              </div>
              <div className="col-span-full w-full">
                <LabelForm title={'Tính năng đặc biệt'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('features.special_features')}
                  placeholder="Nhập tính năng đặc biệt"
                />
              </div>
              <LabelForm title={'Tên sản phẩm'} />
              <InputModal
                type="text"
                {...register('features.water_dust_resistant')}
                placeholder="Nhập Kháng nước/bụi"
              />
              <div className="col-span-full w-full">
                <LabelForm title={'Ghi âm'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('features.voice_recording')}
                  placeholder="Nhập ghi âm"
                />
              </div>
              <div className="col-span-full w-full">
                <LabelForm title={'Radio'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('features.radio')}
                  placeholder="Nhập Radio"
                />
              </div>
              <LabelForm title={'Xem phim'} />
              <InputModal type="text" {...register('features.video_playback')} placeholder="Nhập xem phim" />
              <div className="col-span-full w-full">
                <LabelForm title={'Nghe nhạc'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('features.music_playback')}
                  placeholder="Nhập nghe nhạc"
                />
              </div>
            </div>

            {/* Kết nối */}
            <div className="">
              <LabelForm title={'Mạng di động'} />
              <InputModal type="text" {...register('connectivity.mobile_network')} placeholder="Nhập mạng di động" />
              <LabelForm title={'Sim'} />
              <InputModal type="text" {...register('connectivity.sim')} placeholder="Nhập Sim" />
              <div className="col-span-full w-full">
                <LabelForm title={'Wi-Fi'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('connectivity.wifi')}
                  placeholder="Nhập Wi-Fi"
                />
              </div>
              <div className="col-span-full w-full">
                <LabelForm title={'GPS'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('connectivity.gps')}
                  placeholder="Nhập GPS"
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

export default ModalCreatePhoneCatalogPageAdmin;
