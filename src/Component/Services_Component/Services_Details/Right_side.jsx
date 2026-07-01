import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const Right_side = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 sticky top-5">
      <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">{t('service_book_now')}</h2>

        <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
          <span className="text-sm text-gray-600">{t('service_price_starts_from')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#00BFA6]">{data?.price_from || 0}</span>
            <span className="text-sm text-gray-600">{t('service_currency')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-red-700 mb-6">
          <span className="text-sm">{t('service_discount_rate')}</span>
          <span className="font-bold text-lg">10%</span>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold transition hover:opacity-95">
            {t('service_book_now')}
          </button>
          <button className="w-full bg-white border border-[#00786F] text-[#00786F] py-3 rounded-xl font-semibold transition hover:bg-gray-50">
            {t('service_info')}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-5 ">{t('service_additional_details')}</h2>
        <div className="space-y-3 ">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0" />
            <p className="text-gray-600 text-sm leading-6">{data?.branchName || "الفرع الرئيسي"}</p>
          </div>
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0" />
            <p className="text-gray-600 text-sm leading-6">{data?.category || "خدمة مميزة"}</p>
          </div>
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0" />
            <p className="text-gray-600 text-sm leading-6">{data?.is_unlimited ? "متاحة بشكل غير محدود" : `${data?.available_count || 0} مقعد متاح فقط`}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-5 ">{t('service_notes_title')}</h2>
        <p className="text-gray-600  leading-7 text-sm">
          {t('service_notes_desc')}
        </p>
      </section>
    </div>
  );
};

export default Right_side;
