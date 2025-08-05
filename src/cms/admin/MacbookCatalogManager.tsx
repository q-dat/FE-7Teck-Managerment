import React, { useState, useContext } from 'react';
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
import TimeAgo from '../../components/orther/timeAgo/TimeAgo';
import NavbarAdmin from '../../components/admin/responsiveUI/mobile/NavbarAdminMobile';
import { MacbookCatalogContext } from '../../context/macbook-catalog/MacbookCatalogContext';
import { IMacbookCatalog } from '../../types/type/macbook-catalog/macbook-catalog';
import ModalCreateMacbookCatalogPageAdmin from '../../components/admin/modalAdmin/ModalMacbookCatalog/ModalCreateMacbookCatalogPageAdmin';
import ModalDeleteMacbookCatalogPageAdmin from '../../components/admin/modalAdmin/ModalMacbookCatalog/ModalDeleteMacbookCatalogPageAdmin';
import ModalEditMacbookCatalogPageAdmin from '../../components/admin/modalAdmin/ModalMacbookCatalog/ModalEditMacbookCatalogPageAdmin';
import Zoom from '../../lib/Zoom';

const MacbookCatalogManager: React.FC = () => {
  const { loading, macbookCatalogs, deleteMacbookCatalog, getAllMacbookCatalogs, error } =
    useContext(MacbookCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedMacbookCatalogId, setSelectedMacbookCatalogId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedMacbookCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedMacbookCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteMacbookCatalog = async () => {
    if (selectedMacbookCatalogId) {
      try {
        await deleteMacbookCatalog(selectedMacbookCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục thành công', 201);
        getAllMacbookCatalogs();
      } catch {
        const errorMessMacbookCatalog = isIErrorResponse(error) ? error.data?.message : 'Xoá danh mục thất bại!';
        Toastify(`Lỗi: ${errorMessMacbookCatalog}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Danh Mục Laptop Macbook" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Danh Mục Laptop Macbook"
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
        Title_TableListAdmin={`Danh Sách Danh Mục Laptop Macbook(${macbookCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Ảnh Đại Diện</span>
            <span>Tên</span>
            <span>Giá</span>
            <span>Ngày Cập Nhật</span>
            <span>Trạng Thái</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {macbookCatalogs && macbookCatalogs.length > 0 ? (
              macbookCatalogs.map((macCatalog: IMacbookCatalog, index: number) => (
                <Table.Row key={index}>
                  <span>#{index + 1}</span>
                  <span className="flex items-center justify-center">
                    <Zoom>
                      <img
                        loading="lazy"
                        src={macCatalog?.m_cat_img}
                        alt="Hình ảnh"
                        className="h-12 w-12 object-cover"
                      />
                    </Zoom>
                  </span>
                  <span>{macCatalog?.m_cat_name}</span>
                  <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                    {(macCatalog?.m_cat_price * 1000).toLocaleString('vi-VN')}₫
                  </span>
                  <span>
                    {/* {new Date(macCatalog?.createdAt).toLocaleString(
                        'vi-VN'
                      )} */}
                    <TimeAgo date={macCatalog?.updatedAt} />
                  </span>
                  <span>
                    {macCatalog?.m_cat_status === 0 ? (
                      <p className="rounded-md bg-green-500 p-1 text-white">New</p>
                    ) : macCatalog?.m_cat_status === 1 ? (
                      <p className="rounded-md bg-yellow-700 p-1 text-white">Đã sử dụng</p>
                    ) : (
                      macCatalog?.m_cat_status
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
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                          color="success"
                          onClick={() => openModalEditAdmin(macCatalog._id ?? '')}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(macCatalog._id ?? '')}
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
                <td colSpan={6}>Không có danh mục Laptop Windows nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreateMacbookCatalogPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeleteMacbookCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteMacbookCatalog}
      />
      <ModalEditMacbookCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        macbookCatalogId={selectedMacbookCatalogId ?? ''}
      />
    </div>
  );
};

export default MacbookCatalogManager;
