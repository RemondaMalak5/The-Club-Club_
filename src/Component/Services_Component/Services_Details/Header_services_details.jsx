import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Left_side from "./Left_side";
import Right_side from "./Right_side";

const Header_services_details = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;

  return (
    <div className="bg-[#f8faf9]" >
      <div
        onClick={() => navigate("/services")}
        className="w-full flex items-center gap-2 text-[24px] md:text-[30px] py-4 px-4 md:px-10 cursor-pointer"
      >
        {i18n.language === "ar" ? <IoMdArrowForward /> : <IoMdArrowBack />}
        <p className="font-bold text-gray-800">{service?.title || "تفاصيل الخدمة"}</p>
      </div>

      <img
        src={service?.image || service?.cover_photo}
        alt={service?.title || "Service"}
        className="w-full h-[320px] md:h-[380px] object-cover"
        loading="lazy"
      />

      <div className="px-4 md:px-10 py-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm">{service?.category || "خدمة"}</span>
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm">{service?.branchName || "فرع"}</span>
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm">{service?.start_date || "موعد متاح"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Left_side data={service} />
          </div>
          <div className="lg:col-span-5">
            <Right_side data={service} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_services_details;
