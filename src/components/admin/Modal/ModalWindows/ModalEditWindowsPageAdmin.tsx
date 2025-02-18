import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { WindowsContext } from '../../../../context/windows/WindowsContext';
import { WindowsCatalogContext } from '../../../../context/windows-catalog/WindowsCatalogContext';
import { IWindows } from '../../../../types/type/windows/windows';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  windowsId: string;
}

interface Option {
  value: string;
  label: string;
}

const ModalEditWindowsPageAdmin: React.FC<ModalEditPageAdminProps> = ({
  isOpen,
  onClose,
  windowsId
}) => {
  const { loading, windows, getAllWindows, updateWindows } =
    useContext(WindowsContext);
  const isLoading = loading.update;
  const { windowsCatalogs } = useContext(WindowsCatalogContext);

  // react-select
  const windowsCatalog: Option[] = windowsCatalogs.map(winCatalog => ({
    value: winCatalog._id,
    label: `${winCatalog.w_cat_name}  \u00A0
    ${
      winCatalog?.w_cat_status === 0
        ? '(Mới)'
        : winCatalog?.w_cat_status === 1
          ? '(Cũ)'
          : winCatalog?.w_cat_status
    }`
  }));

  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<IWindows>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<
    string[] | undefined
  >([]);

  useEffect(() => {
    const windowstData = windows.find(win => win._id === windowsId);
    if (windowstData) {
      setValue('windows_name', windowstData.windows_name);
      setValue('windows_catalog_id', windowstData.windows_catalog_id);
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
      setExistingThumbnail(windowstData.windows_thumbnail);
    }
  }, [windows, windowsId, setValue]);

  const onSubmit: SubmitHandler<IWindows> = async formData => {
    const data = new FormData();

    data.append('windows_name', formData.windows_name || '');
    data.append('windows_catalog_id', formData.windows_catalog_id._id);
    data.append('windows_color', formData.windows_color);
    data.append('windows_price', formData.windows_price?.toString() || '');
    data.append('windows_sale', formData.windows_sale?.toString() || '');
    data.append('windows_status', formData.windows_status || '');
    data.append('windows_des', formData.windows_des || '');
    data.append('windows_note', formData.windows_note || '');

    // Thêm ảnh chính
    const imgFile = watch('windows_img');
    if (imgFile && imgFile[0]) {
      data.append('windows_img', imgFile[0]);
    } else if (existingImg) {
      data.append('windows_img', existingImg);
    }

    // Thêm nhiều ảnh thu nhỏ
    const thumbnailFiles = watch('windows_thumbnail');
    if (thumbnailFiles && thumbnailFiles.length > 0) {
      Array.from(thumbnailFiles).forEach(file => {
        data.append('windows_thumbnail', file);
      });
    } else if (existingThumbnail && existingThumbnail.length > 0) {
      existingThumbnail.forEach(thumbnail => {
        data.append('windows_thumbnail', thumbnail);
      });
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
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <p className="font-bold text-black dark:text-white">
            Cập nhật sản phẩm
          </p>
          <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
          <InputModal
            className="bg-yellow-400 px-2"
            type="text"
            {...register('windows_note')}
            placeholder="Điền ghi chú..."
          />
          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tên danh mục'} />
              <InputModal
                type="text"
                {...register('windows_name')}
                placeholder="Tên danh mục"
              />
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
              <LabelForm title={'Giá'} />
              <InputModal
                type="number"
                {...register('windows_price')}
                placeholder="Giá"
              />
              <LabelForm title={'Giá giảm'} />
              <InputModal
                type="number"
                {...register('windows_sale')}
                placeholder="Nhập giá giảm"
              />
              <LabelForm title={'Màu sắc'} />
              <InputModal
                type="text"
                {...register('windows_color')}
                placeholder="Nhập màu"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tình trạng'} />
              <InputModal
                type="text"
                {...register('windows_status')}
                placeholder="Tình trạng"
              />
              <LabelForm title={'Mô tả'} />
              <InputModal
                type="text"
                {...register('windows_des')}
                placeholder="Mô tả"
              />
              <LabelForm title={'Hình ảnh'} />
              {existingImg && (
                <div className="my-2">
                  <img
                    src={existingImg}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
              )}
              <InputModal
                type="file"
                {...register('windows_img')}
                placeholder="Chèn ảnh hình ảnh"
              />
              <LabelForm title={'Ảnh thu nhỏ'} />
              {existingThumbnail && existingThumbnail.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                  {existingThumbnail.map((thumbnail, index) => (
                    <img
                      key={index}
                      src={thumbnail}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              <InputModal
                type="file"
                {...register('windows_thumbnail')}
                placeholder="Chèn ảnh thu nhỏ"
                multiple
              />
            </div>
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
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditWindowsPageAdmin;
