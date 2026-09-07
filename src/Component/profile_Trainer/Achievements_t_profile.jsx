import React from "react";
import { FaTrophy, FaMedal } from "react-icons/fa";

const Achievements_t_profile = ({ data }) => {
  const achievements = Array.isArray(data?.achievements?.data)
    ? data.achievements.data
    : [];

  const awards = Array.isArray(data?.awards)
    ? data.awards
    : [];

  return (
    <div className="space-y-4">

      {/* Bio */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[30px] font-bold text-gray-900 mb-3">
          نبذة عن المدرب
        </h2>

        <p className="text-xl text-gray-600 leading-7">
          {data?.bio || "لا توجد نبذة متاحة عن المدرب"}
        </p>
      </section>

      {/* Achievements */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[30px] font-bold text-gray-900 mb-4">
          الإنجازات المحققة
        </h2>

        {achievements.length > 0 ? (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-[#ead77a] bg-[#fffdf3] rounded-xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#fff3b5] flex items-center justify-center shrink-0">
                  <FaMedal className="text-[#c99a00]" />
                </div>

                <p className="text-sm text-gray-700">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            لا توجد إنجازات حتى الآن
          </p>
        )}
      </section>

      {/* Awards */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[30px] font-bold text-gray-900 mb-4">
          الجوائز الحاصل عليها
        </h2>

        {awards.length > 0 ? (
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#fff5db] flex items-center justify-center shrink-0">
                    <FaTrophy className="text-[#d39b00]" />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    {award?.title}
                  </p>
                </div>

                {award?.year && (
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {award.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            لا توجد جوائز حتى الآن
          </p>
        )}
      </section>

    </div>
  );
};

export default Achievements_t_profile;