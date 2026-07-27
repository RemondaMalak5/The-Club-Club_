import React, {  useEffect, useState } from "react";
import Title_1 from "../Shared_Component/Title_1";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import SubTitle from "../Shared_Component/SubTitle";
import { assets } from "./../../assets/assets";
import Btn_bg from "../Shared_Component/Btn_bg";
import { useNavigate } from "react-router-dom";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Branches_home = () => {
  const {t}= useTranslation();
  const navigate = useNavigate();
  const [branch, setBranch] = useState();
   const Get_Branches = async () => {
    const params = {
      "language": i18next.language,

    }
    try {
      const response = await AllBranches(params);
      setBranch(response.message.data);

    } catch (error) {
    }
  };
  useEffect(() => { 
    Get_Branches();
  }, [i18next.language]);

  return (
<div className=" py-10">
   <div className="flex justify-between items-center  rounded-2xl  px-5 py-1 ">
        <div>
          <Title_1 title={t("our_branches")} />
          <SubTitle SubTitle={t("choose_branch")} />
        </div>
        <button onClick={() => navigate('/branches')} className="border border-[#00786F] px-5 rounded-full flex justify-center items-center gap-3">
          {t("show_branch_map")}
       <span className="py-3">
  {i18next.language.startsWith("ar") ? (
    <FaArrowLeftLong />
  ) : (
    <FaArrowRightLong/>
  )}
</span>
        </button>
      </div>

      <div className="w-full flex flex-wrap  ">
        {branch?.map((e, index) => (
          <div key={index} className="w-full md:w-1/3 px-3 py-3 ">
            <div className="border rounded-xl shadow-2xl   ">
              <img src={e.image} className="h-60 w-full object-cover rounded-xl" loading="lazy" />

              <div className="px-5 py-5 flex flex-col gap-3">
                <p className="font-bold text-[18px]">{e.name}</p>

                <p className="font-semibold text-[14px] text-[#4B4B4B]">
                  {e.title}
                </p>

                <div className="flex flex-wrap gap-5">
                  <Btn_bg btn={t("academy")} onClick={() => navigate(`/academy`)} />

                  <button onClick={()=>navigate(`/about-branches/${e.id}` ,
                  {state:{registryId: e.registryId ,
                  branchName: e.name,
                  }})} className="text-[16px] font-bold border border-[#00786F] px-7 py-3 rounded-xl">
                    {t("details")}
                  </button>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
</div>
     
  );
};

export default Branches_home;
