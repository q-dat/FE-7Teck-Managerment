import React, { useContext, useState } from 'react';
import NavbarGallery from '../../../components/admin/Reponsive/Mobile/NavbarGallery';
import { GalleryContext } from '../../../context/gallery/GalleryContext';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';
import { Toastify } from '../../../helper/Toastify';
import { isIErrorResponse } from '../../../types/error/error';
import ModalCreateGalleryPageAdmin from '../../../components/admin/Modal/ModalGallery/ModalCreateGalleryPageAdmin';
import ModalDeleteGalleryPageAdmin from '../../../components/admin/Modal/ModalGallery/ModalDeleteGalleryPageAdmin';
import ModalEditGalleryPageAdmin from '../../../components/admin/Modal/ModalGallery/ModalEditGalleryPageAdmin';
import { IGallery } from '../../../types/type/gallery/gallery';
import { Button } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import NavtitleAdmin from '../../../components/admin/NavtitleAdmin';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

const GalleryManagerPage: React.FC = () => {
  const { gallerys, loading, error, getAllGallerys, deleteGallery } =
    useContext(GalleryContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedGalleryId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedGalleryId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteGallery = async () => {
    if (selectedGalleryId) {
      try {
        await deleteGallery(selectedGalleryId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá hình ảnh thành công', 201);
        getAllGallerys();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá hình ảnh thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;
  return (
    <div className="w-full">
      <NavbarGallery Title_NavbarGallery="Gallery" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Hình Ảnh"
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
      <div>
        {gallerys.map((gallery: IGallery, index: number) => (
          <div key={index} className="flex gap-2">
            <div>{gallery?.name}</div>
            <div>{gallery?.des}</div>
            <img
              className="h-full w-[100px]"
              src={`${gallery?.gallery}`}
              alt={`${gallery?.gallery}`}
            />
            <details>
                    <summary className="inline cursor-pointer text-base text-warning">
                      <div className="flex items-center justify-center px-[55px] py-2">
                        <FaCircleInfo />
                      </div>
                    </summary>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Button
                        color="success"
                        onClick={() => openModalEditAdmin(gallery?._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(gallery?._id ?? '')}
                        className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                      >
                        <MdDelete />
                        Xoá
                      </Button>
                    </div>
                  </details>
          </div>
        ))}
      </div>
      {/*  */}
      <ModalCreateGalleryPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteGalleryPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteGallery}
      />
      <ModalEditGalleryPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        galleryId={selectedGalleryId ?? ''}
      />
    </div>
  );
};

export default GalleryManagerPage;

