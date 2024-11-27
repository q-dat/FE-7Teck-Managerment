import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PostContext } from '../../../../context/PostContext';
import { IPost } from '../../../../types/type/post/post';
import InputModal from '../../InputModal'; // Giữ lại phần nhập liệu
import { Button } from 'react-daisyui';
import ReactQuill from 'react-quill'; // Sử dụng ReactQuill để chỉnh sửa nội dung bài viết
import 'react-quill/dist/quill.snow.css'; // Import style Quill
import { Toastify } from '../../../../helper/Toastify';

// Cấu hình các modules cho Quill
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
  PostId: string;
}

const ModalEditPostPageAdmin: React.FC<ModalEditPostPageAdminProps> = ({
  isOpen,
  onClose,
  PostId
}) => {
  const { posts, updatePost, error, loading } = useContext(PostContext);
  const { register, handleSubmit, reset } = useForm<IPost>();
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    const post = posts.find(p => p._id === PostId); // Use `postId` here
    if (post) {
      setEditorValue(post.content); // Hiển thị nội dung bài viết
      reset(post); // Reset form với dữ liệu của bài viết
    }
  }, [PostId, posts, reset]);

  const onSubmit: SubmitHandler<IPost> = async formData => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', editorValue); // Lấy nội dung từ Quill editor

    try {
      await updatePost(PostId, data); // Gọi API cập nhật bài viết
      Toastify('Bài viết đã được cập nhật!', 200);
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (err) {
      Toastify(`Lỗi: ${error}`, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40">
        <div className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800">
          <div>
            <p className="font-bold text-black dark:text-white">
              Chỉnh sửa bài viết
            </p>
            {/* Trường Tiêu đề */}
            <InputModal
              type="text"
              {...register('title', { required: true })}
              placeholder="Tiêu đề bài viết"
            />
            {/* Quill Text Editor cho nội dung bài viết */}
            <ReactQuill
              value={editorValue}
              onChange={setEditorValue} // Cập nhật giá trị nội dung khi chỉnh sửa
              theme="snow"
              modules={modules}
              className="mb-4 rounded-md border"
              placeholder="Nội dung bài viết"
            />
          </div>

          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button
              disabled={loading}
              color="primary"
              type="submit"
              className="group text-white"
            >
              {loading ? (
                <div className="flex cursor-progress flex-row items-center justify-center bg-primary text-white group-hover:bg-opacity-10">
                  <span>Đang cập nhật...</span>
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                'Cập nhật'
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPostPageAdmin;

