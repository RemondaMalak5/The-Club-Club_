import React from "react";
import { useTranslation } from "react-i18next";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaMedal } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";

const Left_side_chamin = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      {/* About */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl text-[#F0B100]"><GiTrophyCup/></span>
          <h2 className="text-[25px] font-bold">{t('about_tournament')}</h2>
        </div>

        <p className="text-[#6B6B6B] leading-8 text-sm">
          {data?.description }
        </p>
      </div>

<div className="bg-white rounded-2xl shadow-sm p-6">
 <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl text-[#F0B100]"><FaMedal /></span>
          <h2 className="text-[25px] font-bold">{t('achievements')}</h2>
        </div>
        <div className="space-y-4">
          {data?.matches?.map((e, index) => (
            <div key={index} className="flex items-center gap-3 pb-3  border-[#FFDF20] bg-[#FFF7ED] hover:bg-gray-50 p-2  border  rounded-lg">
              <div className="flex flex-col gap-2">
                <span className="text-[20px] px-2 text-gray-800">{e?.homeTeam}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Participants */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl text-[#F0B100]"><FaMedal /></span>
          <h2 className="text-[25px] font-bold">{t('winners_order')}</h2>
        </div>

        <div className="space-y-2">
          {data?.awards?.map((award, index) => (
            <div key={index} className="flex items-center gap-5 bg-[#e5e7eb50] hover:bg-gray-50 rounded-md border py-2 px-7  ">
              <span className="text-2xl text-green-300"><FaMedal /></span>
              <div className="flex flex-col ">
                <span className="text-[20px] font-bold text-gray-800">{award?.teamName}</span>
                <p className="text-[#6A7282] text-[16px]">{award.prize}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      {/* Gallery */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-[25px] font-bold py-3">{t('gallery')}</h2>

        <div className="grid grid-cols-3 gap-3">
          {data?.gallery?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="gallery"
              className="w-full h-[120px] object-cover rounded-lg hover:opacity-80 transition-opacity"
            />
          )) || (
              <>
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-[120px] bg-gray-300 rounded-lg animate-pulse"
                  ></div>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Left_side_chamin;