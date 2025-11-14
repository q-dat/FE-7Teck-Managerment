import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import { Select as SelectDaisyUi } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { IMacbookCatalog } from '../../../../types/type/macbook-catalog/macbook-catalog';
import { MacbookCatalogContext } from '../../../../context/macbook-catalog/MacbookCatalogContext';
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

interface ModalEditAdminProps {
  isOpen: boolean;
  onClose: () => void;
  macbookCatalogId: string;
}

/**
 * Các path nested mà form sử dụng (dùng để typesafe với TypeScript)
 */
type NestedFieldKey =
  | 'm_cat_processor'
  | 'm_cat_memory_and_storage'
  | 'm_cat_display'
  | 'm_cat_graphics_and_audio'
  | 'm_cat_connectivity_and_ports'
  | 'm_cat_dimensions_weight_battery';

const fields = [
  // Bộ xử lý
  'm_cat_processor.m_cat_cpu_technology',
  'm_cat_processor.m_cat_core_count',
  'm_cat_processor.m_cat_thread_count',
  'm_cat_processor.m_cat_cpu_speed',
  'm_cat_processor.m_cat_max_speed',

  // Bộ nhớ RAM, Ổ cứng
  'm_cat_memory_and_storage.m_cat_ram',
  'm_cat_memory_and_storage.m_cat_ram_type',
  'm_cat_memory_and_storage.m_cat_ram_bus_speed',
  'm_cat_memory_and_storage.m_cat_max_ram_support',
  'm_cat_memory_and_storage.m_cat_hard_drive',

  // Màn hình
  'm_cat_display.m_cat_screen_size',
  'm_cat_display.m_cat_resolution',
  'm_cat_display.m_cat_refresh_rate',
  'm_cat_display.m_cat_color_coverage',
  'm_cat_display.m_cat_screen_technology',

  // Đồ hoạ và Âm thanh
  'm_cat_graphics_and_audio.m_cat_gpu',
  'm_cat_graphics_and_audio.m_cat_audio_technology',

  // Cổng kết nối & Tính năng mở rộng
  'm_cat_connectivity_and_ports.m_cat_ports',
  'm_cat_connectivity_and_ports.m_cat_wireless_connectivity',
  'm_cat_connectivity_and_ports.m_cat_card_reader',
  'm_cat_connectivity_and_ports.m_cat_webcam',
  'm_cat_connectivity_and_ports.m_cat_other_features',
  'm_cat_connectivity_and_ports.m_cat_keyboard_backlight',

  // Kích thước - Khối lượng - Pin
  'm_cat_dimensions_weight_battery.m_cat_dimensions',
  'm_cat_dimensions_weight_battery.m_cat_material',
  'm_cat_dimensions_weight_battery.m_cat_battery_info',
  'm_cat_dimensions_weight_battery.m_cat_operating_system',
  'm_cat_dimensions_weight_battery.m_cat_release_date'
];

const ModalEditMacbookCatalogPageAdmin: React.FC<ModalEditAdminProps> = ({ isOpen, onClose, macbookCatalogId }) => {
  const { loading, getAllMacbookCatalogs, macbookCatalogs, updateMacbookCatalog } = useContext(MacbookCatalogContext);
  const isLoading = loading.update;
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<IMacbookCatalog>();
  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [editorValue, setEditorValue] = useState<string>('');

  // Mapping các key nào trong nested object là textarea dạng array (string[])
  const textareaArrayKeys: Record<
    NestedFieldKey,
    Array<
      | 'm_cat_hard_drive'
      | 'm_cat_screen_technology'
      | 'm_cat_ports'
      | 'm_cat_wireless_connectivity'
      | 'm_cat_other_features'
      | 'm_cat_dimensions'
    >
  > = {
    m_cat_processor: [],
    m_cat_memory_and_storage: ['m_cat_hard_drive'],
    m_cat_display: ['m_cat_screen_technology'],
    m_cat_graphics_and_audio: [],
    m_cat_connectivity_and_ports: ['m_cat_ports', 'm_cat_wireless_connectivity', 'm_cat_other_features'],
    m_cat_dimensions_weight_battery: ['m_cat_dimensions']
  };

  // Helper: chuyển array -> textarea string (mỗi item trên 1 dòng)
  const arrayToTextarea = (arr?: string[] | undefined): string => {
    if (!arr || !Array.isArray(arr)) return '';
    return arr.join('\n');
  };

  useEffect(() => {
    const macbookData = macbookCatalogs.find(macCatalog => macCatalog._id === macbookCatalogId);
    if (macbookData) {
      // Basic fields
      setValue('m_cat_name', macbookData.m_cat_name);
      // m_cat_img: keep string path in state; file input will be empty (only used if user uploads)
      setValue('m_cat_img', macbookData.m_cat_img as unknown as any); // keep for watch compatibility
      setValue('m_cat_price', macbookData.m_cat_price);
      setValue('m_cat_status', macbookData.m_cat_status);
      setValue('m_cat_content', macbookData.m_cat_content || '');
      setEditorValue(macbookData.m_cat_content || '');
      setValue('createdAt', macbookData.createdAt as unknown as any);

      // Save image path for fallback
      setExistingImg(macbookData.m_cat_img);

      // For each defined field path, set value.
      // If it's an array field (string[]), convert to textarea string.
      fields.forEach(field => {
        const keys = field.split('.'); // e.g. ['m_cat_processor', 'm_cat_cpu_technology']
        let val: any = macbookData;
        for (const key of keys) {
          if (val && typeof val === 'object') {
            val = val[key];
          } else {
            val = undefined;
            break;
          }
        }

        // If final key corresponds to an array field, convert to newline-separated string
        const parentKey = keys[0] as NestedFieldKey;
        const finalKey = keys[1];

        const shouldConvertToTextarea =
          textareaArrayKeys[parentKey] && textareaArrayKeys[parentKey].includes(finalKey as any);

        if (shouldConvertToTextarea && Array.isArray(val)) {
          setValue(field as any, arrayToTextarea(val));
        } else if (val !== undefined) {
          setValue(field as any, val);
        } else {
          setValue(field as any, '');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macbookCatalogs, macbookCatalogId, setValue]);

  const onSubmit: SubmitHandler<IMacbookCatalog> = async formData => {
    const data = new FormData();

    data.append('m_cat_name', formData.m_cat_name);
    data.append('m_cat_price', String(formData.m_cat_price ?? 0));
    data.append('m_cat_status', String(formData.m_cat_status ?? 0));
    data.append('m_cat_content', formData.m_cat_content || '');

    const imgFile = watch('m_cat_img');
    if (imgFile && imgFile[0]) {
      data.append('m_cat_img', imgFile[0]);
    } else if (existingImg) {
      // If user didn't upload a new File, send existing URL so backend can keep it
      data.append('m_cat_img', existingImg);
    }

    // Convert nested fields to JSON string, but convert textarea fields into arrays first
    const nestedFields: NestedFieldKey[] = [
      'm_cat_processor',
      'm_cat_memory_and_storage',
      'm_cat_display',
      'm_cat_graphics_and_audio',
      'm_cat_connectivity_and_ports',
      'm_cat_dimensions_weight_battery'
    ];

    nestedFields.forEach(field => {
      // Safe read from formData typed as IMacbookCatalog
      const rawNested = (formData as any)[field] ?? {};

      // Start with shallow copy to mutate safely
      const nestedObj: Record<string, any> =
        typeof rawNested === 'object' && rawNested !== null ? { ...rawNested } : {};

      // If this nested has textarea-to-array keys, convert them
      const arrayKeys = textareaArrayKeys[field] || [];
      arrayKeys.forEach(k => {
        const maybeString = nestedObj[k];
        if (typeof maybeString === 'string') {
          nestedObj[k] = textareaToArray(maybeString);
        } else if (Array.isArray(maybeString)) {
          // already array — keep
          nestedObj[k] = maybeString;
        } else {
          nestedObj[k] = [];
        }
      });

      // Ensure other expected primitive fields are string (no undefined)
      Object.keys(nestedObj).forEach(k => {
        if (nestedObj[k] === undefined || nestedObj[k] === null) {
          nestedObj[k] = '';
        }
      });

      data.append(field, JSON.stringify(nestedObj));
    });

    try {
      await updateMacbookCatalog(macbookCatalogId, data);
      reset();
      getAllMacbookCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${err}`, 500);
      // eslint-disable-next-line no-console
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
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2">
          <p className="font-bold text-black dark:text-white">
            Cập nhật danh mục
            <span className="ml-2 text-2xl font-bold text-primary">
              {watch('m_cat_name') || 'Tên sản phẩm chưa có'}
            </span>
          </p>

          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên danh mục sản phẩm*'} />
              <InputModal type="text" {...register('m_cat_name')} placeholder="Nhập tên danh mục sản phẩm" />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('m_cat_price')}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <div>
                <LabelForm title={'Trạng thái*'} />
                <SelectDaisyUi
                  className="my-2 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  defaultValue={''}
                  {...register('m_cat_status')}
                >
                  <option disabled value={''}>
                    Chọn trạng thái
                  </option>
                  <option value={0}>New</option>
                  <option value={1}>Đã sử dụng</option>
                </SelectDaisyUi>
              </div>
              <LabelForm title={'Hình ảnh*'} />
              {existingImg && (
                <div className="col-span-full w-full">
                  <img src={existingImg} className="h-10 w-10 rounded-md object-cover" />
                </div>
              )}
              <InputModal type="file" {...register('m_cat_img')} placeholder="Chèn hình ảnh" />
            </div>
            {/*  Bộ xử lý */}
            <div className="">
              <LabelForm title={'Công nghệ CPU'} />
              <InputModal
                type="text"
                {...register('m_cat_processor.m_cat_cpu_technology' as any)}
                placeholder="Nhập công nghệ CPU"
              />
              <LabelForm title={'Số nhân'} />
              <InputModal
                type="number"
                {...register('m_cat_processor.m_cat_core_count' as any)}
                placeholder="Nhập số nhân"
              />

              <LabelForm title={'Số luồng'} />
              <InputModal
                type="number"
                {...register('m_cat_processor.m_cat_thread_count' as any)}
                placeholder="Nhập số luồng"
              />

              <LabelForm title={'Tốc độ CPU'} />
              <InputModal
                type="text"
                {...register('m_cat_processor.m_cat_cpu_speed' as any)}
                placeholder="Nhập tốc độ CPU"
              />

              <LabelForm title={'Tốc độ tối đa'} />
              <InputModal
                type="text"
                {...register('m_cat_processor.m_cat_max_speed' as any)}
                placeholder="Nhập tốc độ tối đa"
              />
              {/* Bộ nhớ RAM, Ổ cứng */}
              <LabelForm title={'RAM'} />
              <InputModal
                type="text"
                {...register('m_cat_memory_and_storage.m_cat_ram' as any)}
                placeholder="Nhập dung lượng RAM"
              />

              <LabelForm title={'Loại RAM'} />
              <InputModal
                type="text"
                {...register('m_cat_memory_and_storage.m_cat_ram_type' as any)}
                placeholder="Nhập loại RAM"
              />

              <LabelForm title={'Tốc độ Bus RAM'} />
              <InputModal
                type="text"
                {...register('m_cat_memory_and_storage.m_cat_ram_bus_speed' as any)}
                placeholder="Nhập tốc độ Bus RAM"
              />

              <LabelForm title={'Hỗ trợ RAM tối đa'} />
              <InputModal
                type="text"
                {...register('m_cat_memory_and_storage.m_cat_max_ram_support' as any)}
                placeholder="Nhập hỗ trợ RAM tối đa"
              />

              <div className="col-span-full w-full">
                <LabelForm title={'Ổ cứng'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_memory_and_storage.m_cat_hard_drive' as any)}
                  placeholder="Nhập ổ cứng (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>
              {/* Màn hình */}
              <LabelForm title={'Màn hình'} />
              <InputModal
                type="text"
                {...register('m_cat_display.m_cat_screen_size' as any)}
                placeholder="Nhập màn hình"
              />

              <LabelForm title={'Độ phân giải'} />
              <InputModal
                type="text"
                {...register('m_cat_display.m_cat_resolution' as any)}
                placeholder="Nhập độ phân giải"
              />

              <LabelForm title={'Tần số quét'} />
              <InputModal
                type="text"
                {...register('m_cat_display.m_cat_refresh_rate' as any)}
                placeholder="Nhập tần số quét màn hình"
              />

              <LabelForm title={'Độ phủ màu'} />
              <InputModal
                type="text"
                {...register('m_cat_display.m_cat_color_coverage' as any)}
                placeholder="Nhập độ phủ màu"
              />

              <div className="col-span-full w-full">
                <LabelForm title={'Công nghệ màn hình'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_display.m_cat_screen_technology' as any)}
                  placeholder="Nhập công nghệ màn hình (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>
              {/* Đồ hoạ và âm thanh */}
              <LabelForm title={'Card màn hình'} />
              <InputModal
                type="text"
                {...register('m_cat_graphics_and_audio.m_cat_gpu' as any)}
                placeholder="Nhập card màn hình"
              />

              <LabelForm title={'Công nghệ âm thanh'} />
              <InputModal
                type="text"
                {...register('m_cat_graphics_and_audio.m_cat_audio_technology' as any)}
                placeholder="Nhập công nghệ âm thanh"
              />
              {/* Cổng kết nối & tính năng mở rộng */}

              <div className="col-span-full w-full">
                <LabelForm title={'Nhập cổng giao tiếp'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_connectivity_and_ports.m_cat_ports' as any)}
                  placeholder="Nhập cổng giao tiếp (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>

              <div className="col-span-full w-full">
                <LabelForm title={'Kết nối không dây'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_connectivity_and_ports.m_cat_wireless_connectivity' as any)}
                  placeholder="Nhập kết nối không dây (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>
              <LabelForm title={'Khe đọc thẻ nhớ'} />
              <InputModal
                type="text"
                {...register('m_cat_connectivity_and_ports.m_cat_card_reader' as any)}
                placeholder="Nhập khe đọc thẻ nhớ"
              />

              <LabelForm title={'Webcam'} />
              <InputModal
                type="text"
                {...register('m_cat_connectivity_and_ports.m_cat_webcam' as any)}
                placeholder="Nhập webcam"
              />

              <div className="col-span-full w-full">
                <LabelForm title={'Tính năng khác'} />
                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_connectivity_and_ports.m_cat_other_features' as any)}
                  placeholder="Nhập tính năng khác (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>

              <LabelForm title={'Đèn bàn phím'} />
              <InputModal
                type="text"
                {...register('m_cat_connectivity_and_ports.m_cat_keyboard_backlight' as any)}
                placeholder="Nhập đèn bàn phím"
              />
              {/* Kích thước - Khối lượng - Pin */}

              <div className="col-span-full w-full">
                <LabelForm title={'Kích thước'} />

                <Textarea
                  className="w-full border p-2 focus:outline-none"
                  {...register('m_cat_dimensions_weight_battery.m_cat_dimensions' as any)}
                  placeholder="Nhập kích thước (mỗi item trên 1 dòng hoặc ngăn cách bằng dấu , )"
                />
              </div>
              <LabelForm title={'Chất liệu'} />
              <InputModal
                type="text"
                {...register('m_cat_dimensions_weight_battery.m_cat_material' as any)}
                placeholder="Nhập chất liệu"
              />

              <LabelForm title={'Thông tin Pin'} />
              <InputModal
                type="text"
                {...register('m_cat_dimensions_weight_battery.m_cat_battery_info' as any)}
                placeholder="Nhập thông tin về Pin"
              />

              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register('m_cat_dimensions_weight_battery.m_cat_operating_system' as any)}
                placeholder="Nhập hệ điều hành"
              />

              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register('m_cat_dimensions_weight_battery.m_cat_release_date' as any)}
                placeholder="Nhập thời điểm ra mắt"
              />
              {/*  */}
              <div className="flex w-full flex-col items-start justify-center">
                <LabelForm title={'Nội dung'} />
                <Controller
                  name="m_cat_content"
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

export default ModalEditMacbookCatalogPageAdmin;
