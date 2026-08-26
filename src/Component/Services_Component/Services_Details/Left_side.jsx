

import React from "react";
import { useTranslation } from "react-i18next";

const Left_side = ({ data }) => {
  const { t } = useTranslation();

  const steps = data?.steps || [];
  const gallery = data?.gallery || [];
const pricingTiers = Array.isArray(data?.pricing?.tiers)
  ? data.pricing.tiers
  : [];

const allowLoyaltyDiscount =
  data?.pricing?.allow_loyalty_discount === true;
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

  {pricingTiers.length > 0 && (
  <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-2xl font-bold text-gray-800">
        {t("service_pricing_title")}
      </h2>

      {allowLoyaltyDiscount && (
        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {t("loyalty_discount_available")}
        </span>
      )}
    </div>

    <div className="space-y-4">
      {pricingTiers.map((item, index) => {
        const price = Number(item?.price || 0);
        const isFree = price === 0;

        return (
          <div
            key={item?.tier_id || index}
            className="cursor-pointer rounded-2xl border p-6 transition hover:border-[#00BFA6] hover:shadow-md"
          >
            <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  {item?.tier_id || item?.label}
                </h3>

                <p className="text-sm text-gray-500">
                  {item?.subscriber_type}
                </p>
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm text-gray-500">
                  {item?.label}
                </p>

                {isFree ? (
                  <p className="text-2xl font-bold text-[#00BFA6]">
                    {t("free")}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-[#00BFA6]">
                    {price.toFixed(2)}

                    <span className="ms-1 text-sm font-medium">
                      {item?.currency ||
                        data?.pricing?.currency ||
                        "EGP"}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#00BFA6]">
                  {item?.quantity ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {t("service_total_quantity_label")}
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-[#00BFA6]">
                  {item?.available ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {t("service_available_count_label")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
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