

import React, { useEffect, useState } from "react";
import { Get_Trophies } from "../../axiosConfig/APIs/Champanship/Trophies List";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useBranch } from "../../context/BranchContext";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { selectedBranch } = useBranch();
 const { t } = useTranslation();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await Get_Trophies();

  //       const stats = res?.message?.sportStats || [];

  //       const mapped = stats.map((item) => ({
  //         title: item.sport,
  //         icon: getIcon(item.sport),
  //         total: item.total_items,
  //         indoor: item.internal,
  //         outdoor: item.external,
  //       }));

  //       setAchievements(mapped);
  //     } catch (err) {
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchAchievements = async () => {
   const params = {  
branchId: selectedBranch || "all",
language: i18next.language,
    }
    try {
      const res = await Get_Trophies(params);
      const stats = res?.message?.sportStats || [];
      setAchievements(stats);
    } catch (err) {
    }
  };
  useEffect(() => {
    fetchAchievements();
  }, [i18next.language, selectedBranch]);
  
  const getIcon = (sport) => {
    switch (sport) {
      case "كرة السلة":
        return "🏀";
      case "كرة القدم":
        return "⚽";
      case "سباحة":
        return "🏊";
      case "كاراتيه":
        return "🥋";
      case "تنس":
        return "🎾";
      default:
        return "🏆";
    }
  };

  return (
    <div>
      <h2 className=" text-xl font-semibold mb-6">
{t("achievements")}      </h2>

      <div className="flex flex-wrap px-5 ">
        {achievements.map((item, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-3 py-1">
            <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition duration-300">

              {/* Top */}
              <div className="flex justify-between items-center">
                <div className="text-3xl">{getIcon(item.sport)}</div>

                <div>
                  <h2 className="text-2xl font-bold text-teal-600 text-center">
                    {item.total_items}
                  </h2>
                  <p className="text-sm text-gray-400">{t("tournament")}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-gray-700 font-medium text-right">
                {item.sport}
              </h3>

              {/* Bottom */}
              <div className="flex gap-3 mt-4 w-full justify-between">

                <div className="bg-[#FFF7ED] px-4 py-2 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-orange-500">{item.external}</span>
                  <p>{t("external")}</p>
                </div>

                <div className="bg-[#F0FDFA] px-4 py-2 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-teal-600">{item.internal}</span>
                  <p>{t("internal")}</p>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;