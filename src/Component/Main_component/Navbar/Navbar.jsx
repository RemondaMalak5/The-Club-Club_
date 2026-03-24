import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarCheck, FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import Nav_top from "../Navbar/Nav_top";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {t, i18n} = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav_top />
      <nav className="bg-white shadow-md sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-12 h-12" />
            <p className="font-bold text-[#1e2939d0] text-[20px]">نادى النادى</p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7 text-[#364153] font-medium text-[18px]">
            <ul className="flex gap-7">
              <li><Link to="/">الرئيسيه</Link></li>
              <li><Link to="/branches">فروعنا</Link></li>
              <li><Link to="/about">عن النادى</Link></li>
              <li><Link to="/news">الاخبار</Link></li>
              <li><Link to="/">الخدمات</Link></li>
              <li><Link to="/">الاكاديميات</Link></li>
              <li><Link to="/">البطولات</Link></li>
              <li><Link to="/contact">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Desktop Button */}
          <div className="hidden lg:flex">
            <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold text-[17px] flex items-center gap-2">
              <FaRegCalendarCheck /> احجز نشاط / خدمه
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl text-[#364153]">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-md px-8 py-4">
            <ul className="flex flex-col gap-4 text-[#364153] font-medium text-[18px]">
              <li><Link to="/" onClick={toggleMenu}>الرئيسيه</Link></li>
              <li><Link to="/" onClick={toggleMenu}>فروعنا</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>عن النادى</Link></li>
              <li><Link to="/" onClick={toggleMenu}>الاخبار</Link></li>
              <li><Link to="/" onClick={toggleMenu}>الخدمات</Link></li>
              <li><Link to="/" onClick={toggleMenu}>الاكاديميات</Link></li>
              <li><Link to="/" onClick={toggleMenu}>البطولات</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>تواصل معنا</Link></li>
            </ul>
          <button className='rounded-full border px-3 bg-transparent
             hover:bg-white  hover:text-black' onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
            }>
              {i18n.language === "en" ? "العربية" : "English"}
            </button>
            <button className="mt-4 w-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold text-[17px] flex items-center justify-center gap-2">
              <FaRegCalendarCheck /> احجز نشاط / خدمه
            </button>

            <button className="mt-4 w-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold text-[17px] flex items-center justify-center gap-2">
              تسجيل الدخول
            </button>
          

            {/* <div className='flex gap-3'>
                <button className='rounded-full border px-3 bg-transparent hover:bg-white text-white hover:text-black'  onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
            }>
                           {i18n.language === "en" ? "العربية" : "English"}

            </button>
                <button className='rounded-full border px-3 py-2 bg-white hover:bg-transparent hover:text-white'>تسجيل الدخول</button>
            </div> */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;


{/* <Nav_top/> */ }
