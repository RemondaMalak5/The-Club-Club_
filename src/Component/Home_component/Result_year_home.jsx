import React, { useEffect, useState } from "react";
import { Branch_annual_stats } from "../../axiosConfig/APIs/Home/Branch_Annual_Stats";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Result_year_home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 const {t} = useTranslation();

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
const fetchData = async () => {
  setLoading(true);

  const params = {
    language: i18next.language,
    branchId: "all",
  };

  try {
    const response = await Branch_annual_stats(params);
setData(response.message.data);
  } catch (error) {
    console.error("Error fetching branch annual stats:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, [i18next.language]);
 

 
  return (
    <div className="w-full flex flex-col items-center py-16 bg-white px-10 sm:px-10 lg:px-14">
      <h2 className="text-[36px] font-bold text-gray-800 text-center py-2">
        {t("excellent_results")}
      </h2>

      <p className="text-gray-500 mb-10 text-[18px] font-medium text-center">
  {        t("annual_stats")
}      </p>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          جاري تحميل البيانات...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {data.slice(0, 3).map((item, index) => {
            const percent = Math.round(item.achievementRate);

            const strokeDashoffset =
              circumference - (percent / 100) * circumference;

            return (
              <div
                key={index}
                className="bg-gray-100 rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative flex items-center justify-center mb-6">
                  <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="-rotate-90"
                  >
                    {/* الخلفية */}
                    <circle
                      stroke="#d1d5db"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />

                    {/* التقدم */}
                    <circle
                      stroke="#0f766e"
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={`${circumference} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                      className="transition-all duration-700"
                    />
                  </svg>

                  <span className="absolute text-2xl font-bold text-teal-700">
                    {percent}%
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-800 mb-3">
                  {item.branchName}
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p className="text-base">
         {t("current_members")}         
             <span className="font-bold text-teal-700 mr-2">
                      {item.currentMembers}
                    </span>
                  </p>

                  <p className="text-base">
                    {t("target_members")}
                    <span className="font-bold text-gray-800 mr-2">
                      {item.targetMembers}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Result_year_home;
