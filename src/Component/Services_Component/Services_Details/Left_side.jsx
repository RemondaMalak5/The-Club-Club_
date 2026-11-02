import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Left_side = ({ data }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const steps = data?.steps || [];
  const gallery = Array.isArray(data?.gallery) ? data.gallery : [];
  const pricingTiers = Array.isArray(data?.pricing?.tiers)
    ? data.pricing.tiers
    : [];

  const allowLoyaltyDiscount =
    data?.pricing?.allow_loyalty_discount === true;

  const translateTierText = (value) => {
    if (!value) return "";

    const raw = String(value).trim();
    const normalized = raw
      .toLowerCase()
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (
      normalized === "main member" ||
      normalized === "primary member" ||
      raw === "عضو عامل" ||
      raw === "عضو أساسي" ||
      raw === "عضو اساسي"
    ) {
      return t("main_member", isAr ? "عضو عامل" : "Main Member");
    }

    if (
      normalized === "follow member" ||
      normalized === "dependent member" ||
      normalized === "dependant member" ||
      normalized === "dependant" ||
      normalized === "dependent" ||
      raw === "عضو تابع"
    ) {
      return t("follow_member", isAr ? "عضو تابع" : "Follow Member");
    }

    if (
      normalized === "guest" ||
      normalized === "guests" ||
      normalized === "non member"
    ) {
      return isAr ? "غير عضو" : "Guest";
    }

    return raw;
  };

  const getPhotoUrl = (item) =>
    typeof item === "string" ? item : item?.url || item?.image || "";

  const getPhotoCaption = (item) =>
    typeof item === "object" ? item?.caption || "" : "";

  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleClosePhoto = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    if (!gallery.length) return;
    setSelectedPhotoIndex((prev) =>
      prev === null ? 0 : (prev + 1) % gallery.length
    );
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    if (!gallery.length) return;
    setSelectedPhotoIndex((prev) =>
      prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
    );
  };

  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClosePhoto();
      } else if (event.key === "ArrowRight") {
        if (isAr) {
          handlePrevPhoto();
        } else {
          handleNextPhoto();
        }
      } else if (event.key === "ArrowLeft") {
        if (isAr) {
          handleNextPhoto();
        } else {
          handlePrevPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex, gallery.length, isAr]);

  const activePhoto =
    selectedPhotoIndex !== null ? gallery[selectedPhotoIndex] : null;

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
              const tierTitle = translateTierText(
                item?.tier_id || item?.label
              );
              const tierLabel = translateTierText(
                item?.label || item?.tier_id
              );
              const subscriberType = translateTierText(
                item?.subscriber_type
              );

              return (
                <div
                  key={item?.tier_id || index}
                  className="cursor-pointer rounded-2xl border p-6 transition hover:border-[#00BFA6] hover:shadow-md"
                >
                  <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-gray-800">
                        {tierTitle}
                      </h3>

                      {subscriberType && (
                        <p className="text-sm text-gray-500">
                          {subscriberType}
                        </p>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="mb-1 text-sm text-gray-500">
                        {tierLabel}
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

          <Swiper
            key={i18n.language}
            dir={isAr ? "rtl" : "ltr"}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={
              gallery.length > 1
                ? {
                    delay: 3500,
                    disableOnInteraction: false,
                  }
                : false
            }
            loop={gallery.length > 2}
            breakpoints={{
              640: {
                slidesPerView: gallery.length > 1 ? 2 : 1,
              },
            }}
            className="news-slider news-swiper !pb-10"
          >
            {gallery.map((item, index) => {
              const photoUrl = getPhotoUrl(item);
              const caption = getPhotoCaption(item);

              return (
                <SwiperSlide key={`${photoUrl}-${index}`}>
                  <div
                    onClick={() => handleOpenPhoto(index)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={photoUrl}
                      alt={caption || data?.title || `gallery-${index + 1}`}
                      className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className=" inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30 absolute">
                      <span className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/90 text-[#00786F] opacity-0 shadow-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <FiZoomIn className="text-xl" />
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      )}

      {/* Popup عرض الصورة */}
      {selectedPhotoIndex !== null &&
        activePhoto &&
        createPortal(
          <div
            onClick={handleClosePhoto}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mb-4 flex w-full max-w-4xl items-center justify-between text-white"
            >
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                {selectedPhotoIndex + 1} / {gallery.length}
              </span>

              <button
                type="button"
                onClick={handleClosePhoto}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                aria-label="Close"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Main Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-4xl items-center justify-center"
            >
              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={isAr ? handleNextPhoto : handlePrevPhoto}
                  className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition hover:bg-[#00BFA6]"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
              )}

              <div className="flex flex-col items-center">
                <img
                  src={getPhotoUrl(activePhoto)}
                  alt={
                    getPhotoCaption(activePhoto) ||
                    data?.title ||
                    `gallery-${selectedPhotoIndex + 1}`
                  }
                  className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />

                {getPhotoCaption(activePhoto) && (
                  <p className="mt-3 text-center text-sm font-medium text-gray-200">
                    {getPhotoCaption(activePhoto)}
                  </p>
                )}
              </div>

              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={isAr ? handlePrevPhoto : handleNextPhoto}
                  className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition hover:bg-[#00BFA6]"
                  aria-label="Next image"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              )}
            </div>

            {/* Thumbnails inside Popup */}
            {gallery.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-4 flex max-w-4xl gap-2 overflow-x-auto py-1"
              >
                {gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      idx === selectedPhotoIndex
                        ? "border-[#00BFA6] opacity-100 scale-105"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={getPhotoUrl(thumb)}
                      alt={`thumb-${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Left_side;
