import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { IoIosArrowRoundBack, IoIosFlower } from "react-icons/io";
import { FaSquare } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineSportsSoccer, MdPersonAddAlt } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import Title_1 from "../Shared_Component/Title_1";
import SubTitle from "../Shared_Component/SubTitle";
import { Navigate, useNavigate } from "react-router-dom";

const Booking_home = () => {
  const { t } = useTranslation();
  const Navigate =useNavigate();
  const topLinks = [
    { icon: <IoIosFlower />, text: t('family_club') },
    { icon: <FaSquare />, text: t('three_branches') },
    { icon: <FaSquare />, text: t('renew_membership') },
    { icon: <FaSquare />, text: t('member_profile') },
  ];

  const services = [
    {
      icon: <TiGroupOutline />,
      title: t('book_activities'),
      desc: t('activities_description'),
    },
    {
      icon: <LuCalendarCheck />,
      title: t('book_services'),
      desc: t('services_description'),
    },
    {
      icon: <MdOutlineSportsSoccer />,
      title: t('renew_membership'),
      desc: t('renewal_description'),
    },
    {
      icon: <TiGroupOutline />,
      title: t('member_profile'),
      desc: t('member_profile_description'),
      linkto :"/profile"
    },
  ];

  const steps = [
    {
      num: "1",
      date: "jan",
      title: t('karate_championship'),
      desc: t('karate_location'),
    },
    {
      num: "2",
      date: "jan",
      title: t('family_day'),
      desc: t('family_day_location'),
    },
    {
      num: "3",
      date: "jan",
      title: t('academy_trials'),
      desc: t('academy_trials_location'),
    },
  ];

  return (
    <div className="p-10 rounded-3xl border  shadow-md bg-gradient-to-l from-[#DBEFEA] via-[#EBF3F1] to-white flex flex-wrap justify-between gap-8">

      <div className="flex flex-col py-5 gap-3 w-full lg:w-[60%]">

        <h2 className="text-[36px] font-bold flex gap-1"> {t('book_online')} <Title_1 title={t('online')} />  </h2>
        <SubTitle SubTitle={t('booking_subtitle')} />
        <div className="flex flex-wrap py-2">
          {services.map((item, index) => (
            <div key={index} className="md:w-1/2 w-full  px-2 py-2 ">
              <div onClick={()=>Navigate(item.linkto)}
                key={index}
                className="flex items-center gap-3 justify-between  bg-white border rounded-xl px-5 py-4 shadow-sm " >
                <div className="flex gap-2">
                  <div className="p-3 rounded-md text-[22px] bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF]">
                    {item.icon}
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-bold text-[15px]">{item.title}</span>
                    <span className="text-[13px] text-[#6A7282]">{item.desc}</span>
                  </div>
                </div>

                <div className="flex justify-end text-[20px] ">
                  <IoIosArrowRoundBack />
                </div>
              </div>
            </div>

          ))}
        </div>

        <button className="mx-5 mt-5 bg-[#00786F] text-white py-4 rounded-xl hover:bg-[#00645c] transition">
          {t('view_member_dashboard')}
        </button>
      </div>

      <div className="bg-white border rounded-2xl shadow-md p-6 w-full lg:w-[35%]">
        <h2 className="font-bold text-[22px] bg-gradient-to-r from-[#08AC85DB] to-[#00786F] bg-clip-text text-transparent">{t('events_agenda')}</h2>
        <div className="flex flex-col gap-4  py-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border rounded-xl p-3"
            >
              <div className="px-5 py-3 flex flex-col items-center justify-center rounded-md bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF] font-bold">
                <span>{step.num}</span>
                <span>{step.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[16px]">{step.title}</span>
                <span className="text-[13px] text-gray-500">{step.desc}</span>
              </div>


            </div>
          ))}
        </div>

        <button  onClick={()=>Navigate("/services")}
        className="w-full mt-5 border border-[#00786F] text-[#36534C] py-2 rounded-lg  transition">
          {t('view_all_events')}
        </button>
      </div>
    </div>
  );
};

export default Booking_home;