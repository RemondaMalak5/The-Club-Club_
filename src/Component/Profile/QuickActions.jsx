import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import {
  FaArrowCircleLeft,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaRegIdCard,
} from "react-icons/fa";
import { MdPermPhoneMsg } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const inputs = [
    { title: t("book_activity_or_service"), linkto: "/academy", icon: <CiCirclePlus /> },
    { title: t("renew_membership"), linkto: "", icon: <FaRegIdCard /> },
    { title: t("contact_us"), linkto: "/contact", icon: <MdPermPhoneMsg /> },
  ];
  return (
    <div className="bg-white rounded-xl p-4 shadow border ">
      <h3 className="font-bold text-[20px] mb-3">{t("quick_actions")}</h3>

      {inputs.map((item, i) => (
        <button
          key={i}
          onClick={() => navigate(item.linkto)}
          className="w-full justify-between border rounded-xl py-3 px-4 mb-3 flex items-center gap-3 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-full bg-[#00786F] text-white flex items-center justify-center text-2xl font-bold">
              {item.icon}
            </span>

            <span className="text-[18px] font-bold">{item.title}</span>
          </div>
          <span className="text-[18px]">
            {i18next.language === "ar" ? (
              <FaRegArrowAltCircleLeft />
            ) : (
              <FaRegArrowAltCircleRight />
            )}{" "}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
