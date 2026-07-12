import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import Nav_top from "../Navbar/Nav_top";
import { useTranslation } from "react-i18next";
import { IoNotificationsOutline } from "react-icons/io5";
import { Get_profile } from "../../../axiosConfig/APIs/Profile/Profile";
import { CgProfile } from "react-icons/cg";
import { MdLanguage } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
 
useEffect(() => {
  const loadUser = async () => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!savedUser || !token) {
      setUser(null);
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    try {
      const profile = await Get_profile();
      const profileData = profile?.message?.data;

      const updatedUser = {
        ...parsedUser,
        ...profileData,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
      setUser(parsedUser);
    }
  };

  loadUser();

  window.addEventListener("userUpdated", loadUser);

  return () => {
    window.removeEventListener("userUpdated", loadUser);
  };
}, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("customer");

    setUser(null);
    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
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
        <div className="mx-auto px-10 py-1 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="logo"
              className="w-14 h-14"
              loading="lazy"
            />
          </NavLink>

          <div className="hidden lg:flex items-center gap-7 font-medium text-[17px]">
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

          {/* Desktop */}
          <div className="hidden lg:flex gap-5 items-center  ">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.profileImage}
                    className="w-12 h-12 rounded-full"
                    onClick={() => {
                      toggleMenu();
                      navigate("/profile");
                    }}
                  />
                  <div className="flex flex-col">
                    <p>{t("hello")}</p>
                    <p>
                      {user?.fullName?.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                </div>
                <span className="bg-[#EBF1F1] p-3 rounded-full text-lg">
                  <IoNotificationsOutline />
                </span>

                {/* <button
                  onClick={logout}
                  className="rounded-full border px-4 py-2 bg-white text-[#00454CDB] hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button> */}
              </>
            ) : (
              <>
                <button
                  className="rounded-full border px-3 py-2 bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white"
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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
              className="m-4   rounded-full border p-3 text-lg bg-transparent border-[#00786F]"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              <MdLanguage />{" "}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => {
                    toggleMenu();
                    navigate("/profile");
                  }}
                  className="mt-4 text-lg bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold"
                >
                  <CgProfile />
                </button>

                <button
                  onClick={() => {
                    toggleMenu();
                    logout();
                  }}
                  className="mt-4 w-full border border-red-500 text-red-500 rounded-full p-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    toggleMenu();
                    navigate("/login");
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold"
                >
                  {t("login")}
                </button>

                <button
                  onClick={() => {
                    toggleMenu();
                    navigate("/register");
                  }}
                  className="mt-4 w-full border-[#00786F] rounded-full border px-3 py-2 bg-white hover:bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-[#00454CDB] hover:text-white"
                >
                  {t("register")}
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
