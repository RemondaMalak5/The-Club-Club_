import React from "react";
import Btn_bg from "../Shared_Component/Btn_bg";
import { LuClock } from "react-icons/lu";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Map_component from "./Map_component";

const Branches_component = () => {
  const Branches = [
    {
      name: "العاصمة الإدارية الجديدة",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
    {
      name: "شيراتون المطار",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
    {
      name: "6 أكتوبر",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
  ];

  const timeWork = [
    { day: "الجمعة", hours: "7:00 ص - 12:00 م" },
    { day: "السبت", hours: "6:00 ص - 12:00 م" },
    { day: "الأحد - الخميس", hours: "6:00 ص - 11:00 م" },
  ];

  return (
    <div className="px-6 md:px-14 py-5">
      <h1 className="text-[28px] md:text-[32px] font-bold text-[#11181C] pb-5">
        الفروع والخريطة
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 p-4 border rounded-xl border-[#E5E7EB] shadow-sm">
          <h2 className="text-[22px] md:text-[24px] font-bold text-[#11181C] pb-3 text-center">
            فروعنا
          </h2>

          {Branches.map((branch, index) => (
            <div
              key={index}
              className="border rounded-xl my-2 border-[#E5E7EB] p-4 flex flex-col md:flex-row md:justify-between gap-3"
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-[16px] md:text-[18px] font-bold">
                  {branch.name}
                </h2>

                <p className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-[#6A7282] text-[14px]">
                  {branch.address}
                  <span className="text-[#008236] underline">
                    {branch.phone}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3">
                  <Btn_bg btn={"احجز نشاط"} />
                  <button className="border border-[#00786F] rounded-xl px-5 py-2 text-[#6A7282]">
                    احجز خدمه
                  </button>
                </div>
              </div>

              <div className="self-start ">
                <h2 className="bg-[#EFF4F2] text-[#1E2939] rounded-full px-4 py-1 font-semibold text-sm">
                  Open
                </h2>
              </div>
            </div>
          ))}

          <p className="bg-[#EFF4F2] p-4 rounded-lg mt-3 text-[#6A7282] text-[14px] md:text-[16px]">
            * الإحداثيات المستخدمة تقريبية ويمكن تعديلها لعنوان الفرع الحقيقي.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto rounded-2xl overflow-hidden sticky  ">
          <Map_component />
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-6 mt-10">
        {Branches.map((branch, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 max-w-sm w-full relative hover:scale-105 transition border border-[#E5E7EB]"
          >
            <span className="absolute left-4 top-4 bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm">
              Open
            </span>

            <h2 className="text-xl font-bold text-gray-700 text-right mb-4">
              {branch.name}
            </h2>

            <div className="flex items-start gap-2 mb-3 text-gray-600">
              <FaLocationDot className="mt-1 " />
              <div className="text-right">
                <p className="font-semibold">العنوان</p>
                <p className="text-sm">{branch.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <FaPhone className="" />
              <div className="text-right">
                <p className="font-semibold">الهاتف</p>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-green-600 text-sm"
                >
                  {branch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-5 text-gray-600">
              <LuClock className="mt-1 " />
              <div className="text-right text-sm">
                <p className="font-semibold mb-1">ساعات العمل</p>
                {timeWork.map((time, idx) => (
                  <p key={idx}>
                    {time.day}: {time.hours}
                  </p>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              زيارة الفرع
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches_component;