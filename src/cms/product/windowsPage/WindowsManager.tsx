import React, { useContext, useEffect, useState } from 'react';
import ErrorLoading from '../../../components/common/error/ErrorLoading';
import { LoadingLocal } from '../../../components/common/loading';
import { Toastify } from '../../../helper/Toastify';
import { isIErrorResponse } from '../../../types/error/error';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine } from 'react-icons/ri';
import NavtitleAdmin from '../../../components/adminPage/NavtitleAdmin';
import TableListAdmin from '../../../components/adminPage/TablelistAdmin';
import TimeAgo from '../../../components/common/timeAgo/TimeAgo';
import { WindowsContext } from '../../../context/windows/WindowsContext';
import { IWindows } from '../../../types/type/windows/windows';
import Zoom from '../../../lib/Zoom';
import WindowsCatalogManager from './WindowsCatalogManager';
import { FaCopy, FaFacebook, FaGoogle, FaList, FaReddit, FaYoutube } from 'react-icons/fa';
import NavbarAdminDesktop from '../../../components/adminPage/NavbarAdminDesktop ';
import NavbarAdminMobile from '../../../components/adminPage/responsiveUI/mobile/NavbarAdmin.mobile';
import { InlinePriceEditor } from '../../../components/adminPage/inline-edit/InlinePriceEditor';
import InlineNoteEditor from '../../../components/adminPage/inline-edit/InlineNoteEditor';
import InlineDescriptionEditor from '../../../components/adminPage/inline-edit/InlineDescriptionEditor';
import { useSearchParams } from 'react-router-dom';
import ModalCreateWindowsPageAdmin from '../../../components/adminPage/modalAdmin/windows/WindowsModal/CreateWindows.modal';
import ModalDeleteWindowsPageAdmin from '../../../components/adminPage/modalAdmin/windows/WindowsModal/DeleteWindows.modal';
import ModalEditWindowsPageAdmin from '../../../components/adminPage/modalAdmin/windows/WindowsModal/EditWindows.modal';
// import ModalBulkImportWindows from '../../../components/adminPage/modalAdmin/windows/WindowsModal/BulkImportWindows.modal';
import { openSearchProvider } from '../../../components/utils/searchProvider';
import { SiInstagram, SiTiktok, SiX } from 'react-icons/si';
import { handleShareFacebook } from '../../../components/adminPage/inline-edit/shareToFacebook';
import { downloadImage } from '../../../helper/downloadImage';
import { TbCameraDown } from 'react-icons/tb';
import { contact as numberPhone } from '../../../components/utils/socialLinks';
import { IWindowsCatalog } from '../../../types/type/windows-catalog/windows-catalog';

const WindowsManager: React.FC = () => {
  const { windows, loading, error, getAllWindows, updateWindows, deleteWindows } = useContext(WindowsContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [selectedWindowsId, setSelectedWindowsId] = useState<string | null>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('q') ?? undefined;
  const status = searchParams.get('w_cat_status');

  useEffect(() => {
    getAllWindows({
      name: keyword,
      w_cat_status: status ? Number(status) : undefined,
    });
  }, [keyword, status, getAllWindows]);

  const handleCatalogModal = () => {
    setSelectedCatalog((prev) => !prev);
  };

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);

  const openModalDeleteAdmin = (id: string) => {
    setSelectedWindowsId(id);
    setIsModalDeleteOpen(true);
  };

  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);

  const openModalEditAdmin = (id: string) => {
    setSelectedWindowsId(id);
    setIsModalEditOpen(true);
  };

  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const reloadWindows = () => {
    getAllWindows({
      name: keyword,
      w_cat_status: status ? Number(status) : undefined,
    });
  };

  const copyProductId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      Toastify('Đã copy ID sản phẩm', 200);
    } catch {
      Toastify('Không copy được ID', 500);
    }
  };

  const handleInlineUpdate = async (
    id: string,
    field: keyof IWindows,
    value: string | number | IWindowsCatalog | string[] | undefined,
  ) => {
    const data = new FormData();

    if (value === undefined) {
      data.append(String(field), '');
    } else if (Array.isArray(value)) {
      data.append(String(field), JSON.stringify(value));
    } else if (typeof value === 'object') {
      data.append(String(field), JSON.stringify(value));
    } else {
      data.append(String(field), String(value));
    }

    try {
      await updateWindows(id, data);
      Toastify('Cập nhật thành công', 200);
      reloadWindows();
    } catch {
      Toastify('Lỗi cập nhật', 500);
    }
  };
  const handleDeleteWindows = async () => {
    if (!selectedWindowsId) return;

    try {
      await deleteWindows(selectedWindowsId);
      closeModalDeleteAdmin();
      Toastify('Bạn đã xoá sản phẩm thành công', 201);
      reloadWindows();
    } catch (error) {
      const errorMessage = isIErrorResponse(error) ? error.data?.message : 'Xoá sản phẩm thất bại!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  const handleDownloadImagesById = async (win: IWindows) => {
    const images: string[] = [];

    if (win.windows_img) images.push(win.windows_img);

    if (Array.isArray(win.windows_thumbnail)) {
      images.push(...win.windows_thumbnail);
    }

    const uniqueImages = Array.from(new Set(images));

    if (uniqueImages.length === 0) {
      Toastify('Sản phẩm chưa có ảnh để tải', 400);
      return;
    }

    for (let i = 0; i < uniqueImages.length; i += 1) {
      const url = uniqueImages[i];
      const filename = `${win.windows_slug || win._id}-${i + 1}.jpg`;

      await downloadImage(url, filename);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    Toastify(`Đã tải ${uniqueImages.length} ảnh`, 200);
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdminDesktop />
      <NavbarAdminMobile Title_NavbarAdmin="Laptop Windows" />

      <div>
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Laptop Windows"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:items-end">
              <div className="flex flex-row items-end justify-center gap-2">
                <Button
                  size="sm"
                  color="primary"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => setSearchParams({})}
                >
                  Tất cả
                </Button>

                <Button
                  size="sm"
                  color="info"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => setSearchParams({ w_cat_status: '0' })}
                >
                  Mới
                </Button>

                <Button
                  size="sm"
                  color="warning"
                  className="w-[80px] text-sm font-light text-white"
                  onClick={() => setSearchParams({ w_cat_status: '1' })}
                >
                  Cũ
                </Button>
              </div>

              {selectedCatalog && (
                <div
                  className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/50"
                  onClick={handleCatalogModal}
                >
                  <div
                    className="relative h-[80%] w-full cursor-default overflow-y-auto rounded-md border-2 border-white bg-[#F3F2F7] dark:bg-gray-900 xl:h-[90%] xl:w-3/4 xl:border-4 xl:p-2"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <WindowsCatalogManager />
                  </div>
                </div>
              )}

              <div className="flex flex-row items-center gap-2">
                <Button color="secondary" onClick={handleCatalogModal} className="w-auto text-sm font-light text-white">
                  <FaList className="text-xl" color="white" />
                  Danh mục
                </Button>

                <Button color="primary" onClick={openModalCreateAdmin} className="w-[100px] text-sm font-light text-white">
                  <RiAddBoxLine className="text-xl" color="white" />
                  Thêm
                </Button>

                {/* <Button
                  color="primary"
                  onClick={() => setIsBulkImportOpen(true)}
                  className="flex w-auto flex-row text-sm font-light text-white"
                >
                  <RiUploadCloud2Line className="text-xl" />
                </Button> */}
              </div>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Laptop Windows(${windows.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Hình Ảnh</span>
            <span>Tên Sản Phẩm</span>
            <span>Giá</span>
            <span>Giá Giảm</span>
            <span>Tình Trạng Máy</span>
            <span>Mô Tả</span>
            <span>Ghi Chú</span>
            <span>Ngày Cập Nhật</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {windows && windows.length > 0 ? (
              windows.map((win: IWindows, index: number) => (
                <Table.Row
                  key={win._id}
                  onClick={() => setActiveRowId(win._id ?? '')}
                  className={`group text-black dark:text-white ${activeRowId === win._id
                    ? 'border-y-2 border-l-8 border-green-500 bg-orange-200 font-bold dark:bg-green-950'
                    : 'bg-primary/10 transition-all dark:bg-gray-900'
                    }`}
                >
                  <span>#{index + 1}</span>

                  <span className="flex flex-wrap items-center justify-center gap-2">
                    <Zoom>
                      <img loading="lazy" src={win.windows_img} alt="Hình ảnh" className="h-12 w-12 object-cover" />
                    </Zoom>

                    {win.windows_thumbnail && Array.isArray(win.windows_thumbnail) ? (
                      <span className="text-xs text-red-500">(Ảnh thu nhỏ: {win.windows_thumbnail.length})</span>
                    ) : (
                      <span>Không có ảnh thu nhỏ</span>
                    )}
                  </span>

                  <span className="flex flex-col items-center gap-2">
                    <span className="whitespace-nowrap pl-2 group-hover:bg-white group-hover:py-1 group-hover:text-black">
                      {win.windows_name}
                      &nbsp;
                      {win.windows_catalog_id?.w_cat_status === 0 ? (
                        <span className="bg-green-500 p-1 text-black">New</span>
                      ) : win.windows_catalog_id?.w_cat_status === 1 ? (
                        <span className="bg-red-500 p-1 text-white">Used</span>
                      ) : (
                        win.windows_catalog_id?.w_cat_status
                      )}
                      <span className="bg-black p-1 text-white dark:bg-white dark:text-black">{win.windows_color}</span>
                    </span>

                    <span className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                      <div
                        data-tip="Copy id sản phẩm"
                        className="tooltip tooltip-bottom tooltip-primary cursor-pointer hover:text-red-500"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          copyProductId(win._id);
                        }}
                      >
                        <FaCopy />
                      </div>

                      <FaGoogle
                        className="cursor-pointer transition hover:text-red-500"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('google', `${win.windows_name ?? ''} ${win.windows_color ?? ''}`.trim());
                        }}
                      />

                      <FaYoutube
                        className="cursor-pointer transition hover:text-red-600"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('youtube', win.windows_name ?? '');
                        }}
                      />

                      <FaFacebook
                        className="cursor-pointer transition hover:text-blue-600"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('facebook', win.windows_name ?? '');
                        }}
                      />

                      <SiTiktok
                        className="cursor-pointer transition"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('tiktok', win.windows_name ?? '');
                        }}
                      />

                      <SiX
                        className="cursor-pointer transition"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('x', win.windows_name ?? '');
                        }}
                      />

                      <SiInstagram
                        className="cursor-pointer transition hover:text-pink-500"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('instagram', win.windows_name ?? '');
                        }}
                      />

                      <FaReddit
                        className="cursor-pointer transition hover:text-orange-500"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          openSearchProvider('reddit', win.windows_name ?? '');
                        }}
                      />

                      <Button
                        data-tip="Facebook Share"
                        size="xs"
                        className="tooltip tooltip-bottom tooltip-primary rounded-md border-none bg-[#3b5998] hover:bg-[#3b5998] hover:bg-opacity-80"
                        onClick={async () => {
                          const domain = import.meta.env.VITE_APP_ORIGIN as string | undefined;
                          const productUrl = `${domain ?? ''}/windows/${win.windows_slug}`;

                          const result = await handleShareFacebook({
                            des: win.windows_des ?? win.windows_name,
                            url: productUrl,
                            contact: {
                              phone: `${numberPhone}`,
                              email: 'cskh.7teck@gmail.com',
                            },
                            hashtag: '#7teck #laptop #laptopWindows #laptopGiaTot #laptopChinhHang',
                          });

                          if (!result.success) {
                            Toastify('Không copy được nội dung', 500);
                            return;
                          }

                          Toastify('Đã copy nội dung. Dán vào Facebook (Ctrl + V)', 200);
                        }}
                      >
                        FB
                      </Button>

                      <Button
                        data-tip="Download Images"
                        size="xs"
                        color="secondary"
                        className="tooltip tooltip-bottom tooltip-primary rounded-md border-none text-white"
                        onClick={() => {
                          setActiveRowId(win._id ?? '');
                          handleDownloadImagesById(win);
                        }}
                      >
                        <TbCameraDown className="text-base" />
                      </Button>
                    </span>
                  </span>

                  <InlinePriceEditor<IWindows>
                    prodId={win._id}
                    field="windows_price"
                    value={win.windows_price}
                    type="number"
                    formatter={(value) => `${(Number(value) * 1000).toLocaleString('vi-VN')}đ`}
                    onSubmit={handleInlineUpdate}
                  />

                  <InlinePriceEditor<IWindows>
                    prodId={win._id}
                    field="windows_sale"
                    value={win.windows_sale ?? 0}
                    type="number"
                    formatter={(value) => `${(Number(value) * 1000).toLocaleString('vi-VN')}đ`}
                    onSubmit={handleInlineUpdate}
                  />
                  {win?.windows_status.toLocaleLowerCase() === 'new' ? (
                    <span className="line-clamp-3 rounded-md bg-green-500 text-black">
                      {win?.windows_status || 'Không có tình trạng!'}
                    </span>
                  ) : (
                    <span className="line-clamp-3 rounded-md bg-red-500 text-white">
                      {win?.windows_status || 'Không có tình trạng!'}
                    </span>
                  )}

                  <InlineDescriptionEditor
                    prodId={win._id}
                    value={win.windows_des ?? ''}
                    onSubmit={(id, value) => handleInlineUpdate(id, 'windows_des', value)}
                  />

                  <InlineNoteEditor
                    prodId={win._id}
                    value={win.windows_note ?? ''}
                    onSubmit={(id, value) => handleInlineUpdate(id, 'windows_note', value)}
                  />

                  <span>
                    <TimeAgo date={win.updatedAt} />
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
                          onClick={() => {
                            setActiveRowId(win._id ?? '');
                            openModalEditAdmin(win._id ?? '');
                          }}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>

                        <Button
                          onClick={() => {
                            setActiveRowId(win._id ?? '');
                            openModalDeleteAdmin(win._id ?? '');
                          }}
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
                <td colSpan={10}>Không có sản phẩm Laptop Windows nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />

      {/* <ModalBulkImportWindows isOpen={isBulkImportOpen} onClose={() => setIsBulkImportOpen(false)} onSuccess={reloadWindows} /> */}

      <ModalCreateWindowsPageAdmin isOpen={isModalCreateOpen} onClose={closeModalCreateAdmin} />

      <ModalDeleteWindowsPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteWindows}
      />

      <ModalEditWindowsPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        windowsId={selectedWindowsId ?? ''}
      />
    </div>
  );
};

export default WindowsManager;