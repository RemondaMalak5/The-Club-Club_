import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaStar,
  FaTrophy,
  FaClock,
  FaCheck,
} from "react-icons/fa";

const Left_side = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">

      {/* About */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-4">
          {t('academy_about_title')}
        </h2>

        <p className="text-gray-600  leading-7">
          {data?.description || t('academy_about_default_desc')}
        </p>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">
          {t('academy_objectives_title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.objectives?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <FaCheck className="text-[#00BFA6] text-lg mt-1 flex-shrink-0" />

              <p className="text-gray-600 leading-6  flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Details */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">
          {t('academy_price_details_title')}
        </h2>

        <div className="space-y-4">
          {data?.programs?.map((program, index) => (
            <div key={index} className="border rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                {/* Right Side - Title & Description */}
                <div className=" flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {program.description}
                  </p>
                </div>
                {/* Left Side - Price */}
                <div className="text-center ">
                  <p className="text-[#00BFA6] font-bold text-3xl">
                    {program.price} <span className="text-sm">{t('academy_per_month')}</span>
                  </p>
                </div>
              </div>

              {/* Info Row */}
              <div className="grid grid-cols-3 gap-4 border-t pt-6">
                <div className="text-center">
                  <p className="text-[#00BFA6] font-bold text-2xl">
                    {program.duration}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{t('academy_months')}</p>
                </div>
                <div className="text-center">
                  <p className="text-[#00BFA6] font-bold text-2xl">
                    {program.sessionsPerWeek}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{t('academy_sessions_per_week')}</p>
                </div>
                <div className="text-center">
                  <p className="text-[#00BFA6] font-bold text-2xl">
                    {program.maxStudents}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{t('academy_trainee_per_group')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
          {t('academy_schedule_title')}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className=" py-3 px-4 font-bold text-gray-800">{t('academy_schedule_day')}</th>
                <th className=" py-3 px-4 font-bold text-gray-800">{t('academy_schedule_time')}</th>
                <th className=" py-3 px-4 font-bold text-gray-800">{t('academy_schedule_trainer')}</th>
                <th className=" py-3 px-4 font-bold text-gray-800">{t('academy_schedule_location')}</th>
                <th className="py-3 px-4 font-bold text-gray-800">{t('academy_schedule_available')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.schedule?.map((slot, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">
                    {slot.day}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <span className="text-[#00BFA6] font-semibold">{slot.timeStart}</span>
                    {" - "}
                    <span className="text-[#00BFA6] font-semibold">{slot.timeEnd}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                        👤
                      </span>
                      {slot.trainer}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">📍</span>
                      {slot.location}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#00BFA6] font-bold">
                    {slot.availableSlots}
                  </td>
                </tr>
              )) || (
                <>
                  {[
                    { day: "السبت", timeStart: "18:00", timeEnd: "20:00", trainer: "كابتن إسلام نصار", location: "الصالة 1", availableSlots: 6 },
                    { day: "الاثنين", timeStart: "18:00", timeEnd: "20:00", trainer: "كابتن دانيا محمود", location: "الصالة 2", availableSlots: 8 },
                    { day: "الأربعاء", timeStart: "18:00", timeEnd: "20:00", trainer: "كابتن إسلام نصار", location: "الصالة 1", availableSlots: 5 },
                    { day: "الجمعة", timeStart: "10:00", timeEnd: "12:00", trainer: "كابتن زياد فهيم", location: "الصالة 3×3", availableSlots: 9 },
                  ].map((slot, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-800 font-medium">
                        {slot.day}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <span className="text-[#00BFA6] font-semibold">{slot.timeStart}</span>
                        {" - "}
                        <span className="text-[#00BFA6] font-semibold">{slot.timeEnd}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                            👤
                          </span>
                          {slot.trainer}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">📍</span>
                          {slot.location}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#00BFA6] font-bold">
                        {slot.availableSlots}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Left_side;