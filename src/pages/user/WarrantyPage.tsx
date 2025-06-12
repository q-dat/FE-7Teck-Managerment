import React from 'react';
import HeaderResponsive from '../../components/userPage/HeaderResponsive';
import { Logo } from '../../assets/images';

const WarrantyPage: React.FC = () => {
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Chính Sách Bảo Hành" />
      <div className="py-[60px] xl:pt-0">
        {/* Main Content */}
        <main className="mt-4 w-full px-2 py-2 sm:px-6 lg:px-16">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Chính Sách Bảo Hành Sản Phẩm – 7teck
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-gray-600">
            7teck cam kết mang đến cho khách hàng trải nghiệm mua sắm an tâm
            cùng chính sách bảo hành rõ ràng, minh bạch đối với các sản phẩm
            điện thoại và laptop.
          </p>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column */}
            <section className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Thời Gian Bảo Hành
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-black">
                  <li>
                    Điện thoại: Bảo hành 6 tháng cho máy, 1 tháng cho pin và
                    sạc.
                  </li>
                  <li>
                    Laptop: Bảo hành 12 tháng cho phần cứng (không bao gồm pin
                    và sạc).
                  </li>
                  <li>
                    Sản phẩm đổi mới trong 7 ngày đầu nếu phát sinh lỗi phần
                    cứng do nhà sản xuất (không áp dụng với lỗi người dùng).
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Điều Kiện Bảo Hành
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-black">
                  <li>
                    Sản phẩm còn trong thời hạn bảo hành và có hóa đơn mua hàng
                    từ 7teck.
                  </li>
                  <li>
                    Tem bảo hành, số IMEI/SN còn nguyên vẹn, không bị tẩy xóa
                    hay chỉnh sửa.
                  </li>
                  <li>
                    Sản phẩm không bị rơi vỡ, vô nước, cháy nổ hoặc can thiệp
                    phần cứng/phần mềm từ bên thứ ba.
                  </li>
                </ul>
              </div>
            </section>

            {/* Right Column */}
            <section className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Quy Trình Bảo Hành
                </h2>
                <ol className="list-decimal space-y-2 pl-6 text-black">
                  <li>
                    Liên hệ bộ phận CSKH 7teck qua hotline, zalo hoặc email để
                    thông báo lỗi sản phẩm.
                  </li>
                  <li>
                    Nhân viên kỹ thuật xác nhận và hướng dẫn gửi sản phẩm về
                    trung tâm bảo hành.
                  </li>
                  <li>
                    Thời gian xử lý bảo hành: 3 - 7 ngày làm việc (không tính
                    thời gian vận chuyển).
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Trường Hợp Từ Chối Bảo Hành
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-black">
                  <li>
                    Sản phẩm bị hư hỏng do lỗi người dùng như rơi vỡ, vào nước,
                    cháy nổ, hoặc can thiệp từ bên ngoài.
                  </li>
                  <li>
                    Sản phẩm hết thời gian bảo hành hoặc không có hóa đơn chứng
                    minh mua hàng tại 7teck.
                  </li>
                  <li>
                    Sản phẩm bị mất tem bảo hành hoặc có dấu hiệu sửa chữa trái
                    phép.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <section className="mt-2 flex flex-row items-center justify-center gap-4 bg-primary p-4 text-center xl:gap-10">
            <div className="">
              <img
                src={Logo}
                alt="7teck Logo"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            <div>
              <p className="mx-auto mb-4 max-w-xl text-white">
                Nếu quý khách có thắc mắc về chính sách bảo hành, vui lòng liên
                hệ:
              </p>
              <ul className="inline-block space-y-2 text-left text-white">
                <li>
                  <a
                    href="tel:0333133050"
                    className="transition-colors duration-200 hover:text-blue-600"
                    aria-label="Gọi hotline 0333133050"
                  >
                    📞 Hotline: 0333133050
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:baohanh@7teck.vn"
                    className="transition-colors duration-200 hover:text-blue-600"
                    aria-label="Gửi email đến baohanh@7teck.vn"
                  >
                    📧 Email: cskh.7teck@gmail.com
                  </a>
                </li>
                <li>
                  🏢 Địa chỉ: 136/11 Trần Quang Diệu, Phường 12, Quận 3, HCM
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WarrantyPage;
