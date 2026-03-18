import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1aa085] to-[#0f7c6c] text-white mt-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Grid */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-5 
          gap-8
          text-center sm:text-right
        ">

          {/* Logo + Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <img src={assets.theClub_Logo} alt="نادي النادي" className="w-10 h-10" />
              <h2 className="font-bold text-lg">نادي النادي</h2>
            </div>

            <p className="text-sm leading-6 text-gray-200">
              نادي رياضي متكامل يقدم أفضل الخدمات الرياضية والترفيهية 
              بأحدث التقنيات وفي بيئة آمنة ومريحة.
            </p>

            {/* Social */}
            <div className="flex justify-center sm:justify-start gap-3 pt-2">
              <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
                <FaFacebookF />
              </span>
              <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
                <FaInstagram />
              </span>
              <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
                <FaXTwitter />
              </span>
              <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
                <FaWhatsapp />
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">التواصل</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>16647</li>
              <li className="break-all">info@theclub.com.eg</li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="font-bold mb-4">الفروع</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>فرع التجمع</li>
              <li>فرع 6 أكتوبر</li>
              <li>فرع العاصمة الإدارية</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="hover:text-white cursor-pointer transition">عن النادي</li>
              <li className="hover:text-white cursor-pointer transition">الأنشطة</li>
              <li className="hover:text-white cursor-pointer transition">الأخبار</li>
              <li className="hover:text-white cursor-pointer transition">اتصل بنا</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">خدمات النادي</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>حجز الملاعب</li>
              <li>العضويات</li>
              <li>الفعاليات</li>
              <li>الأكاديميات</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#0c5f54] text-center text-xs sm:text-sm py-4 text-gray-300 px-4">
        © 2026 نادي النادي - جميع الحقوق محفوظة
      </div>
    </footer>
  );
};

export default Footer;