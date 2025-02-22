import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface IProduct {
  name: string;
  price: string;
  storage: string;
  _id?: string; // ID của sản phẩm trong database (nếu có)
}

interface IPriceList {
  phoneProducts: Record<string, IProduct[]>;
}

const PriceListManagerPage: React.FC = () => {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<IPriceList>();

  const [productName, setProductName] = useState("");
  const [priceList, setPriceList] = useState<IPriceList>({ phoneProducts: {} });

  // 🟢 Tải danh sách bảng giá từ server
  useEffect(() => {
    axios.get("http://localhost:6001/api/price-list")
      .then((response) => {
        setPriceList(response.data);
      })
      .catch((error) => console.error("Error fetching price list:", error));
  }, []);

  // 🔵 Xử lý khi submit form (thêm hoặc cập nhật sản phẩm)
  const onSubmit: SubmitHandler<IPriceList> = async (data) => {
    const normalizedProductName = productName.trim().charAt(0).toUpperCase() + productName.trim().slice(1).toLowerCase();

    if (!normalizedProductName) {
      alert("Vui lòng nhập tên sản phẩm!");
      return;
    }

    const newProduct: IProduct = {
      name: getValues(`phoneProducts.${normalizedProductName}.0.name`) || "",
      price: getValues(`phoneProducts.${normalizedProductName}.0.price`) || "",
      storage: getValues(`phoneProducts.${normalizedProductName}.0.storage`) || "",
    };

    if (!newProduct.name || !newProduct.price || !newProduct.storage) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6001/api/price-list", {
        phoneProducts: {
          [normalizedProductName]: [newProduct],
        },
      });

      setPriceList((prev) => ({
        phoneProducts: {
          ...prev.phoneProducts,
          [normalizedProductName]: [newProduct],
        },
      }));

      reset();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  // 🟠 Xoá sản phẩm theo ID
  const handleDelete = async (productKey: string, productId?: string) => {
    if (!productId) return;

    try {
      await axios.delete(`http://localhost:6001/api/price-list/${productId}`);

      setPriceList((prev) => {
        const updatedProducts = { ...prev.phoneProducts };
        delete updatedProducts[productKey];
        return { phoneProducts: updatedProducts };
      });
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Price List</h2>

      {/* Form nhập thông tin sản phẩm */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">{productName} Name:</label>
          <input {...register(`phoneProducts.${productName}.0.name`, { required: true })} className="border p-2 w-full" />
          {errors.phoneProducts?.[productName]?.[0]?.name && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="block">Price:</label>
          <input {...register(`phoneProducts.${productName}.0.price`, { required: true })} className="border p-2 w-full" />
          {errors.phoneProducts?.[productName]?.[0]?.price && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="block">Storage:</label>
          <input {...register(`phoneProducts.${productName}.0.storage`, { required: true })} className="border p-2 w-full" />
          {errors.phoneProducts?.[productName]?.[0]?.storage && <span className="text-red-500">Required</span>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {/* Danh sách sản phẩm đã nhập */}
      <h3 className="text-lg font-semibold mt-6">Danh sách sản phẩm</h3>
      <div className="mt-4">
        {Object.entries(priceList.phoneProducts).map(([key, products]) => (
          <div key={key} className="border p-4 mb-2">
            <h4 className="font-bold">{key}</h4>
            {products.map((product) => (
              <div key={product._id} className="flex justify-between items-center">
                <div>
                  <p><strong>Name:</strong> {product.name}</p>
                  <p><strong>Price:</strong> {product.price}</p>
                  <p><strong>Storage:</strong> {product.storage}</p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(key, product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceListManagerPage;
