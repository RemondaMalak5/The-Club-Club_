import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { useTranslation } from "react-i18next";
// import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { useBranch } from "../../context/BranchContext";

const Branches_all = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedBranch, changeBranch, branches } = useBranch();
 
  return (
    <div className="w-full mt-10 px-4 ">
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
          <div
            key={index}
            onClick={() => {
              changeBranch(branch.id);
              navigate(`/about-branches/${branch.id}`,
                {
                  state: {
                    id: branch.id,
                    branchName: branch.name,
                  }
                })
            }}
            className="
    flex flex-col
    h-full
    bg-white
    rounded-2xl
    shadow-md
    p-5
    relative
    border
    border-[#E5E7EB]
    hover:scale-[1.02]
    transition
    duration-300
  "
          >
            <span
              className={`absolute left-4 top-4 px-4 py-1 rounded-full text-sm
    ${branch.isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {branch.isOpen ? t("open") : t("close")}
            </span>

            <h2 className="text-xl font-bold text-gray-700 text-right mb-4">
              {branch.name}
            </h2>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start gap-2 mb-3 text-gray-600">
                <FaLocationDot className="mt-1 shrink-0" />
                <div className="">
                  <p className="font-semibold">{t("address")}</p>
                  <p className="text-sm break-words">{branch.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <FaPhone className="shrink-0" />
                <div className="">
                  <p className="font-semibold">{t("phone")}</p>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-green-600 text-sm"
                  >
                    {branch.phone}
                  </a>
                </div>
              </div>

              <div className="flex  gap-2 mb-5 text-gray-600">
                <LuClock className="mt-1 shrink-0" />
                <div className=" text-sm">
                  <p className="font-semibold mb-1">{t("working_hours")}</p>

                  {branch?.workingHours?.map((time, idx) => (
                    <p key={idx} className="text-base">
                      {(time.day)}: {time.time_open} - {time.time_close}
                    </p>
                  ))}
                </div>
              </div>
            </div>



            <button

              className="mt-auto w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
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
