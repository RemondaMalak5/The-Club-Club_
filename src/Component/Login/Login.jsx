import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import H_one_register from "../Shared_Component/H_one_register";
import { TbLogin } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { LoginApi } from "../../axiosConfig/APIs/Auth/Login";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import i18next from "i18next";
import { useBranch } from "../../context/BranchContext";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
 const { changeBranch ,branches } = useBranch();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    branch: "",
  });

  const branchOptions = [
    { value: "The Club - New Capital", label: "The Club - New Capital" },
    { value: "The Club- Sheraton", label: "The Club- Sheraton" },
    { value: "نادي النادي - 6 اكتوبر", label: "نادي النادي - 6 اكتوبر" },
  ];

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
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t("username_required");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("password_required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("password_min_length");
    }

    if (!formData.branch.trim()) {
      newErrors.branch = t("branch_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = async () => {
    setApiError("");

    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await LoginApi(formData);

 if (response?.message?.success) {
  const user = response.message.user;
  const customer = response.message.customer;

  const savedUser = {
    ...user,
    profileImage: user?.profileImage || customer?.profileImage || "",
  };

  const branchId = response.message.branch ;

  localStorage.setItem("token", response.message.token);
  localStorage.setItem("user", JSON.stringify(savedUser));

  changeBranch(branchId);

  window.dispatchEvent(new Event("userUpdated"));
console.log("response:", response);
console.log("user:", user);
console.log("customer:", customer);
console.log("branchId:", branchId);
  navigate(`/about-branches/${branchId}`);

};
    } catch (error) {
      const data = error?.response?.data;
        setApiError("Invalid username or password");

      // setApiError(
      //   typeof data?.message === "string"
      //     ? data.message
      //     : typeof data?.error === "string"
      //     ? data.error
      //     : "Login failed"
      // );
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="border p-7 w-full md:w-[70%] lg:w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl">
        <span className="bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]">
          <TbLogin />
        </span>

        <H_one_register title={t("login")} />

        <p className="text-[14px] text-[#6A7282] text-center">
          {t("member_login_prompt")}
        </p>

        <div className="w-full flex flex-wrap">
          {arr?.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-2 mt-4 px-1 w-full md:w-1/2"
            >
              <label className="font-bold text-[15px] text-[#364153] px-1">
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
                  className={`border p-3 my-1 rounded-lg text-[14px] w-full ${
                    item.name === "password"
                      ? i18next.language === "en"
                        ? "pr-10"
                        : "pl-10"
                      : ""
                  }`}
                />

                {item.name === "password" && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${
                      i18next.language === "en" ? "right-3" : "left-3"
                    } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                )}
              </div>

              {item.forget && (
                <Link
                  to="/forget-pass"
                  className={`block text-sm text-[#007870ae] ${
                    i18next.language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  {item.forget}
                </Link>
              )}

              {errors[item.name] && (
                <p className="text-red-500 text-sm">{errors[item.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 w-full px-1 mt-3">
          <label className="font-bold text-[16px] text-[#364153] px-1">
            {t("branch_label")}
          </label>

          <Select
            options={branchOptions}
            value={
              branchOptions.find((option) => option.value === formData.branch) ||
              null
            }
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                branch: selectedOption?.value || "",
              });

              setErrors((prev) => ({
                ...prev,
                branch: "",
              }));
            }}
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
            <p className="text-red-500 text-sm">{errors.branch}</p>
          )}
        </div>

        {apiError && (
          <p className="text-red-500 text-sm text-center mt-3">{apiError}</p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3"
        >
          {t("login")}
        </button>

        <p className="text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1 flex-wrap">
          {t("dont_have_account")}
          <Link
            to="/register"
            className="text-[#00786F] font-semibold underline"
          >
            {t("sign_up_now")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;