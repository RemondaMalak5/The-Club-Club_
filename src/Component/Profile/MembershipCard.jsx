import React from "react";
import { useTranslation } from "react-i18next";
import { FaShareNodes, FaStar } from "react-icons/fa6";
import { assets } from "../../assets/assets";
import { FaDownload } from "react-icons/fa";

const MembershipCard = ({ data }) => {
  const card = data?.digitalCard ;
  const starRating = Number(card?.starRating) || 0;
const sports = Array.isArray(card?.academyIcons)
  ? card.academyIcons.filter(Boolean)
  : [];

  const { t } = useTranslation();

  return (
    <div className="bg-[#F7F7F7] p-3 rounded-2xl w-full border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-700">
          {t("digital_membership_card")}
        </h2>

        <div className="flex gap-3 text-[#009689] text-sm">
          <span><FaDownload/></span>
          <span><FaShareNodes/></span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#2DC6B3] to-[#00786F] px-5 py-5">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: starRating }).map((_, index) => (
              <FaStar key={index} className="text-[#FFD700] text-sm" />
            ))}
          </div>

          {/* Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white text-[#00786F] text-[10px] px-3 py-1 rounded-full font-medium">
              {data?.membershipExpiry || t("not_available")}
            </div>

            <h1 className="text-white text-3xl font-bold">{t("member")}</h1>

            <div className="bg-white text-[#00786F] text-[10px] px-3 py-1 rounded-full font-medium">
              {card?.memberCode || data?.membershipNo || "-"}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-5 py-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={data?.profileImage || assets.logo}
                alt={data?.fullName || "member"}
                className="w-14 h-14 rounded-full object-cover border"
                loading="lazy"
              />

              <div className="text-right">
                <h3 className="font-bold text-gray-800 text-lg">
                  {data?.fullName}
                </h3>

                <p className="text-gray-500 text-sm">
                  {data?.email }
                </p>
              </div>
            </div>

            <div className="border border-[#23A26D] text-[#23A26D] w-fit h-fit bg-[#F0FFF8] px-3 py-1 rounded-md text-[10px] font-medium">
              {card?.status }
            </div>
          </div>

          {/* Barcode */}
          <div className="mt-6 flex flex-col items-center">
            <img
              src={data?.qrImage}
              alt="barcode"
              className="w-48 h-48 object-contain"
              loading="lazy"
            />

            <div className="flex justify-between w-60 text-xs font-bold text-gray-700 mt-1">
              <span>{card?.barcode || data?.membershipNo || "-"}</span>
              <span>{data?.phone || "-"}</span>
            </div>
          </div>

          {/* Sports Icons */}
          {sports.length > 0 && (
  <div className="flex justify-center gap-2 mt-5 flex-wrap">
    {sports.map((sport, index) => (
      <div
        key={index}
        className="w-12 h-12 rounded-full border border-[#00786F] flex items-center justify-center"
      >
        <img
          src={sport?.icon || sport}
          alt={`sport-${index}`}
          className="w-6 h-6 object-contain"
          loading="lazy"
        />
      </div>
    ))}
  </div>
)}

          {/* Divider */}
          <div className="border-t border-[#6C7EA0] w-4/5 mx-auto mt-5"></div>

          {/* Trophies Progress */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {Array.from({
              length: Number(card?.trophies?.total) || 30,
            }).map((_, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full ${
                  index < (Number(card?.trophies?.earned) || 0)
                    ? "bg-gradient-to-r from-[#2DC6B3] to-[#00786F]"
                    : "bg-[#DDE3E3]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
          <div className="bg-[#EAF5F3] rounded-xl mt-4 p-3 text-right">
            <h3 className="text-[#009689] text-xs font-bold mb-1">
              {t("digital_membership_rules")}
            </h3>

            <ul className="text-[10px] text-gray-500 leading-5">
              <li>• {t("do_not_share_card")}</li>
              <li>• {t("present_card_on_entry")}</li>
              <li>• {t("follow_club_rules")}</li>
            </ul>
          </div>
    </div>
  );
};

export default MembershipCard;