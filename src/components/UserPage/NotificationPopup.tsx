import React, { useEffect, useRef, useState } from 'react';
import { Button, Hero, Textarea } from 'react-daisyui';
import InputForm from './InputForm';
import { MdOutlineCancel } from 'react-icons/md';

const NotificationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('popupShown')) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupShown', 'true');
  };
  //Contact Form
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
      {isVisible && (
        <div>
          <div
            id="popup-overlay"
            className="fixed left-0 top-0 z-50 h-full w-full cursor-pointer bg-black bg-opacity-50"
            onClick={closePopup}
          ></div>

          <div
            id="popup"
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-lg border border-white bg-white"
          >
            <div className="flex flex-col items-end justify-center rounded-lg">
              <Hero>
                <Hero.Content>
                  <div className="flex w-full flex-col rounded-xl">
                    <div
                      className="flex flex-col items-end justify-center"
                      onClick={closePopup}
                    >
                      <p className="cursor-pointer rounded-full bg-white text-3xl font-bold text-red-500 shadow-inner shadow-red-500 hover:scale-90">
                        <MdOutlineCancel />
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-[40px] font-bold uppercase text-primary">
                        Liên Hệ Với Chúng Tôi
                      </p>
                      <p className="font-semibold text-primary">
                        Với bất kì câu hỏi nào? Hãy để lại tin nhắn để được giải
                        đáp thắc mắc{' '}
                      </p>
                    </div>
                    {/* Form */}
                    <form
                      ref={formRef}
                      onSubmit={onSubmit}
                      className="my-5 flex items-center justify-center rounded-xl bg-transparent"
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5 xl:flex-row">
                          <InputForm
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="border border-black bg-white text-black focus:border-primary focus:shadow-inner focus:shadow-primary dark:text-white dark:shadow-none dark:shadow-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[350px]"
                            classNameLabel="dark:peer-placeholder-shown:text-black dark:peer-focus:text-black  bg-white "
                          />
                          <InputForm
                            name="name"
                            type="text"
                            className="border border-black bg-white text-black focus:border-primary focus:shadow-inner focus:shadow-primary dark:text-white dark:shadow-none dark:shadow-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[250px]"
                            placeholder="Tên của bạn"
                            classNameLabel="dark:peer-placeholder-shown:text-black dark:peer-focus:text-black  bg-white "
                          />
                        </div>
                        <Textarea
                          name="feedback"
                          className="border border-black bg-white pb-20 text-black focus:border-primary focus:shadow-inner focus:shadow-primary focus:outline-none dark:text-white dark:shadow-none dark:shadow-white xs:w-full sm:w-[350px] md:w-[650px] lg:w-full"
                          placeholder="Bạn muốn đặt câu hỏi hay góp ý gì?"
                        />
                        <div className="w-full">
                          <Button
                            className="w-20 bg-primary text-sm text-white hover:bg-secondary"
                            type="submit"
                          >
                            Gửi
                          </Button>
                          <span>{result}</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </Hero.Content>
              </Hero>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
