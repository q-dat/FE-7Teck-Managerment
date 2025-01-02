import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import 'react-quill/dist/quill.snow.css';
import { Toastify } from '../../../../helper/Toastify';
import { PhoneCatalogContext } from '../../../../context/phone-catalog/PhoneCatalogContext';
import { IPhoneCatalog } from '../../../../types/type/phone-catalog/phoneCatalog';
import LabelForm from '../../LabelForm';

interface ModalEditPostPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const ModalEditPhoneCatalogPageAdmin: React.FC<ModalEditPostPageAdminProps> = ({
  isOpen,
  onClose,
  postId
}) => {
  const {
    phoneCatalogs,
    getPhoneCatalogById,
    getAllPhoneCatalogs,
    updatePhoneCatalog
  } = useContext(PhoneCatalogContext);
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<IPhoneCatalog>();
  const [existingImg, setExistingImg] = useState<string | undefined>('');

  useEffect(() => {
    if (postId) {
      getPhoneCatalogById(postId);
    }
  }, [postId, getPhoneCatalogById]);

  useEffect(() => {
    const phoneCatalogData = phoneCatalogs.find(post => post._id === postId);
    if (phoneCatalogData) {
      setValue('name', phoneCatalogData.name);
      setValue('price', phoneCatalogData.price);
      setValue('img', phoneCatalogData.img);
      setValue('des', phoneCatalogData.des);
      setValue('status', phoneCatalogData.status);
      setValue('createdAt', phoneCatalogData.createdAt);

      setExistingImg(phoneCatalogData.img);
    }
  }, [phoneCatalogs, postId, setValue]);

  const onSubmit: SubmitHandler<IPhoneCatalog> = async formData => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('des', formData.des || '');
    data.append('status', formData.status || '');

    const imgFile = watch('img');
    if (imgFile && imgFile[0]) {
      data.append('img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('img', existingImg);
      }
    }

    try {
      await updatePhoneCatalog(postId, data);
      reset();
      getAllPhoneCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      getAllPhoneCatalogs();
      Toastify(`Lỗi: ${err}`, 500);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Chỉnh sửa danh mục điện thoại
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên danh mục"
            />
            <InputModal
              type="number"
              {...register('price', { required: true })}
              placeholder="Giá"
            />
            <InputModal
              type="text"
              {...register('status')}
              placeholder="Trạng thái(*Không bắt buộc!)"
            />
            <InputModal
              type="text"
              {...register('des')}
              placeholder="Mô tả (*Không bắt buộc!)"
            />
            <LabelForm title={'Hình ảnh'} />
            {existingImg && (
              <div className="my-2">
                <img
                  src={existingImg}
                  className="h-10 w-10 rounded-md object-cover"
                />
              </div>
            )}
            <InputModal
              type="file"
              {...register('img')}
              placeholder="Chèn ảnh hình ảnh"
            />
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
              Hủy
            </Button>
            <Button color="primary" type="submit" className="group text-white">
              Xác Nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPhoneCatalogPageAdmin;
