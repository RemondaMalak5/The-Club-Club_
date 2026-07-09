import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuShield } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import H_one_register from "../Shared_Component/H_one_register";
import { Verify_Forgot_Password_OTP} from "../../axiosConfig/APIs/Auth/Forget_pass/OTP"
import { forget } from "../../axiosConfig/APIs/Auth/Forget_pass/Forget";
import i18next from "i18next";

const Cheak_Otp = ({ length = 6 }) => {
  const { t, i18n } = useTranslation();
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(56);
  const [error, setError] = useState("");

  const formData = location.state?.formData || {};
  const phone = formData?.phone || location.state?.phone || "";
const otpToken = formData?.otpToken || location.state?.otpToken || "";
  const maskedPhone = phone ? phone.replace(/\d(?=\d{4})/g, "*") : "***";

  const getErrorMessage = (error, fallback = t("generic_error")) => {
    const data = error?.response?.data;

    if (typeof data === "string") return data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;

    if (typeof data?.message?.message === "string") {
      return data.message.message;
    }

    if (typeof data?.message?.error === "string") {
      return data.message.error;
    }

    if (typeof data?.message?.status_code === "string") {
      return data.message.status_code;
    }

    return fallback;
  };

  useEffect(() => {
    if (counter <= 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedData) return;

    const newOtp = Array(length).fill("");

    pastedData.split("").forEach((num, index) => {
      newOtp[index] = num;
    });

    setOtp(newOtp);

    const focusIndex =
      pastedData.length >= length ? length - 1 : pastedData.length;

    inputsRef.current[focusIndex]?.focus();
    setError("");
  };

  const handleVerify = async () => {
  const otpCode = otp.join("");

  if (otpCode.length < length) {
    setError(t("invalid_otp_incomplete"));
    return;
  }

  if (!phone) {
    setError(t("phone_not_found_error"));
    return;
  }

  if (!otpToken) {
    setError(t("otp_token_missing"));
    return;
  }

  try {
    setLoading(true);

    const body = {
      otpToken,
      otp: otpCode,
      language: i18n.language,
    };

    console.log("verify body:", body);

    const response = await Verify_Forgot_Password_OTP(body);

    console.log("verify response:", response);

 const resetToken = response?.message?.resetToken;


    if (!resetToken) {
      setError(t("reset_token_missing"));
      return;
    }

    navigate("/reset-pass", {
      state: {
        resetToken,
        formData: {
          ...formData,
          phone,
          otpToken,
          resetToken,
        },
      },
    });
  } catch (error) {
    setError(getErrorMessage(error, t("invalid_otp")));
  } finally {
    setLoading(false);
  }
};




 const handleResend = async () => {
  if (!phone) {
    setError(t("phone_not_found_error"));
    return;
  }

  try {
    setLoading(true);

    const response = await forget({
      phone,
      branch: formData?.branch || "The Club - 6 October",
      language: i18n.language,
    });

    const newOtpToken = response?.message?.otpToken;

    navigate("/forget-otp", {
      replace: true,
      state: {
        formData: {
          ...formData,
          phone,
          otpToken: newOtpToken,
        },
      },
    });
   


    setCounter(56);
    setOtp(Array(length).fill(""));
    inputsRef.current[0]?.focus();
    setError("");
  } catch (error) {
    setError(getErrorMessage(error, t("resend_error")));
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border p-7 w-[50%] flex flex-col gap-3 justify-center items-center rounded-xl shadow-2xl">
        <span className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]">
          <LuShield />
        </span>

        <H_one_register title={t("otp_verify_title")} />

        <p className="text-[16px] text-[#5B626E] text-center">
          {t("otp_sent_to_phone", { phone: maskedPhone })}
        </p>

        <p className="text-[16px] text-[#5B626E] pt-5">
          {t("enter_otp_code")}
        </p>

        <div className="flex  gap-3" dir="ltr" onPaste={handlePaste}>
          {Array.from({ length }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`border rounded-lg xl:w-16 xl:h-16  sm:w-10 sm:h-10 w-5 h-5 text-center text-[18px] outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{String(error)}</p>}

        <p className="text-[#5B626E]">
          {counter > 0
            ? t("resend_after_seconds", { count: counter })
            : t("resend_otp_now")}
        </p>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-3 rounded-lg w-full mb-1 mt-5 disabled:opacity-50"
        >
          {loading ? t("verifying_otp") : t("verify")}
        </button>
          <button
          onClick={handleResend}
          disabled={counter > 0 || loading}
          className="text-[#5B626E] border border-[#08AC85DB] font-bold py-3 px-5 rounded-lg w-full disabled:opacity-50"
        >
          {t("resend_otp")}
        </button>
      </div>
    </div>
  );
};

export default Cheak_Otp;