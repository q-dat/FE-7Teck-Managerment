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
import NavbarAdmin from '../../components/admin/Reponsive/Mobile/NavbarAdmin';
import { TabletCatalogContext } from '../../context/tablet-catalog/TabletCatalogContext';
import { ITabletCatalog } from '../../types/type/tablet-catalog/tablet-catalog';
import ModalCreateTabletCatalogPageAdmin from '../../components/admin/Modal/ModalTabletCatalog/ModalCreateTabletCatalogPageAdmin';
import ModalDeleteTabletCatalogPageAdmin from '../../components/admin/Modal/ModalTabletCatalog/ModalDeleteTabletCatalogPageAdmin';
import ModalEditTabletCatalogPageAdmin from '../../components/admin/Modal/ModalTabletCatalog/ModalEditTabletCatalogPageAdmin';

const TabletCatalogManager: React.FC = () => {
  const {
    loading,
    tabletCatalogs,
    deleteTabletCatalog,
    getAllTabletCatalogs,
    error
  } = useContext(TabletCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTabletCatalogId, setSelectedTabletCatalogId] = useState<
    string | null
  >(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedTabletCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedTabletCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteTabletCatalog = async () => {
    if (selectedTabletCatalogId) {
      try {
        await deleteTabletCatalog(selectedTabletCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục thành công', 201);
        getAllTabletCatalogs();
      } catch {
        const errorMessTabletCatalog = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá danh mục thất bại!';
        Toastify(`Lỗi: ${errorMessTabletCatalog}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Danh Mục Máy Tính Bảng" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Danh Mục Máy Tính Bảng"
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
        Title_TableListAdmin={`Danh Sách Danh Mục Máy Tính Bảng(${tabletCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Ảnh Đại Diện</span>
            <span>Tên</span>
            <span>Giá</span>
            <span>Ngày Tạo</span>
            <span>Trạng Thái</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {tabletCatalogs && tabletCatalogs.length > 0 ? (
              tabletCatalogs.map(
                (tabletCatalog: ITabletCatalog, index: number) => (
                  <Table.Row key={index}>
                    <span>#{index + 1}</span>
                    <span className="flex items-center justify-center">
                      <img
                        loading="lazy"
                        src={tabletCatalog?.t_cat_img}
                        alt="Hình ảnh"
                        className="h-12 w-12 object-cover"
                      />
                    </span>
                    <span>{tabletCatalog?.t_cat_name}</span>
                    <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                      {(tabletCatalog?.t_cat_price * 1000).toLocaleString(
                        'vi-VN'
                      )}
                      ₫
                    </span>
                    <span>
                      {/* {new Date(tabletCatalog?.createdAt).toLocaleString(
                        'vi-VN'
                      )} */}
                      <TimeAgo date={tabletCatalog?.createdAt} />
                    </span>
                    <span>
                      {tabletCatalog?.t_cat_status === 0
                        ? '0 (Mới)'
                        : tabletCatalog?.t_cat_status === 1
                          ? '1 (Cũ)'
                          : tabletCatalog?.t_cat_status}
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
                              openModalEditAdmin(tabletCatalog._id ?? '')
                            }
                            className="w-full max-w-[140px] text-sm font-light text-white"
                          >
                            <FaPenToSquare />
                            Cập Nhật
                          </Button>
                          <Button
                            onClick={() =>
                              openModalDeleteAdmin(tabletCatalog._id ?? '')
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
                <td colSpan={6}>Không có danh mục Máy Tính Bảng nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreateTabletCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteTabletCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteTabletCatalog}
      />
      <ModalEditTabletCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        tabletCatalogId={selectedTabletCatalogId ?? ''}
      />
    </div>
  );
};

export default TabletCatalogManager;

