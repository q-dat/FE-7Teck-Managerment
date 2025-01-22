import React, { useState, useContext } from 'react';
import { Toastify } from '../../../helper/Toastify';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../../components/admin/TablelistAdmin';
import { isIErrorResponse } from '../../../types/error/error';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';
import NavbarPost from '../../../components/admin/Reponsive/Mobile/NavbarPost';
import { PostCatalogContext } from '../../../context/post-catalog/PostCatalogContext';
import { IPostCatalog } from '../../../types/type/post-catalog/post-catalog';
import ModalCreatePostCatalogPageAdmin from '../../../components/admin/Modal/ModalPostCatalog/ModalCreatePostCatalogPageAdmin';
import ModalDeletePostCatalogPageAdmin from '../../../components/admin/Modal/ModalPostCatalog/ModalDeletePostCatalogPageAdmin';
import ModalEditPostCatalogPageAdmin from '../../../components/admin/Modal/ModalPostCatalog/ModalEditPostCatalogPageAdmin';

const PostCatalogManagerPage: React.FC = () => {
  const {
    loading,
    postCatalogs,
    deletePostCatalog,
    getAllPostCatalogs,
    error
  } = useContext(PostCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPostCatalogId, setSelectedPostCatalogId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPostCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedPostCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeletePostCatalog = async () => {
    if (selectedPostCatalogId) {
      try {
        await deletePostCatalog(selectedPostCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục bài viết thành công', 201);
        getAllPostCatalogs();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá danh mục bài viết thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarPost Title_NavbarPost="Danh Mục Bài Viết" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Danh Mục Bài Viết"
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
        Title_TableListAdmin={`Danh Sách Danh Mục Bài Viết (${postCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Danh Mục</span>
            <span>Ngày Tạo</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {postCatalogs.map((post: IPostCatalog, index: number) => (
              <Table.Row key={index}>
                <span>#{index + 1}</span>
                <span className="line-clamp-2">{post?.name}</span>
                <span>
                  {/* {new Date(post?.updatedAt).toLocaleDateString('vi-VN')} */}
                  <TimeAgo date={post?.updatedAt} />
                </span>

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
                        onClick={() => openModalEditAdmin(post?._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(post?._id ?? '')}
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
      <ModalCreatePostCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeletePostCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePostCatalog}
      />
      <ModalEditPostCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        postCatalogId={selectedPostCatalogId ?? ''}
      />
    </div>
  );
};

export default PostCatalogManagerPage;

