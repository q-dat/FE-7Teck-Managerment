import React from 'react';
import { Footer } from 'react-daisyui';
// import { FaCcVisa } from 'react-icons/fa6';
// import { FaCcApplePay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/images';
const FooterFC: React.FC = () => {
  return (
    <div className="mb-[30px] xl:mb-0">
      <hr />
      <Footer className="item-center grid grid-cols-2 justify-between bg-black bg-opacity-5 p-10 px-2 text-primary md:grid-cols-5 xl:px-[100px]">
        <div>
          <img
            width={140}
            loading="lazy"
            src={Logo}
            alt="LOGO"
            className="rounded-full border border-white"
          />
        </div>
        <div>
          <Footer.Title></Footer.Title>
          <Link className="hover:text-secondary" to={''}></Link>
          <Link className="hover:text-secondary" to={''}></Link>
          <Link className="hover:text-secondary" to={''}></Link>
        </div>
        <div>
          <Footer.Title></Footer.Title>
          <Link className="hover:text-secondary" to={''}></Link>
          <Link className="hover:text-secondary" to={''}></Link>
        </div>
        <div>
          <Footer.Title>Liên Hệ</Footer.Title>

          <Link className="hover:text-secondary" to="tel:0333133050">
            HotLine: 0333133050
          </Link>
          <Link
            className="hover:text-secondary"
            to="mailto:laclactrip@gmail.com"
          >
            Email: 7Teck@gmail.com
          </Link>
        </div>
        <div>
          <Footer.Title></Footer.Title>
          <div className="flex gap-2">
            {/* <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcVisa />
            </Link>
            <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcApplePay />
            </Link> */}
          </div>
        </div>
      </Footer>
      <hr />
      <div className="bg-primary py-2 text-center text-white">
        © 2024 Copyright 7Teck
      </div>
    </div>
  );
};

export default FooterFC;
