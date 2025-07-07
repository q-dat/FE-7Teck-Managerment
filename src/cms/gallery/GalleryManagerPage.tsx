import React, { useContext, useState } from 'react';
import NavbarGallery from '../../components/admin/responsiveUI/mobile/NavbarGallery';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../components/orther/loading';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';
import ModalCreateGalleryPageAdmin from '../../components/admin/modalAdmin/ModalGallery/ModalCreateGalleryPageAdmin';
import ModalDeleteGalleryPageAdmin from '../../components/admin/modalAdmin/ModalGallery/ModalDeleteGalleryPageAdmin';
import ModalEditGalleryPageAdmin from '../../components/admin/modalAdmin/ModalGallery/ModalEditGalleryPageAdmin';
import { IGallery } from '../../types/type/gallery/gallery';
import { Button } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import TimeAgo from '../../components/orther/timeAgo/TimeAgo';

const GalleryManagerPage: React.FC = () => {
  const { galleries, loading, error, getAllGallerys, deleteGallery } =
    useContext(GalleryContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(
    null
  );

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
    <div className="w-full pb-10 xl:pb-0">
      <NavbarGallery Title_NavbarGallery="Gallery" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin={`Quản Lý Danh Sách Hình Ảnh (${galleries?.length})`}
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
      <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] px-2 md:grid-cols-4 xl:grid-cols-6 xl:px-0">
        {galleries.map((gallery: IGallery, index: number) => (
          <div
            key={index}
            className="relative rounded-sm bg-white p-2 shadow-headerMenu"
          >
            {/*  */}
            <div className="relative h-[280px] overflow-hidden">
              <img
                className="object-covercover absolute z-0 h-[200px] w-full rounded-sm py-1 blur-sm filter"
                src={`${gallery?.gallery}`}
                alt={`${gallery?.gallery}`}
              />
              <Zoom>
                <img
                  className="absolute z-10 h-[200px] w-full rounded-sm object-contain py-1"
                  src={`${gallery?.gallery}`}
                  alt={`${gallery?.gallery}`}
                />
              </Zoom>
              <p className="absolute bottom-1 left-2 text-xs text-primary">
                <p className="line-clamp-1 text-xs font-light">
                  {gallery?.des}
                </p>
                <p className="line-clamp-2 text-sm font-semibold">
                  {gallery?.name}
                </p>
                <hr />
                <span className="font-light">
                  {new Date(gallery?.updatedAt).toLocaleDateString('vi-VN')}
                </span>
                &nbsp;
                <b>
                  <TimeAgo date={gallery?.updatedAt} />
                </b>
              </p>
            </div>
            {/*  */}
            <div
              onClick={() => openModalEditAdmin(gallery?._id ?? '')}
              className="absolute left-1 top-1 z-20 flex cursor-pointer flex-row items-center justify-center gap-1 rounded-sm bg-white p-1 text-black"
            >
              <FaPenToSquare />
            </div>
            <div
              onClick={() => openModalDeleteAdmin(gallery?._id ?? '')}
              className="absolute right-1 top-1 z-20 flex cursor-pointer flex-row items-center justify-center gap-1 rounded-sm bg-white p-1 text-red-500"
            >
              <MdDelete />
            </div>
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
