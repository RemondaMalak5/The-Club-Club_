import React from "react";
import { useTranslation } from "react-i18next";
import { RiMedalLine } from "react-icons/ri";

const Achievements = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <h3 className="font-bold text-[20px] mb-4 text-right">
        {t("achievements")}
      </h3>

      <div className="space-y-3">
        {data?.length > 0 ? (
          data.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="w-12 h-12 rounded-full bg-[#009689] text-white flex items-center justify-center text-2xl">
                <RiMedalLine />
              </div>

              <div className="text-right flex-1 mr-4">
                <h4 className="font-bold text-[#1F2937]">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            {t("no_achievements")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Achievements;