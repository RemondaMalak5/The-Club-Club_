import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import H_one_register from "../Shared_Component/H_one_register";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Reset_password } from "../../axiosConfig/APIs/Auth/Forget_pass/Reset_password";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { usePopup } from "../../context/PopupContext";
import { GiConfirmed } from "react-icons/gi";

const Reset_pass = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetToken =
    location.state?.resetToken ||
    location.state?.formData?.resetToken ||
    "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const { showPopup, closePopup } = usePopup();
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
  const handleReset = async () => {
  setError("");

  if (!newPassword || !confirmPassword) {
    setError(t("passwords_required"));
    return;
  }
   if (newPassword !== confirmPassword) {
    setError(t("confirm_password_mismatch"));
    return;
  }

  if (!passwordRegex.test(newPassword)) {
  setError(t("password_rules"));
  return;
}

  try {
    const body = {
      resetToken: resetToken,
      new_password: newPassword,
      confirm_password: confirmPassword,
      language: i18n.language,
    };

    const response = await Reset_password(body);

    showPopup({
      title: t("reset_success_title"),
      message: t("reset_success_message"),
      icon: <GiConfirmed />,
    });

   setTimeout(() => {
  closePopup();
}, 2000);

setTimeout(() => {
  navigate("/login");
}, 2200);
  } catch (error) {
    

    setError(
      error?.response?.data?.message?.error ||
      error?.response?.data?.message?.message ||
      error?.response?.data?.error ||
      t("reset_error_message")
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="border p-7 w-full md:w-[70%] lg:w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl">
        <span className="bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]">
          <TbLockPassword />
        </span>

        <H_one_register title={t("reset_password_title")} />

        <p className="text-[14px] text-[#6A7282] text-center">
          {t("reset_password_instruction")}
        </p>

        
  <label className="font-bold text-[15px] text-[#364153] px-1 w-full block">
          {t("new_password_label")}
        </label>
       <div className="relative w-full">
      
  <input
    className="border p-3 rounded-lg text-[14px] w-full"
    type={showPassword ? "text" : "password"}
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder={t("new_password_placeholder")}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className={`absolute ${
      i18n.language === "en" ? "right-3" : "left-3"
    } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
  >
    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
  </span>
</div>

        <label className="font-bold text-[15px] text-[#364153] px-1 w-full block">
          {t("confirm_new_password_label")}
        </label>
<div className="relative w-full">
  <input
    className="border p-3 rounded-lg text-[14px] w-full"
    type={showConfirmPassword ? "text" : "password"}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder={t("confirm_new_password_placeholder")}
  />

  <span
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className={`absolute ${
      i18n.language === "en" ? "right-3" : "left-3"
    } top-1/2 -translate-y-1/2 text-[#00786F] cursor-pointer`}
  >
    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
  </span>
</div>
        

        {error && <p className="text-red-500 text-sm w-full">{error}</p>}

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3 disabled:opacity-60"
        >
          {loading ? t("loading") : t("send_message_btn")}
        </button>
      </div>
    </div>
  );
};

export default Reset_pass;