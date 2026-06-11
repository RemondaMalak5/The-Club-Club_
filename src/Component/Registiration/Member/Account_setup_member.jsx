import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import H_one_register from "../../Shared_Component/H_one_register";
import { useNavigate } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
import Stepper_green from "../../Shared_Component/Stepper_green";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Create_Account } from "../../../axiosConfig/APIs/Auth/Register/Create_Account";
import { UserTokenContext } from "../../../context/UserContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Account_setup_member = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(UserTokenContext);

  const [currentStep, setCurrentStep] = useState(4);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    language: i18n.language,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const arr = [
    {
      label: t("username_label"),
      name: "username",
      type: "text",
      placeholder: t("username_placeholder"),
    },
    {
      label: t("password_label"),
      name: "password",
      type: "password",
      placeholder: t("password_placeholder"),
    },
    {
      label: t("confirm_password_label"),
      name: "confirm_password",
      type: "password",
      placeholder: t("password_placeholder"),
    },
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value.trim()) return t("username_required");
        if (value.length < 4) return t("username_min_length");
        return "";

      case "password":
        if (!value) return t("password_required");
        if (value.length < 8) return t("password_min_length");
        return "";

      case "confirm_password":
        if (!value) return t("confirm_password_required");
        if (value !== formData.password)
          return t("confirm_password_mismatch");
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMessage = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    if (name === "password" && formData.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password:
          value !== formData.confirm_password
            ? t("confirm_password_mismatch")
            : "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "language") {
        const error = validateField(key, formData[key]);

        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!token) {
      setErrors({
        general: "رمز التسجيل غير موجود، الرجاء إعادة المحاولة",
      });
      return;
    }

    try {
      setLoading(true);

      const body = {
        registration_token: token,
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirm_password,
        language: i18n.language,
      };

      await Create_Account(body);

      navigate("/profile");
    } catch (error) {
      const apiError =
        error?.response?.data?.message?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        t("create_account_error");

      setErrors({
        general: apiError,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_green
        currentStep={currentStep}
        totalSteps={4}
        title={t("account_settings")}
        onStepClick={(step) => setCurrentStep(step)}
      />

      <div className="border p-7 w-[50%] flex flex-col gap-3 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <span className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]">
            <BsPersonPlus />
          </span>

          <H_one_register title={t("account_settings")} />

          <p className="text-[16px] text-[#5B626E]">
            {t("create_username_password")}
          </p>
        </div>

        <div>
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-4">
              <label className="font-medium text-[16px] text-[#364153] flex gap-1">
                {item.label}
                <span className="text-[#00786F] text-[18px]">*</span>
              </label>

              <div className="relative">
                <input
                  type={
                    item.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.name === "confirm_password"
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : item.type
                  }
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  className={`border p-2 rounded-lg text-[14px] text-[#5B626E] outline-none w-full ${
                    item.name === "password" ||
                    item.name === "confirm_password"
                      ? i18n.language === "en"
                        ? "pr-10"
                        : "pl-10"
                      : ""
                  } ${
                    errors[item.name]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {item.name === "password" && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${
                      i18n.language === "en"
                        ? "right-3"
                        : "left-3"
                    } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
                  >
                    {showPassword ? (
                      <FaRegEye />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </span>
                )}

                {item.name === "confirm_password" && (
                  <span
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className={`absolute ${
                      i18n.language === "en"
                        ? "right-3"
                        : "left-3"
                    } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
                  >
                    {showConfirmPassword ? (
                      <FaRegEye />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </span>
                )}
              </div>

              {errors[item.name] && (
                <span className="text-red-500 text-sm">
                  {errors[item.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm text-center">
            {errors.general}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1 disabled:opacity-50"
        >
          {loading ? t("creating_account") : t("next")}
          <span className="text-[19px]">
            <IoIosArrowRoundBack />
          </span>
        </button>

        <Already_Have_Account />
      </div>
    </div>
  );
};

export default Account_setup_member;