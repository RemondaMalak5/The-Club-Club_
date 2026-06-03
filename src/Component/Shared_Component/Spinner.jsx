import React from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
    const { t } = useTranslation();
  return (
      <div className=" p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3 h-full justify-center">
        <FaSpinner 
          className="animate-spin text-5xl text-[#08AC85]"
            style={{ animationDuration: "2s" }}

        />
        <p className="text-[#364153] font-medium">
{t(" Loading...")}        </p>
    </div>
  );
};

export default Spinner;