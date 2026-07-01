import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const Left_side = ({ data }) => {
  const { t } = useTranslation();
  const highlights = [
    data?.sub_title || t('service_highlight_default'),
    data?.branchName ? `${t('service_branch_label')} ${data.branchName}` : t('service_branch_default'),
    data?.start_date ? `${t('service_start_date_label')} ${data.start_date}` : t('service_start_date_default'),
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-4">{t('service_about_title')}</h2>
        <p className="text-gray-600  leading-7">
          {data?.description || data?.sub_title }
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">{t('service_benefits_title')}</h2>
        <div className="space-y-4">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-start gap-3 ">
              <FaCheck className="text-[#00BFA6] mt-1 shrink-0" />
              <p className="text-gray-600 leading-6 flex-1">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">{t('service_info_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4 bg-gray-50">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaClock className="text-[#00BFA6]" />
              <span className="font-semibold">{t('service_time_label')}</span>
            </div>
            <p className="text-gray-600 ">{data?.start_date }</p>
          </div>
          <div className="rounded-xl border p-4 bg-gray-50">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-[#00BFA6]" />
              <span className="font-semibold">{t('service_location_label')}</span>
            </div>
            <p className="text-gray-600 ">{data?.branchName }</p>
          </div>
          <div className="rounded-xl border p-4 bg-gray-50 md:col-span-2">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaUsers className="text-[#00BFA6]" />
              <span className="font-semibold">{t('service_available_count_label')}</span>
            </div>
            <p className="text-gray-600 ">
              {data?.is_unlimited ? t('service_unlimited') : `${data?.available_count || 0} ${t('service_available_seats')}`} 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Left_side;
