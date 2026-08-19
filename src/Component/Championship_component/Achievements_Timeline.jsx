// import React, { useEffect, useState } from "react";
// import { Get_Trophies_By_Season } from "../../axiosConfig/APIs/Champanship/Trophies_By_Season";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

// const AchievementsTimeline = () => {
//   const [timeline, setTimeline] = useState([]);
// const { t } = useTranslation();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await Get_Trophies_By_Season();

//         const seasons = res?.message?.data || [];

//         const mapped = seasons
//           .map((item) => {
//             const trophies = item.trophies || [];

//             // حساب الميداليات
//             const wins = trophies.filter(
//               (t) => t.type === "1st Place"
//             ).length;

//             const runnerUp = trophies.filter(
//               (t) => t.type === "Advanced Position"
//             ).length;

//             const third = trophies.filter(
//               (t) => t.type === "Bronze"
//             ).length;

//             return {
//               year: item.season,
//               wins,
//               runnerUp,
//               third,
//               progress: item.achievementRate || 0,
//             };
//           })
//           // ترتيب أحدث سنة الأول
//           .sort((a, b) => b.year.localeCompare(a.year));

//         setTimeline(mapped);
//       } catch (err) {
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//   <div >
//     <h2 className=" text-xl font-bold mb-6">
// {t("achievements_timeline")}      </h2>

//     <div className="relative">
// <div
//     className={`absolute top-0 bottom-0 w-[2px] bg-teal-500 ${
//       i18next.language === "ar" ? "right-4" : "left-4"
//     }`}
//   ></div>
//       <div className="flex flex-col gap-6">
//         {timeline.map((item, index) => (
//           <div key={index} className="relative">
//  <div
//           className={`absolute top-5 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm shadow z-10 ${
//             i18next.language === "ar" ? "right-0" : "left-0"
//           }`}
//         >              📋
//             </div>


//         <div
//           className={`bg-[#F9FAFB] rounded-xl p-4 md:p-5 shadow-sm ${
//             i18next.language === "ar" ? "mr-12" : "ml-12"
//           }`}
//         >              <div className="flex flex-col gap-4 mb-4">
//                 <span className="text-[#1E2939] font-bold text-[18px] md:text-[20px]">
//                   {item.year}
//                 </span>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <span className="bg-blue-100 text-blue-500 p-1 rounded">
//                       🏆
//                     </span>

//                     <span className="flex flex-col">
// { t("wins") }
//                       <span className="text-center font-bold text-[#1E2939]">
//                         {item.wins}
//                       </span>
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span className="bg-orange-100 text-orange-500 p-1 rounded">
//                       🥈
//                     </span>

//                     <span className="flex flex-col">
// {t("runner_up")}                      <span className="text-center font-bold text-[#1E2939]">
//                         {item.runnerUp}
//                       </span>
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span className="bg-yellow-100 text-yellow-500 p-1 rounded">
//                       🥉
//                     </span>

//                     <span className="flex flex-col">
// {t("third_place")}                      <span className="text-center font-bold text-[#1E2939]">
//                         {item.third}
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between py-1 px-1">
//                 <div className="text-sm text-gray-500">نسبة الإنجاز</div>

//                 <div className="text-xs text-gray-400">
//                   {item.progress}%
//                 </div>
//               </div>

//               <div className="w-full bg-gray-200 h-2 rounded-full">
//                 <div
//                   className="bg-teal-500 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${item.progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );
// };

// export default AchievementsTimeline;
import React, { useEffect, useState } from "react";
import { Get_Trophies_By_Season } from "../../axiosConfig/APIs/Champanship/Trophies_By_Season";
import { useTranslation } from "react-i18next";
import { useBranch } from "../../context/BranchContext";

const AchievementsTimeline = () => {
  const [timeline, setTimeline] = useState([]);

  const { t, i18n } = useTranslation();
  const { selectedBranch } = useBranch();

  const fetchAchievementsTimeline = async () => {
    const params = {
      branchId: selectedBranch || "all",
      language: i18n.language,
    };

    try {
      const res = await Get_Trophies_By_Season(params);

      const seasons = res?.message?.data || [];

      const mapped = seasons
        .map((item) => {
          const trophies = item.trophies || [];

          const wins = trophies.filter(
            (trophy) => trophy.type === "1st Place"
          ).length;

          const runnerUp = trophies.filter(
            (trophy) => trophy.type === "Advanced Position"
          ).length;

          const third = trophies.filter(
            (trophy) => trophy.type === "Bronze"
          ).length;

          return {
            year: item.season,
            wins,
            runnerUp,
            third,
            progress: item.achievementRate || 0,
          };
        })
        .sort((a, b) => String(b.year).localeCompare(String(a.year)));

      setTimeline(mapped);
    } catch (error) {
      console.log("Timeline error:", error);
      setTimeline([]);
    }
  };

  useEffect(() => {
    fetchAchievementsTimeline();
  }, [i18n.language, selectedBranch]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">
        {t("achievements_timeline")}
      </h2>

      <div className="relative">
        <div
          className={`absolute top-0 bottom-0 w-[2px] bg-teal-500 ${
            i18n.language === "ar" ? "right-4" : "left-4"
          }`}
        ></div>

        <div className="flex flex-col gap-6">
          {timeline.length > 0 ? (
            timeline.map((item,index) => (
              <div key={index} className="relative">
                <div
                  className={`absolute top-5 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm shadow z-10 ${
                    i18n.language === "ar" ? "right-0" : "left-0"
                  }`}
                >
                  📋
                </div>

                <div
                  className={`bg-[#F9FAFB] rounded-xl p-4 md:p-5 shadow-sm ${
                    i18n.language === "ar" ? "mr-12" : "ml-12"
                  }`}
                >
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
                          {t("golden_cups")}

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
                          {t("Top_positions")}

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
                          {t("champions")}

                          <span className="text-center font-bold text-[#1E2939]">
                            {item.third}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-1 px-1">
                    <div className="text-sm text-gray-500">
                      {t("achievement_rate")}
                    </div>

                    <div className="text-xs text-gray-400">
                      {item.progress}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(item.progress, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              {t("no_matching_activities")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTimeline;