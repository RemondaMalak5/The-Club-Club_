import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import H_one_register from "../../Shared_Component/H_one_register";
import { LuShield } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { Send_OTP } from "../../../axiosConfig/APIs/Auth/Register/Send_OTP";
import { UserTokenContext } from "../../../context/UserContext";
import { Verify_Otp } from "../../../axiosConfig/APIs/Auth/Register/Step_2_Verify_OTP";

const Otp_Geust = ({ length = 6 }) => {
  const { t, i18n } = useTranslation();
  const inputsRef = useRef([]);
  const navigation = useNavigate();
  const location = useLocation();



  const [otp, setOtp] = useState(Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(56);
  const [error, setError] = useState("");

  const { token } = useContext(UserTokenContext);

  // ✅ تعديل: الـ console هنا هيشتغل فقط لما الصفحة تفتح أو التوكن يتغير، مش كل ثانية مع العداد

  // countdown
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
      inputsRef.current[index + 1].focus();
    }
    setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.split("");
    const newOtp = [...otp];

    otpArray.forEach((num, index) => {
      newOtp[index] = num;
    });

    setOtp(newOtp);
    const lastIndex = otpArray.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < length) {
      setError(t('invalid_otp_incomplete'));
      return;
    }

    try {
      setLoading(true);

      const body = {
        registration_token: token ,
        otp_code: otpCode,
        language: i18n.language,
      };

      console.log("body", body)

      const response = await Verify_Otp(body);
      navigation("/account-setup");
    } catch (error) {
      console.log("error");
setError(
  typeof error?.response?.data?.message === "string"
    ? error?.response?.data?.message
    : error?.response?.data?.error ||
      t('invalid_otp')
);    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);

      const body = {
        registration_token: token || token,
        language: i18n.language,
      };

      const response = await Send_OTP(body);
      console.log("otp resend:", response);

      setCounter(56);
      setOtp(Array(length).fill(""));
      inputsRef.current[0]?.focus();
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title={t('otp_verify_title')} currentStep={2} />

      <div className="border p-7 lg:w-[50%] w-full flex flex-col gap-3 justify-center items-center rounded-xl shadow-2xl">
        <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
          <LuShield />
        </span>

        <H_one_register title={t('otp_verify_title')} />

        <p className="text-[16px] text-[#5B626E] text-center">
          {t('otp_sent_to_phone', { phone: '***5678' })}
        </p>

        <p className="text-[16px] text-[#5B626E] pt-5">{t('enter_otp_code')}</p>

        <div className="flex gap-3" onPaste={handlePaste}>
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
              className={`border rounded-lg w-16 h-16 text-center text-[18px] outline-none
              ${error ? "border-red-500" : "border-gray-300"}`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-[#5B626E]">
          {counter > 0
            ? t('resend_after_seconds', { count: counter })
            : t('resend_otp_now')}
        </p>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mb-1 mt-5 disabled:opacity-50"
        >
          {loading ? t('verifying_otp') : t('verify')}
        </button>

        {/* ✅ تصحيح الـ onClick هنا */}
        <button
          onClick={handleResend}
          disabled={counter > 0 || loading}
          className="text-[#5B626E] border border-[#FF683B] font-bold py-3 px-5 rounded-lg w-full disabled:opacity-50"
        >
          {t('resend_otp')}
        </button>
      </div>
    </div>
  );
};

export default Otp_Geust;