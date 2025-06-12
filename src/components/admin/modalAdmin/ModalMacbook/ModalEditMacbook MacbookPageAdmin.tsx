import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { MacbookCatalogContext } from '../../../../context/macbook-catalog/MacbookCatalogContext';
import { MacbookContext } from '../../../../context/macbook/MacbookContext';
import { IMacbook } from '../../../../types/type/macbook/macbook';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  macbookId: string;
}

interface Option {
  value: string;
  label: string;
}

const ModalEditMacbookPageAdmin: React.FC<ModalEditPageAdminProps> = ({
  isOpen,
  onClose,
  macbookId
}) => {
  const { loading, macbook, getAllMacbook, updateMacbook } =
    useContext(MacbookContext);
  const isLoading = loading.update;
  const { macbookCatalogs } = useContext(MacbookCatalogContext);

  // react-select
  const macbookCatalog: Option[] = macbookCatalogs.map(macCatalog => ({
    value: macCatalog._id,
    label: `${macCatalog.m_cat_name}  \u00A0
      ${
        macCatalog?.m_cat_status === 0
          ? '(New)'
          : macCatalog?.m_cat_status === 1
            ? '(Đã sử dụng)'
            : macCatalog?.m_cat_status
      }`
  }));

  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<IMacbook>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<
    string[] | undefined
  >([]);

  // Theo dõi giá trị của macbook_catalog_id
  const selectedCatalogId = watch('macbook_catalog_id._id');

  // Cập nhật macbook_name khi danh mục được chọn, chỉ khi macbook_name rỗng
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = macbookCatalogs.find(
        catalog => catalog._id === selectedCatalogId
      );
      const currentName = watch('macbook_name');
      if (selectedCatalog && !currentName) {
        setValue('macbook_name', selectedCatalog.m_cat_name);
      }
    }
  }, [selectedCatalogId, macbookCatalogs, setValue, watch]);

  useEffect(() => {
    const macbookData = macbook.find(mac => mac._id === macbookId);
    if (macbookData) {
      setValue('macbook_name', macbookData.macbook_name);
      setValue('macbook_catalog_id._id', macbookData.macbook_catalog_id._id);
      setValue('macbook_color', macbookData.macbook_color);
      setValue('macbook_price', macbookData.macbook_price);
      setValue('macbook_sale', macbookData.macbook_sale);
      setValue('macbook_status', macbookData.macbook_status);
      setValue('macbook_des', macbookData.macbook_des);
      setValue('macbook_note', macbookData.macbook_note);
      setValue('macbook_img', macbookData.macbook_img);
      setValue('macbook_thumbnail', macbookData.macbook_thumbnail);
      setValue('createdAt', macbookData.createdAt);
      setValue('updatedAt', macbookData.updatedAt);

      setExistingImg(macbookData.macbook_img);
      setExistingThumbnail(macbookData.macbook_thumbnail);
    }
  }, [macbook, macbookId, setValue]);

  const onSubmit: SubmitHandler<IMacbook> = async formData => {
    const data = new FormData();

    data.append('macbook_name', formData.macbook_name || '');
    data.append('macbook_catalog_id', formData.macbook_catalog_id._id);
    data.append('macbook_color', formData.macbook_color);
    data.append('macbook_price', formData.macbook_price?.toString() || '');
    data.append('macbook_sale', formData.macbook_sale?.toString() || '');
    data.append('macbook_status', formData.macbook_status || '');
    data.append('macbook_des', formData.macbook_des || '');
    data.append('macbook_note', formData.macbook_note || '');

    // Thêm ảnh chính
    const imgFile = watch('macbook_img');
    if (imgFile && imgFile[0]) {
      data.append('macbook_img', imgFile[0]);
    } else if (existingImg) {
      data.append('macbook_img', existingImg);
    }

    // Thêm nhiều ảnh thu nhỏ
    const thumbnailFiles = watch('macbook_thumbnail');
    if (thumbnailFiles && thumbnailFiles.length > 0) {
      Array.from(thumbnailFiles).forEach(file => {
        data.append('macbook_thumbnail', file);
      });
    } else if (existingThumbnail && existingThumbnail.length > 0) {
      existingThumbnail.forEach(thumbnail => {
        data.append('macbook_thumbnail', thumbnail);
      });
    }

    try {
      await updateMacbook(macbookId, data);
      reset();
      getAllMacbook();
      Toastify('Sản phẩm đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllMacbook();
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
            {...register('macbook_note')}
            placeholder="Điền ghi chú..."
          />
          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <InputModal
                className="hidden"
                type="text"
                {...register('macbook_name')}
                placeholder="Tên danh mục"
              />
              <LabelForm title={'Danh mục'} />
              <div className="flex w-full items-center">
                <ReactSelect
                  placeholder="Chọn danh mục"
                  name="macbook_catalog_id._id"
                  control={control}
                  options={macbookCatalog}
                  isMulti={false}
                  className="w-full"
                />
              </div>
              <LabelForm title={'Giá'} />
              <InputModal
                type="number"
                {...register('macbook_price')}
                placeholder="Giá"
              />
              <LabelForm title={'Giá giảm'} />
              <InputModal
                type="number"
                {...register('macbook_sale')}
                placeholder="Nhập giá giảm"
              />
              <LabelForm title={'Màu sắc'} />
              <InputModal
                type="text"
                {...register('macbook_color')}
                placeholder="Nhập màu"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tình trạng'} />
              <InputModal
                type="text"
                {...register('macbook_status')}
                placeholder="Tình trạng"
              />
              <LabelForm title={'Mô tả'} />
              <Textarea
                className="w-full border p-2 focus:outline-none"
                {...register('macbook_des')}
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
                {...register('macbook_img')}
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
                {...register('macbook_thumbnail')}
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

export default ModalEditMacbookPageAdmin;
