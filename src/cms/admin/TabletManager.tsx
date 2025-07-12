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
import NavbarAdmin from '../../components/admin/responsiveUI/mobile/NavbarAdmin';
import { TabletContext } from '../../context/tablet/TabletContext';
import { ITablet } from '../../types/type/tablet/tablet';
import ModalCreateTabletPageAdmin from '../../components/admin/modalAdmin/ModalTablet/ModalCreateTabletPageAdmin';
import ModalDeleteTabletPageAdmin from '../../components/admin/modalAdmin/ModalTablet/ModalDeleteTabletPageAdmin';
import ModalEditTabletPageAdmin from '../../components/admin/modalAdmin/ModalTablet/ModalEditTabletPageAdmin';
import Zoom from '../../lib/Zoom';
import TabletCatalogManager from './TabletCatalogManager';
import { FaList } from 'react-icons/fa';

const TabletManager: React.FC = () => {
  const { tablets, loading, error, getAllTablets, deleteTablet } = useContext(TabletContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTabletId, setSelectedTabletId] = useState<string | null>(null);
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
    setSelectedTabletId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedTabletId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteTablet = async () => {
    if (selectedTabletId) {
      try {
        await deleteTablet(selectedTabletId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllTablets();
      } catch (error) {
        const errorMessage = isIErrorResponse(error) ? error.data?.message : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Máy Tính Bảng" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Máy Tính Bảng"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <div className="flex flex-row items-end justify-center gap-2">
                {/* All */}
                <Button
                  size="sm"
                  color="primary"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => getAllTablets()}
                >
                  Tất cả
                </Button>

                {/* New */}
                <Button
                  size="sm"
                  color="info"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => getAllTablets({ tablet_status: 0 })}
                >
                  Mới
                </Button>

                {/* Used */}
                <Button
                  size="sm"
                  color="warning"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => getAllTablets({ tablet_status: 1 })}
                >
                  Cũ
                </Button>
                {/* Catalog */}
                <Button color="secondary" onClick={handleCatalogModal} className="w-auto text-sm font-light text-white">
                  <FaList className="text-xl" color="white" />
                  Danh mục
                </Button>
              </div>
              {/* Modal */}
              {selectedCatalog && (
                <div
                  className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/50"
                  onClick={handleCatalogModal} // Click nền để đóng
                >
                  <div
                    className="relative h-[90%] w-3/4 cursor-default overflow-y-auto rounded-md border-4 border-white bg-[#F3F2F7] p-2 scrollbar-hide dark:bg-gray-900"
                    onClick={e => e.stopPropagation()} // Ngăn chặn click xuyên modal
                  >
                    <TabletCatalogManager />
                  </div>
                </div>
              )}
              {/* Add Product */}
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
        Title_TableListAdmin={`Danh Sách Máy Tính Bảng(${tablets.length})`}
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
            {tablets && tablets.length > 0 ? (
              tablets.map((tablet: ITablet, index: number) => (
                <Table.Row key={index}>
                  <span>#{index + 1}</span>
                  <span className="flex items-center justify-center">
                    <Zoom>
                      <img loading="lazy" src={tablet?.tablet_img} alt="Hình ảnh" className="h-12 w-12 object-cover" />
                    </Zoom>
                  </span>
                  <span className="flex flex-wrap items-center justify-center gap-2">
                    {tablet?.tablet_thumbnail && Array.isArray(tablet?.tablet_thumbnail) ? (
                      <>
                        {tablet.tablet_thumbnail.slice(0, 1).map((thumb, index) => (
                          <img
                            loading="lazy"
                            key={index}
                            src={thumb}
                            alt="Ảnh thu nhỏ"
                            className="h-12 w-12 object-cover"
                          />
                        ))}
                        <span className="text-xs text-red-500">(Ảnh thu nhỏ: {tablet?.tablet_thumbnail?.length})</span>
                      </>
                    ) : (
                      <span>Không có ảnh thu nhỏ</span>
                    )}
                  </span>
                  <span className="">
                    <b>{tablet?.tablet_name}</b>
                    &nbsp;
                    {tablet?.tablet_catalog_id?.t_cat_status === 0 ? (
                      <span className="bg-green-500 p-1 text-black">New</span>
                    ) : tablet?.tablet_catalog_id?.t_cat_status === 1 ? (
                      <span className="bg-red-500 p-1 text-white">Used</span>
                    ) : (
                      tablet?.tablet_catalog_id?.t_cat_status
                    )}
                    <span className="bg-black p-1 text-white dark:bg-white dark:text-black">{tablet?.tablet_color}</span>
                  </span>
                  <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                    {(tablet.tablet_price * 1000).toLocaleString('vi-VN')}đ
                  </span>
                  <>
                    {tablet?.tablet_sale === null || tablet?.tablet_sale === 0 || tablet?.tablet_sale === undefined ? (
                      <>Chưa có giá giảm!</>
                    ) : (
                      <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                        {(tablet?.tablet_sale * 1000).toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </>
                  {tablet?.tablet_status.toLocaleLowerCase() === 'new' ? (
                    <span className="line-clamp-3 rounded-md bg-green-500 text-black">
                      {tablet?.tablet_status || 'Không có tình trạng!'}
                    </span>
                  ) : (
                    <span className="line-clamp-3 rounded-md bg-red-500 text-white">
                      {tablet?.tablet_status || 'Không có tình trạng!'}
                    </span>
                  )}
                  <span className="line-clamp-3">{tablet?.tablet_des || 'Không có mô tả!'}</span>
                  <mark className="line-clamp-3">{tablet?.tablet_note || 'Không có ghi chú!'}</mark>
                  <span>
                    {/* {new Date(tablet?.createdAt).toLocaleString('vi-VN')} */}
                    <TimeAgo date={tablet?.createdAt} />
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
                          onClick={() => openModalEditAdmin(tablet?._id ?? '')}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(tablet?._id ?? '')}
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
                <td colSpan={10}>Không có sản phẩm máy tính bảng nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreateTabletPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />
      <ModalDeleteTabletPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteTablet}
      />
      <ModalEditTabletPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        tabletId={selectedTabletId ?? ''}
      />
    </div>
  );
};

export default TabletManager;
