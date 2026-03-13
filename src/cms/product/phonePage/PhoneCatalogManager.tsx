import React, { useState, useContext } from 'react';
import { Toastify } from '../../../helper/Toastify';
import LoadingLocal from '../../../components/common/loading/LoadingLocal';
import NavtitleAdmin from '../../../components/adminPage/NavtitleAdmin';
import { RiAddBoxLine, RiUploadCloud2Line } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../../components/common/error/ErrorLoading';
import { FaCircleInfo, FaFacebook, FaGoogle, FaPenToSquare, FaReddit, FaYoutube } from 'react-icons/fa6';
import { isIErrorResponse } from '../../../types/error/error';
import TableListAdmin from '../../../components/adminPage/TablelistAdmin';
import ModalCreatePhoneCatalogPageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneCatalogModal/CreatePhoneCatalog.modal';
import ModalDeletePhoneCatalogPageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneCatalogModal/DeletePhoneCatalog.modal';
import ModalEditPhoneCatalogPageAdmin from '../../../components/adminPage/modalAdmin/phone/PhoneCatalogModal/EditPhoneCatalog.modal';
import { PhoneCatalogContext } from '../../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../../types/type/phone-catalog/phone-catalog';
import TimeAgo from '../../../components/common/timeAgo/TimeAgo';
import NavbarAdminMobile from '../../../components/adminPage/responsiveUI/mobile/NavbarAdmin.mobile';
import Zoom from '../../../lib/Zoom';
import ModalBulkImportPhoneCatalog from '../../../components/adminPage/modalAdmin/phone/PhoneCatalogModal/BulkImportPhoneCatalog.modal';
import PhoneCatalogItemFullUpdateModal from '../../../components/adminPage/modalAdmin/phone/PhoneCatalogModal/PhoneCatalogItemFullUpdateModal';
import { openSearchProvider } from '../../../components/utils/searchProvider';
import { SiTiktok, SiX, SiInstagram } from 'react-icons/si';
import { LuFileJson } from 'react-icons/lu';
import { InlinePriceEditor } from '../../../components/adminPage/inline-edit/InlinePriceEditor';

const PhoneCatalogManager: React.FC = () => {
  const { loading, phoneCatalogs, updatePhoneCatalog, deletePhoneCatalog, getAllPhoneCatalogs, error } =
    useContext(PhoneCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPhoneCatalogId, setSelectedPhoneCatalogId] = useState<string | null>(null);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isFullUpdateOpen, setIsFullUpdateOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPhoneCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedPhoneCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleInlineUpdate = async (id: string, field: keyof IPhoneCatalog, value: any) => {
    const data = new FormData();
    data.append(String(field), String(value));

    try {
      await updatePhoneCatalog(id, data);
      Toastify('Cập nhật thành công', 200);
      getAllPhoneCatalogs();
    } catch {
      Toastify('Lỗi cập nhật', 500);
    }
  };

  const handleDeletePhoneCatalog = async () => {
    if (selectedPhoneCatalogId) {
      try {
        await deletePhoneCatalog(selectedPhoneCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục thành công', 201);
        getAllPhoneCatalogs();
      } catch {
        const errorMessPhoneCatalog = isIErrorResponse(error) ? error.data?.message : 'Xoá danh mục thất bại!';
        Toastify(`Lỗi: ${errorMessPhoneCatalog}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdminMobile Title_NavbarAdmin="Danh Mục Điện Thoại" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Danh Mục Điện Thoại"
          Btn_Create={
            <div className="flex flex-row items-start justify-center gap-2 md:items-end">
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
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Danh Mục Điện Thoại(${phoneCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Ảnh Đại Diện</span>
            <span>Tên Danh mục - (SL sản phẩm)</span>
            <span>Giá</span>
            <span>Ngày Cập Nhật</span>
            <span>Trạng Thái</span>
            <span>Full Update</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {phoneCatalogs && phoneCatalogs.length > 0 ? (
              phoneCatalogs.map((phoneCatalog: IPhoneCatalog, index: number) => (
                <Table.Row
                  onClick={() => setActiveRowId(phoneCatalog._id ?? '')}
                  key={phoneCatalog._id}
                  className={`group text-black dark:text-white ${activeRowId === phoneCatalog._id ? 'border-y-2 border-l-8 border-green-500 bg-orange-200 font-bold dark:bg-green-950' : 'bg-primary/10 transition-all dark:bg-gray-900'} `}
                >
                  <span>#{index + 1}</span>
                  {/*  */}
                  <span className="flex items-center justify-center">
                    <Zoom>
                      <img loading="lazy" src={phoneCatalog?.img} alt="Hình ảnh" className="h-12 w-12 object-cover" />
                    </Zoom>
                  </span>
                  {/*  */}
                  <span className="flex flex-col items-center gap-2">
                    <span className="flex flex-row items-center gap-1 whitespace-nowrap">
                      <span className="px-1 group-hover:bg-primary group-hover:text-white">{phoneCatalog?.name}</span>
                      {phoneCatalog?.phoneCount !== 0 ? (
                        <b className="text-green-500">({phoneCatalog?.phoneCount})</b>
                      ) : (
                        <em className="text-red-500">Không có sản phẩm</em>
                      )}
                      <button
                        onClick={() => {
                          openModalEditAdmin(phoneCatalog._id ?? '');
                        }}
                        className="w-full max-w-[140px] text-sm font-light"
                      >
                        <FaPenToSquare className="text-green-500" />
                      </button>
                    </span>

                    <span className="flex items-center gap-4 text-sm opacity-0 group-hover:opacity-100">
                      <FaGoogle
                        className="cursor-pointer transition hover:text-red-500"
                        onClick={() => {
                          openSearchProvider('google', phoneCatalog?.name ?? '');
                        }}
                      />

                      <FaYoutube
                        className="cursor-pointer transition hover:text-red-600"
                        onClick={() => {
                          openSearchProvider('youtube', phoneCatalog?.name ?? '');
                        }}
                      />

                      <FaFacebook
                        className="cursor-pointer transition hover:text-blue-600"
                        onClick={() => {
                          openSearchProvider('facebook', phoneCatalog?.name ?? '');
                        }}
                      />

                      <SiTiktok
                        className="cursor-pointer transition"
                        onClick={() => {
                          openSearchProvider('tiktok', phoneCatalog?.name ?? '');
                        }}
                      />

                      <SiX
                        className="cursor-pointer transition"
                        onClick={() => {
                          openSearchProvider('x', phoneCatalog?.name ?? '');
                        }}
                      />

                      <SiInstagram
                        className="cursor-pointer transition hover:text-pink-500"
                        onClick={() => {
                          openSearchProvider('instagram', phoneCatalog?.name ?? '');
                        }}
                      />

                      <FaReddit
                        className="cursor-pointer transition hover:text-orange-500"
                        onClick={() => {
                          openSearchProvider('reddit', phoneCatalog?.name ?? '');
                        }}
                      />
                    </span>
                  </span>
                  {/*  */}
                  <InlinePriceEditor<IPhoneCatalog>
                    prodId={phoneCatalog._id}
                    field="price"
                    value={phoneCatalog.price}
                    type="number"
                    formatter={v => `${(Number(v) * 1000).toLocaleString('vi-VN')}đ`}
                    onSubmit={handleInlineUpdate}
                  />
                  {/*  */}
                  <span>
                    {/* {new Date(phoneCatalog?.createdAt).toLocaleString(
                        'vi-VN'
                      )} */}
                    <TimeAgo date={phoneCatalog?.updatedAt} />
                  </span>
                  {/*  */}
                  <span>
                    {phoneCatalog?.status === 0 ? (
                      <p className="rounded-md bg-green-500 p-1 text-white">New</p>
                    ) : phoneCatalog?.status === 1 ? (
                      <p className="rounded-md bg-yellow-700 p-1 text-white">Đã sử dụng</p>
                    ) : (
                      phoneCatalog?.status
                    )}
                  </span>
                  {/*  */}
                  <span>
                    <Button
                      onClick={() => {
                        setSelectedPhoneCatalogId(phoneCatalog._id ?? '');
                        setIsFullUpdateOpen(true);
                      }}
                      className="border-none p-0"
                    >
                      <LuFileJson size={24} className="text-primary dark:text-green-400" />
                    </Button>
                  </span>
                  {/* Hành động */}
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                          color="success"
                          onClick={() => {
                            openModalEditAdmin(phoneCatalog._id ?? '');
                          }}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        {/*  */}
                        <Button
                          onClick={() => openModalDeleteAdmin(phoneCatalog._id ?? '')}
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
                <td colSpan={6}>Không có danh mục điện thoại nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <PhoneCatalogItemFullUpdateModal
        isOpen={isFullUpdateOpen}
        onClose={() => setIsFullUpdateOpen(false)}
        onSuccess={getAllPhoneCatalogs}
        phoneCatalogId={selectedPhoneCatalogId ?? ''}
      />
      <ModalBulkImportPhoneCatalog
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onSuccess={() => getAllPhoneCatalogs()}
      />
      <ModalCreatePhoneCatalogPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeletePhoneCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhoneCatalog}
      />
      <ModalEditPhoneCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        phoneCatalogId={selectedPhoneCatalogId ?? ''}
      />
    </div>
  );
};

export default PhoneCatalogManager;
