import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import Nav_top from "../Navbar/Nav_top";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t , i18n} = useTranslation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("branches"), path: "/branches" },
    { name: t("about"), path: "/about" },
    { name: t("news"), path: "/news" },
    { name: t("champions"), path: "/champions" },
    { name: t("services"), path: "/services" },
    { name: t("academy"), path: "/academy" },
    { name: t("contact"), path: "/contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-[#08AC85] font-bold"
        : "text-[#364153] hover:text-[#08AC85]"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-[#08AC85] font-bold"
        : "text-[#364153] hover:text-[#08AC85]"
    }`;

  return (
    <>
      <Nav_top />

      <nav className="bg-white shadow-md sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-10 py-1 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-14 h-14" />
          </NavLink>

          <div className="hidden lg:flex items-center gap-7  font-medium text-[17px]">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                    end={item.path === "/"}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex gap-2">
            <button
              className="rounded-full border px-3 py-2 bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white hover:bg-transparent hover:text-white"
              onClick={() => navigate("/login")}
            >
              {t("login")}
            </button>

            <button
              className="rounded-full border px-3 py-2 bg-white hover:bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-[#00454CDB] hover:text-white"
              onClick={() => navigate("/register")}
            >
              {t("register")}
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl text-[#364153]">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white shadow-md px-8 py-4">
            <ul className="flex flex-col gap-4 font-medium text-[18px]">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={toggleMenu}
                    className={mobileNavLinkClass}
                    end={item.path === "/"}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              className="mt-4 w-full rounded-full border px-3 py-2 bg-transparent border-[#00786F] hover:bg-white hover:text-black"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              {i18n.language === "en" ? "العربية" : "English"}
            </button>

            <button
              onClick={() => {
                toggleMenu();
                navigate("/login");
              }}
              className="mt-4 w-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold text-[17px] flex items-center justify-center gap-2"
            >
              تسجيل الدخول
            </button>

            <button
              onClick={() => {
                toggleMenu();
                navigate("/register");
              }}
              className="mt-4 w-full border-[#00786F] rounded-full border px-3 py-2 bg-white hover:bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-[#00454CDB] hover:text-white"
            >
              تسجيل جديد
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;