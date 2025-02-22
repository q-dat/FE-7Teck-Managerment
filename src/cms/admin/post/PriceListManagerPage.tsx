import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface IProductPriceList {
  name: string;
  price: string;
  storage: string;
  _id?: string; // ID trong database (nếu có)
}

interface IPriceList {
  phoneProducts: Record<string, IProductPriceList[]>;
  tabletProducts: Record<string, IProductPriceList[]>;
  macbookProducts: Record<string, IProductPriceList[]>;
  windowsProducts: Record<string, IProductPriceList[]>;
}

const PriceListManagerPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string; price: string; storage: string }>();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<keyof IPriceList>('phoneProducts'); // 🟢 Fix lỗi TypeScript
  const [priceList, setPriceList] = useState<IPriceList>({
    phoneProducts: {},
    tabletProducts: {},
    macbookProducts: {},
    windowsProducts: {}
  });

  // 🟢 Lấy danh sách từ server
  useEffect(() => {
    axios
      .get('http://localhost:6001/api/price-list')
      .then(response => setPriceList(response.data))
      .catch(error => console.error('Error fetching price list:', error));
  }, []);

  // 🔵 Xử lý thêm sản phẩm
  const onSubmit: SubmitHandler<{
    name: string;
    price: string;
    storage: string;
  }> = async data => {
    const normalizedProductName =
      productName.trim().charAt(0).toUpperCase() +
      productName.trim().slice(1).toLowerCase();
    if (!normalizedProductName) {
      alert('Vui lòng nhập tên sản phẩm!');
      return;
    }

    const newProduct: IProductPriceList = {
      name: data.name,
      price: data.price,
      storage: data.storage
    };

    try {
      await axios.post('http://localhost:6001/api/price-list', {
        [category]: { [normalizedProductName]: [newProduct] }
      });

      setPriceList(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [normalizedProductName]: [newProduct]
        }
      }));

      reset();
      setProductName('');
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };

  // 🟠 Xoá sản phẩm
  const handleDelete = async (
    categoryKey: keyof IPriceList,
    productKey: string,
    productId?: string
  ) => {
    if (!productId) return;

    try {
      await axios.delete(`http://localhost:6001/api/price-list/${productId}`);
      setPriceList(prev => {
        const updatedProducts = { ...prev[categoryKey] };
        delete updatedProducts[productKey];
        return { ...prev, [categoryKey]: updatedProducts };
      });
    } catch (error) {
      console.error('Lỗi khi xoá sản phẩm:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Quản lý bảng giá</h2>

      {/* Chọn danh mục */}
      <div>
        <label className="block font-semibold">Chọn danh mục:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value as keyof IPriceList)}
          className="w-full border p-2"
        >
          <option value="phoneProducts">📱 Điện thoại</option>
          <option value="tabletProducts">📟 Máy tính bảng</option>
          <option value="macbookProducts">💻 MacBook</option>
          <option value="windowsProducts">💻 Laptop Windows</option>
        </select>
      </div>

      {/* Form nhập sản phẩm */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label className="block">Tên sản phẩm:</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Giá:</label>
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

      {/* Danh sách sản phẩm */}
      <h3 className="mt-6 text-lg font-semibold">Danh sách sản phẩm</h3>
      {Object.entries(priceList).map(([categoryKey, products]) => {
        const typedProducts = products as Record<string, IProductPriceList[]>; // 🟢 Ép kiểu để tránh lỗi "unknown"

        return (
          <div key={categoryKey}>
            <h3 className="text-md mt-4 font-bold">
              {categoryKey === 'phoneProducts'
                ? '📱 Điện thoại'
                : categoryKey === 'tabletProducts'
                  ? '📟 Máy tính bảng'
                  : categoryKey === 'macbookProducts'
                    ? '💻 MacBook'
                    : '💻 Laptop Windows'}
            </h3>
            <div className="mt-2">
              {Object.entries(typedProducts).map(([key, productArray]) => (
                <div key={key} className="mb-2 border p-4">
                  <h4 className="font-bold">{key}</h4>
                  {productArray.map(product => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p>
                          <strong>Name:</strong> {product.name}
                        </p>
                        <p>
                          <strong>Price:</strong> {product.price}
                        </p>
                        <p>
                          <strong>Storage:</strong> {product.storage}
                        </p>
                      </div>
                      <div>
                        <button
                          className="mr-2 rounded bg-red-500 px-2 py-1 text-white"
                          onClick={() =>
                            handleDelete(
                              categoryKey as keyof IPriceList,
                              key,
                              product._id
                            )
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PriceListManagerPage;

