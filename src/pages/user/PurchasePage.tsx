import React, { useRef } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { Textarea, Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';

const PurchasePage: React.FC = () => {
  const [result, setResult] = React.useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult('Đang gửi...');

    const formData = new FormData(event.currentTarget);

    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult('Đã gửi biểu mẫu thành công! Vui lòng đợi để được hỗ trợ!');

        // Reset form using formRef
        formRef.current?.reset();
      } else {
        console.error('Error', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Yêu cầu thất bại', error);
      setResult('Đã xảy ra lỗi khi gửi biểu mẫu!');
    }
  };
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Mua Hàng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Mua Hàng" to="">
                Mua Hàng
              </Link>
            </li>
          </ul>
        </div>
        {/* Form */}
        <div className="mt-5 px-2 xl:px-20">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-y-10 rounded-xl px-0 py-5 shadow-none dark:bg-white xl:flex-row xl:gap-x-10 xl:gap-y-0 xl:px-10 xl:py-10 xl:shadow-mainMenu"
          >
            <div
              className="flex w-full flex-col gap-5"
              role="region"
              aria-label="Thông tin liên hệ"
            >
              <h1 className="text-2xl font-bold">
                Liên Hệ Thanh Toán Trực Tiếp – Đơn Giản & Nhanh Chóng:
              </h1>
              <div className="flex w-full flex-col gap-5 xl:flex-row">
                <div className="w-full">
                  <InputForm
                    name="Số điện thoại:"
                    type="number"
                    placeholder="Nhập số điện thoại"
                    className="border border-gray-300 bg-white text-black focus:border-primary"
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                </div>
                <div className="w-full">
                  <InputForm
                    name="Tên khách hàng:"
                    type="text"
                    className="border border-gray-300 bg-white text-black focus:border-primary"
                    placeholder="Tên của bạn"
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                </div>
              </div>
              <Textarea
                name="Lời nhắn:"
                className="border border-gray-300 bg-white pb-20 text-black placeholder:text-lg placeholder:text-primary focus:border-primary focus:outline-none"
                placeholder="Chúng tôi luôn sẵn sàng giải đáp mọi câu hỏi của bạn!. Hãy để lại câu hỏi tại đây."
              />
              <div className="w-full">
                <Button
                  aria-label="Nút: Gửi"
                  className="w-full bg-primary text-sm text-white hover:border-primary hover:bg-secondary hover:text-white dark:hover:bg-opacity-50"
                  type="submit"
                >
                  Gửi
                </Button>
                <span>{result}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
