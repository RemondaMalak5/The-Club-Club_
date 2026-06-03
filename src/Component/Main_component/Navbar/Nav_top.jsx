// import React from "react";
import { useTranslation } from "react-i18next";
import { CiDiscount1 } from "react-icons/ci";
import { GiTrophyCup } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";

const Nav_top = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] hidden lg:flex justify-between items-center overflow-hidden py-2">
      
      {/* Marquee */}
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-10 text-white font-[400] text-[16px]">
          <span className="flex items-center gap-1">
            <GiTrophyCup />
            {t('winter_tournament')}
          </span>

          <span className="flex items-center gap-1">
            <CiDiscount1 />
            {t('discounts_message')}
          </span>

          <span className="flex items-center gap-1">
            <SlLocationPin />
            {t('our_branches_list')}
          </span>

          {/* تكرار العناصر عشان الحركة تكون مستمرة */}
          <span className="flex items-center gap-1">
            <GiTrophyCup />
            {t('winter_tournament')}
          </span>

          <span className="flex items-center gap-1">
            <CiDiscount1 />
            {t('discounts_message')}
          </span>

          <span className="flex items-center gap-1">
            <SlLocationPin />
            {t('our_branches_list')}
          </span>
        </div>
      </div>

      {/* Language Button */}
      <div className="px-5">
        <button
          className="rounded-full border px-5 py-1 bg-transparent hover:bg-white text-white hover:text-black"
          onClick={() => {
            const newLang = i18n.language.startsWith("en") ? "ar" : "en";
            i18n.changeLanguage(newLang);
            localStorage.setItem("lang", newLang);
          }}
        >
          {i18n.language.startsWith("en") ? t('arabic_lang') : t('english_lang')}
        </button>
      </div>
    </div>
  );
};

export default Nav_top;