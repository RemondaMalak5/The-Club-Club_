

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShareNodes, FaStar } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { assets } from "../../assets/assets";

const MembershipCard = ({ data }) => {
  const { t } = useTranslation();

  const card = data?.digitalCard || {};

  const academies = Array.isArray(data?.academies)
    ? data.academies
    : [];

  const [selectedAcademy, setSelectedAcademy] = useState(0);

  const starRating = Math.max(
    0,
    Math.min(5, Number(card?.starRating) || 0)
  );

  const selectedAcademyData =
    academies[selectedAcademy] || null;

const attendedCount = Number(selectedAcademyData?.attended) || 0;

const sessionsPerMonth =
  Number(selectedAcademyData?.sessionsPerMonth) || 0;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-[#F7F7F7] p-3">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-700">
          {t("digital_membership_card")}
        </h2>

        <div className="flex gap-3 text-sm text-[#009689]">
          <button
            type="button"
            aria-label="Download membership card"
            className="transition hover:opacity-70"
          >
            <FaDownload />
          </button>

          <button
            type="button"
            aria-label="Share membership card"
            className="transition hover:opacity-70"
          >
            <FaShareNodes />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#2DC6B3] to-[#00786F] px-5 py-5">
          {/* Stars */}
          <div className="mb-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`text-sm ${
                  index < starRating
                    ? "text-[#FFD700]"
                    : "text-white/40"
                }`}
              />
            ))}
          </div>

          {/* Membership Info */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-[#00786F]">
              {data?.membershipExpiry || t("not_available")}
            </div>

            <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
              {data?.membershipType || t("not_available")}
            </h1>

            <div className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-[#00786F]">
              {card?.memberCode || data?.membershipNo || "-"}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <img
                src={data?.profileImage || assets.logo}
                alt={data?.fullName || "member"}
                className="h-14 w-14 rounded-full border object-cover"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = assets.logo;
                }}
              />

              <div className="text-start">
                <h3 className="text-lg font-bold text-gray-800">
                  {data?.fullName || "-"}
                </h3>

                <p className="break-all text-sm text-gray-500">
                  {data?.email || "-"}
                </p>
              </div>
            </div>

            <div className="h-fit w-fit rounded-md border border-[#23A26D] bg-[#F0FFF8] px-3 py-1 text-[10px] font-medium text-[#23A26D]">
              {card?.status || "-"}
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex flex-col items-center">
            {data?.qrImage ? (
              <img
                src={data.qrImage}
                alt="Membership QR code"
                className="h-48 w-48 object-contain"
                loading="lazy"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                {t("not_available")}
              </div>
            )}

            <div className="mt-2 flex w-full max-w-sm flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-gray-700">
              <span>
                {card?.barcode || data?.membershipNo || "-"}
              </span>

              <span>{data?.phone || "-"}</span>

              <span>{data?.studentId || "-"}</span>
            </div>
          </div>

          {/* Academies */}
          {academies.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {academies.map((academy, index) => {
                const isSelected = selectedAcademy === index;

                return (
                  <button
                    type="button"
                    key={
                      academy?.program ||
                      academy?.programName ||
                      index
                    }
                    onClick={() => setSelectedAcademy(index)}
                    className={`flex max-w-[150px] flex-col items-center gap-2 rounded-xl border p-2 transition ${
                      isSelected
                        ? "border-[#00786F] bg-[#EAF5F3]"
                        : "border-gray-200 bg-white hover:border-[#00786F]"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 ${
                        isSelected
                          ? "border-[#00786F]"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={academy?.image || assets.logo}
                        alt={
                          academy?.programName ||
                          academy?.program ||
                          `academy-${index + 1}`
                        }
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src = assets.logo;
                        }}
                      />
                    </div>

                    <span
                      className={`line-clamp-2 text-center text-[10px] font-bold ${
                        isSelected
                          ? "text-[#00786F]"
                          : "text-gray-600"
                      }`}
                    >
                      {academy?.programName ||
                        academy?.program ||
                        "-"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Divider */}
          <div className="mx-auto mt-5 w-4/5 border-t border-[#6C7EA0]" />
         
{selectedAcademyData && (
  <div className="mt-4">
   

    {sessionsPerMonth > 0 ? (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: sessionsPerMonth }).map(
          (_, index) => (
            <div
              key={index}
              title={`${t("attendance")} ${index + 1}`}
              className={`h-7 w-7 rounded-full ${
                index < attendedCount
                  ? "bg-gradient-to-r from-[#2DC6B3] to-[#00786F]"
                  : "bg-[#DDE3E3]"
              }`}
            />
          )
        )}
      </div>
    ) : (
      <p className="text-center text-xs text-gray-400">
        {sessionsPerMonth}
      </p>
    )}
  </div>
)}

          {/* Empty Academies */}
          {academies.length === 0 && (
            <p className="mt-5 text-center text-xs text-gray-400">
              {t("no_academies")}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 rounded-xl bg-[#EAF5F3] p-3">
        <h3 className="mb-1 text-xs font-bold text-[#009689]">
          {t("digital_membership_rules")}
        </h3>

        <ul className="text-[10px] leading-5 text-gray-500">
          <li>• {t("do_not_share_card")}</li>
          <li>• {t("present_card_on_entry")}</li>
          <li>• {t("follow_club_rules")}</li>
        </ul>
      </div>
    </div>
  );
};

export default MembershipCard;