import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";

const Branches_all = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const Get_Branch_List = async () => {
    const params = {
      language: i18next.language,
    };
    try {
      const response = await AllBranches(params);
      setData(response.message.data);
      console.log(response.message.data.workingHours)
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    Get_Branch_List();
  }, [i18next.language]);


  // const timeWork = [
  //   { day: t("friday"), hours: "7:00 ص - 12:00 م" },
  //   { day: t("saturday"), hours: "6:00 ص - 12:00 م" },
  //   { day: t("sunday_to_thursday"), hours: "6:00 ص - 11:00 م" },
  // ];

  return (
    <div className="w-full mt-10 px-4 ">
      <div className="w-full flex flex-wrap justify-center gap-6" >
        {data.map((branch, index) => (
          <div
            key={index}
             onClick={() =>
                navigate(`/about-branches/${branch.id}`, {
                  state: { branchId: branch.id, branchName: branch.name },
                })
              }
            className="
              bg-white rounded-2xl shadow-md p-5 relative
              border border-[#E5E7EB]
              hover:scale-[1.02] transition duration-300

              w-full
              md:w-[48%]
              xl:w-[31%]
            "
          >
<span
  className={`absolute left-4 top-4 px-4 py-1 rounded-full text-sm
    ${
      branch.isOpen
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
>
  {branch.isOpen ? t("open") : t("close")}
</span>

            <h2 className="text-xl font-bold text-gray-700 text-right mb-4">
              {branch.name}
            </h2>

            <div className="flex items-start gap-2 mb-3 text-gray-600">
              <FaLocationDot className="mt-1 shrink-0" />
              <div className="text-right">
                <p className="font-semibold">{t("address")}</p>
                <p className="text-sm break-words">{branch.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <FaPhone className="shrink-0" />
              <div className="text-right">
                <p className="font-semibold">{t("phone")}</p>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-green-600 text-sm"
                >
                  {branch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-5 text-gray-600">
              <LuClock className="mt-1 shrink-0" />
              <div className="text-right text-sm">
                <p className="font-semibold mb-1">{t("working_hours")}</p>

                {branch?.workingHours?.map((time, idx) => (
  <p key={idx} className="text-base">
    {(time.day)}: {time.time_open} - {time.time_close}
  </p>
))} 
              </div>
            </div>

            <button
             
              className="w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {t("visit_branch")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches_all;
