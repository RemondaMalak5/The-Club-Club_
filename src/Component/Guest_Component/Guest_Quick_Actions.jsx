import React from "react";
import { useTranslation } from "react-i18next";
import { CiCirclePlus, CiLocationOn } from "react-icons/ci";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { MdOutlineSportsSoccer, MdPermPhoneMsg } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Guest_Quick_Actions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const actions = [
    {
      title: t("book_services"),
      action: () => navigate("/services"),
      icon: <CiCirclePlus />,
    },
    {
      title: t("book_activities"),
      action: () => navigate("/academy"),
      icon: <MdOutlineSportsSoccer />,
    },
    {
      title: t("our_branches"),
      action: () => navigate("/branches"),
      icon: <CiLocationOn />,
    },
    {
      title: t("contact_us"),
      action: () => navigate("/contact"),
      icon: <MdPermPhoneMsg />,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-xl font-bold">{t("quick_actions")}</h3>

      <div className="space-y-3">
        {actions.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={item.action}
            className="flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center rounded-full bg-[#00786F] p-3 text-2xl font-bold text-white">
                {item.icon}
              </span>
              <span className="text-base font-bold text-[#1E2939]">
                {item.title}
              </span>
            </div>

            <span className="text-lg text-[#00786F]">
              {i18n.language === "ar" ? (
                <FaRegArrowAltCircleLeft />
              ) : (
                <FaRegArrowAltCircleRight />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Guest_Quick_Actions;
