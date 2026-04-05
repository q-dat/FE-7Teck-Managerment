import React, { useContext, useEffect, useState } from 'react';
import ErrorLoading from '../../../components/common/error/ErrorLoading';
import { LoadingLocal } from '../../../components/common/loading';
import { Toastify } from '../../../helper/Toastify';
import { isIErrorResponse } from '../../../types/error/error';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine, RiUploadCloud2Line } from 'react-icons/ri';
import NavtitleAdmin from '../../../components/adminPage/NavtitleAdmin';
import TableListAdmin from '../../../components/adminPage/TablelistAdmin';
import ModalCreatePhonePageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneModal/CreatePhone.modal';
import ModalDeletePhonePageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneModal/DeletePhone.modal';
import ModalEditPhonePageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneModal/EditPhone.modal';
import ModalBulkImportPhone from '../../../components/adminPage/modalAdmin/phone/PhoneModal/BulkImportPhone.modal';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import { IPhone } from '../../../types/type/phone/phone';
import TimeAgo from '../../../components/common/timeAgo/TimeAgo';
import Zoom from '../../../lib/Zoom';
import PhoneCatalogManager from './PhoneCatalogManager';
import { FaCopy, FaFacebook, FaGoogle, FaList, FaReddit, FaYoutube } from 'react-icons/fa';
import NavbarAdminDesktop from '../../../components/adminPage/NavbarAdminDesktop ';
import NavbarAdminMobile from '../../../components/adminPage/responsiveUI/mobile/NavbarAdmin.mobile';
import { InlinePriceEditor } from '../../../components/adminPage/inline-edit/InlinePriceEditor';
import InlineNoteEditor from '../../../components/adminPage/inline-edit/InlineNoteEditor';
import { useSearchParams } from 'react-router-dom';
import { openSearchProvider } from '../../../components/utils/searchProvider';
import { SiTiktok, SiX, SiInstagram } from 'react-icons/si';
import { handleShareFacebook } from '../../../components/adminPage/inline-edit/shareToFacebook';
import InlineDescriptionEditor from '../../../components/adminPage/inline-edit/InlineDescriptionEditor';
import { downloadImage } from '../../../helper/downloadImage';
import { TbCameraDown } from 'react-icons/tb';

const PhoneManager: React.FC = () => {
  const { phones, loading, error, getAllPhones, updatePhone, deletePhone } = useContext(PhoneContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  // handle Search
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('q') ?? undefined;
  const status = searchParams.get('status');

  useEffect(() => {
    const params: { name?: string; status?: number } = {};

    if (keyword) params.name = keyword;
    if (status !== null) params.status = Number(status);

    getAllPhones({
      name: keyword,
      status: status ? Number(status) : undefined
    });
  }, [keyword, status, getAllPhones]);

  // handleCatalogModal
  const [selectedCatalog, setSelectedCatalog] = useState(false);
  // handleCatalogModal
  const handleCatalogModal = () => {
    setSelectedCatalog(!selectedCatalog);
  };
  //
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPhoneId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedPhoneId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const copyProductId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  const handleInlineUpdate = async (id: string, field: keyof IPhone, value: any) => {
    const data = new FormData();
    data.append(String(field), String(value));

    try {
      await updatePhone(id, data);
      Toastify('Cập nhật thành công', 200);
      getAllPhones({
        name: keyword,
        status: status ? Number(status) : undefined
      });
    } catch {
      Toastify('Lỗi cập nhật', 500);
    }
  };

  const handleDeletePhone = async () => {
    if (selectedPhoneId) {
      try {
        await deletePhone(selectedPhoneId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllPhones({
          name: keyword,
          status: status ? Number(status) : undefined
        });
      } catch (error) {
        const errorMessage = isIErrorResponse(error) ? error.data?.message : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  const handleDownloadImagesById = async (phone: IPhone) => {
    if (!phone) return;

    const images: string[] = [];

    if (phone.img) images.push(phone.img);

    if (Array.isArray(phone.thumbnail)) {
      images.push(...phone.thumbnail);
    }

    const uniqueImages = Array.from(new Set(images));

    for (let i = 0; i < uniqueImages.length; i++) {
      const url = uniqueImages[i];

      const filename = `${phone.slug || phone._id}-${i + 1}.jpg`;

      await downloadImage(url, filename);

      // tránh bị browser chặn
      await new Promise(res => setTimeout(res, 150));
    }

    Toastify(`Đã tải ${uniqueImages.length} ảnh`, 200);
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdminDesktop />
      <NavbarAdminMobile Title_NavbarAdmin="Điện Thoại" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Điện Thoại"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:items-end">
              <div className="flex flex-row items-end justify-center gap-2">
                {/* All */}
                <Button
                  size="sm"
                  color="primary"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => {
                    setSearchParams({});
                  }}
                >
                  Tất cả
                </Button>
                {/* New */}
                <Button
                  size="sm"
                  color="info"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => {
                    setSearchParams({ status: '0' });
                  }}
                >
                  Mới
                </Button>
                {/* Used */}
                <Button
                  size="sm"
                  color="warning"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => {
                    setSearchParams({ status: '1' });
                  }}
                >
                  Cũ
                </Button>
              </div>
              {/* Modal PhoneCatalogManager */}
              {selectedCatalog && (
                <div
                  className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/50"
                  onClick={handleCatalogModal} // Click nền để đóng
                >
                  <div
                    className="relative h-[80%] w-full cursor-default overflow-y-auto rounded-md border-2 border-white bg-[#F3F2F7] dark:bg-gray-900 xl:h-[90%] xl:w-3/4 xl:border-4 xl:p-2"
                    onClick={e => e.stopPropagation()} // Ngăn chặn click xuyên modal
                  >
                    <PhoneCatalogManager />
                  </div>
                </div>
              )}
              <div className="flex flex-row items-center gap-2">
                {/* Catalog */}
                <Button color="secondary" onClick={handleCatalogModal} className="w-auto text-sm font-light text-white">
                  <FaList className="text-xl" color="white" />
                  Danh mục
                </Button>
                {/* Add Product */}
                <Button
                  color="primary"
                  onClick={openModalCreateAdmin}
                  className="w-[100px] text-sm font-light text-white"
                >
                  <RiAddBoxLine className="text-xl" color="white" />
                  Thêm
                </Button>
                {/* Bulk Import Button */}
                <Button
                  color="primary"
                  onClick={() => setIsBulkImportOpen(true)}
                  className="flex w-auto flex-row text-sm font-light text-white"
                >
                  <RiUploadCloud2Line className="text-xl" />
                </Button>
              </div>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Điện Thoại(${phones.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Hình Ảnh</span>
            <span>Tên Sản Phẩm</span>
            <span>Giá</span>
            <span>Giá Giảm</span>
            <span>Tình Trạng Máy</span>
            <span>Mô Tả</span>
            <span>Ghi Chú</span>
            <span>Ngày Cập Nhật</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {phones && phones.length > 0 ? (
              phones.map((phone: IPhone, index: number) => (
                <Table.Row
                  onClick={() => {
                    setActiveRowId(phone._id ?? '');
                  }}
                  key={phone._id}
                  className={`group text-black dark:text-white ${activeRowId === phone._id ? 'border-y-2 border-l-8 border-green-500 bg-orange-200 font-bold dark:bg-green-950' : 'bg-primary/10 transition-all dark:bg-gray-900'} `}
                >
                  <span>#{index + 1}</span>
                  <span className="flex flex-wrap items-center justify-center gap-2">
                    <Zoom>
                      <img loading="lazy" src={phone?.img} alt="Hình ảnh" className="h-12 w-12 object-cover " />
                    </Zoom>
                    {phone?.thumbnail && Array.isArray(phone?.thumbnail) ? (
                      <span className="text-xs text-red-500">(Ảnh thu nhỏ: {phone?.thumbnail?.length})</span>
                    ) : (
                      <span>Không có ảnh thu nhỏ</span>
                    )}
                  </span>
                  <span className="flex flex-col items-center gap-2">
                    <span className="whitespace-nowrap pl-2 group-hover:bg-white group-hover:py-1 group-hover:text-black">
                      {phone?.name}
                      &nbsp;
                      {phone?.phone_catalog_id?.status === 0 ? (
                        <span className="bg-green-500 p-1 text-black">New</span>
                      ) : phone?.phone_catalog_id?.status === 1 ? (
                        <span className="bg-red-500 p-1 text-white">Used</span>
                      ) : (
                        phone?.phone_catalog_id?.status
                      )}
                      <span className="bg-black p-1 text-white dark:bg-white dark:text-black">{phone?.color}</span>
                    </span>

                    <span className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                      <div
                        data-tip="Copy id sản phẩm"
                        className="tooltip tooltip-bottom tooltip-primary cursor-pointer hover:text-red-500"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          copyProductId(phone._id);
                        }}
                      >
                        <FaCopy />
                      </div>
                      <FaGoogle
                        className="cursor-pointer transition hover:text-red-500"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('google', `${phone?.name ?? ''} ${phone?.color ?? ''}`.trim());
                        }}
                      />

                      <FaYoutube
                        className="cursor-pointer transition hover:text-red-600"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('youtube', phone?.name ?? '');
                        }}
                      />

                      <FaFacebook
                        className="cursor-pointer transition hover:text-blue-600"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('facebook', phone?.name ?? '');
                        }}
                      />

                      <SiTiktok
                        className="cursor-pointer transition"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');
                          openSearchProvider('tiktok', phone?.name ?? '');
                        }}
                      />

                      <SiX
                        className="cursor-pointer transition"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('x', phone?.name ?? '');
                        }}
                      />

                      <SiInstagram
                        className="cursor-pointer transition hover:text-pink-500"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('instagram', phone?.name ?? '');
                        }}
                      />

                      <FaReddit
                        className="cursor-pointer transition hover:text-orange-500"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');

                          openSearchProvider('reddit', phone?.name ?? '');
                        }}
                      />
                      {/* Facebook (Share) */}
                      <Button
                        data-tip="Facebook (Share)"
                        size="xs"
                        className="tooltip tooltip-bottom tooltip-primary rounded-md border-none bg-[#3b5998] hover:bg-[#3b5998] hover:bg-opacity-80"
                        onClick={async () => {
                          const domain = import.meta.env.VITE_APP_ORIGIN;
                          const productUrl = `${domain}/${phone.slug}`;

                          const result = await handleShareFacebook({
                            des: phone.des ?? phone.name,
                            url: productUrl
                          });

                          if (!result.success) {
                            Toastify('Không copy được nội dung', 500);
                            return;
                          }

                          Toastify('Đã copy nội dung. Dán vào Facebook (Ctrl + V)', 200);
                        }}
                      >
                        FB
                      </Button>
                      {/* Download Images */}
                      <Button
                        data-tip="Download Images"
                        size="xs"
                        color="secondary"
                        className="tooltip tooltip-bottom tooltip-primary rounded-md border-none text-white"
                        onClick={() => {
                          setActiveRowId(phone._id ?? '');
                          handleDownloadImagesById(phone);
                        }}
                      >
                        <TbCameraDown className="text-base" />
                      </Button>
                    </span>
                  </span>

                  <InlinePriceEditor<IPhone>
                    prodId={phone._id}
                    field="price"
                    value={phone.price}
                    type="number"
                    formatter={v => `${(Number(v) * 1000).toLocaleString('vi-VN')}đ`}
                    onSubmit={handleInlineUpdate}
                  />

                  <InlinePriceEditor<IPhone>
                    prodId={phone._id}
                    field="sale"
                    value={phone.sale ?? 0}
                    type="number"
                    formatter={v => `${(Number(v) * 1000).toLocaleString('vi-VN')}đ`}
                    onSubmit={handleInlineUpdate}
                  />

                  {phone?.status.toLocaleLowerCase() === 'new' ? (
                    <span className="line-clamp-3 rounded-md bg-green-500 text-black">
                      {phone?.status || 'Không có tình trạng!'}
                    </span>
                  ) : (
                    <span className="line-clamp-3 rounded-md bg-red-500 text-white">
                      {phone?.status || 'Không có tình trạng!'}
                    </span>
                  )}
                  <InlineDescriptionEditor
                    prodId={phone._id}
                    value={phone.des ?? ''}
                    onSubmit={(id, value) => handleInlineUpdate(id, 'des', value)}
                  />
                  <InlineNoteEditor
                    prodId={phone._id}
                    value={phone.note ?? ''}
                    onSubmit={(id, newNote) => handleInlineUpdate(id, 'note', newNote)}
                  />
                  <span>
                    {/* {new Date(phone?.createdAt).toLocaleString('vi-VN')} */}
                    <TimeAgo date={phone?.updatedAt} />
                  </span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                          color="success"
                          onClick={() => {
                            setActiveRowId(phone._id ?? '');

                            openModalEditAdmin(phone?._id ?? '');
                          }}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(phone?._id ?? '')}
                          className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                        >
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan={10}>Không có sản phẩm điện thoại nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalBulkImportPhone
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onSuccess={() =>
          getAllPhones({
            name: keyword,
            status: status ? Number(status) : undefined
          })
        }
      />
      <ModalCreatePhonePageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeletePhonePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhone}
      />
      <ModalEditPhonePageAdmin isOpen={isModalEditOpen} onClose={closeModalEditAdmin} phoneId={selectedPhoneId ?? ''} />
    </div>
  );
};

export default PhoneManager;
