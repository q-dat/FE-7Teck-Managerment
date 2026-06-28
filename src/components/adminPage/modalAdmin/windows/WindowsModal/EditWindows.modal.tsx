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
import { useProductImageEditor } from '../../../../../helper/useProductImageEditor';
import ProductImageEditor from '../../ProductImageEditor';

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

  const {
    mainImageUrl,
    mainImagePreviewUrl,
    keptThumbnailUrls,
    newThumbnailPreviewUrls,
    initProductImages,
    handleMainImageChange,
    clearMainImageFile,
    handleThumbnailFilesChange,
    removeKeptThumbnail,
    removeNewThumbnail,
    moveKeptThumbnail,
    appendImagesToFormData
  } = useProductImageEditor();

  const windowsCatalog: Option[] = windowsCatalogs.map(winCatalog => ({
    value: winCatalog._id,
    label: `${winCatalog.w_cat_name}  \u00A0
    ${winCatalog?.w_cat_status === 0
        ? '(New)'
        : winCatalog?.w_cat_status === 1
          ? '(Đã sử dụng)'
          : winCatalog?.w_cat_status
      }`
  }));

  const { control, register, handleSubmit, watch, setValue, reset } = useForm<IWindows>();

  const selectedCatalogId = watch('windows_catalog_id._id');
  const [selectedCategory, setSelectedCategory] = useState<IWindowsCatalog | null>(null);
  const [useCategoryImage, setUseCategoryImage] = useState(false);

  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = windowsCatalogs.find(catalog => catalog._id === selectedCatalogId);

      if (selectedCatalog) {
        setValue('windows_name', selectedCatalog.w_cat_name);
        setSelectedCategory(selectedCatalog);
      }
    }
  }, [selectedCatalogId, windowsCatalogs, setValue]);

  useEffect(() => {
    const windowsData = windows.find(win => win._id === windowsId);

    if (windowsData) {
      setValue('windows_name', windowsData.windows_name);
      setValue('windows_catalog_id._id', windowsData.windows_catalog_id._id);
      setValue('windows_color', windowsData.windows_color);
      setValue('windows_price', windowsData.windows_price);
      setValue('windows_sale', windowsData.windows_sale);
      setValue('windows_status', windowsData.windows_status);
      setValue('windows_des', windowsData.windows_des);
      setValue('windows_note', windowsData.windows_note);
      setValue('createdAt', windowsData.createdAt);
      setValue('updatedAt', windowsData.updatedAt);

      initProductImages({
        mainImageUrl: windowsData.windows_img,
        thumbnailUrls: Array.isArray(windowsData.windows_thumbnail) ? windowsData.windows_thumbnail : []
      });

      setUseCategoryImage(false);
    }
  }, [windows, windowsId, setValue, initProductImages]);

  const onSubmit: SubmitHandler<IWindows> = async formData => {
    const data = new FormData();

    data.append('windows_name', formData.windows_name || '');
    data.append('windows_catalog_id', formData.windows_catalog_id._id);
    data.append('windows_color', formData.windows_color || '');
    data.append('windows_price', formData.windows_price?.toString() || '');
    data.append('windows_sale', formData.windows_sale?.toString() || '');
    data.append('windows_status', formData.windows_status || '');
    data.append('windows_des', formData.windows_des || '');
    data.append('windows_note', formData.windows_note || '');

    appendImagesToFormData(
      data,
      {
        mainImageField: 'windows_img',
        thumbnailField: 'windows_thumbnail'
      },
      {
        skipMainImage: useCategoryImage
      }
    );

    if (useCategoryImage && selectedCategory?.w_cat_img) {
      data.append('windows_img_url', selectedCategory.w_cat_img);
    }

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
      onKeyDown={e => {
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
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="font-bold text-black dark:text-white">Cập nhật sản phẩm</p>

          <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
          <InputModal
            className="bg-yellow-400 px-2"
            type="text"
            {...register('windows_note')}
            placeholder="Điền ghi chú..."
          />

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
                  <p className="text-sm text-gray-600">Ảnh từ danh mục đã chọn:</p>

                  <Zoom>
                    <img src={selectedCategory.w_cat_img} alt="Ảnh danh mục" className="mt-1 w-20 rounded border" />
                  </Zoom>

                  <label
                    className={`mt-2 flex cursor-pointer items-center space-x-2 rounded border px-2 py-1 ${useCategoryImage ? 'bg-green-100' : 'bg-red-50'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox scale-90"
                      checked={useCategoryImage}
                      onChange={e => {
                        setUseCategoryImage(e.target.checked);

                        if (e.target.checked) {
                          clearMainImageFile();
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

              {!useCategoryImage ? (
                <ProductImageEditor
                  mainImageUrl={mainImageUrl}
                  mainImagePreviewUrl={mainImagePreviewUrl}
                  keptThumbnailUrls={keptThumbnailUrls}
                  newThumbnailPreviewUrls={newThumbnailPreviewUrls}
                  onMainImageChange={handleMainImageChange}
                  onThumbnailFilesChange={handleThumbnailFilesChange}
                  onRemoveKeptThumbnail={removeKeptThumbnail}
                  onRemoveNewThumbnail={removeNewThumbnail}
                  onMoveKeptThumbnail={moveKeptThumbnail}
                />
              ) : (
                <ProductImageEditor
                  mainImageUrl=""
                  mainImagePreviewUrl=""
                  keptThumbnailUrls={keptThumbnailUrls}
                  newThumbnailPreviewUrls={newThumbnailPreviewUrls}
                  onMainImageChange={handleMainImageChange}
                  onThumbnailFilesChange={handleThumbnailFilesChange}
                  onRemoveKeptThumbnail={removeKeptThumbnail}
                  onRemoveNewThumbnail={removeNewThumbnail}
                  onMoveKeptThumbnail={moveKeptThumbnail}
                  hideMainImageInput
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button type="button" onClick={onClose} className="border-gray-50 text-black dark:text-white">
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