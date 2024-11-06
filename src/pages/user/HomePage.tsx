import React, { useRef, useState } from 'react';
import { BannerDesktop, BannerTablet, BannerMobile } from '../../assets/images';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { IProduct } from '../../types/type/product/product';
import { Button } from 'react-daisyui';
import Pagination from '../../components/UserPage/Pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomePage: React.FC = () => {
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
  const itemsPerPage = 8;

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
  // scrollRef
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Bảng Giá Thu Mua" />
      {/* Banner */}
      <div>
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[12%] xl:top-[20%]">
            <p className="bg-gradient-to-r from-primary to-white bg-clip-text text-[25px] font-black italic text-transparent dark:from-primary dark:to-gray-100 md:text-[40px]">
              Đổi Điện Thoại Cũ, <br /> Nhận Ngay Giá Tốt Nhất!
            </p>
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-thin text-transparent dark:from-primary dark:to-primary">
              up to 90%
            </p>
          </div>
          {/* Banner IMG */}
          <div>
            <img
              src={BannerDesktop}
              className="hidden w-full xl:block"
              alt="BannerDesktop"
            />
            <img
              src={BannerTablet}
              className="hidden w-full md:block xl:hidden"
              alt="BannerTablet"
            />
            <img
              src={BannerMobile}
              className="w-full md:hidden"
              alt="BannerMobile"
            />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="space-y-10 px-[2px] xl:px-[100px]">
        {/* Best Saller */}
        <div className="relative">
          <p className="text-center font-black">Sản Phẩm Nổi Bật</p>
          <div
            ref={scrollRef}
            className="flex flex-row items-start justify-between gap-x-5 gap-y-5 overflow-x-auto scroll-smooth py-1 scrollbar-hide"
          >
            {products.map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex w-[250px] flex-col items-center justify-center">
                  <img
                    className="h-[250px] w-[250px] rounded-md object-cover"
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
          {/* Navigation Button  */}
          <div className="absolute top-1/2 flex w-full items-center justify-between">
            <Button
              onClick={() => scroll(-200)}
              className="border-none bg-transparent p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-70 hover:text-white dark:bg-white dark:text-primary"
            >
              <FaChevronLeft className="text-3xl" />
            </Button>
            <Button
              onClick={() => scroll(200)}
              className="border-none bg-transparent p-0 text-primary shadow-none hover:bg-primary hover:bg-opacity-70 hover:text-white dark:bg-white dark:text-primary"
            >
              <FaChevronRight className="text-3xl" />
            </Button>
          </div>
        </div>
        {/* Product */}
        <div>
          <p className="text-center font-black">Sản Phẩm Giảm Giá</p>
          <div className="grid grid-flow-row grid-cols-4 items-start justify-between gap-x-5 gap-y-5">
            {currentProducts.slice(0, 8).map(product => (
              <div
                key={product._id}
                className="dropdown dropdown-hover relative rounded-md bg-white shadow-headerMenu shadow-gray-50"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="h-[280px] w-full rounded-md object-cover"
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
      </div>
      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default HomePage;
