import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import { Button } from 'react-daisyui';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';

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
      <div className="pt-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
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
                  className="flex h-full w-full flex-col justify-between rounded-md border border-[#f2f4f7] bg-white text-black"
                >
                  <Link to={`/product-detail/${phone?._id}`}>
                    <div className="flex flex-col items-start">
                      <img
                        className="h-[200px] w-full rounded-[5px] rounded-b-none object-cover xl:h-[250px]"
                        src={phone?.img}
                      />

                      <div className="px-1">
                        <p>Điện thoại {phone?.name}</p>
                      </div>
                    </div>
                  </Link>
                  {/*  */}
                  <div className="flex flex-col items-start justify-center gap-1 p-1">
                    <p className="text-gray-500">
                      Từ:&nbsp;
                      <span className="text-red-500">
                        {(phone?.price * 1000).toLocaleString('vi-VN')}{' '}
                        <sup>đ</sup>
                      </span>
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

