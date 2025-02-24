import React, { useState } from 'react';
import ModalCreatePriceListPageAdmin from '../../../components/admin/Modal/ModalPriceListPage/ModalCreatePriceListPageAdmin';
import NavtitleAdmin from '../../../components/admin/NavtitleAdmin';
import { Button } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import NavbarAdmin from '../../../components/admin/Reponsive/Mobile/NavbarAdmin';

const PriceListManagerPage: React.FC = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Bảng Giá" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Bảng Giá"
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
      <div></div>
      <ModalCreatePriceListPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
    </div>
  );
};

export default PriceListManagerPage;
