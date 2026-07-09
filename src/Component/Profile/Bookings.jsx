import React from "react";
import { useTranslation } from "react-i18next";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Bookings = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">{t("upcoming_bookings")}</h2>

        <span
          onClick={() => navigate("/bookings")}
          className="text-[#009689] text-xs cursor-pointer"
        >
          ← {t("view_all")}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {data?.slice(0, 3).map((item, index) => (
          <div key={item.id || index} className="bg-white border border-gray-200 rounded-xl p-3">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <h3 className="font-bold text-sm text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <IoTimeOutline />
                  <span>{item.time || item.date}</span>
                </div>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <FaRegCalendarAlt />
                  <span>{item.date}</span>
                </div>
              </div>

              <span
                className={`${
                  item.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                } text-[10px] px-3 py-1 rounded-full`}
              >
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => navigate(`/services/${item.id}`)}
                className="bg-gradient-to-r from-[#2DC6B3] to-[#00786F] text-white text-sm py-2 rounded-lg font-medium hover:opacity-90 duration-300"
              >
                {t("details")}
              </button>

              <button className="border border-gray-300 text-gray-600 text-sm py-2 rounded-lg font-medium hover:bg-gray-100 duration-300">
                {t("cancel")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;