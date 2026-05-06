import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { assets } from "../../assets/assets";
import Services from "./../../Pages/Services";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SocialMedia from "../Shared_Component/SocialMedia";
import { Link } from 'react-router-dom';

const Footer = () => {
  const contact = [{ value: "16647" }, { value: "info@theclub.com.eg" }];
  const branches = [
    { value: "فرع 6 أكتوبر" },
    { value: "فرع  شيراتون" },
    { value: "فرع العاصمة الإدارية" },
  ];
  const quick_links = [
    { value: "الرئيسيه " }, 
    { value: "عن النادي", link:"/about" },
    { value: "فروعنا", link: "/branches" },
    { value: "الاخبار", link: "/news" },
    { value: "البطولات", link: "/champions" },
    { value: "الخدمات", link: "/services" },
    { value: "الاكاديميات", link: "/academy" },
    { value: "تواصل معنا", link: "/contact" },

  ];
  const services_club = [
    { value: "حجز الملاعب" , link: "/" },
    { value: "العضويات" , link: "/services", },
    { value: "الرحلات " , link: "/" },
    { value: "المسابقات" , link: "/" },
    { value: "الفعاليات" , link: "/" },
    { value: "الأكاديميات" , link: "/academy" },
  ];
  const Services_member = [
    { value: "تسجيل الدخول" , link: "/login" },
    { value: "انشاء حساب" , link: "/register" },
    { value: "ادارة العضويه" , link: "/" },
    { value: "حجز الانشطه" , link: "/" },
  ];
  const bottom=[{ value: "سياسة الخصوصية" }, { value: "الشروط والأحكام" }, { value: "خريطة الموقع" }]
  return (
    <footer className="bg-gradient-to-r from-[#1aa085] to-[#0f7c6c] text-white mt-10">
      <div className="xl:ps-20 px-5 py-10 flex flex-wrap  justify-between">
        <div className="xl:w-[20%] w-full ">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img
              src={assets.theClub_Logo}
              alt="نادي النادي"
              className="w-20 h-20"
            />
            <h2 className="font-bold text-lg">نادي النادي</h2>
          </div>

          <p className="text-sm leading-6 text-gray-200">
            نادي رياضي متكامل يقدم أفضل الخدمات الرياضية والترفيهية بأحدث
            التقنيات وفي بيئة آمنة ومريحة.
          </p>
    <p className="py-5 font-bold"> تابعنا</p>
          {/* Social */}
        <SocialMedia/>
        </div>

        <div className="xl:w-[80%] w-full flex flex-wrap justify-center xl:ps-10 ">
          <div className="xl:w-1/5 md:w-1/2 w-full ">
            <h3 className="font-bold text-[20px] mb-4">التواصل</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {contact.map((item, index) => (
                <li key={index}>
                 {item.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="xl:w-1/5 md:w-1/2 w-full  ">
            <h3 className="font-bold text-[20px] mb-4">الفروع</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {branches.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white text-[#FFFFFFCC] cursor-pointer transition flex items-center gap-1"
                >
                  <span> <MdOutlineKeyboardArrowLeft /></span> {item.value} 

                </li>
              ))}
            </ul>
          
          </div>

          {/* Quick Links */}
          <div className="xl:w-1/5 md:w-1/2 w-full  "  >
            <h3 className="font-bold text-[20px] mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {quick_links.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                  <Link to={item.link } className="flex items-center gap-1">
                    <span> <MdOutlineKeyboardArrowLeft /></span>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="xl:w-1/5 md:w-1/2 w-full  "  >
            <h3 className="font-bold text-[20px] mb-4">خدمات النادي</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {services_club.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                    <Link to={item.link} className="flex items-center gap-1"> 

                  <span> <MdOutlineKeyboardArrowLeft /></span>
                  {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="xl:w-1/5 md:w-1/2 w-full  "  >
            <h3 className="font-bold text-[20px] mb-4">خدمات الأعضاء</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {Services_member.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                      <Link to={item.link} className="flex items-center gap-1">
                  <span> <MdOutlineKeyboardArrowLeft /></span>  
                  {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#0c5f54] flex flex-wrap justify-between py-5 px-12 text-[12px] text-[#FFFFFFB2]  fonr-regular">
        
        <span className="flex justify-start">
          {bottom.map((item, index) => (
  item.value && (
    <p key={index} className="mx-2 flex items-center gap-3">
      {item.value}
      {index !== bottom.length - 1 && <span>|</span>}
    </p>
  )
))}
        </span>
        <span className="flex justify-end">
     
          © 2026 نادي النادي - جميع الحقوق محفوظة
        </span>
      </div>
    </footer>
  );
};

export default Footer;
