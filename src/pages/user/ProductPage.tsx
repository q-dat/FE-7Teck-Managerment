import React, { useState } from 'react';
import { IProduct } from '../../types/type/product/product';
import Pagination from '../../components/UserPage/Pagination';
import { Button } from 'react-daisyui';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const products: IProduct[] = [
    {
      _id: '1',
      product_catalog_id: '',
      name: 'Sản Phẩm 1',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 100,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '2',
      product_catalog_id: '',
      name: 'Sản Phẩm 2',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '3',
      product_catalog_id: '',
      name: 'Sản Phẩm 3',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '4',
      product_catalog_id: '',
      name: 'Sản Phẩm 4',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '5',
      product_catalog_id: '',
      name: 'Sản Phẩm 5',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '6',
      product_catalog_id: '',
      name: 'Sản Phẩm 6',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '7',
      product_catalog_id: '',
      name: 'Sản Phẩm 7',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '8',
      product_catalog_id: '',
      name: 'Sản Phẩm 8',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '9',
      product_catalog_id: '',
      name: 'Sản Phẩm 9',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '10',
      product_catalog_id: '',
      name: 'Sản Phẩm 10',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    },
    {
      _id: '11',
      product_catalog_id: '',
      name: 'Sản Phẩm 11',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7yZWI0WnUPXEv2a6mFK_ctxg4Bj4p63ECUk_AjfUCdVKWHLDj4i4HT2QOGWYIlkBDp2ggA&s',
      status: 'sale',
      price: 0,
      createAt: '',
      updateAt: ''
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc sản phẩm có `status` là `sale`
  const saleProducts = products.filter(product => product.status === 'sale');
  const totalPages = Math.ceil(saleProducts.length / itemsPerPage);

  // Tính toán sản phẩm hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = saleProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Sản Phẩm" />
      <div className="breadcrumbs glass mb-10 px-[10px] py-2 text-sm text-black dark:text-white lg:px-20">
        <ul className="font-light">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/product-list">Sản Phẩm</Link>
          </li>
        </ul>
      </div>
      <div className="space-y-10 px-2 xl:px-[100px]">
        <div>
          <p className="my-5 text-start font-serif text-2xl font-bold text-primary xl:text-2xl">
            Danh Sách Sản Phẩm
          </p>
          <div className="grid grid-flow-row grid-cols-2 items-start justify-between gap-x-5 gap-y-5 md:grid-cols-5">
            {currentProducts.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <img
                    className="h-[160px] w-full rounded-md object-cover xl:h-[220px]"
                    src={product.img}
                  />
                  <p>{product.name}</p>
                  <p>Giá:{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                  <div className="dropdown-content absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <Button size="sm">Mua Ngay</Button>
                    <Button size="sm">Xem Thêm</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default ProductPage;

