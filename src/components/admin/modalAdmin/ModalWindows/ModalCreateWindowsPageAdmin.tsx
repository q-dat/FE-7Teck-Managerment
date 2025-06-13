import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { WindowsContext } from '../../../../context/windows/WindowsContext';
import { WindowsCatalogContext } from '../../../../context/windows-catalog/WindowsCatalogContext';
import { IWindows } from '../../../../types/type/windows/windows';
import { IWindowsCatalog } from '../../../../types/type/windows-catalog/windows-catalog';
import Zoom from '../../../../lib/Zoom';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  value: string;
  label: string;
}

const ModalCreateWindowsPageAdmin: React.FC<ModalCreateAdminProps> = ({
  isOpen,
  onClose
}) => {
  const { loading, createWindows, getAllWindows } = useContext(WindowsContext);
  const isLoading = loading.create;
  const { control, register, handleSubmit, reset, setValue, watch } =
    useForm<IWindows>();
  // Chọn ảnh từ danh mục
  const [selectedCategory, setSelectedCategory] =
    React.useState<IWindowsCatalog | null>(null);
  const [useCategoryImage, setUseCategoryImage] = React.useState(false);

  // windowsCatalog
  const { windowsCatalogs } = useContext(WindowsCatalogContext);

  // react-select
  const windowsCatalog: Option[] = windowsCatalogs.map(winCatalog => ({
    value: winCatalog._id,
    label: `${winCatalog.w_cat_name}  \u00A0
    ${
      winCatalog?.w_cat_status === 0
        ? '(New)'
        : winCatalog?.w_cat_status === 1
          ? '(Đã sử dụng)'
          : winCatalog?.w_cat_status
    }`
  }));

  // Theo dõi giá trị của windows_catalog_id
  const selectedCatalogId = watch('windows_catalog_id._id');

  // Cập nhật windows_name khi danh mục được chọn
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = windowsCatalogs.find(
        catalog => catalog._id === selectedCatalogId
      );
      if (selectedCatalog) {
        setSelectedCategory(selectedCatalog);
        setValue('windows_name', selectedCatalog.w_cat_name);
      }
    }
  }, [selectedCatalogId, windowsCatalogs, setValue]);

  const onSubmit: SubmitHandler<IWindows> = async formData => {
    const data = new FormData();
    data.append('windows_name', formData.windows_name || '');
    data.append('windows_catalog_id', formData.windows_catalog_id._id);
    data.append('windows_color', formData.windows_color);
    data.append('windows_price', formData.windows_price?.toString() || '');
    data.append('windows_sale', formData.windows_sale?.toString() || '');
    data.append('windows_status', formData.windows_status || '');
    data.append('windows_des', formData.windows_des || '');

    try {
      // Thêm ảnh chính (Ảnh có sẵn từ danh mục nếu không sẽ lấy ảnh từ upload)
      if (useCategoryImage && selectedCategory?.w_cat_img) {
        try {
          const response = await fetch(selectedCategory.w_cat_img);
          const blob = await response.blob();
          const file = new File([blob], 'category-img.jpg', {
            type: blob.type
          });
          data.append('windows_img', file);
        } catch (err) {
          console.error('Lỗi fetch ảnh danh mục:', err);
        }
      }

      // Thêm ảnh chính
      if (formData.windows_img && formData.windows_img[0]) {
        data.append('windows_img', formData.windows_img[0]);
      }

      // Thêm nhiều ảnh thu nhỏ
      if (formData.windows_thumbnail && formData.windows_thumbnail.length > 0) {
        Array.from(formData.windows_thumbnail).forEach(file => {
          data.append('windows_thumbnail', file); // Thêm từng file vào FormData
        });
      }

      await createWindows(data);
      reset();
      getAllWindows();
      Toastify('Tạo sản phẩm thành công!', 201);
      onClose();
    } catch (err) {
      getAllWindows();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex max-h-[95%] w-full flex-col overflow-y-auto rounded-lg bg-white p-5 text-start shadow scrollbar-hide dark:bg-gray-800 xl:w-1/2"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo sản phẩm mới
            </p>
            <InputModal
              className="hidden"
              type="text"
              {...register('windows_name', { required: true })}
              placeholder="Tên sản phẩm*"
            />
            <div className="flex items-center">
              <ReactSelect
                placeholder="Chọn danh mục*"
                name="windows_catalog_id._id"
                control={control}
                options={windowsCatalog}
                isMulti={false}
                className=""
              />
            </div>
            <InputModal
              type="text"
              {...register('windows_color', { required: true })}
              placeholder="Nhập màu*"
            />
            <InputModal
              type="number"
              {...register('windows_price', { required: true })}
              placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
            />
            <InputModal
              type="number"
              {...register('windows_sale')}
              placeholder="Nhập giá giảm (Hệ số x1000: 1triệu = 1000)"
            />

            <InputModal
              type="text"
              {...register('windows_status', { required: true })}
              placeholder="Tình trạng*"
            />
            <Textarea
              className="w-full border p-2 focus:outline-none"
              {...register('windows_des')}
              placeholder="Mô tả"
            />
            {/* Ảnh từ danh mục */}
            {selectedCategory?.w_cat_img && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Ảnh từ danh mục đã chọn (Click ảnh để xem):
                </p>
                <Zoom>
                  <img
                    src={selectedCategory.w_cat_img}
                    alt="Ảnh danh mục"
                    className="mt-1 w-20 rounded border"
                  />
                </Zoom>
                <label
                  className={`mt-2 flex cursor-pointer items-center space-x-2 rounded border px-2 py-1 ${
                    useCategoryImage ? 'bg-green-100' : 'bg-red-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox scale-90"
                    checked={useCategoryImage}
                    onChange={e => setUseCategoryImage(e.target.checked)}
                  />
                  <span className="text-sm text-black dark:text-white">
                    Dùng ảnh này làm ảnh sản phẩm
                  </span>
                </label>
              </div>
            )}

            {!useCategoryImage && (
              <>
                <LabelForm title={'Hình ảnh*'} />
                <InputModal
                  type="file"
                  {...register('windows_img', { required: !useCategoryImage })}
                  placeholder="Hình ảnh*"
                />
              </>
            )}

            <LabelForm title={'Ảnh thu nhỏ'} />
            <InputModal
              type="file"
              {...register('windows_thumbnail')}
              placeholder="Chèn ảnh thu nhỏ"
              multiple
            />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
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

export default ModalCreateWindowsPageAdmin;
