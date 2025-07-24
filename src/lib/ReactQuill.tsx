import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC<ReactQuillProps> = props => {
  return <ReactQuill theme="snow" {...props} />;
};

export default QuillEditor;
