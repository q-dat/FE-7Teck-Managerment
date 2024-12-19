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
import { PhoneContext } from '../../context/phone/PhoneContext';
import ModalCreatePhonePageAdmin from '../../components/admin/Modal/ModalPhone/ModalCreatePhonePageAdmin';
import ModalDeletePhonePageAdmin from '../../components/admin/Modal/ModalPhone/ModalDeletePhonePageAdmin';
import ModalEditPhonePageAdmin from '../../components/admin/Modal/ModalPhone/ModalEditPhonePageAdmin';
import { IPhone } from '../../types/type/phone/phone';

const PhoneManager: React.FC = () => {
  const { loading, phones, deletePhone, getAllPhones, error } =
    useContext(PhoneContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);

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

  useEffect(() => {
    getAllPhones();
  }, [getAllPhones]);

  const handleDeletePhone = async () => {
    if (selectedPhoneId) {
      try {
        await deletePhone(selectedPhoneId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllPhones();
      } catch {
        const errorMessPhone = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessPhone}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Điện Thoại" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Điện Thoại"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="success"
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
        Title_TableListAdmin={`Danh Sách Điện Thoại (${phones.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Sản Phẩm</span>
            <span>Danh Mục</span>
            <span>Hình Ảnh</span>
            <span>Ảnh Phụ</span>
            <span>Giá</span>
            <span>Số Lượng</span>
            <span>Trạng Thái</span>
            <span>Mô Tả</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {phones.map((phone: IPhone, index: number) => (
              <Table.Row key={index}>
                <span>#{index + 1}</span>
                <span>{phone.name}</span>
                <span>{phone.phone_catalog_id}</span>
                <span className="flex items-center justify-center">
                  <img
                    src={phone.img}
                    alt="Phone Image"
                    className="h-12 w-12 object-cover"
                  />
                </span>
                <span className="flex items-center justify-center">
                  {phone.thumbnail && (
                    <img
                      src={phone.thumbnail}
                      alt="Thumbnail"
                      className="h-12 w-12 object-cover"
                    />
                  )}
                </span>
                <span>{(phone.price * 1000).toLocaleString('vi-VN')} VND</span>
                <span>{phone.status}</span>
                <span>{phone.des || 'Không có mô tả!'}</span>
             

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
                        onClick={() => openModalEditAdmin(phone._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(phone._id ?? '')}
                        className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                      >
                        <MdDelete />
                        Xoá
                      </Button>
                    </div>
                  </details>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        }
      />
      <ModalCreatePhonePageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeletePhonePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhone}
      />
      <ModalEditPhonePageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        PhoneId={selectedPhoneId ?? ''}
      />
    </div>
  );
};

export default PhoneManager;
