import React, { useContext, useState } from 'react';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../components/orther/loading';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine } from 'react-icons/ri';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import TimeAgo from '../../components/orther/timeAgo/TimeAgo';
import NavbarAdmin from '../../components/admin/Reponsive/Mobile/NavbarAdmin';
import { MacbookContext } from '../../context/macbook/MacbookContext';
import { IMacbook } from '../../types/type/macbook/macbook';
import ModalCreateMacbookPageAdmin from '../../components/admin/Modal/ModalMacbook/ModalCreateMacbook MacbookPageAdmin';
import ModalDeleteMacbookPageAdmin from '../../components/admin/Modal/ModalMacbook/ModalDeleteMacbook MacbookPageAdmin';
import ModalEditMacbookPageAdmin from '../../components/admin/Modal/ModalMacbook/ModalEditMacbook MacbookPageAdmin';

const MacbookManager: React.FC = () => {
  const { macbook, loading, error, getAllMacbook, deleteMacbook } =
    useContext(MacbookContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedMacbookId, setSelectedMacbookId] = useState<string | null>(
    null
  );

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedMacbookId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedMacbookId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteMacbook = async () => {
    if (selectedMacbookId) {
      try {
        await deleteMacbook(selectedMacbookId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllMacbook();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Laptop Macbook" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Laptop Macbook"
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
        Title_TableListAdmin={`Danh Sách Laptop Macbook(${macbook.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Hình Ảnh</span>
            <span>Ảnh Thu Nhỏ</span>
            <span>Tên Sản Phẩm</span>
            <span>Giá</span>
            <span>Giá Giảm</span>
            <span>Tình Trạng</span>
            <span>Mô Tả</span>
            <span>Ghi Chú</span>
            <span>Ngày Tạo</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {macbook && macbook.length > 0 ? (
              macbook.map((win: IMacbook, index: number) => (
                <Table.Row key={index}>
                  <span>#{index + 1}</span>
                  <span className="flex items-center justify-center">
                    <img
                      loading="lazy"
                      src={win?.macbook_img}
                      alt="Hình ảnh"
                      className="h-12 w-12 object-cover"
                    />
                  </span>
                  <span className="flex flex-wrap items-center justify-center gap-2">
                    {win?.macbook_thumbnail &&
                    Array.isArray(win?.macbook_thumbnail) ? (
                      <>
                        {win.macbook_thumbnail
                          .slice(0, 1)
                          .map((thumb, index) => (
                            <img
                              loading="lazy"
                              key={index}
                              src={thumb}
                              alt="Ảnh thu nhỏ"
                              className="h-12 w-12 object-cover"
                            />
                          ))}
                        <span className="text-xs text-red-500">
                          (Ảnh thu nhỏ: {win?.macbook_thumbnail?.length})
                        </span>
                      </>
                    ) : (
                      <span>Không có ảnh thu nhỏ</span>
                    )}
                  </span>
                  <span className="">
                    {win?.macbook_name}
                    <hr />
                    <b>
                      {win?.macbook_catalog_id?.m_cat_status === 0
                        ? 'New'
                        : win?.macbook_catalog_id?.m_cat_status === 1
                          ? 'Đã sử dụng'
                          : win?.macbook_catalog_id?.m_cat_status}
                    </b>
                  </span>
                  <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                    {(win.macbook_price * 1000).toLocaleString('vi-VN')}đ
                  </span>
                  <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                    {(win?.macbook_sale * 1000).toLocaleString('vi-VN')}₫
                  </span>
                  <span className="line-clamp-3">
                    {win?.macbook_status || 'Không có tình trạng!'}
                  </span>
                  <span className="line-clamp-3">
                    {win?.macbook_des || 'Không có mô tả!'}
                  </span>
                  <mark className="line-clamp-3">
                    {win?.macbook_note || 'Không có ghi chú!'}
                  </mark>
                  <span>
                    {/* {new Date(win?.createdAt).toLocaleString('vi-VN')} */}
                    <TimeAgo date={win?.createdAt} />
                  </span>
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
                          onClick={() => openModalEditAdmin(win?._id ?? '')}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(win?._id ?? '')}
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
                <td colSpan={10}>Không có sản phẩm Laptop Macbook nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreateMacbookPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteMacbookPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteMacbook}
      />
      <ModalEditMacbookPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        macbookId={selectedMacbookId ?? ''}
      />
    </div>
  );
};

export default MacbookManager;
