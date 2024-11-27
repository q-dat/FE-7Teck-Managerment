import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style Quill
import { PostContext } from '../../../../context/PostContext';
import { IPost } from '../../../../types/type/post/post';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal'; // Giữ lại phần nhập liệu như input modal

// Cấu hình các modules cho Quill
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    ['clean'], // Xóa định dạng
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }]
  ]
};

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePostPageAdmin: React.FC<ModalCreatePostProps> = ({
  isOpen,
  onClose
}) => {
  const { loading, createPost, getAllPosts, error } = useContext(PostContext);
  const isLoading = loading;
  const { register, handleSubmit, reset } = useForm<IPost>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  // Hàm xử lý submit
  const onSubmit: SubmitHandler<IPost> = async formData => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', editorValue); 
    // Thêm ảnh (nếu có)
    if (formData.imageUrl) {
      data.append('image', formData.imageUrl[0]);
    }

    try {
      await createPost(data);
      Toastify('Tạo bài viết thành công!', 201);
      reset();
      getAllPosts();
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${error}`, 500);
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
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">Tạo bài viết mới</p>
            {/* Các trường đầu vào */}
            <InputModal
              type="text"
              {...register('title', { required: true })}
              placeholder="Tiêu đề bài viết"
            />            
            {/* Quill Text Editor */}
            <ReactQuill
              value={editorValue}
              onChange={setEditorValue}  
              theme="snow"
              modules={modules}
              className="mb-4 rounded-md border"
              placeholder="Nội dung bài viết"
            />

            <InputModal
              type="file"
              {...register('imageUrl')}
              placeholder="Ảnh đại diện"
            />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {isLoading ? (
                <div className="flex cursor-progress flex-row items-center justify-center bg-primary text-white group-hover:bg-opacity-10">
                  <span>Đang tạo...</span>
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                'Xác nhận'
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreatePostPageAdmin;
