

import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";

const Left_side = ({ data }) => {
  const { t } = useTranslation();

  const pricingTiers = data?.pricing?.tiers || [];
  const steps = data?.steps || [];
  const gallery = data?.gallery || [];

  return (
    <div className="space-y-6">
      {/* وصف الخدمة */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t("service_about_title")}
        </h2>

        {data?.sub_title && (
          <h3 className="text-lg font-bold text-[#00786F] mb-3">
            {data.sub_title}
          </h3>
        )}

        {data?.explanation ? (
          <div
            className="text-gray-600 leading-8"
            dangerouslySetInnerHTML={{
              __html: data.explanation,
            }}
          />
        ) : (
          <p className="text-gray-600 leading-7">
            {data?.slogan || t("service_no_description")}
          </p>
        )}

        {data?.sponsored_by && (
          <p className="mt-4 text-gray-600">
            <span className="font-bold text-gray-800">
              {t("service_sponsored_by")}:
            </span>{" "}
            {data.sponsored_by}
          </p>
        )}
      </section>

      {/* الأسعار */}
      {pricingTiers.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("service_pricing_title")}
          </h2>

          <div className="space-y-3">
            {pricingTiers.map((item, index) => (
              <div
                key={item.tier_id || index}
                className="flex items-center justify-between border-b border-gray-200 pb-3"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.label}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.subscriber_type}
                  </p>

                  {item.available !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">
                      {t("service_available_count_label")}:{" "}
                      {item.available}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#00BFA6]">
                    {Number(item.price || 0).toFixed(2)}
                  </span>

                  <span className="text-sm text-gray-500">
                    {item.currency ||
                      data?.pricing?.currency ||
                      "EGP"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* خطوات الخدمة */}
      {steps.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            {t("service_steps_title")}
          </h2>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#EAF3F1] text-[#00786F] font-bold flex items-center justify-center shrink-0">
                  {step.number}
                </div>

                <div>
                  <p className="font-bold text-gray-800">
                    {step.title}
                  </p>

                  <p className="text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* السياسات */}
      {data?.policies && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("service_policies_title")}
          </h2>

          <div
            className="text-gray-600 leading-8 [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-2"
            dangerouslySetInnerHTML={{
              __html: data.policies,
            }}
          />
        </section>
      )}

      {/* معرض الصور */}
      {gallery.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            {t("gallery")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((item, index) => (
              <div
                key={`${item.url}-${index}`}
                className="overflow-hidden rounded-xl"
              >
                <img
                  src={item.url}
                  alt={item.caption || data?.title}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />

              
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Left_side;