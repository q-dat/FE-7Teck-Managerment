import React, { useContext } from 'react';
import { Button, Select, Textarea } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IPost } from '../../../../types/type/post/post';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { PostContext } from '../../../../context/post/PostContext';
import { PostCatalogContext } from '../../../../context/post-catalog/PostCatalogContext';
import LabelForm from '../../LabelForm';
import QuillEditor from '../../../../lib/ReactQuill';

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
interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalCreatePostPageAdmin: React.FC<ModalCreatePostProps> = ({ isOpen, onClose }) => {
  const { loading, createPost, getAllPosts } = useContext(PostContext);
  const isLoading = loading.create;
  const { postCatalogs } = useContext(PostCatalogContext);
  const { register, handleSubmit, reset } = useForm<IPost>();
  const [editorValue, setEditorValue] = React.useState<string>('');
  //
  const onSubmit: SubmitHandler<IPost> = async formData => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('catalog', formData.catalog);
    data.append('content', editorValue);
    if (formData.imageUrl) {
      data.append('imageUrl', formData.imageUrl[0]);
    }
    try {
      await createPost(data);
      reset();
      getAllPosts();
      Toastify('Tạo bài viết thành công!', 201);
      onClose();
    } catch (err) {
      getAllPosts();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:mx-[200px] xl:w-screen"
        >
          <p className="font-bold text-black dark:text-white">Tạo bài viết mới</p>
          <div className="mt-5 flex flex-col items-start justify-center gap-5 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <LabelForm title={'Tiêu đề bài viết'} />
              <Textarea
                className="h-[100px] w-full border border-gray-50 bg-white text-black placeholder:text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white xl:h-[429px]"
                {...register('title', { required: true })}
                placeholder="Tiêu đề bài viết"
              />
              <LabelForm title={'Danh mục'} />
              <Select
                defaultValue=""
                className="mb-5 w-full border border-gray-50 bg-white text-black focus:border focus:border-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white"
                {...register('catalog', { required: true })}
              >
                <option value="" disabled>
                  Chọn Danh Mục
                </option>
                {postCatalogs.map(postCatalog => (
                  <option key={postCatalog._id} value={postCatalog.name}>
                    {postCatalog.name}
                  </option>
                ))}
              </Select>
              <LabelForm title={'Ảnh đại diện'} />
              <InputModal type="file" {...register('imageUrl', { required: true })} placeholder="Ảnh đại diện" />
            </div>
            <div className="w-full">
              <LabelForm title={'Nội dung'} />
              <QuillEditor
                value={editorValue}
                onChange={setEditorValue}
                theme="snow"
                modules={modules}
                className="mb-4 h-[400px] overflow-auto rounded-md border text-black scrollbar-hide dark:text-white xl:h-[600px]"
                placeholder="Nội dung bài viết..."
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black dark:text-white">
              Hủy
            </Button>
            <Button disabled={isLoading} color="primary" type="submit" className="group text-white">
              {isLoading ? 'Đang tạo...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreatePostPageAdmin;
