import React from "react";
import { IoIosFlower } from "react-icons/io";
import { FaSquare } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineSportsSoccer, MdPersonAddAlt } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const About_home = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const topLinks = [
    { icon: <IoIosFlower />, text: t("family_club") },
    { icon: <FaSquare />, text: t("three_branches") },
    { icon: <FaSquare />, text: t("renew_membership") },
    { icon: <FaSquare />, text: t("member_profile") },
  ];

  const services = [
    {
      icon: <TiGroupOutline />,
      title: t("family_memberships"),
      desc: t("family_memberships_desc"),
    },
    {
      icon: <LuCalendarCheck />,
      title: t("instant_booking"),
      desc: t("instant_booking_desc"),
    },
    {
      icon: <MdOutlineSportsSoccer />,
      title: t("professional_academies"),
      desc: t("professional_academies_desc"),
    },
  ];

  const steps = [
    {
      num: "1",
      title: t("choose_membership"),
      desc: t("sign_up_now"),
    },
    {
      num: "2",
      title: t("choose_branch_or_service"),
      desc: t("select_appropriate_branch"),
    },
    {
      num: "3",
      title: t("complete_payment_and_book"),
      desc: t("enjoy_club_membership"),
    },
  ];

  return (
    <div className="mx-14 my-10 p-10 rounded-3xl border  shadow-md bg-gradient-to-l from-[#DBEFEA] via-[#EBF3F1] to-white flex flex-wrap justify-between gap-8">

      {/* left section */}
      <div className="flex flex-col justify-center gap-3 w-full lg:w-[60%]">

        {/* top links */}
        <div className="flex flex-wrap gap-3 text-[15px] text-[#36534C]">
          {topLinks.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="text-[#00786F] text-[12px]">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* title */}
        <h1 className="text-[38px] font-bold">{t("welcome_message")}</h1>

        {/* services */}
        <div className="flex flex-wrap gap-4">
          {services.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border rounded-xl p-3 shadow-sm"
            >
              <div className="p-3 rounded-md text-[22px] bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF]">
                {item.icon}
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-[15px]">{item.title}</span>
                <span className="text-[13px] text-[#6A7282]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2 font-bold">
          <button className="flex gap-2 items-center justify-center rounded-full px-10 py-4 
                   bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] 
                   text-white border border-[#00786F] 
                   hover:from-white hover:to-white hover:text-[#00786F] 
                   transition-colors duration-300">
  <MdPersonAddAlt />
  {t("sign_up_now")}
</button>

          <button onClick={() => navigation("/branches")} className="flex gap-2 items-center justify-center rounded-full px-10 py-4 
                     border border-[#00786F] text-black 
                     bg-white hover:bg-gradient-to-r hover:from-[rgba(8,172,133,0.86)] hover:to-[#00786F] 
                     hover:text-white transition-all duration-300">
            <FaMapLocationDot />
            {t("view_all_branches")}
          </button>
        </div>
      </div>

      {/* right section */}
      <div className="bg-white border rounded-2xl shadow-md p-6 w-full lg:w-[35%]">

        <h2 className="text-[18px] font-bold mb-4">{t("start_in_3_steps")}</h2>

        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border rounded-xl p-3"
            >
              <div className="px-5 py-3 flex items-center justify-center rounded-md bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF] font-bold">
                {step.num}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[16px]">{step.title}</span>
                <span className="text-[13px] text-gray-500">{step.desc}</span>
              </div>


            </div>
          ))}
        </div>

        <button className="w-full mt-5 bg-[#00786F] text-white py-2 rounded-lg hover:bg-[#00645c] transition">
          {t("book_activity_or_service")}
        </button>
      </div>
    </div>
  );
};

export default About_home;