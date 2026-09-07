import React from "react";
import { useTranslation } from "react-i18next";
// import { FaSpinner } from "react-icons/fa";
import { assets } from "../../assets/assets";
import {  ImSpinner8 } from "react-icons/im";

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      
      {/* Spinner + Logo */}
      <div className="relative w-32 h-32 flex items-center justify-center">

        {/* Spinner */}
<ImSpinner8
          className="absolute inset-0 m-auto w-full h-full text-[#08AC85] animate-spin"
          style={{
            animationDuration: "2s",
          }}
        />

        {/* Logo */}
        <div className="absolute w-24 h-24  rounded-full flex items-center justify-center z-10">
          <img
            src={assets.logo_club}
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

      </div>

      <p className="text-[#364153] font-medium">
        {t("Loading...")}
      </p>

    </div>
  );
};

export default Spinner;