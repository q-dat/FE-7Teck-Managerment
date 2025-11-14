import React, { useContext } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { Select as SelectDaisyUi } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { TabletCatalogContext } from '../../../../context/tablet-catalog/TabletCatalogContext';
import { ITabletCatalog } from '../../../../types/type/tablet-catalog/tablet-catalog';
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

const ModalCreateTabletCatalogPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createTabletCatalog, getAllTabletCatalogs } = useContext(TabletCatalogContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<ITabletCatalog>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  const onSubmit: SubmitHandler<ITabletCatalog> = async formData => {
    const data = new FormData();
    data.append('t_cat_name', formData.t_cat_name);
    data.append('t_cat_price', formData.t_cat_price.toString());
    data.append('t_cat_status', formData.t_cat_status.toString());
    data.append('t_cat_content', editorValue);

    // Append ảnh
    if (formData.t_cat_img && formData.t_cat_img[0]) {
      data.append('t_cat_img', formData.t_cat_img[0]);
    }

    // Convert nested fields to JSON string
    const nestedFields = [
      't_cat_display',
      't_cat_operating_system_and_cpu',
      't_cat_memory_and_storage',
      't_cat_rear_camera',
      't_cat_front_camera',
      't_cat_connectivity',
      't_cat_features',
      't_cat_battery_and_charging',
      't_cat_general_information'
    ] as const; // Giúp TypeScript hiểu đây là danh sách các key hợp lệ

    nestedFields.forEach(field => {
      const fieldData = formData[field as keyof ITabletCatalog]; // Ép kiểu an toàn
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
      await createTabletCatalog(data);
      reset();
      getAllTabletCatalogs();
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
                {...register('t_cat_name', { required: true })}
                placeholder="Nhập tên danh mục sản phẩm"
              />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('t_cat_price', { required: true })}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <div>
                <LabelForm title={'Trạng thái*'} />
                <SelectDaisyUi
                  className="my-2 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  defaultValue={''}
                  {...register('t_cat_status', { required: true })}
                >
                  <option disabled value={''}>
                    Chọn trạng thái
                  </option>
                  <option value={0}>New</option>
                  <option value={1}>Đã sử dụng</option>
                </SelectDaisyUi>
              </div>
              <LabelForm title={'Hình ảnh*'} />
              <InputModal type="file" {...register('t_cat_img', { required: true })} placeholder="Chèn hình ảnh" />
            </div>
            {/* Màn hình*/}
            <div className="">
              <LabelForm title={'Công nghệ màn hình'} />
              <InputModal
                type="text"
                {...register('t_cat_display.t_cat_screen_technology')}
                placeholder="Nhập công nghệ màn hình"
              />
              <LabelForm title={'Độ phân giải'} />
              <InputModal type="text" {...register('t_cat_display.t_cat_resolution')} placeholder="Nhập độ phân giải" />
              <LabelForm title={'Màn hình rộng'} />
              <InputModal
                type="text"
                {...register('t_cat_display.t_cat_screen_size')}
                placeholder="Nhập màn hình rộng"
              />
              {/* Hệ điều hành & CPU */}
              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_operating_system')}
                placeholder="Nhập hệ điều hành"
              />
              <LabelForm title={'Chip xử lý (CPU)'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_cpu_chip')}
                placeholder="Nhập chip xử lý (CPU)"
              />
              <LabelForm title={'Tốc độ CPU'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_cpu_speed')}
                placeholder="Nhập tốc độ CPU"
              />
              <LabelForm title={'Chip đồ hoạ (GPU)'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_gpu')}
                placeholder="Nhập chip đồ hoạ (GPU)"
              />
              {/*  Bộ nhớ & Lưu trữ */}
              <LabelForm title={'RAM'} />
              <InputModal type="text" {...register('t_cat_memory_and_storage.t_cat_ram')} placeholder="Nhập RAM" />
              <LabelForm title={'Dung lượng lưu trữ'} />
              <InputModal
                type="text"
                {...register('t_cat_memory_and_storage.t_cat_storage_capacity')}
                placeholder="Nhập dung lượng lưu trữ"
              />
              <LabelForm title={'Dung lượng còn lại'} />
              <InputModal
                type="text"
                {...register('t_cat_memory_and_storage.t_cat_available_storage')}
                placeholder="Nhập dung lượng còn lại"
              />

              {/* Camera sau */}
              <div className="">
                <LabelForm title={'Độ phân giải'} />
                <InputModal
                  type="text"
                  {...register('t_cat_rear_camera.t_cat_resolution')}
                  placeholder="Nhập độ phân giải"
                />
                <div className="col-span-full w-full">
                  <LabelForm title={'Quay phim'} />
                  <Textarea
                    className="w-full border p-2 focus:outline-none"
                    {...register('t_cat_rear_camera.t_cat_video_recording')}
                    placeholder="Nhập quay phim"
                  />
                </div>
                <div className="col-span-full w-full">
                  <LabelForm title={'Tính năng cam sau'} />
                  <Textarea
                    className="w-full border p-2 focus:outline-none"
                    {...register('t_cat_rear_camera.t_cat_features')}
                    placeholder="Nhập tính năng cam sau"
                  />
                </div>
                {/* Camera trước */}
                <LabelForm title={'Độ phân giải'} />
                <InputModal
                  type="text"
                  {...register('t_cat_front_camera.t_cat_resolution')}
                  placeholder="Nhập độ phân giải"
                />
                <div className="col-span-full w-full">
                  <LabelForm title={'Tính năng cam trước'} />
                  <Textarea
                    className="w-full border p-2 focus:outline-none"
                    {...register('t_cat_front_camera.t_cat_features')}
                    placeholder="Nhập tính năng cam trước"
                  />
                </div>
              </div>
              {/* Kết nối */}
              <LabelForm title={'Mạng di động'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_mobile_network')}
                placeholder="Nhập mạng di động"
              />
              <LabelForm title={'SIM'} />
              <InputModal type="text" {...register('t_cat_connectivity.t_cat_sim')} placeholder="Nhập SIM" />
              <LabelForm title={'Thực hiện cuộc gọi'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_calls')}
                placeholder="Nhập thực hiện cuộc gọi"
              />
              <div className="col-span-full w-full">
                <LabelForm title={'Wifi'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('t_cat_connectivity.t_cat_wifi')}
                  placeholder="Nhập Wifi"
                />
              </div>
              <div className="col-span-full w-full">
                <LabelForm title={'GPS'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('t_cat_connectivity.t_cat_gps')}
                  placeholder="Nhập GPS"
                />
              </div>
              <LabelForm title={'Bluetooth'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_bluetooth')}
                placeholder="Nhập Bluetooth"
              />
              <LabelForm title={'Cổng kết nối/sạc'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_charging_port')}
                placeholder="Nhập cổng kết nối/sạc"
              />
              <LabelForm title={'Jack tai nghe'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_headphone_jack')}
                placeholder="Nhập Jack tai nghe"
              />
              {/* Tiện ích */}
              <LabelForm title={'Tính năng đặc biệt'} />
              <InputModal
                type="text"
                {...register('t_cat_features.t_cat_special_features')}
                placeholder="Nhập tính năng đặc biệt"
              />
              {/* Pin & Sạc */}
              <LabelForm title={'Dung lượng pin'} />
              <InputModal
                type="text"
                {...register('t_cat_battery_and_charging.t_cat_battery_capacity')}
                placeholder="Nhập Dung lượng pin"
              />
              <LabelForm title={'Loại pin'} />
              <InputModal
                type="text"
                {...register('t_cat_battery_and_charging.t_cat_battery_type')}
                placeholder="Nhập loại pin"
              />
              <div className="col-span-full w-full">
                <LabelForm title={'Công nghệ pin'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('t_cat_battery_and_charging.t_cat_battery_technology')}
                  placeholder="Nhập công nghệ pin"
                />
              </div>
              <LabelForm title={'Hỗ trợ sạc tối đa'} />
              <InputModal
                type="text"
                {...register('t_cat_battery_and_charging.t_cat_max_charging_support')}
                placeholder="Nhập hỗ trợ sạc tối đa"
              />
            </div>
            <div className="">
              <LabelForm title={'Sạc kèm theo máy'} />
              <InputModal
                type="text"
                {...register('t_cat_battery_and_charging.t_cat_included_charger')}
                placeholder="Nhập sạc kèm theo máy"
              />
              {/* Thông tin chung */}

              <LabelForm title={' Chất liệu'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_material')}
                placeholder="Nhập  chất liệu"
              />
              <LabelForm title={'Kích thước và khối lượng'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_dimensions_and_weight')}
                placeholder="Nhập kích thước và khối lượng"
              />
              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_launch_date')}
                placeholder="Nhập thời điểm ra mắt"
              />
              <LabelForm title={'Hãng'} />
              <InputModal type="text" {...register('t_cat_general_information.t_cat_brand')} placeholder="Nhập hãng" />
            </div>
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

export default ModalCreateTabletCatalogPageAdmin;
