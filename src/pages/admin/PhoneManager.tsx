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
        className="xl:w-[1120px] 2xl:w-full"
        Title_TableListAdmin={`Danh Sách Điện Thoại (${phones.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white xl:w-[1130px]">
            <span>STT</span>
            <span>Tên Sản Phẩm</span>
            <span>Danh Mục</span>
            <span>Hình Ảnh</span>
            <span>Ảnh Phụ</span>
            <span>Giá</span>
            <span>Trạng Thái</span>
            <span>Mô Tả</span>
            <span>Ngày tạo</span>
            <span>Cấu hình và bộ nhớ</span>
            <span>Camera và màn hình</span>
            <span>Pin và sạc</span>
            <span>Tiện ích</span>
            <span>Kết nối</span>
            <span>Thiết kế và chất liệu</span>
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
                  {new Date(phone?.createdAt).toLocaleString('vi-VN')}
                </span>
                {/* Cấu hình và bộ nhớ */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Hệ điều hành:</span>
                        {phone.configuration_and_memory?.operating_system}
                      </p>
                      <p>
                        <span>Chip xử lý CPU:</span>
                        {phone.configuration_and_memory?.cpu_chip}
                      </p>
                      <p>
                        <span>Tốc độ CPU</span>
                        {phone.configuration_and_memory?.cpu_speed}
                      </p>
                      <p>
                        <span>Chip đồ hoạ(GPU)</span>
                        {phone.configuration_and_memory?.gpu}
                      </p>
                      <p>
                        <span>RAM</span>
                        {phone.configuration_and_memory?.ram}
                      </p>
                      <p>
                        <span>Dung lượng lưu trữ</span>
                        {phone.configuration_and_memory?.storage_capacity}
                      </p>
                      <p>
                        <span>Dung lượng còn lại</span>
                        {phone.configuration_and_memory?.remaining_capacity}
                      </p>
                      <p>
                        <span>Thẻ nhớ</span>
                        {phone.configuration_and_memory?.memory_card}
                      </p>
                      <p>
                        <span>Danh bạ</span>
                        {phone.configuration_and_memory?.contacts}
                      </p>
                    </div>
                  </details>
                </span>
                {/* Camera và màn hình */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Độ phân giải cammera sau:</span>
                        {phone.camera_and_screen?.rear_camera_resolution}
                      </p>
                      <p>
                        <span>Quay phim camera sau:</span>
                        {phone.camera_and_screen?.rear_camera_video}
                      </p>
                      <p>
                        <span> Đèn Flash camera sau:</span>
                        {phone.camera_and_screen?.rear_camera_flash}
                      </p>
                      <p>
                        <span>Tính năng camera sau:</span>
                        {phone.camera_and_screen?.rear_camera_features}
                      </p>
                      <p>
                        <span> Độ phân giải camera trước:</span>
                        {phone.camera_and_screen?.front_camera_resolution}
                      </p>
                      <p>
                        <span> Tính năng camera trước:</span>
                        {phone.camera_and_screen?.front_camera_features}
                      </p>
                      <p>
                        <span> Công nghệ màn hình:</span>
                        {phone.camera_and_screen?.screen_technology}
                      </p>
                      <p>
                        <span>Độ phân giải màn hình:</span>
                        {phone.camera_and_screen?.screen_resolution}
                      </p>
                      <p>
                        <span>Màn hình rộng:</span>
                        {phone.camera_and_screen?.screen_size}
                      </p>
                      <p>
                        <span>Độ sáng tối đa:</span>
                        {phone.camera_and_screen?.max_brightness}
                      </p>
                      <p>
                        <span>Mặt kính cảm ứng:</span>
                        {phone.camera_and_screen?.touchscreen_glass}
                      </p>
                    </div>
                  </details>
                </span>
                {/* Pin và sạc */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Dung lượng pin:</span>
                        {phone.battery_and_charging?.battery_capacity}
                      </p>
                      <p>
                        <span>Loại pin:</span>
                        {phone.battery_and_charging?.battery_type}
                      </p>
                      <p>
                        <span>Hỗ trợ sạc tối đa:</span>
                        {phone.battery_and_charging?.max_charging_support}
                      </p>
                      <p>
                        <span>Công nghệ pin:</span>
                        {phone.battery_and_charging?.battery_technology}
                      </p>
                    </div>
                  </details>
                </span>
                {/* Tiện ích */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Bảo mật nâng cao:</span>
                        {phone.features?.advanced_security}
                      </p>
                      <p>
                        <span>Tính năng đặc biệt:</span>
                        {phone.features?.special_features}
                      </p>
                      <p>
                        <span>Kháng nước bụi:</span>
                        {phone.features?.water_dust_resistant}
                      </p>
                      <p>
                        <span>Ghi âm:</span>
                        {phone.features?.voice_recording}
                      </p>
                      <p>
                        <span>Radio:</span>
                        {phone.features?.radio}
                      </p>
                      <p>
                        <span>Xem phim:</span>
                        {phone.features?.video_playback}
                      </p>
                      <p>
                        <span>Nghe nhạc:</span>
                        {phone.features?.music_playback}
                      </p>
                    </div>
                  </details>
                </span>
                {/* Kết nối */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Mạng di động:</span>
                        {phone.connectivity?.mobile_network}
                      </p>
                      <p>
                        <span>Sim:</span>
                        {phone.connectivity?.sim}
                      </p>
                      <p>
                        <span>Wi-Fi:</span>
                        {phone.connectivity?.wifi}
                      </p>
                      <p>
                        <span>GPS:</span>
                        {phone.connectivity?.gps}
                      </p>
                      <p>
                        <span>Bluetooth</span>
                        {phone.connectivity?.bluetooth}
                      </p>
                      <p>
                        <span>Cổng kết nối/Sạc:</span>
                        {phone.connectivity?.charging_connection_port}
                      </p>
                      <p>
                        <span>Jack tai nghe:</span>
                        {phone.connectivity?.headphone_jack}
                      </p>
                      <p>
                        <span>Kết nối khác:</span>
                        {phone.connectivity?.other_connectivity}
                      </p>
                    </div>
                  </details>
                </span>
                {/* Thiết kế và chất liệu */}
                <span>
                  <details>
                    <summary>Chi tiết</summary>
                    <div>
                      <p>
                        <span>Thiết kế:</span>
                        {phone.design_and_material?.design}
                      </p>
                      <p>
                        <span>Chất liệu:</span>
                        {phone.design_and_material?.material}
                      </p>
                      <p>
                        <span>Kích thước khối lượng:</span>
                        {phone.design_and_material?.dimensions_and_weight}
                      </p>
                      <p>
                        <span>Thời điểm ra mắt:</span>
                        {phone.design_and_material?.release_date}
                      </p>
                      <p>
                        <span>Hãng:</span>
                        {phone.design_and_material?.brand}
                      </p>
                    </div>
                  </details>
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
