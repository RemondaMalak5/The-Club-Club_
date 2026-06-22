import React, { useContext, useState } from "react";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import H_one_register from "../../Shared_Component/H_one_register";
import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Step_1_validation } from "../../../axiosConfig/APIs/Auth/Register/Step_1_Validate_Input";
import { UserTokenContext } from "../../../context/UserContext";
import { Send_OTP } from "../../../axiosConfig/APIs/Auth/Register/Send_OTP";
import i18next from "i18next";
import Select from "react-select";

const Register_Geust = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { saveToken } = useContext(UserTokenContext);
    const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    branch: "",
    full_name: "",
    national_id: "",
    phone: "",
    email: "",
    language: "en",
  });
  const [errors, setErrors] = useState({});

  const arr = [
    {
      label: t("full_name_label"),
      name: "full_name",
      placeholder: t("full_name_placeholder"),
    },
    {
      label: t("phone_label"),
      name: "phone",
      placeholder: t("phone_placeholder"),
    },
    {
      label: t("national_id_label"),
      name: "national_id",
      placeholder: t("national_id_placeholder"),
    },

    {
      label: t("email_label"),
      name: "email",
      placeholder: t("email_placeholder"),
    },
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "full_name":
        if (!value.trim()) return t("full_name_required");
        if (value.trim().length < 3) return t("full_name_min_length");
        return "";

      case "phone":
        if (!value.trim()) return t("phone_required");

        if (!/^01[0125][0-9]{8}$/.test(value)) return t("phone_invalid");

        return "";

      case "national_id":
        if (!value.trim()) return t("national_id_required");

        if (!/^\d{14}$/.test(value)) return t("national_id_invalid");

        return "";

      case "branch":
        if (!value.trim()) return t("branch_required");
        return "";

      case "email":
        if (!value.trim()) return t("email_required");

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return t("email_invalid");

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

    // validate instantly
    const errorMessage = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

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
  const handleVerify = async (receivedToken) => {
    try {
      const body = {
        registration_token: receivedToken,
        language: i18next.language,
      };

      const response = await Send_OTP(body);
      console.log("responseresponseresponseresponseresponse", response);
      navigate("/otp-guest", {
        state: {
          formData: formData,
        },
      });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const handleSubmit = async () => {
    console.log("formData", formData);

    if (!validateForm()) {
      console.log("Validation Failed");
      return;
    }

    console.log("Validation Passed");

    try {
      setLoading(true);

      const response = await Step_1_validation(formData);

      console.log("Success:", response);

      const receivedToken = response?.message?.registration_token;

      if (receivedToken) {
        saveToken(receivedToken);
        await handleVerify(receivedToken);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title={t("register_as_guest")} currentStep={currentStep} totalSteps={4}  onStepClick={(step) => setCurrentStep(step)}/>

      <div className="border p-7 lg:w-[50%] w-full flex flex-col gap-3 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
            <BsPersonPlus />
          </span>

          <H_one_register title={t("register_as_guest")} />

          <p className="font-semibold text-[16px] text-[#5B626E] text-center">
            {t("guest_membership_prompt")}
          </p>
        </div>

        <div className="flex flex-wrap w-full ">
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-4  w-full md:w-1/2 px-2">
              <label>{item.label}</label>

              <input
                type="text"
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className={`border p-2 rounded-lg outline-none transition-all
                ${errors[item.name] ? "border-red-500" : "border-gray-300"}`}
                placeholder={item.placeholder}
              />

              {errors[item.name] && (
                <span className="text-red-500 text-sm">
                  {errors[item.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        <Select
          options={[
            {
              value: "The Club - New Capital",
              label: "The Club - New Capital",
            },
            { value: "The Club- Sheraton", label: "The Club- Sheraton" },
            {
              value: "نادي النادي - 6 اكتوبر",
              label: "نادي النادي - 6 اكتوبر",
            },
          ]}
          value={
            formData.branch
              ? {
                  value: formData.branch,
                  label: formData.branch,
                }
              : null
          }
          onChange={(selectedOption) => {
            setFormData((prev) => ({
              ...prev,
              branch: selectedOption?.value || "",
            }));

            setErrors((prev) => ({
              ...prev,
              branch: "",
            }));
          }}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#FFA811"
                : state.isFocused
                  ? "#FFE0B2"
                  : "white",
              color: state.isSelected ? "white" : "black",
            }),
          }}
        />

        {errors.general && (
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1 disabled:opacity-50"
        >
          {loading ? t("sending") : t("next")}

          <span className="text-[19px]">
            <IoIosArrowRoundBack />
          </span>
        </button>

        <Already_Have_Account />
      </div>
    </div>
  );
};

export default Register_Geust;
