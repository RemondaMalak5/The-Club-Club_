import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import H_one_register from "../../Shared_Component/H_one_register";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Create_Account } from "../../../axiosConfig/APIs/Auth/Register/Create_Account";
import { UserTokenContext } from "../../../context/UserContext";

const Account_setup = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useContext(UserTokenContext);

  const registration_token = token;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    language: "en",
  });

  const [errors, setErrors] = useState({});

  const arr = [
    {
      label: t('username_label'),
      name: "username",
      type: "text",
      placeholder: t('username_placeholder'),
    },
    {
      label: t('password_label'),
      name: "password",
      type: "password",
      placeholder: t('password_placeholder'),
    },
    {
      label: t('confirm_password_label'),
      name: "confirm_password",
      type: "password",
      placeholder: t('password_placeholder'),
    },
  ];

  // validation
  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value.trim())
          return t('username_required');

        if (value.length < 4)
          return t('username_min_length');

        return "";

      case "password":
        if (!value)
          return t('password_required');

        if (value.length < 8)
          return t('password_min_length');

        return "";

      case "confirm_password":
        if (!value)
          return t('confirm_password_required');

        if (value !== formData.password)
          return t('confirm_password_mismatch');

        return "";

      default:
        return "";
    }
  };

  // realtime validation
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

    // check confirm password again
    if (
      name === "password" &&
      formData.confirm_password
    ) {
      setErrors((prev) => ({
        ...prev,
        confirm_password:
          value !== formData.confirm_password
            ? t('confirm_password_mismatch')
            : "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "language") {
        const error = validateField(
          key,
          formData[key]
        );

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

    try {
      setLoading(true);

      const body = {
        registration_token: registration_token,
        username: formData.username,
        password: formData.password,
        confirm_password:
          formData.confirm_password,
        language: i18n.language,
      };

      console.log("body", body)

      const response = await Create_Account(body);

      console.log(response);

      navigate("/profile");
    } catch (error) {
      console.log(error?.response?.data);

      setErrors({
        general:
          error?.response?.data?.message?.error ||
          t('create_account_error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange
        title={t('account_settings')}
        currentStep={3}
      />

      <div className="border p-7 lg:w-[50%] w-full flex flex-col gap-3 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
            <BsPersonPlus />
          </span>

          <H_one_register title={t('account_settings')} />

          <p className="text-[16px] text-[#5B626E]">
            {t('create_username_password')}
          </p>
        </div>

        <div>
          {arr.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 mt-4"
            >
              <label className="font-medium text-[16px] text-[#364153]">
                {item.label}
              </label>

              <input
                type={item.type}
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                placeholder={item.placeholder}
                className={`border p-2 rounded-lg text-[14px] text-[#5B626E] outline-none
                ${errors[item.name]
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              />

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
          className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1 disabled:opacity-50"
        >
          {loading ? t('creating_account') : t('next')}

          <span className="text-[19px]">
            <IoIosArrowRoundBack />
          </span>
        </button>

        <Already_Have_Account />
      </div>
    </div>
  );
};

export default Account_setup;