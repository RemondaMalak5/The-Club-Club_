import React, { useEffect, useState } from "react";
import Btn_bg from "../Shared_Component/Btn_bg";
import { LuClock } from "react-icons/lu";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import i18next from "i18next";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Branches_all from "../Shared_Component/Branches_all";
import Map_component from "./Map_component";
import { GoDotFill } from "react-icons/go";

const Branches_component = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));


  const timeWork = [
    { day: "الجمعة", hours: "7:00 ص - 12:00 م" },
    { day: "السبت", hours: "6:00 ص - 12:00 م" },
    { day: "الأحد - الخميس", hours: "6:00 ص - 11:00 م" },
  ];

  const Get_Branch_List = async () => {
    const params = {
      language: i18next.language,
    };
    try {
      const response = await AllBranches(params);
      setData(response.message.data);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    Get_Branch_List();
  }, [i18next.language]);
  return (
    <div className="px-6 md:px-14 py-5">
      <h1 className="text-[28px] md:text-[32px] font-bold text-[#11181C] pb-5">
        {t("branches_and_map")}
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 p-4 border rounded-xl border-[#E5E7EB] shadow-sm">
          {/* <h2 className="text-[22px] md:text-[24px] font-bold text-[#11181C] pb-3 text-center">
            فروعنا
          </h2> */}

          {data.map((branch, index) => (
            <div
              key={index}
              className="border rounded-xl my-2 border-[#E5E7EB] p-4 flex flex-col md:flex-row md:justify-between gap-3"
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-[16px] md:text-[18px] font-bold">
                  {branch.name}
                </h2>

                <p className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-[#6A7282] text-[14px]">
                  {branch.address}{" "}
                  <span>
                    <GoDotFill />
                  </span>
                  <span className="text-[#008236] underline cursor-pointer">
                    {branch.phone}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3">
                  <Btn_bg btn={t("Book_Activity")} />
                  <button className="border border-[#00786F] rounded-xl px-5 py-2 text-[#6A7282]">
{t("Book_service")}                  </button>
                </div>
              </div>

              <div className="self-start ">
                <h2
                  className={`bg-[#EFF4F2] text-[#1E2939] rounded-full px-4 py-1 font-semibold text-sm
    ${
      branch.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
                >
                  {branch.isOpen ? t("open") : t("close")}
                </h2>
              </div>
            </div>
          ))}

          <p className="bg-[#EFF4F2] p-4 rounded-lg mt-3 text-[#6A7282] text-[14px] md:text-[16px]">
            * الإحداثيات المستخدمة تقريبية ويمكن تعديلها لعنوان الفرع الحقيقي.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto rounded-2xl overflow-hidden sticky ">
          <Map_component />
        </div>
      </div>

      <Branches_all />
    </div>
  );
};

export default Branches_component;
