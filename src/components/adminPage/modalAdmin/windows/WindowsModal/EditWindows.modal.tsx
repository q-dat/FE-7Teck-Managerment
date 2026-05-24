import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../../helper/Toastify';
import InputModal from '../../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../../LabelForm';
import ReactSelect from '../../../../common/react-select/ReactSelect';
import { WindowsContext } from '../../../../../context/windows/WindowsContext';
import { WindowsCatalogContext } from '../../../../../context/windows-catalog/WindowsCatalogContext';
import { IWindows } from '../../../../../types/type/windows/windows';
import { IWindowsCatalog } from '../../../../../types/type/windows-catalog/windows-catalog';
import Zoom from '../../../../../lib/Zoom';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  windowsId: string;
}

interface Option {
  value: string;
  label: string;
}

const ModalEditWindowsPageAdmin: React.FC<ModalEditPageAdminProps> = ({ isOpen, onClose, windowsId }) => {
  const { loading, windows, getAllWindows, updateWindows } = useContext(WindowsContext);
  const isLoading = loading.update;
  const { windowsCatalogs } = useContext(WindowsCatalogContext);

  const windowsCatalog: Option[] = windowsCatalogs.map((winCatalog) => ({
    value: winCatalog._id,
    label: `${winCatalog.w_cat_name}  \u00A0
    ${winCatalog?.w_cat_status === 0
        ? '(New)'
        : winCatalog?.w_cat_status === 1
          ? '(Đã sử dụng)'
          : winCatalog?.w_cat_status
      }`,
  }));

  const { control, register, handleSubmit, watch, setValue, reset } = useForm<IWindows>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);

  const [existingThumbnail, setExistingThumbnail] = useState<string[]>([]);
  const [deletedThumbnail, setDeletedThumbnail] = useState<string[]>([]);
  const [newThumbnailFiles, setNewThumbnailFiles] = useState<File[]>([]);

  const selectedCatalogId = watch('windows_catalog_id._id');
  const [selectedCategory, setSelectedCategory] = useState<IWindowsCatalog | null>(null);
  const [useCategoryImage, setUseCategoryImage] = useState(false);

  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = windowsCatalogs.find((catalog) => catalog._id === selectedCatalogId);

      if (selectedCatalog) {
        setValue('windows_name', selectedCatalog.w_cat_name);
        setSelectedCategory(selectedCatalog);
      }
    }
  }, [selectedCatalogId, windowsCatalogs, setValue]);

  useEffect(() => {
    const windowstData = windows.find((win) => win._id === windowsId);

    if (windowstData) {
      setValue('windows_name', windowstData.windows_name);
      setValue('windows_catalog_id._id', windowstData.windows_catalog_id._id);
      setValue('windows_color', windowstData.windows_color);
      setValue('windows_price', windowstData.windows_price);
      setValue('windows_sale', windowstData.windows_sale);
      setValue('windows_status', windowstData.windows_status);
      setValue('windows_des', windowstData.windows_des);
      setValue('windows_note', windowstData.windows_note);
      setValue('windows_img', windowstData.windows_img);
      setValue('windows_thumbnail', windowstData.windows_thumbnail);
      setValue('createdAt', windowstData.createdAt);
      setValue('updatedAt', windowstData.updatedAt);

      setExistingImg(windowstData.windows_img);
      setExistingThumbnail(Array.isArray(windowstData.windows_thumbnail) ? windowstData.windows_thumbnail : []);
      setDeletedThumbnail([]);
      setNewThumbnailFiles([]);
      setMainImageFile(null);
      setUseCategoryImage(false);
    }
  }, [windows, windowsId, setValue]);

  const moveThumbnail = (index: number, direction: 'up' | 'down') => {
    setExistingThumbnail((prev) => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }

      const current = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = current;

      return next;
    });
  };

  const removeExistingThumbnail = (thumbnail: string) => {
    setExistingThumbnail((prev) => prev.filter((item) => item !== thumbnail));
    setDeletedThumbnail((prev) => (prev.includes(thumbnail) ? prev : [...prev, thumbnail]));
  };

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setMainImageFile(file);

    if (file) {
      setUseCategoryImage(false);
    }
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setNewThumbnailFiles(files);
  };

  const onSubmit: SubmitHandler<IWindows> = async (formData) => {
    const data = new FormData();

    data.append('windows_name', formData.windows_name || '');
    data.append('windows_catalog_id', formData.windows_catalog_id._id);
    data.append('windows_color', formData.windows_color);
    data.append('windows_price', formData.windows_price?.toString() || '');
    data.append('windows_sale', formData.windows_sale?.toString() || '');
    data.append('windows_status', formData.windows_status || '');
    data.append('windows_des', formData.windows_des || '');
    data.append('windows_note', formData.windows_note || '');
    data.append('windows_thumbnail_order', JSON.stringify(existingThumbnail));
    data.append('deleted_windows_thumbnail', JSON.stringify(deletedThumbnail));

    if (useCategoryImage && selectedCategory?.w_cat_img) {
      data.append('windows_img_url', selectedCategory.w_cat_img);
    } else if (mainImageFile) {
      data.append('windows_img', mainImageFile);
    }

    newThumbnailFiles.forEach((file) => {
      data.append('windows_thumbnail', file);
    });

    try {
      await updateWindows(windowsId, data);
      reset();
      getAllWindows();
      Toastify('Sản phẩm đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllWindows();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        const target = e.target as HTMLElement;

        if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
    >
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="font-bold text-black dark:text-white">Cập nhật sản phẩm</p>

          <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
          <InputModal className="bg-yellow-400 px-2" type="text" {...register('windows_note')} placeholder="Điền ghi chú..." />

          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <InputModal type="text" {...register('windows_name')} placeholder="Tên danh mục" />

              <LabelForm title={'Danh mục'} />
              <div className="flex w-full items-center">
                <ReactSelect
                  placeholder="Chọn danh mục"
                  name="windows_catalog_id._id"
                  control={control}
                  options={windowsCatalog}
                  isMulti={false}
                  className="w-full"
                />
              </div>

              {selectedCategory?.w_cat_img && (
                <div className="mt-2 w-full">
                  <p className="text-sm text-gray-600">Ảnh từ danh mục đã chọn (Click ảnh để xem):</p>

                  <Zoom>
                    <img src={selectedCategory.w_cat_img} alt="Ảnh danh mục" className="mt-1 w-20 rounded border" />
                  </Zoom>

                  <label className={`mt-2 flex cursor-pointer items-center space-x-2 rounded border px-2 py-1 ${useCategoryImage ? 'bg-green-100' : 'bg-red-50'
                    }`}>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox scale-90"
                      checked={useCategoryImage}
                      onChange={(e) => {
                        setUseCategoryImage(e.target.checked);

                        if (e.target.checked) {
                          setMainImageFile(null);
                        }
                      }}
                    />
                    <span className="text-sm text-black dark:text-white">Dùng ảnh này làm ảnh sản phẩm</span>
                  </label>
                </div>
              )}

              <LabelForm title={'Giá'} />
              <InputModal type="number" {...register('windows_price')} placeholder="Giá" />

              <LabelForm title={'Giá giảm'} />
              <InputModal type="number" {...register('windows_sale')} placeholder="Nhập giá giảm" />

              <LabelForm title={'Màu sắc'} />
              <InputModal type="text" {...register('windows_color')} placeholder="Nhập màu" />
            </div>

            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tình trạng'} />
              <InputModal type="text" {...register('windows_status')} placeholder="Tình trạng" />

              <LabelForm title={'Mô tả'} />
              <Textarea className="w-full border p-2 focus:outline-none" {...register('windows_des')} placeholder="Mô tả" />

              {!useCategoryImage && (
                <>
                  <LabelForm title={'Hình ảnh hiện tại:'} />

                  {existingImg && (
                    <div className="my-2">
                      <Zoom>
                        <img src={existingImg} className="h-auto w-16 rounded-md object-contain" />
                      </Zoom>
                    </div>
                  )}

                  <InputModal type="file" {...register('windows_img')} onChange={handleMainImageChange} placeholder="Chèn ảnh hình ảnh" />
                </>
              )}

              <LabelForm title={'Ảnh thu nhỏ:'} />

              {existingThumbnail.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                  {existingThumbnail.map((thumbnail, index) => (
                    <div key={`${thumbnail}-${index}`} className="flex flex-col items-center gap-1 rounded border p-1">
                      <Zoom>
                        <img src={thumbnail} className="h-10 w-10 rounded-md object-cover" />
                      </Zoom>

                      <span className="text-[10px] text-gray-500">#{index + 1}</span>

                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveThumbnail(index, 'up')}
                          className="rounded bg-gray-200 px-1 text-[10px] text-black disabled:opacity-40"
                        >
                          Lên
                        </button>

                        <button
                          type="button"
                          disabled={index === existingThumbnail.length - 1}
                          onClick={() => moveThumbnail(index, 'down')}
                          className="rounded bg-gray-200 px-1 text-[10px] text-black disabled:opacity-40"
                        >
                          Xuống
                        </button>

                        <button
                          type="button"
                          onClick={() => removeExistingThumbnail(thumbnail)}
                          className="rounded bg-red-500 px-1 text-[10px] text-white"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <InputModal type="file" {...register('windows_thumbnail')} onChange={handleThumbnailChange} placeholder="Chèn ảnh thu nhỏ" multiple />

              {newThumbnailFiles.length > 0 && (
                <p className="mt-1 text-xs text-green-600">Đã chọn {newThumbnailFiles.length} ảnh mới</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black dark:text-white">
              Hủy
            </Button>

            <Button disabled={isLoading} color="primary" type="submit" className="group text-white">
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditWindowsPageAdmin;