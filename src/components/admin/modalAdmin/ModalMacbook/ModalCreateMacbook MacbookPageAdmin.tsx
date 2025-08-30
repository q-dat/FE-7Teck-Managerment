import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Textarea } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import ReactSelect from '../../../orther/react-select/ReactSelect';
import { MacbookContext } from '../../../../context/macbook/MacbookContext';
import { IMacbook } from '../../../../types/type/macbook/macbook';
import { MacbookCatalogContext } from '../../../../context/macbook-catalog/MacbookCatalogContext';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  value: string;
  label: string;
}

const ModalCreateMacbookPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { loading, createMacbook, getAllMacbook } = useContext(MacbookContext);
  const isLoading = loading.create;
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<IMacbook>();

  // macbookCatalog
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

  // Theo dõi giá trị của macbook_catalog_id
  const selectedCatalogId = watch('macbook_catalog_id._id');

  // Cập nhật macbook_name khi danh mục được chọn, chỉ khi macbook_name rỗng
  useEffect(() => {
    if (selectedCatalogId) {
      const selectedCatalog = macbookCatalogs.find(catalog => catalog._id === selectedCatalogId);
      const currentName = watch('macbook_name');
      if (selectedCatalog && !currentName) {
        setValue('macbook_name', selectedCatalog.m_cat_name);
      }
    }
  }, [selectedCatalogId, macbookCatalogs, setValue, watch]);

  const onSubmit: SubmitHandler<IMacbook> = async formData => {
    const data = new FormData();
    data.append('macbook_name', formData.macbook_name || '');
    data.append('macbook_catalog_id', formData.macbook_catalog_id._id);
    data.append('macbook_color', formData.macbook_color);
    data.append('macbook_price', formData.macbook_price?.toString() || '');
    data.append('macbook_sale', formData.macbook_sale?.toString() || '');
    data.append('macbook_status', formData.macbook_status || '');
    data.append('macbook_des', formData.macbook_des || '');

    // Thêm ảnh chính
    if (formData.macbook_img && formData.macbook_img[0]) {
      data.append('macbook_img', formData.macbook_img[0]);
    }

    // Thêm nhiều ảnh thu nhỏ
    if (formData.macbook_thumbnail && formData.macbook_thumbnail.length > 0) {
      Array.from(formData.macbook_thumbnail).forEach(file => {
        data.append('macbook_thumbnail', file); // Thêm từng file vào FormData
      });
    }

    try {
      await createMacbook(data);
      reset();
      getAllMacbook();
      Toastify('Tạo sản phẩm thành công!', 201);
      onClose();
    } catch (err) {
      getAllMacbook();
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
              {...register('macbook_note')}
              placeholder="Điền ghi chú..."
            />
            <div className="flex items-center">
              <ReactSelect
                placeholder="Chọn danh mục*"
                name="macbook_catalog_id._id"
                control={control}
                options={macbookCatalog}
                isMulti={false}
                className=""
              />
            </div>
            <InputModal
              // className="hidden"
              type="text"
              {...register('macbook_name', { required: true })}
              placeholder="Tên sản phẩm*"
            />
            <InputModal type="text" {...register('macbook_color', { required: true })} placeholder="Nhập màu*" />
            <InputModal
              type="number"
              {...register('macbook_price', { required: true })}
              placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
            />
            <InputModal
              type="number"
              {...register('macbook_sale')}
              placeholder="Nhập giá giảm (Hệ số x1000: 1triệu = 1000)"
            />

            <InputModal type="text" {...register('macbook_status', { required: true })} placeholder="Tình trạng*" />
            <Textarea
              className="w-full border p-2 focus:outline-none"
              {...register('macbook_des')}
              placeholder="Mô tả"
            />
            <LabelForm title={'Hình ảnh*'} />
            <InputModal type="file" {...register('macbook_img', { required: true })} placeholder="Hình ảnh*" />
            <LabelForm title={'Ảnh thu nhỏ'} />
            <InputModal type="file" {...register('macbook_thumbnail')} placeholder="Chèn ảnh thu nhỏ" multiple />
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

export default ModalCreateMacbookPageAdmin;
