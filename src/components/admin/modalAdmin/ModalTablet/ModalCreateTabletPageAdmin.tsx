import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { ITablet } from '../../../../types/type/tablet/tablet';
import { TabletContext } from '../../../../context/tablet/TabletContext';
import { TabletCatalogContext } from '../../../../context/tablet-catalog/TabletCatalogContext';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  value: string;
  label: string;
}

const ModalCreateTabletPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createTablet, getAllTablets } = useContext(TabletContext);
  const isLoading = loading.create;
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<ITablet>();

  // TabletCatalog
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

  const onSubmit: SubmitHandler<ITablet> = async formData => {
    const data = new FormData();
    data.append('tablet_note', formData.tablet_note || '');
    data.append('tablet_name', formData.tablet_name || '');
    data.append('tablet_catalog_id', formData.tablet_catalog_id._id);
    data.append('tablet_color', formData.tablet_color);
    data.append('tablet_price', formData.tablet_price?.toString() || '');
    data.append('tablet_sale', formData.tablet_sale?.toString() || '');
    data.append('tablet_status', formData.tablet_status || '');
    data.append('tablet_des', formData.tablet_des || '');

    // Thêm ảnh chính
    if (formData.tablet_img && formData.tablet_img[0]) {
      data.append('tablet_img', formData.tablet_img[0]);
    }

    // Thêm nhiều ảnh thu nhỏ
    if (formData.tablet_thumbnail && formData.tablet_thumbnail.length > 0) {
      Array.from(formData.tablet_thumbnail).forEach(file => {
        data.append('tablet_thumbnail', file); // Thêm từng file vào FormData
      });
    }

    try {
      await createTablet(data);
      reset();
      getAllTablets();
      Toastify('Tạo sản phẩm thành công!', 201);
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
          <div>
            <p className="font-bold text-black dark:text-white">Tạo sản phẩm mới</p>
            <LabelForm title={'Ghi chú (Chỉ mỗi admin)'} />
            <InputModal
              className="bg-yellow-400 px-2"
              type="text"
              {...register('tablet_note')}
              placeholder="Điền ghi chú..."
            />
            <div className="flex items-center">
              <ReactSelect
                placeholder="Chọn danh mục*"
                name="tablet_catalog_id._id"
                control={control}
                options={tabletCatalog}
                isMulti={false}
                className=""
              />
            </div>
            <InputModal
              // className="hidden"
              type="text"
              {...register('tablet_name', { required: true })}
              placeholder="Tên sản phẩm*"
            />
            <InputModal type="text" {...register('tablet_color', { required: true })} placeholder="Nhập màu*" />
            <InputModal
              type="number"
              {...register('tablet_price', { required: true })}
              placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
            />
            <InputModal
              type="number"
              {...register('tablet_sale')}
              placeholder="Nhập giá giảm (Hệ số x1000: 1triệu = 1000)"
            />
            <InputModal type="text" {...register('tablet_status', { required: true })} placeholder="Tình trạng*" />
            <Textarea
              className="w-full border p-2 focus:outline-none"
              {...register('tablet_des')}
              placeholder="Mô tả"
            />
            <LabelForm title={'Hình ảnh*'} />
            <InputModal type="file" {...register('tablet_img', { required: true })} placeholder="Hình ảnh*" />
            <LabelForm title={'Ảnh thu nhỏ'} />
            <InputModal type="file" {...register('tablet_thumbnail')} placeholder="Chèn ảnh thu nhỏ" multiple />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
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

export default ModalCreateTabletPageAdmin;
