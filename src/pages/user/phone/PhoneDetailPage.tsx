import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';
import { phoneFieldMap } from '../../../components/orther/data/phoneFieldMap';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

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
        <div className="px-2 xl:px-[150px]">
          <h1 className="py-5 text-2xl font-semibold">
            Điện thoại {phone?.name}
          </h1>
          {/*  */}
          <div className="flex flex-col items-start justify-start gap-5 xl:flex-row">
            <div className="flex flex-col gap-2 xl:flex-row">
              <div className="w-full flex-1 rounded-md">
                <img
                  src={phone?.img}
                  alt={phone?.name}
                  className="w-ful rounded-md xl:w-[700px]"
                />
              </div>
              <div className="w-20 rounded-md">
                <img
                  src={phone?.thumbnail}
                  alt={phone?.name}
                  className="rounded-md"
                />
              </div>
            </div>
            {/*  */}
            <div className="flex w-full flex-col rounded-md bg-white p-2 leading-10">
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
              {/*  */}
              <div>
                <h1 className="bg-primary text-2xl text-white">
                  Thông số kĩ thuật:
                </h1>
                {phoneFieldMap.map(group => (
                  <div key={group?.group}>
                    <details className="group divide-y-[1px]">
                      <summary className="flex cursor-pointer items-center justify-between">
                        <span>{group?.name}</span>
                        <span className="ml-2 transform text-primary transition-transform duration-300 group-open:rotate-90">
                          <IoIosArrowDroprightCircle/>
                        </span>
                      </summary>
                      {group?.fields
                        .filter(field => phone?.[group?.group]?.[field?.field])
                        .map(field => (
                          <div
                            className="flex w-full flex-row items-start justify-between"
                            key={field?.field}
                          >
                            <p>
                              <strong>{field?.name}</strong>
                            </p>
                            <p>
                              <span>
                                {phone?.[group?.group]?.[field?.field]}
                              </span>
                            </p>
                          </div>
                        ))}
                    </details>
                  </div>
                ))}
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
