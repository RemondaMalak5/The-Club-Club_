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

const Footer = () => {
  const contact = [{ value: "16647" }, { value: "info@theclub.com.eg" }];
  const branches = [
    { value: "فرع 6 أكتوبر" },
    { value: "فرع  شيراتون" },
    { value: "فرع العاصمة الإدارية" },
  ];
  const quick_links = [
    { value: "الرئيسيه " }, 
    { value: "عن النادي" },
    { value: "فروعنا" },
    { value: "الاخبار" },
    { value: "البطولات" },
    { value: "الخدمات" },
    { value: "الاكاديميات" },
    { value: "تواصل معنا" },

  ];
  const services_club = [
    { value: "حجز الملاعب" , link: "/" },
    { value: "العضويات" , link: "/services", },
    { value: "الرحلات " },
    { value: "المسابقات" },
    { value: "الفعاليات" },
    { value: "الأكاديميات" },
  ];
  const Services_member = [
    { value: "تسجيل الدخول" },
    { value: "انشاء حساب" },
    { value: "ادارة العضويه" },
    { value: "حجز الانشطه" },
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
          <div className="flex justify-center sm:justify-start gap-3 pt-2 text-[18px]">
            <span className="bg-white/20 p-3 rounded-full hover:bg-white/30 cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="bg-white/20 p-3 rounded-full hover:bg-white/30 cursor-pointer">
              <FaInstagram />
            </span>
            <span className="bg-white/20 p-3 rounded-full hover:bg-white/30 cursor-pointer">
              <FaXTwitter />
            </span>
            <span className="bg-white/20 p-3 rounded-full hover:bg-white/30 cursor-pointer">
              <FaWhatsapp />
            </span>
          </div>
        </div>

        <div className="xl:w-[80%] w-full flex flex-wrap justify-center xl:ps-10 ">
          <div className="xl:w-1/5 md:w-1/2 w-full ">
            <h3 className="font-bold text-[20px] mb-4">التواصل</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {contact.map((item, index) => (
                <li key={index}>{item.value}</li>
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
                  <span> <MdOutlineKeyboardArrowLeft /></span>
                  {item.value}
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
                  <span> <MdOutlineKeyboardArrowLeft /></span>
                  {item.value}
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
                  <span> <MdOutlineKeyboardArrowLeft /></span>  
                  {item.value}
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
