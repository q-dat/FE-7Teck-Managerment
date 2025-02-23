import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceListsContext } from '../../../../context/price-list/PriceListContext';

const ModalCreatePriceListPageAdmin: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('phoneProducts');

  const { createPriceLists } = useContext(PriceListsContext);

  const onSubmit = async (data: any) => {
    try {
      await createPriceLists(category, productName, data);
      reset();
      setProductName('');
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Quản lý bảng giá</h2>
      <div>
        <label className="block font-semibold">Chọn danh mục:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="phoneProducts">📱 Điện thoại</option>
          <option value="tabletProducts">📟 Máy tính bảng</option>
          <option value="macbookProducts">💻 MacBook</option>
          <option value="windowsProducts">💻 Laptop Windows</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label className="block">Tên danh mục:</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">
            {productName ? `${productName} - Tên sản phẩm:` : 'Tên sản phẩm:'}
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Giá:</label>
          <input
            {...register('price', { required: true })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Dung lượng:</label>
          <input
            {...register('storage', { required: true })}
            className="w-full border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ModalCreatePriceListPageAdmin;
