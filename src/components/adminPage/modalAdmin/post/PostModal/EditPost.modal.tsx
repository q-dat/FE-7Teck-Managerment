import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../../InputModal';
import { Button, Select, Textarea } from 'react-daisyui';
import { Toastify } from '../../../../../helper/Toastify';
import { PostContext } from '../../../../../context/post/PostContext';
import { PostCatalogContext } from '../../../../../context/post-catalog/PostCatalogContext';
import LabelForm from '../../../LabelForm';
import QuillEditor from '../../../../../lib/ReactQuill';
import { PostFormValues } from '../../../../../types/type/post/post';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean'],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }]
  ]
};

interface ModalEditPostPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const ModalEditPostPageAdmin: React.FC<ModalEditPostPageAdminProps> = ({ isOpen, onClose, postId }) => {
  const { loading, posts, updatePost, getAllPosts } = useContext(PostContext);
  const { postCatalogs, getAllPostCatalogs } = useContext(PostCatalogContext);
  const isLoading = loading.update;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PostFormValues>();

  const [editorValue, setEditorValue] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      void getAllPostCatalogs();
    }
  }, [isOpen, getAllPostCatalogs]);

  useEffect(() => {
    const postData = posts.find(post => post._id === postId);

    if (postData) {
      setValue('title', postData.title);
      setValue('slug', postData.slug);
      setValue('catalogId', postData.catalogId);
      setValue('content', postData.content);
      setValue('source', postData.source || '');
      setEditorValue(postData.content);
      setCurrentImageUrl(postData.imageUrl);
    }
  }, [posts, postId, setValue]);

  const onSubmit: SubmitHandler<PostFormValues> = async formData => {
    if (!editorValue.trim()) {
      Toastify('Vui lòng nhập nội dung bài viết!', 400);
      return;
    }

    const data = new FormData();

    data.append('title', formData.title.trim());
    data.append('slug', formData.slug?.trim() || '');
    data.append('catalogId', String(formData.catalogId));
    data.append('content', editorValue);
    data.append('source', formData.source?.trim() || '');

    const imageFile = formData.imageUrl?.[0];

    if (imageFile) {
      data.append('imageUrl', imageFile);
    }

    try {
      await updatePost(postId, data);
      reset();
      setEditorValue('');
      await getAllPosts();
      Toastify('Bài viết đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      await getAllPosts();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={e => {
        const target = e.target as HTMLElement;

        if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
    >
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex max-h-[95vh] w-full flex-col overflow-y-auto rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:mx-[200px] xl:w-screen"
        >
          <p className="font-bold text-black dark:text-white">Chỉnh sửa bài viết</p>

          <div className="mt-5 flex flex-col items-start justify-center gap-5 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <LabelForm title="Tiêu đề bài viết" />
              <Textarea
                className="h-[100px] w-full border border-gray-50 bg-white text-black placeholder:text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white xl:h-[30vh]"
                {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
                placeholder="Tiêu đề bài viết"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}

              <LabelForm title="Slug bài viết" />
              <InputModal type="text" {...register('slug')} placeholder="Để trống server sẽ tự tạo từ tiêu đề" />

              <LabelForm title="Danh mục" />
              <Select
                className="mb-5 w-full border border-gray-50 bg-white text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white"
                {...register('catalogId', {
                  required: 'Vui lòng chọn danh mục',
                  valueAsNumber: true
                })}
              >
                <option value="" disabled>
                  Chọn danh mục
                </option>
                {postCatalogs.map(postCatalog => (
                  <option key={postCatalog._id} value={postCatalog.catalogId}>
                    {postCatalog.catalogId} - {postCatalog.name}
                  </option>
                ))}
              </Select>
              {errors.catalogId && <p className="mt-1 text-sm text-red-500">{errors.catalogId.message}</p>}

              <LabelForm title="Nguồn" />
              <InputModal type="text" {...register('source')} placeholder="Nguồn bài viết" />

              {currentImageUrl && (
                <div className="mb-4">
                  <LabelForm title="Ảnh hiện tại" />
                  <img src={currentImageUrl} alt="Ảnh hiện tại" className="h-32 w-32 rounded-md object-cover" />
                </div>
              )}

              <LabelForm title="Ảnh đại diện mới" />
              <InputModal type="file" {...register('imageUrl')} placeholder="Ảnh đại diện mới" />
            </div>

            <div className="w-full">
              <LabelForm title="Nội dung" />
              <QuillEditor
                value={editorValue}
                onChange={setEditorValue}
                theme="snow"
                modules={modules}
                className="mb-4 h-[400px] overflow-auto rounded-md border text-black scrollbar-hide dark:text-white xl:h-[70vh]"
                placeholder="Nội dung bài viết..."
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button type="button" onClick={onClose} className="border-gray-50 text-black dark:text-white">
              Hủy
            </Button>
            <Button disabled={isLoading} color="primary" type="submit" className="group text-white">
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPostPageAdmin;