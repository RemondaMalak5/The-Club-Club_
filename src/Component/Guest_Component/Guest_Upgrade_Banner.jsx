import React from "react";
import { CheckCircle2 } from "lucide-react";
import { FaAward } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Guest_Upgrade_Banner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    t("benefit_unlimited_access"),
    t("benefit_exclusive_discounts"),
    t("benefit_priority_booking"),
    t("benefit_family_cards"),
  ];

  return (
    <div className="rounded-2xl border border-[#08AC85]/25 bg-gradient-to-br from-[#EBF5F3] via-white to-[#FFF7ED] p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3DB] text-2xl text-[#F0B100]">
          <FaAward />
        </span>

        <div>
          <h3 className="text-xl font-bold text-[#1E2939]">
            {t("upgrade_banner_title")}
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#5B626E]">
            {t("upgrade_banner_subtitle")}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#08AC85]" />
            <span className="text-sm font-medium text-[#364153]">
              {benefit}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="rounded-xl bg-gradient-to-r from-[#08AC85DB] to-[#00786F] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {t("subscribe_now")}
        </button>

        <button
          type="button"
          onClick={() => navigate("/services")}
          className="rounded-xl border border-[#08AC85DB] bg-[#F0FDFA] px-5 py-3 text-sm font-semibold text-[#00786F] transition hover:bg-[#EAF3F1]"
        >
          {t("explore_memberships")}
        </button>

        <button
          type="button"
          onClick={() => navigate("/member-register")}
          className="rounded-xl border border-orange-300 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
        >
          {t("link_existing_membership")}
        </button>
      </div>
    </div>
  );
};

export default Guest_Upgrade_Banner;
