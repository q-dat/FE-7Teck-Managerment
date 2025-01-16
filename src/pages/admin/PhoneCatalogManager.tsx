import React, { useState, useEffect, useContext } from 'react';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import ModalCreatePhoneCatalogPageAdmin from '../../components/admin/Modal/ModalPhoneCatalog/ModalCreatePhoneCatalogPageAdmin';
import ModalDeletePhoneCatalogPageAdmin from '../../components/admin/Modal/ModalPhoneCatalog/ModalDeletePhoneCatalogPageAdmin';
import ModalEditPhoneCatalogPageAdmin from '../../components/admin/Modal/ModalPhoneCatalog/ModalEditPhoneCatalogPageAdmin';
import { PhoneCatalogContext } from '../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

const PhoneCatalogManager: React.FC = () => {
  const {
    loading,
    phoneCatalogs,
    deletePhoneCatalog,
    getAllPhoneCatalogs,
    error
  } = useContext(PhoneCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPhoneCatalogId, setSelectedPhoneCatalogId] = useState<
    string | null
  >(null);

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

  useEffect(() => {
    getAllPhoneCatalogs();
  }, [getAllPhoneCatalogs]);

  const handleDeletePhoneCatalog = async () => {
    if (selectedPhoneCatalogId) {
      try {
        await deletePhoneCatalog(selectedPhoneCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục điện thoại thành công', 201);
        getAllPhoneCatalogs();
      } catch {
        const errorMessPhoneCatalog = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessPhoneCatalog}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Danh Mục Điện Thoại" />

      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Danh Mục Điện Thoại"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="primary"
                onClick={openModalCreateAdmin}
                className="w-[100px] text-sm font-light text-white"
              >
                <RiAddBoxLine className="text-xl" color="white" />
                Thêm
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
            <span>Tên</span>
            <span>Giá</span>
            <span>Ngày Tạo</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {phoneCatalogs && phoneCatalogs.length > 0 ? (
              phoneCatalogs.map(
                (phoneCatalog: IPhoneCatalog, index: number) => (
                  <Table.Row key={index}>
                    <span>#{index + 1}</span>
                    <span className="flex items-center justify-center">
                      <img
                        loading="lazy"
                        src={phoneCatalog?.img}
                        alt="Hình ảnh"
                        className="h-12 w-12 object-cover"
                      />
                    </span>
                    <span>{phoneCatalog?.name}</span>
                    <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                      {(phoneCatalog?.price * 1000).toLocaleString('vi-VN')}₫
                    </span>
                    <span>
                      {new Date(phoneCatalog?.createdAt).toLocaleString(
                        'vi-VN'
                      )}
                    </span>
                    {/* Hành động */}
                    <span>
                      <details>
                        <summary className="inline cursor-pointer text-base text-warning">
                          <div className="flex items-center justify-center px-[55px] py-2">
                            <FaCircleInfo />
                          </div>
                        </summary>
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Button
                            color="success"
                            onClick={() =>
                              openModalEditAdmin(phoneCatalog._id ?? '')
                            }
                            className="w-full max-w-[140px] text-sm font-light text-white"
                          >
                            <FaPenToSquare />
                            Cập Nhật
                          </Button>
                          <Button
                            onClick={() =>
                              openModalDeleteAdmin(phoneCatalog._id ?? '')
                            }
                            className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                          >
                            <MdDelete />
                            Xoá
                          </Button>
                        </div>
                      </details>
                    </span>
                  </Table.Row>
                )
              )
            ) : (
              <tr>
                <td colSpan={6}>Không có danh mục điện thoại nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreatePhoneCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeletePhoneCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhoneCatalog}
      />
      <ModalEditPhoneCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        PhoneCatalogId={selectedPhoneCatalogId ?? ''}
      />
    </div>
  );
};

export default PhoneCatalogManager;
