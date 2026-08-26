// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import H_one_register from "../Shared_Component/H_one_register";
// import { TbLogin } from "react-icons/tb";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { LoginApi } from "../../axiosConfig/APIs/Auth/Login";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import i18next from "i18next";
// import { useBranch } from "../../context/BranchContext";

// const Login = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//  const { changeBranch ,branches } = useBranch();
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     branch: "",
//   });

//  const branchOptions =
//   branches?.map((branch) => ({
//     value: branch.id,
//     label: branch.name,
//   })) ;

   
//   const arr = [
//     {
//       name: "username",
//       label: t("username_label"),
//       description: t("username_placeholder"),
//     },
//     {
//       name: "password",
//       label: t("password_label"),
//       description: t("password_placeholder"),
//       forget: t("forget_password"),
//     },
//   ];

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = t("username_required");
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = t("password_required");
//     } else if (formData.password.length < 6) {
//       newErrors.password = t("password_min_length");
//     }

//     if (!formData.branch.trim()) {
//       newErrors.branch = t("branch_required");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleLogin = async () => {
//     setApiError("");

//     const isValid = validate();
//     if (!isValid) return;

//     try {
//       const response = await LoginApi(formData);

//  if (response?.message?.success) {
//   const user = response.message.user;
//   const customer = response.message.customer;

//   const savedUser = {
//     ...user,
//     profileImage: user?.profileImage || customer?.profileImage || "",
//   };

//   const branchId = response.message.branchId ;

//   localStorage.setItem("token", response.message.token);
//   localStorage.setItem("user", JSON.stringify(savedUser));

//   changeBranch(branchId);

//   window.dispatchEvent(new Event("userUpdated"));

// const selectedBranch = branches.find(
//   (branch) => String(branch.id) === String(branchId)
// );
// navigate(`/about-branches/${branchId}`, {
//   state: {
//     branchId: branchId,
//     branchName: selectedBranch?.name,
//   },
// });
// };
//     } catch (error) {
//       const data = error?.response?.data;
//         setApiError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center py-10 px-4">
//       <div className="border p-7 w-full md:w-[70%] lg:w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl">
//         <span className="bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]">
//           <TbLogin />
//         </span>

//         <H_one_register title={t("login")} />

//         <p className="text-[14px] text-[#6A7282] text-center">
//           {t("member_login_prompt")}
//         </p>

//         <div className="w-full flex flex-wrap">
//           {arr?.map((item) => (
//             <div
//               key={item.name}
//               className="flex flex-col gap-2 mt-4 px-1 w-full md:w-1/2"
//             >
//               <label className="font-bold text-[15px] text-[#364153] px-1">
//                 {item.label}
//               </label>

//               <div className="relative">
//                 <input
//                   name={item.name}
//                   type={
//                     item.name === "password"
//                       ? showPassword
//                         ? "text"
//                         : "password"
//                       : "text"
//                   }
//                   placeholder={item.description}
//                   value={formData[item.name]}
//                   onChange={handleChange}
//                   className={`border p-3 my-1 rounded-lg text-[14px] w-full ${
//                     item.name === "password"
//                       ? i18next.language === "en"
//                         ? "pr-10"
//                         : "pl-10"
//                       : ""
//                   }`}
//                 />

//                 {item.name === "password" && (
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className={`absolute ${
//                       i18next.language === "en" ? "right-3" : "left-3"
//                     } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
//                   >
//                     {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//                   </span>
//                 )}
//               </div>

//               {item.forget && (
//                 <Link
//                   to="/forget-pass"
//                   className={`block text-sm text-[#007870ae] ${
//                     i18next.language === "en" ? "text-left" : "text-right"
//                   }`}
//                 >
//                   {item.forget}
//                 </Link>
//               )}

//               {errors[item.name] && (
//                 <p className="text-red-500 text-sm">{errors[item.name]}</p>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col gap-2 w-full px-1 mt-3">
//           <label className="font-bold text-[16px] text-[#364153] px-1">
//             {t("branch_label")}
//           </label>

//           <Select
//             options={branchOptions}
//             value={
//               branchOptions.find((option) => option.value === formData.branch) ||
//               null
//             }
//             onChange={(selectedOption) => {
//               setFormData({
//                 ...formData,
//                 branch: selectedOption?.value || "",
//               });

//               setErrors((prev) => ({
//                 ...prev,
//                 branch: "",
//               }));
//             }}
//             placeholder={t("select_branch")}
//             styles={{
//               option: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: state.isSelected
//                   ? "#00786F"
//                   : state.isFocused
//                   ? "#EAF3F1"
//                   : "white",
//                 color: state.isSelected ? "white" : "black",
//               }),
//             }}
//           />

//           {errors.branch && (
//             <p className="text-red-500 text-sm">{errors.branch}</p>
//           )}
//         </div>

//         {apiError && (
//           <p className="text-red-500 text-sm text-center mt-3">{apiError}</p>
//         )}

//         <button
//           type="button"
//           onClick={handleLogin}
//           className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3"
//         >
//           {t("login")}
//         </button>

//         <p className="text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1 flex-wrap">
//           {t("dont_have_account")}
//           <Link
//             to="/register"
//             className="text-[#00786F] font-semibold underline"
//           >
//             {t("sign_up_now")}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import H_one_register from "../Shared_Component/H_one_register";
import { TbLogin } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { LoginApi } from "../../axiosConfig/APIs/Auth/Login";
import { Get_profile } from "../../axiosConfig/APIs/Profile/Profile";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import i18next from "i18next";
import { useBranch } from "../../context/BranchContext";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { changeBranch, branches } = useBranch();

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    branch: "",
  });

  const branchOptions =
    branches?.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })) || [];

  const arr = [
    {
      name: "username",
      label: t("username_label"),
      description: t("username_placeholder"),
    },
    {
      name: "password",
      label: t("password_label"),
      description: t("password_placeholder"),
      forget: t("forget_password"),
    },
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t("username_required");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("password_required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("password_min_length");
    }

    if (!String(formData.branch || "").trim()) {
      newErrors.branch = t("branch_required");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  };

  const handleBranchChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      branch: selectedOption?.value || "",
    }));

    setErrors((prev) => ({
      ...prev,
      branch: "",
    }));

    setApiError("");
  };

  const handleLogin = async () => {
    setApiError("");

    const isValid = validate();

    if (!isValid || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await LoginApi(formData);

      if (!response?.message?.success) {
        setApiError(
          response?.message?.message || "Invalid username or password"
        );
        return;
      }

      const loginData = response.message;

      const token = loginData?.token;
      const user = loginData?.user || {};
      const customer = loginData?.customer || {};
      const branchId = loginData?.branchId || formData.branch;

      if (!token) {
        setApiError("Login token was not returned");
        return;
      }

      /*
        مهم جدًا:
        لازم نحفظ الـ token الأول لأن Get_profile
        غالبًا يحتاجه داخل Authorization Header.
      */
      localStorage.setItem("token", token);

      /*
        ندمج user و customer ونخزنهم مؤقتًا،
        عشان حتى لو Profile API فشل يفضل فيه بيانات مستخدم.
      */
      let savedUser = {
        ...customer,
        ...user,

        fullName:
          user?.fullName ||
          customer?.fullName ||
          user?.name ||
          customer?.name ||
          "",

        profileImage:
          user?.profileImage ||
          customer?.profileImage ||
          user?.image ||
          customer?.image ||
          "",
      };

      localStorage.setItem("user", JSON.stringify(savedUser));

      /*
        نجيب بيانات البروفايل كاملة قبل الانتقال،
        وبكده Navbar يقرأ الصورة والاسم مباشرة.
      */
      try {
        const profileResponse = await Get_profile();

        const profileData =
          profileResponse?.message?.data ||
          profileResponse?.message?.user ||
          profileResponse?.data ||
          null;

        if (profileData) {
          savedUser = {
            ...savedUser,
            ...profileData,

            fullName:
              profileData?.fullName ||
              profileData?.name ||
              savedUser?.fullName ||
              "",

            profileImage:
              profileData?.profileImage ||
              profileData?.image ||
              profileData?.photo ||
              savedUser?.profileImage ||
              "",
          };

          localStorage.setItem("user", JSON.stringify(savedUser));
        }
      } catch (profileError) {
        console.error("Profile loading error:", profileError);

        /*
          هنا مش بنوقف تسجيل الدخول،
          هنستخدم بيانات Login المحفوظة.
        */
      }

      localStorage.setItem("customer", JSON.stringify(customer));

      changeBranch(branchId);

      /*
        بعد ما كل البيانات اتخزنت نبلغ Navbar بالتحديث.
      */
      window.dispatchEvent(new Event("userUpdated"));

      const selectedBranch = branches?.find(
        (branch) => String(branch.id) === String(branchId)
      );

      navigate(`/about-branches/${branchId}`, {
        replace: true,
        state: {
          branchId,
          branchName: selectedBranch?.name || "",
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      const errorData = error?.response?.data;

      setApiError(
        errorData?.message?.message ||
          errorData?.message ||
          "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border p-7 shadow-2xl md:w-[70%] lg:w-[50%]">
        <span className="rounded-full bg-gradient-to-br from-[#08AC85DB] to-[#00786F] p-4 text-[30px] text-white">
          <TbLogin />
        </span>

        <H_one_register title={t("login")} />

        <p className="text-center text-[14px] text-[#6A7282]">
          {t("member_login_prompt")}
        </p>

        <div className="flex w-full flex-wrap">
          {arr.map((item) => (
            <div
              key={item.name}
              className="mt-4 flex w-full flex-col gap-2 px-1 md:w-1/2"
            >
              <label className="px-1 text-[15px] font-bold text-[#364153]">
                {item.label}
              </label>

              <div className="relative">
                <input
                  name={item.name}
                  type={
                    item.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  placeholder={item.description}
                  value={formData[item.name]}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  autoComplete={
                    item.name === "password"
                      ? "current-password"
                      : "username"
                  }
                  className={`my-1 w-full rounded-lg border p-3 text-[14px] outline-none transition focus:border-[#00786F] ${
                    item.name === "password"
                      ? i18next.language === "en"
                        ? "pr-10"
                        : "pl-10"
                      : ""
                  } ${
                    isLoading
                      ? "cursor-not-allowed bg-gray-100"
                      : "bg-white"
                  }`}
                />

                {item.name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className={`absolute top-1/2 -translate-y-1/2 cursor-pointer text-[#00786F] ${
                      i18next.language === "en" ? "right-3" : "left-3"
                    }`}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                )}
              </div>

              {item.forget && (
                <Link
                  to="/forget-pass"
                  className={`block text-sm text-[#007870ae] ${
                    i18next.language === "en"
                      ? "text-left"
                      : "text-right"
                  }`}
                >
                  {item.forget}
                </Link>
              )}

              {errors[item.name] && (
                <p className="text-sm text-red-500">
                  {errors[item.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex w-full flex-col gap-2 px-1">
          <label className="px-1 text-[16px] font-bold text-[#364153]">
            {t("branch_label")}
          </label>

          <Select
            options={branchOptions}
            value={
              branchOptions.find(
                (option) =>
                  String(option.value) === String(formData.branch)
              ) || null
            }
            onChange={handleBranchChange}
            isDisabled={isLoading}
            placeholder={t("select_branch")}
            styles={{
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#00786F"
                  : state.isFocused
                  ? "#EAF3F1"
                  : "white",
                color: state.isSelected ? "white" : "black",
              }),
            }}
          />

          {errors.branch && (
            <p className="text-sm text-red-500">{errors.branch}</p>
          )}
        </div>

        {apiError && (
          <p className="mt-3 text-center text-sm text-red-500">
            {apiError}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className={`mt-5 flex w-full justify-center gap-3 rounded-xl bg-gradient-to-r from-[#08AC85DB] to-[#00786F] px-5 py-3 font-semibold text-white transition ${
            isLoading
              ? "cursor-not-allowed opacity-70"
              : "hover:opacity-90"
          }`}
        >
          {isLoading ? t("loading") : t("login")}
        </button>

        <p className="flex flex-wrap justify-center gap-1 pt-3 text-[14px] text-[#5B626E]">
          {t("dont_have_account")}

          <Link
            to="/register"
            className="font-semibold text-[#00786F] underline"
          >
            {t("sign_up_now")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;