import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceListContext } from '../../../../context/price-list/PriceListContext';
import { Toastify } from '../../../../helper/Toastify';
import { Button, Select } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import InputModal from '../../InputModal';
import { FormValues, ICreatePriceListPayload } from '../../../../types/type/price-list/price-list';
import QuillEditor from '../../../../lib/ReactQuill';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};
const ModalCreatePriceListPageAdmin: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const { getAllPriceLists, createPriceLists, loading } = useContext(PriceListContext);
  const isLoading = loading.create;
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('phoneProducts');

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: ICreatePriceListPayload = {
        category,
        price_new: data.price_new || 0,
        price_used: data.price_used || 0,
        conditions: editorValue,
        groups: [
          {
            catalog: productName,
            variants: [
              {
                name: data.name,
                condition: editorValue,
                price_new: data.price_new || 0,
                price_used: data.price_used || 0,
                storage: data.storage
              }
            ]
          }
        ]
      };

      await createPriceLists(payload);
      reset();
      getAllPriceLists();
      Toastify('Tạo sản phẩm thành công!', 201);
      onClose();
      setProductName('');
    } catch (err) {
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
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            <p className="font-bold text-black dark:text-white">Quản lý bảng giá</p>
            <div className="mt-5 flex flex-col items-start justify-center gap-5">
              <div className="w-full">
                <Select
                  className="w-full border border-gray-50 bg-white text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white"
                  defaultValue=""
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Chọn Bảng Giá
                  </option>
                  <option value="phoneProducts">📱 Điện Thoại iPhone</option>
                  <option value="tabletProducts">📟 Máy tính bảng iPad</option>
                  <option value="macbookProducts">💻 Laptop MacBook</option>
                  <option value="windowsProducts">💻 Laptop Windows</option>
                </Select>
              </div>
              {/*  */}
              <LabelForm title={'Tên danh mục'} />
              <InputModal
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder={'Nhập tên danh mục'}
              />
              <LabelForm title={productName ? `${productName} - Tên sản phẩm:` : 'Tên sản phẩm:'} />
              <InputModal placeholder={'Nhập tên sản phẩm'} type="text" {...register('name', { required: true })} />
              <LabelForm title={'Giá Máy Mới'} />
              <InputModal
                placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
                type="number"
                {...register('price_new', { required: true })}
              />
              <LabelForm title={'Giá Máy Cũ'} />
              <InputModal
                placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
                type="number"
                {...register('price_used', { required: true })}
              />
              <LabelForm title={'Dung lượng'} />
              <InputModal placeholder={'Nhập dung lượng'} type="text" {...register('storage', { required: true })} />
              {/*  */}
              <div className="w-full">
                <LabelForm title={'Điều kiện thu mua'} />
                <QuillEditor
                  value={editorValue}
                  onChange={setEditorValue}
                  theme="snow"
                  modules={modules}
                  className="mb-4 h-[400px] overflow-auto rounded-md border text-black scrollbar-hide dark:text-white xl:h-[600px]"
                  placeholder="Nội dung bài viết..."
                />
              </div>
            </div>
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

export default ModalCreatePriceListPageAdmin;
