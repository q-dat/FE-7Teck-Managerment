import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import { Button } from 'react-daisyui';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';
import { Sale } from '../../../assets/image-represent';
import { TbZoomExclamationFilled } from 'react-icons/tb';

const ProductByCatalog = () => {
  const { phones, loading, error } = useContext(PhoneContext);
  const { catalog } = useParams();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  // GetByID
  // const filteredPhones = phones.filter(
  //   phone => phone?.phone_catalog_id._id === catalog
  // );
  const filteredPhones = phones.filter(
    phone => slugify(phone?.name) === catalog
  );

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Điện Thoại" />
      <div className="py-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/phone-list">Điện Thoại</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-10 px-2 xl:px-20">
          <div>
            <p className="font-title my-5 text-start text-2xl font-bold text-primary xl:text-2xl">
              {/* Danh Sách Điện Thoại */}
            </p>
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6">
              {filteredPhones.map(phone => (
                <div
                  key={phone?._id}
                  className="relative flex h-full flex-col justify-between rounded-md border border-white text-black"
                >
                  <div className="relative">
                    <Link
                      className="flex h-full w-full items-center justify-center rounded-md rounded-b-none bg-white"
                      to={`/product-detail/${phone?._id}`}
                    >
                      <img
                        className="h-full w-full rounded-[5px] rounded-b-none object-contain"
                        src={phone?.img}
                      />
                      <p className="absolute bottom-0 right-0">
                        <TbZoomExclamationFilled className="text-2xl text-white" />
                      </p>
                    </Link>
                  </div>
                  {/*  */}
                  <div className="flex flex-col items-start justify-center gap-1 p-1">
                    <p>Điện thoại {phone?.name}</p>
                    <p className="text-gray-500">
                      <span className="text-red-500">
                        {(phone?.price * 1000).toLocaleString('vi-VN')}₫
                      </span>
                      &nbsp;
                      <del className="text-xs font-light text-gray-100">
                        {phone?.sale &&
                          (phone?.sale * 1000).toLocaleString('vi-VN')}
                        ₫
                      </del>
                    </p>
                    <Link to="checkout" className="z-50 w-full">
                      <Button
                        size="xs"
                        className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary"
                      >
                        Mua Ngay
                      </Button>
                    </Link>
                  </div>
                  {/*  */}
                  {phone?.status && (
                    <div className="absolute -left-[3px] top-0">
                      <img width={60} src={Sale} />
                      <p className="absolute top-[1px] w-full pl-1 text-xs text-white">
                        {phone?.status}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductByCatalog;
