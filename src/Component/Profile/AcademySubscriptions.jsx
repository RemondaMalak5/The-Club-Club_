import React from "react";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import i18n from './../../i18n/i18n';
import { useTranslation } from "react-i18next";

const AcademySubscriptions = ({ data }) => {
  const navigate = useNavigate();
  const{i18n}=useTranslation();
  return (
    <div className="bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          الأكاديميات المشترك بها
        </h2>

        <span
          onClick={() => {
            navigate("/academy");
          }}
          className="text-[#009689] text-xs cursor-pointer flex items-center"
        >
          عرض الكل {i18n.language ==="ar"? <MdArrowBackIos/>:<MdArrowForwardIos/>}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {data?.length > 0 ? (
          data.slice(0, 3).map((academy) => (
            <div
              key={academy.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-wrap justify-between ">
                <div className="flex flex-col items-start justify-between gap-3">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {academy.name}
                  </h3>

                  <div className="flex gap-5 items-center ">
                    <span className="flex items-center gap-1 text-gray-500 text-sm ">
                      <FaRegCalendarAlt /> {academy.startDate || "الإثنين من كل أسبوع"}
                     
                    </span>
                    <span className="flex justify-center items-center gap-1 text-gray-500 text-sm mt-2">
                      {academy.endDate} <IoTimeOutline />
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 ">
                    <IoLocationOutline />
                    <span>{academy.branch || "فرع أكتوبر"}</span>
                  </div>

              </div>
              <span className="bg-[#EAF9F5] text-[#23A26D] border border-[#B7F3D0] text-[11px] px-4 py-1 rounded-full h-fit">
                  نشط
                </span>
                </div>
              

              <button
                onClick={() => {
                  navigate(`/academy/${academy.id}`);
                }}
                className="w-full mt-5 bg-gradient-to-r from-[#2DC6B3] to-[#00786F] text-white text-sm py-3 rounded-lg font-medium"
              >
                عرض التفاصيل
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            لا توجد أكاديميات مشترك بها
          </p>
        )}
      </div>
    </div>
  );
};

export default AcademySubscriptions;
