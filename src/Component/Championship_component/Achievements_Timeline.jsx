import React, { useEffect, useState } from "react";
import { Get_Trophies_By_Season } from "../../axiosConfig/APIs/Champanship/Trophies_By_Season";

const AchievementsTimeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Get_Trophies_By_Season();

        const seasons = res?.message?.data || [];

        const mapped = seasons
          .map((item) => {
            const trophies = item.trophies || [];

            // حساب الميداليات
            const wins = trophies.filter(
              (t) => t.type === "1st Place"
            ).length;

            const runnerUp = trophies.filter(
              (t) => t.type === "Advanced Position"
            ).length;

            const third = trophies.filter(
              (t) => t.type === "Bronze"
            ).length;

            return {
              year: item.season,
              wins,
              runnerUp,
              third,
              progress: item.achievementRate || 0,
            };
          })
          // ترتيب أحدث سنة الأول
          .sort((a, b) => b.year.localeCompare(a.year));

        setTimeline(mapped);
      } catch (err) {
      }
    };

    fetchData();
  }, []);

  return (
  <div className="px-4 md:px-10 xl:px-20 py-5" dir="rtl">
    <h2 className="text-right text-xl font-bold mb-6">
      الإنجازات عبر السنوات الماضية
    </h2>

    <div className="relative">
      <div className="absolute right-4 top-0 bottom-0 w-[2px] bg-teal-500"></div>

      <div className="flex flex-col gap-6">
        {timeline.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute right-0 top-5 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm shadow z-10">
              📋
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 md:p-5 mr-12 shadow-sm">
              <div className="flex flex-col gap-4 mb-4">
                <span className="text-[#1E2939] font-bold text-[18px] md:text-[20px]">
                  {item.year}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-500 p-1 rounded">
                      🏆
                    </span>

                    <span className="flex flex-col">
                      البطولات
                      <span className="text-center font-bold text-[#1E2939]">
                        {item.wins}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-500 p-1 rounded">
                      🥈
                    </span>

                    <span className="flex flex-col">
                      المراكز المتقدمة
                      <span className="text-center font-bold text-[#1E2939]">
                        {item.runnerUp}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-500 p-1 rounded">
                      🥉
                    </span>

                    <span className="flex flex-col">
                      البرونزية
                      <span className="text-center font-bold text-[#1E2939]">
                        {item.third}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between py-1 px-1">
                <div className="text-sm text-gray-500">نسبة الإنجاز</div>

                <div className="text-xs text-gray-400">
                  {item.progress}%
                </div>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default AchievementsTimeline;