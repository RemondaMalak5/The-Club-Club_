import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

const academies = [
  {
    title: "أكاديمية السباحة",
    status: "نشط",
    days: "الإثنين من كل أسبوع",
    time: "10:00 - 11:00",
  },
  {
    title: "أكاديمية كرة القدم",
    status: "نشط",
    days: "الإثنين من كل أسبوع",
    time: "10:00 - 11:00",
  },
];

const AcademySubscriptions = ({data}) => {
  return (
    <div className="bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 w-full ">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          الأكاديميات المشترك بها
        </h2>
        <span className="text-[#009689] text-xs cursor-pointer">
          ← عرض الكل
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {academies.map((academy, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-3"
          >
            
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="text-right">
                <h3 className="font-bold text-sm text-gray-800">
                  {academy.title}
                </h3>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <IoTimeOutline />
                  <span>{academy.time}</span>
                </div>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <FaRegCalendarAlt />
                  <span>{academy.days}</span>
                </div>

                <p className="text-gray-400 text-[11px] mt-1">
                  مرة أو أكثر
                </p>
              </div>

              <span className="bg-[#EAF9F5] text-[#23A26D] text-[10px] px-3 py-1 rounded-full">
                {academy.status}
              </span>
              
            </div>

            {/* Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-[#2DC6B3] to-[#00786F] text-white text-sm py-2 rounded-lg font-medium hover:opacity-90 duration-300">
              عرض التفاصيل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademySubscriptions;