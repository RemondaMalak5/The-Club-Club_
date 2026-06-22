import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuShield } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import H_one_register from "../Shared_Component/H_one_register";
import { Forget_otp } from "../../axiosConfig/APIs/Auth/Forget_pass/OTP";

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

  const maskedPhone = phone ? phone.replace(/\d(?=\d{4})/g, "*") : "***5678";

  const getErrorMessage = (error, fallback = "حدث خطأ، حاول مرة أخرى") => {
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
      setError("رقم الهاتف غير موجود، الرجاء إعادة المحاولة");
      return;
    }

    try {
      setLoading(true);

      const body = {
        phone,
        otp_code: otpCode,
        branch: "sheraton",
        language: i18n.language,
      };

      const response = await Forget_otp(body);

      navigate("/reset-password", {
        state: {
          formData: {
            ...formData,
            phone,
          },
          otpCode,
          token: response?.message?.token || response?.token,
        },
      });
    } catch (error) {
      setError(getErrorMessage(error, t("invalid_otp")));
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

        <div className="flex gap-3" dir="ltr" onPaste={handlePaste}>
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
              className={`border rounded-lg w-16 h-16 text-center text-[18px] outline-none ${
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
      </div>
    </div>
  );
};

export default Cheak_Otp;