import React from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Right_side_champin = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">{t('participating_teams')}</h2>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data?.teams?.map((team, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2  border  rounded-lg">
              <img src={team.logo} alt={team?.name} className="w-8 h-8 rounded-full object-cover" loading="lazy" />

              <span className="text-sm font-medium text-gray-800">{team?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">{t('technical_staff')}</h2>

        <div className="space-y-4">
          {data?.technicalStaff?.map((e, index) => (
            <div    onClick={() => navigate(`/profile-trainer/${e.id}`)}

            key={index} className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2  border  rounded-lg">
              <img src={e.logo} alt={e?.name} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
              <div className="flex flex-col gap-2">  
                         <span className="text-sm font-medium text-gray-800">{e?.name}</span>
                <span className="text-sm font-medium text-gray-800">{e?.role}</span></div>

            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">{t('tournament_teams')}</h2>

        <div className="space-y-4">
          {data?.matches?.map((e, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2  border  rounded-lg">
              {/* <img src={e.logo} alt={e?.name} className="w-8 h-8 rounded-full object-cover" /> */}
              <div className="flex flex-col gap-2">  
                         <span className="text-sm font-medium text-gray-800">{e?.homeTeam}</span>
                {/* <span className="text-sm font-medium text-gray-800">{e?.role}</span> */}
                </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right_side_champin;