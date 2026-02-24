import React, { useContext, useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PriceListContext } from '../../../../../context/price-list/PriceListContext';
import { Toastify } from '../../../../../helper/Toastify';
import { Button, Select } from 'react-daisyui';
import LabelForm from '../../../LabelForm';
import InputModal from '../../../InputModal';
import { ICreatePriceListPayload, IPriceListApi, FormValues } from '../../../../../types/type/price-list/price-list';
import QuillEditor from '../../../../../lib/ReactQuill';

interface ModalEditAdminProps {
  isOpen: boolean;
  onClose: () => void;
  priceList: IPriceListApi | null;
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

const ModalEditPriceListPageAdmin: React.FC<ModalEditAdminProps> = ({ isOpen, onClose, priceList }) => {
  const { updatePriceLists, getAllPriceLists, loading } = useContext(PriceListContext);
  const isLoading = loading.update;
  const { register, handleSubmit, control, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      category: '',
      catalog: '',
      conditions: '',
      variants: []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants'
  });
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    if (priceList && priceList.groups.length > 0) {
      setValue('category', priceList.category);
      setValue('catalog', priceList.groups[0].catalog);
      setValue(
        'variants',
        priceList.groups[0].variants.map(variant => ({
          name: variant.name,
          price_new: variant.price_new ?? null,
          price_used: variant.price_used ?? null,
          storage: variant.storage,
          condition: variant.condition || ''
        }))
      );
      setEditorValue(priceList.conditions || '');
    }
  }, [priceList, setValue]);

  const onSubmit = async (data: FormValues) => {
    if (!priceList) return;
    try {
      const payload: ICreatePriceListPayload = {
        category: data.category,
        price_new: data.variants.reduce((max, v) => Math.max(max, v.price_new ?? 0), 0) || null,
        price_used: data.variants.reduce((max, v) => Math.max(max, v.price_used ?? 0), 0) || null,
        conditions: editorValue,
        groups: [
          {
            catalog: data.catalog,
            variants: data.variants.map(variant => ({
              name: variant.name,
              price_new: variant.price_new ? Number(variant.price_new) : null,
              price_used: variant.price_used ? Number(variant.price_used) : null,
              storage: variant.storage,
              condition: editorValue
            }))
          }
        ]
      };

      await updatePriceLists(priceList._id, payload);
      reset();
      getAllPriceLists();
      Toastify('Cập nhật bảng giá thành công!', 200);
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen || !priceList) return null;

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
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            <p className="font-bold text-black dark:text-white">Chỉnh sửa Bảng Giá</p>
            <div className="mt-5 flex flex-col items-start justify-center gap-5">
              <div className="w-full">
                <LabelForm title="Loại sản phẩm" />
                <Select
                  className="w-full border border-gray-50 bg-white text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white"
                  {...register('category', { required: true })}
                >
                  <option value="phoneProducts">📱 Điện Thoại iPhone</option>
                  <option value="tabletProducts">📟 Máy tính bảng iPad</option>
                  <option value="macbookProducts">💻 Laptop MacBook</option>
                  <option value="windowsProducts">💻 Laptop Windows</option>
                </Select>
              </div>
              <LabelForm title="Tên danh mục" />
              <InputModal
                type="text"
                placeholder="Nhập tên danh mục (VD: iPhone 15 Series)"
                {...register('catalog', { required: true })}
              />
              <LabelForm title="Điều kiện thu mua" />
              <QuillEditor
                value={editorValue}
                onChange={setEditorValue}
                theme="snow"
                modules={modules}
                className="mb-4 h-[200px] overflow-auto rounded-md border text-black scrollbar-hide dark:text-white"
                placeholder="Nội dung điều kiện thu mua..."
              />
              <div className="w-full">
                <LabelForm title="Sản phẩm" />
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Sản phẩm #{index + 1}</p>
                      {fields.length > 1 && (
                        <Button size="sm" color="error" onClick={() => remove(index)} className="text-white">
                          Xóa
                        </Button>
                      )}
                    </div>
                    <LabelForm title="Tên sản phẩm" />
                    <InputModal
                      placeholder="Nhập tên sản phẩm (VD: iPhone 15 Pro Max 256G)"
                      type="text"
                      {...register(`variants.${index}.name`, { required: true })}
                    />
                    <LabelForm title="Giá máy mới" />
                    <InputModal
                      placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
                      type="number"
                      {...register(`variants.${index}.price_new`, { valueAsNumber: true })}
                    />
                    <LabelForm title="Giá máy cũ" />
                    <InputModal
                      placeholder="Giá* (Hệ số x1000: 1triệu = 1000)"
                      type="number"
                      {...register(`variants.${index}.price_used`, { valueAsNumber: true })}
                    />
                    <LabelForm title="Dung lượng" />
                    <InputModal
                      placeholder="Nhập dung lượng (VD: 256GB)"
                      type="text"
                      {...register(`variants.${index}.storage`)}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  color="primary"
                  onClick={() =>
                    append({ name: '', price_new: null, price_used: null, storage: undefined, condition: '' })
                  }
                  className="mt-2 text-white"
                >
                  Thêm sản phẩm
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 text-center">
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

export default ModalEditPriceListPageAdmin;

