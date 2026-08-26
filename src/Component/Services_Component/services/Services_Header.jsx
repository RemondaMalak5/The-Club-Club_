import React, { useEffect, useState } from "react";
import { Users, Activity, Layers, Languages } from "lucide-react";
import SubTitle from "../../Shared_Component/SubTitle";
import Title_1 from "../../Shared_Component/Title_1";
import H_one from "../../Shared_Component/H_one";
import {  useTranslation } from "react-i18next";
import { Services_stats } from "../../../axiosConfig/APIs/Services/Services_stats";
import i18next from "i18next";
  import { useBranch } from "../../../context/BranchContext";

const Services_Header = () => {
  const { t } = useTranslation();
 
  const [data, setdata] = useState();
  const {selectedBranch}=useBranch ();
  const get_services_status = async () => {
    const params = {
    branchId: selectedBranch || "all",
      language: i18next.language
    }
    try {
      const response = await Services_stats(params);
      setdata(response.message.data)
    }
    catch {

    }
  }

  useEffect(() => {
    get_services_status();
  }, [i18next.language , selectedBranch]);
   const stats = [
     {
      title: t("Total_number_of_services"),
      value: data?.total_services,
      icon: <Layers/>,
    }, 
    {
      title: t("Subscribers"),
      value: data?.total_booked,
      icon: <Users />, 
    },
    {
      title: t("Active_Services"),
      value: data?.active_services,
      icon: <Activity />,
    },

  ];
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <div className="py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] ">
        <H_one text={t("club_services")} />
        <SubTitle SubTitle={t("services_dis")} />
        <div className="flex flex-wrap gap-7 mt-2">
          {stats?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col xl:w-1/4 w-full md:w-1/2 bg-white border  gap-1 px-6 py-3 rounded-2xl shadow-md"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-teal-600 text-white p-4 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[#4A5565]">{item.title}</span>
                  <Title_1 title={item.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Services_Header;