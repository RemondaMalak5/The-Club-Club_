import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiCircleInfo } from "react-icons/ci";
import { Branch_stats } from "../../axiosConfig/APIs/Home/Branch_stats";
import i18next from "i18next";
const Statistics_home = () => {
  const { t } = useTranslation();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranchStats = async () => {
      try {
        setLoading(true);

        const response = await Branch_stats();

        if (response?.message?.data) {
          setBranches(response.message.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBranchStats();
  }, []);



  return (
    <div className=" py-10">
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[36px] font-bold">
          {t("statistics")}
          <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
            {" "}
            {t("entry_exit")}
          </span>{" "}
          {t("by_branches")}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {t("daily_movement_stats")}
        </p>
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-500">
          {t("loading_data")}
        </div>
      ) : (
        branches.slice(0, 3).map((branch, index) => {
          const stats = [
            {
              value: branch.currentMembers,
              name: t("current_members_stats"),
            },
            {
              value: branch.todayEntry,
              name: t("today_entry"),
            },
            {
              value: branch.todayExit,
              name: t("today_exit"),
            },
            {
              value:
                branch.averageVisitDuration > 0
                  ? `${branch.averageVisitDuration} ${t("hour")}`
                  : `0 ${t("hour")}`,
              name: t("average_visit_duration"),
            },
          ];

          return (
            <div
              key={index}
              className="flex flex-col lg:flex-row border rounded-2xl my-6 overflow-hidden shadow-sm"
            >
              {/* branch name */}
              <div className="lg:w-1/5 py-6 bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white font-bold text-[22px] text-center flex items-center justify-center px-6">
                {branch.branchName}
              </div>

              {/* stats */}
              <div className="bg-[#edf5f357] lg:w-4/5 py-6 px-4 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {stats.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center"
                    >
                      <h2 className="text-[#00786F] font-bold text-[28px]">
                        {item.value}
                      </h2>

                      <p className="text-[#364153] font-semibold text-[16px]">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* last update */}
                <div className={`absolute ${i18next.language === "ar" ? "left-9" : "right-9"} top-0 hidden md:block w-[140px]`}>
                  <div
                    className="bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white
  text-center py-4 px-3 flex flex-col items-end justify-center gap-1"
                    style={{
                      clipPath:
                        i18next.language === "ar"
                          ? "polygon(0 0, 82% 0, 56% 100%, 0% 100%)"
                          : "polygon(18% 0, 100% 0, 100% 100%, 44% 100%)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <span className="px-4">
                      <CiCircleInfo size={20} />
                    </span>

                    <span className="font-semibold text-sm">
                      {t("last_update")}
                    </span>

                    <span className="text-xs">{branch.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Statistics_home;
