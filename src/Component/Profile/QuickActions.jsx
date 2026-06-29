import i18next from "i18next";
import React from "react";
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
  const inputs = [
    { title: " حجز نشاط / خدمه", linkto: "/contact", icon: <CiCirclePlus /> },
    { title: "تجديد العضوية", linkto: "/contact", icon: <FaRegIdCard /> },
    { title: "تواصل معنا", linkto: "/contact", icon: <MdPermPhoneMsg /> },
  ];
  return (
    <div className="bg-white rounded-xl p-4 shadow border ">
      <h3 className="font-bold text-[20px] mb-3"> إجراءات سريعة</h3>

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
