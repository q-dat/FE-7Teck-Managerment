import React, { useRef } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { Textarea, Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { Logo } from '../../assets/images';

const ContactPage: React.FC = () => {
  const [result, setResult] = React.useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult('Đang gửi...');

    const formData = new FormData(event.currentTarget);

    formData.append('access_key', ' ');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult('Đã gửi thành công!');

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
      <HeaderResponsive Title_NavbarMobile="Chính Sách Bảo Hành" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Chính sách bảo hành" to="">
                Chính Sách Bảo Hành
              </Link>
            </li>
          </ul>
        </div>
        {/* Form */}
        <div className="px-2 xl:px-[100px]">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-y-10 rounded-xl px-0 py-5 shadow-none dark:bg-white xl:flex-row xl:gap-x-10 xl:gap-y-0 xl:px-10 xl:py-10 xl:shadow-mainMenu"
          >
            <div className="">
              <img
                loading="lazy"
                src={Logo}
                alt="Logo"
                className="w-[150px] rounded-full border border-primary xl:w-[300px]"
              />
            </div>
            <div
              className="flex w-full flex-col gap-5"
              role="region"
              aria-label="Thông tin liên hệ"
            >
              <h1 className="text-2xl font-bold">Thông tin liên hệ:</h1>
              <div className="flex w-full flex-col gap-5 xl:flex-row">
                <div className="w-full">
                  <InputForm
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 bg-white text-black focus:border-primary"
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                </div>
                <div className="w-full">
                  <InputForm
                    name="name"
                    type="text"
                    className="border border-gray-300 bg-white text-black focus:border-primary"
                    placeholder="Tên của bạn"
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                </div>
              </div>
              <Textarea
                name="feedback"
                className="border border-gray-300 bg-white pb-20 text-black focus:border-primary focus:outline-none"
                placeholder="Bạn muốn đặt câu hỏi hay góp ý gì?"
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

export default ContactPage;
