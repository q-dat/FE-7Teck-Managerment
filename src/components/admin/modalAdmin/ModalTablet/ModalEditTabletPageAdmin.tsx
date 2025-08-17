import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { ITablet } from '../../../../types/type/tablet/tablet';
import { TabletContext } from '../../../../context/tablet/TabletContext';
import { TabletCatalogContext } from '../../../../context/tablet-catalog/TabletCatalogContext';

interface ModalEditPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  tabletId: string;
}

interface Option {
  value: string;
  label: string;
}

const ModalEditTabletPageAdmin: React.FC<ModalEditPageAdminProps> = ({ isOpen, onClose, tabletId }) => {
  const { loading, tablets, getAllTablets, updateTablet } = useContext(TabletContext);
  const isLoading = loading.update;
  const { tabletCatalogs } = useContext(TabletCatalogContext);

  // react-select
  const tabletCatalog: Option[] = tabletCatalogs.map(tabletCatalog => ({
    value: tabletCatalog._id,
    label: `${tabletCatalog.t_cat_name}  \u00A0
    ${
      tabletCatalog?.t_cat_status === 0
        ? '(New)'
        : tabletCatalog?.t_cat_status === 1
          ? '(Đã sử dụng)'
          : tabletCatalog?.t_cat_status
    }`
  }));

  const { control, register, handleSubmit, watch, setValue, reset } = useForm<ITablet>();

  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [existingThumbnail, setExistingThumbnail] = useState<string[] | undefined>([]);

  // Theo dõi giá trị của tablet_catalog_id
  const selectedCatalogId = watch('tablet_catalog_id._id');

  // Cập nhật tablet_name khi danh mục được chọn
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = tabletCatalogs.find(catalog => catalog._id === selectedCatalogId);
      if (selectedCatalog) {
        setValue('tablet_name', selectedCatalog.t_cat_name);
      }
    }
  }, [selectedCatalogId, tabletCatalogs, setValue]);

  useEffect(() => {
    const tabletData = tablets.find(tablet => tablet._id === tabletId);
    if (tabletData) {
      setValue('tablet_name', tabletData.tablet_name);
      setValue('tablet_catalog_id._id', tabletData.tablet_catalog_id._id);
      setValue('tablet_color', tabletData.tablet_color);
      setValue('tablet_price', tabletData.tablet_price);
      setValue('tablet_sale', tabletData.tablet_sale);
      setValue('tablet_status', tabletData.tablet_status);
      setValue('tablet_des', tabletData.tablet_des);
      setValue('tablet_note', tabletData.tablet_note);
      setValue('tablet_img', tabletData.tablet_img);
      setValue('tablet_thumbnail', tabletData.tablet_thumbnail);
      setValue('createdAt', tabletData.createdAt);
      setValue('updatedAt', tabletData.updatedAt);

      setExistingImg(tabletData.tablet_img);
      setExistingThumbnail(tabletData.tablet_thumbnail);
    }
  }, [tablets, tabletId, setValue]);

  const onSubmit: SubmitHandler<ITablet> = async formData => {
    const data = new FormData();

    data.append('tablet_name', formData.tablet_name || '');
    data.append('tablet_catalog_id', formData.tablet_catalog_id._id);
    data.append('tablet_color', formData.tablet_color);
    data.append('tablet_price', formData.tablet_price?.toString() || '');
    data.append('tablet_sale', formData.tablet_sale?.toString() || '');
    data.append('tablet_status', formData.tablet_status || '');
    data.append('tablet_des', formData.tablet_des || '');
    data.append('tablet_note', formData.tablet_note || '');

    // Thêm ảnh chính
    const imgFile = watch('tablet_img');
    if (imgFile && imgFile[0]) {
      data.append('tablet_img', imgFile[0]);
    } else if (existingImg) {
      data.append('tablet_img', existingImg);
    }

    // Thêm nhiều ảnh thu nhỏ
    const thumbnailFiles = watch('tablet_thumbnail');
    if (thumbnailFiles && thumbnailFiles.length > 0) {
      Array.from(thumbnailFiles).forEach(file => {
        data.append('tablet_thumbnail', file);
      });
    } else if (existingThumbnail && existingThumbnail.length > 0) {
      existingThumbnail.forEach(thumbnail => {
        data.append('tablet_thumbnail', thumbnail);
      });
    }

    try {
      await updateTablet(tabletId, data);
      reset();
      getAllTablets();
      Toastify('Sản phẩm đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllTablets();
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
          e.preventDefault(); // Ngăn default Enter behavior trong input
          handleSubmit(onSubmit)(); // Gọi submit thủ công
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
            {...register('tablet_note')}
            placeholder="Điền ghi chú..."
          />
          <div className="flex w-full flex-row items-start justify-between gap-10">
            <div className="flex w-full flex-col items-start justify-center">
              <InputModal
                // className="hidden"
                type="text"
                {...register('tablet_name')}
                placeholder="Tên danh mục"
              />
              <LabelForm title={'Danh mục'} />
              <div className="flex w-full items-center">
                <ReactSelect
                  placeholder="Chọn danh mục"
                  name="tablet_catalog_id._id"
                  control={control}
                  options={tabletCatalog}
                  isMulti={false}
                  className="w-full"
                />
              </div>
              <LabelForm title={'Giá'} />
              <InputModal type="number" {...register('tablet_price')} placeholder="Giá" />
              <LabelForm title={'Giá giảm'} />
              <InputModal type="number" {...register('tablet_sale')} placeholder="Nhập giá giảm" />
              <LabelForm title={'Màu sắc'} />
              <InputModal type="text" {...register('tablet_color')} placeholder="Nhập màu" />
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Tình trạng'} />
              <InputModal type="text" {...register('tablet_status')} placeholder="Tình trạng" />
              <LabelForm title={'Mô tả'} />
              <Textarea
                className="w-full border p-2 focus:outline-none"
                {...register('tablet_des')}
                placeholder="Mô tả"
              />
              <LabelForm title={'Hình ảnh'} />
              {existingImg && (
                <div className="my-2">
                  <img src={existingImg} className="h-10 w-10 rounded-md object-cover" />
                </div>
              )}
              <InputModal type="file" {...register('tablet_img')} placeholder="Chèn ảnh hình ảnh" />
              <LabelForm title={'Ảnh thu nhỏ'} />
              {existingThumbnail && existingThumbnail.length > 0 && (
                <div className="my-2 flex flex-wrap gap-2">
                  {existingThumbnail.map((thumbnail, index) => (
                    <img key={index} src={thumbnail} className="h-10 w-10 rounded-md object-cover" />
                  ))}
                </div>
              )}
              <InputModal type="file" {...register('tablet_thumbnail')} placeholder="Chèn ảnh thu nhỏ" multiple />
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

export default ModalEditTabletPageAdmin;
