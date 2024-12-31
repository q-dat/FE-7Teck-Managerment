import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';
import { phoneFieldMap } from '../../../components/orther/data/phoneFieldMap';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Button } from 'react-daisyui';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { getPhoneById, loading, error } = useContext(PhoneContext);
  const [phone, setPhone] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchedPhone = getPhoneById(id);
      setPhone(fetchedPhone);
    }
  }, [id, getPhoneById]);

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile={phone?.name} />
      <div className="pt-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/phone-list">Thông Tin Sản Phẩm</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="px-2 xl:px-20">
          <h1 className="py-5 text-2xl font-semibold text-black dark:text-white">
            Điện thoại {phone?.name}
          </h1>
          {/*  */}
          <div className="flex flex-col items-start justify-start gap-5 xl:flex-row ">
            {/* IMG */}
            <div className="flex flex-col gap-2 xl:flex-row">
              <div className="w-full flex-1 rounded-md">
                <img
                  src={phone?.img}
                  alt={phone?.name}
                  className="w-ful rounded-md object-cover xl:w-[700px] rounded-r-none"
                />
              </div>
              <div className="w-20 rounded-md">
                <img
                  src={phone?.thumbnail}
                  alt={phone?.name}
                  className="rounded-md rounded-l-none"
                />
              </div>
            </div>
            {/* Info */}
            <div className="flex w-full flex-col items-start justify-between gap-5 rounded-md bg-white p-2 leading-10 border border-primary">
              <div>
                <p className="text-2xl font-semibold text-red-500">
                  {(phone?.price * 1000).toLocaleString('vi-VN')} <sup>đ</sup>
                </p>
                {phone?.color && (
                  <p className="text-gray-500">
                    <span>Màu sắc:</span>
                    <strong className="text-black">{phone?.color}</strong>
                  </p>
                )}
                {phone?.status && (
                  <p className="text-gray-500">
                    <span>Trạng thái:</span>
                    <strong className="text-black">{phone?.status}</strong>
                  </p>
                )}
                {phone?.des && (
                  <p className="text-lg text-blue-500">
                    <span>{phone?.des}</span>
                  </p>
                )}
              </div>
              <div>
                <Link to="/checkout">
                  <Button
                    size="sm"
                    className="w-full rounded-md border-none bg-primary text-white hover:bg-primary hover:bg-opacity-60"
                  >
                    Mua Ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="mt-5 rounded-md border border-primary bg-white leading-10 text-black">
            <h1 className="rounded-md rounded-b-none bg-primary p-2 text-2xl font-semibold uppercase text-white">
              Thông số kĩ thuật:
            </h1>
            {phoneFieldMap.map(group => (
              <div key={group?.group}>
                <details className="group transform divide-y-[1px] p-2">
                  <summary className="flex cursor-pointer items-center justify-between">
                    <span className="font-semibold text-primary">
                      {group?.name}
                    </span>
                    <span className="transform text-primary transition-transform duration-300 ease-in-out group-open:rotate-90">
                      <IoIosArrowDroprightCircle className="text-xl" />
                    </span>
                  </summary>
                  {group?.fields
                    .filter(field => phone?.[group?.group]?.[field?.field])
                    .map(field => (
                      <div
                        className="flex w-full flex-row items-start justify-between"
                        key={field?.field}
                      >
                        <p>{field?.name}</p>
                        <p>{phone?.[group?.group]?.[field?.field]}</p>
                      </div>
                    ))}
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
