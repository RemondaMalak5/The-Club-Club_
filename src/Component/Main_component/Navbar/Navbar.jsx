// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { assets } from "../../../assets/assets";
// import Nav_top from "../Navbar/Nav_top";
// import { useTranslation } from "react-i18next";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { Get_profile } from "../../../axiosConfig/APIs/Profile/Profile";
// import { CgProfile } from "react-icons/cg";
// import { MdLanguage } from "react-icons/md";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
// const isLoggedIn = !!localStorage.getItem("token");

//   useEffect(() => {
//     const loadUser = async () => {
//       const savedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       if (!savedUser || !token) {
//         setUser(null);
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       try {
//         const profile = await Get_profile();
//         const profileData = profile?.message?.data;

//         const updatedUser = {
//           ...parsedUser,
//           ...profileData,
//         };

//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         setUser(updatedUser);
//       } catch (error) {
//         setUser(parsedUser);
//       }
//     };

//     loadUser();

//     window.addEventListener("userUpdated", loadUser);

//     return () => {
//       window.removeEventListener("userUpdated", loadUser);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("customer");

//     setUser(null);
//     window.dispatchEvent(new Event("userUpdated"));

//     navigate("/login");
//   };

//   const navItems = [
//     { name: t("home"), path: isLoggedIn ? `/` : "/"},
//    { name: t("branches"), path: "/branches" },
//     { name: t("about"), path: "/about" },
//     { name: t("news"), path: "/news" },
//     { name: t("champions"), path: "/champions" },
//     { name: t("services"), path: "/services" },
//     { name: t("academy"), path: "/academy" },
//     { name: t("contact"), path: "/contact" },
//   ];

//   const navLinkClass = ({ isActive }) =>
//     `transition ${isActive
//       ? "text-[#08AC85] font-bold"
//       : "text-[#364153] hover:text-[#08AC85]"
//     }`;

//   const mobileNavLinkClass = ({ isActive }) =>
//     `transition ${isActive
//       ? "text-[#08AC85] font-bold"
//       : "text-[#364153] hover:text-[#08AC85]"
//     }`;

//   return (
//     <>
//       <Nav_top />

//       <nav className="bg-white shadow-md sticky top-0 w-full z-50">
//         <div className="mx-auto px-10 py-1 flex justify-between items-center">
//           <NavLink to="/" className="flex items-center gap-2">
//             <img
//               src={assets.logo}
//               alt="logo"
//               width={48}
//               height={48}
//               className="w-14 h-14 object-contain"
//               loading="lazy"
//             />
//           </NavLink>

//           <div className="hidden lg:flex items-center gap-7 font-medium text-[17px]">
//             <ul className="flex gap-6">
//               {navItems.map((item) => (
//                 <li key={item.path}>
//                   <NavLink
//                     to={item.path}
//                     className={navLinkClass}
//                     end={item.path === "/"}
//                   >
//                     {item.name}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Desktop */}
//           <div className="hidden lg:flex gap-5 items-center  ">
//             {user ? (
//               <>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={user?.profileImage}
//                     className="w-12 h-12 rounded-full"
//                     onClick={() => {
//                       toggleMenu();
//                       navigate("/profile");
//                     }}
//                   />
//                   <div className="flex flex-col">
//                     <p>{t("hello")}</p>
//                     <p>
//                       {user?.fullName?.split(" ").slice(0, 2).join(" ")}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="bg-[#EBF1F1] p-3 rounded-full text-lg">
//                   <IoNotificationsOutline />
//                 </span>

//                 {/* <button
//                   onClick={logout}
//                   className="rounded-full border px-4 py-2 bg-white text-[#00454CDB] hover:bg-red-500 hover:text-white"
//                 >
//                   Logout
//                 </button> */}
//               </>
//             ) : (
//               <>
//                 <button
//                   className="rounded-full border px-3 py-2 bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white"
//                   onClick={() => navigate("/login")}
//                 >
//                   {t("login")}
//                 </button>

//                 <button
//                   className="rounded-full border px-3 py-2 bg-white hover:bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-[#00454CDB] hover:text-white"
//                   onClick={() => navigate("/register")}
//                 >
//                   {t("register")}
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden flex items-center">
//             <button onClick={toggleMenu} className="text-2xl text-[#364153]">
//               {isOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="lg:hidden bg-white shadow-md px-8 py-4">
//             <ul className="flex flex-col gap-4 font-medium text-[18px]">
//               {navItems.map((item) => (
//                 <li key={item.path}>
//                   <NavLink
//                     to={item.path}
//                     onClick={toggleMenu}
//                     className={mobileNavLinkClass}
//                     end={item.path === "/"}
//                   >
//                     {item.name}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>

//             <button
//               className="m-4   rounded-full border p-3 text-lg bg-transparent border-[#00786F]"
//               onClick={() =>
//                 i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
//               }
//             >
//               <MdLanguage />{" "}
//             </button>

//             {user ? (
//               <>
//                 <button
//                   onClick={() => {
//                     toggleMenu();
//                     navigate("/profile");
//                   }}
//                   className="mt-4 text-lg bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold"
//                 >
//                   <CgProfile />
//                 </button>

//                 <button
//                   onClick={() => {
//                     toggleMenu();
//                     logout();
//                   }}
//                   className="mt-4 w-full border border-red-500 text-red-500 rounded-full p-3"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => {
//                     toggleMenu();
//                     navigate("/login");
//                   }}
//                   className="mt-4 w-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-bold"
//                 >
//                   {t("login")}
//                 </button>

//                 <button
//                   onClick={() => {
//                     toggleMenu();
//                     navigate("/register");
//                   }}
//                   className="mt-4 w-full border-[#00786F] rounded-full border px-3 py-2 bg-white hover:bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-[#00454CDB] hover:text-white"
//                 >
//                   {t("register")}
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;
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

  // بنقرأ المستخدم من localStorage من أول render
  // عشان الناف بار ميظهرش Login وRegister لحظيًا
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!savedUser || !token) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  });

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

      let parsedUser;

      try {
        parsedUser = JSON.parse(savedUser);

        // إظهار البيانات المحفوظة فورًا بدون انتظار الـ API
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid saved user data:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("customer");

        setUser(null);
        return;
      }

      try {
        const profile = await Get_profile();
        const profileData = profile?.message?.data;

        if (!profileData) {
          return;
        }

        const updatedUser = {
          ...parsedUser,
          ...profileData,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Profile loading error:", error);

        // لو الـ API حصل فيه مشكلة، نفضل عارضين البيانات القديمة
        setUser(parsedUser);
      }
    };

    loadUser();

    window.addEventListener("userUpdated", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("customer");

    setUser(null);
    closeMenu();

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
  };

  const changeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const handleProfileImageError = (event) => {
    // استبدلي assets.profilePlaceholder باسم الصورة الافتراضية عندك
    if (assets.profilePlaceholder) {
      event.currentTarget.src = assets.profilePlaceholder;
    } else {
      event.currentTarget.style.display = "none";
    }
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

      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto flex items-center justify-between px-5 py-1 lg:px-10">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="logo"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              loading="eager"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 text-[17px] font-medium lg:flex">
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

          {/* Desktop User Section */}
          <div className="hidden items-center gap-5 lg:flex">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-start"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user?.fullName || "Profile"}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                      onError={handleProfileImageError}
                    />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF1F1] text-2xl text-[#00786F]">
                      <CgProfile />
                    </span>
                  )}

                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">{t("hello")}</p>

                    <p className="max-w-[150px] truncate font-medium text-[#364153]">
                      {user?.fullName
                        ? user.fullName.split(" ").slice(0, 2).join(" ")
                        : t("profile")}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  aria-label="Notifications"
                  className="rounded-full bg-[#EBF1F1] p-3 text-lg text-[#364153] transition hover:text-[#08AC85]"
                >
                  <IoNotificationsOutline />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-full border px-3 py-2 text-white transition bg-gradient-to-br from-[#08AC85DB] to-[#00786F]"
                  onClick={() => navigate("/login")}
                >
                  {t("login")}
                </button>

                <button
                  type="button"
                  className="rounded-full border px-3 py-2 text-[#00454CDB] transition hover:text-white hover:bg-gradient-to-br hover:from-[#08AC85DB] hover:to-[#00786F]"
                  onClick={() => navigate("/register")}
                >
                  {t("register")}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-2xl text-[#364153]"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-white px-8 py-4 shadow-md lg:hidden">
            <ul className="flex flex-col gap-4 text-[18px] font-medium">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={mobileNavLinkClass}
                    end={item.path === "/"}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                aria-label="Change language"
                className="rounded-full border border-[#00786F] bg-transparent p-3 text-lg text-[#00786F]"
                onClick={changeLanguage}
              >
                <MdLanguage />
              </button>

              {user && (
                <button
                  type="button"
                  aria-label="Profile"
                  onClick={() => {
                    closeMenu();
                    navigate("/profile");
                  }}
                  className="rounded-full p-3 text-lg font-bold text-white bg-gradient-to-r from-[#08AC85DB] to-[#00786F]"
                >
                  <CgProfile />
                </button>
              )}
            </div>

            {user ? (
              <button
                type="button"
                onClick={logout}
                className="mt-4 w-full rounded-full border border-red-500 p-3 text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                {t("logout")}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/login");
                  }}
                  className="mt-4 w-full rounded-full p-3 font-bold text-white bg-gradient-to-r from-[#08AC85DB] to-[#00786F]"
                >
                  {t("login")}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/register");
                  }}
                  className="mt-4 w-full rounded-full border border-[#00786F] bg-white px-3 py-2 text-[#00454CDB] transition hover:text-white hover:bg-gradient-to-br hover:from-[#08AC85DB] hover:to-[#00786F]"
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