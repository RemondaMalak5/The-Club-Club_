// import React from "react";
// import Stepper_orange from "../../Shared_Component/Stepper_orange";
// import { BsPersonPlus } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import H_one_register from "../../Shared_Component/H_one_register";
// import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
// import { IoIosArrowRoundBack } from "react-icons/io";

// const Register_Geust = () => {
//   const navigate = useNavigate();
//   const arr = [
//     { label: "الاسم بالكامل ", description: "ادخل الاسم بالكامل" },
//     { label: "رقم الهاتف", description: "1755415336  " },
//     { label: "البريد الإلكتروني", description: "ادخل البريد الإلكتروني" },
//     { label: "الرقم القومى ", description: "13456789134" },
//   ];
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <Stepper_orange title="تسجيل كضيف" />
//       <div className="border p-7 w-[50%] flex flex-col gap-3  rounded-xl shadow-2xl">
//         <div className="flex flex-col items-center justify-center">
//           <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
//             <BsPersonPlus />
//           </span>
//           <H_one_register title="تسجيل كضيف" />
//           <p className="font-semibold text-[16px] text-[#5B626E]">
//             الرجاء إدخال بيانات العضوية للمتابعة
//           </p>
//         </div>

//         <div>
//           {arr.map((item, index) => (
//             <div key={index} className="flex flex-col gap-2 mt-4">
//               <label> {item.label}</label>
//               <input
//                 type="text"
//                 className="border p-2 rounded-lg"
//                 placeholder={item.description}
//               />
//             </div>
//           ))}
//         </div>
//         <button onClick={() => navigate("/otp-guest")} className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1">
//           التالى
//           <span className="text-[19px] "> <IoIosArrowRoundBack/> </span>
//         </button>
//         <Already_Have_Account/>
//       </div>
//     </div>
//   );
// };


// export default Register_Geust;

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

const Register_Geust = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
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
      label: t("branch_label"),
      name: "branch",
      placeholder: t("branch_placeholder"),
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
        if (value.trim().length < 3)
          return t("full_name_min_length");
        return "";

      case "phone":
        if (!value.trim()) return t("phone_required");

        if (!/^01[0125][0-9]{8}$/.test(value))
          return t("phone_invalid");

        return "";

      case "national_id":
        if (!value.trim()) return t("national_id_required");

        if (!/^\d{14}$/.test(value))
          return t("national_id_invalid");

        return "";

      case "branch":
        if (!value.trim()) return t("branch_required");
        return "";

      case "email":
        if (!value.trim()) return t("email_required");

        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        )
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
      console.log("responseresponseresponseresponseresponse", response)
      navigate("/otp-guest", response);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await Step_1_validation(formData);
      const receivedToken = response?.message?.registration_token;
      if (receivedToken) {
        saveToken(receivedToken);
        await handleVerify(receivedToken)
      }
    } catch (error) {
      console.log("الـ Object اللي راجع من السيرفر بالكامل:", error?.response?.data);

      const apiResponse = error?.response?.data;

      if (apiResponse && typeof apiResponse.error === 'object') {
        setErrors((prev) => ({
          ...prev,
          general: apiResponse.error?.message || t("form_error_invalid_data"),
        }));
      }
      else if (apiResponse && typeof apiResponse.error === 'string') {
        setErrors((prev) => ({
          ...prev,
          general: apiResponse.error,
        }));
      }
      else if (apiResponse && typeof apiResponse.message === 'string') {
        setErrors((prev) => ({
          ...prev,
          general: apiResponse.message,
        }));
      }
      else {
        setErrors((prev) => ({
          ...prev,
          general: t("form_error_retry"),
        }));
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title={t("register_as_guest")} />

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

        <div>
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-4">
              <label>{item.label}</label>

              <input
                type="text"
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className={`border p-2 rounded-lg outline-none transition-all
                ${errors[item.name]
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
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
