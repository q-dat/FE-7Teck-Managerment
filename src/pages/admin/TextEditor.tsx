import React, { useState, useRef, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style Quill
import { PostContext } from '../../context/PostContext';

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

const TextEditor: React.FC = () => {
  const { createPost, loading, error } = useContext(PostContext); // Sử dụng context
  const [editorValue, setEditorValue] = useState<string>('');
  const [title, setTitle] = useState<string>(''); // Title cho bài viết
  const [image, setImage] = useState<File | null>(null); // Ảnh cho bài viết
  const quillRef = useRef<ReactQuill>(null); // Tạo ref để truy cập vào ReactQuill

  const handleChange = (value: string) => {
    setEditorValue(value); // Cập nhật giá trị nội dung khi người dùng chỉnh sửa
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file); // Cập nhật ảnh khi người dùng chọn file
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', editorValue);

    if (image) {
      formData.append('image', image); // Thêm ảnh vào formData
    }

    createPost(formData); // Gọi hàm createPost từ context
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Soạn Thảo Bài Viết</h1>

        {/* Input cho tiêu đề */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Tiêu đề bài viết"
        />

        {/* Quill Text Editor */}
        <ReactQuill
          ref={quillRef} // Gắn ref vào ReactQuill
          value={editorValue}
          onChange={handleChange}
          theme="snow"
          modules={modules} // Sử dụng các module đã cấu hình
          className="rounded-md border"
          placeholder="Hãy bắt đầu viết..."
        />

        {/* Input để tải ảnh lên */}
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="my-4"
        />

        {/* Nút Lưu bài viết */}
        <button
          onClick={handleSave}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          {loading ? 'Đang lưu...' : 'Lưu Bài Viết'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default TextEditor;
