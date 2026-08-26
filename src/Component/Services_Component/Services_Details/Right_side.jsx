// // import React from "react";
// // import { useTranslation } from "react-i18next";
// // import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import { assets } from "./../../../assets/assets";

// // const Right_side = ({ data }) => {
// //   const { t } = useTranslation();
// //   const navigate = useNavigate();

// //   const date = [
// //     {
// //       label: "الذهاب",
// //       value: "يوم الجمعه 1 فبراير",
// //     },
// //     {
// //       label: "العودة",
// //       value: "يوم الجمعه 1 فبراير",
// //     },
// //   ];
// //   const trainers = [
// //     {
// //       label: "التدريب",
// //       value: "مدرب خبير",
// //     },
// //   ];
// //   return (
// //     <div className="space-y-6 sticky top-5">
// //       <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
// //         <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
// //           {t("service_book_now")}
// //         </h2>

// //         <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
// //           <span className="text-sm text-gray-600">
// //             {t("service_price_starts_from")}
// //           </span>
// //           <div className="flex items-baseline gap-1">
// //             <span className="text-2xl font-bold text-[#00BFA6]">
// //               {data?.price_from || 0}
// //             </span>
// //             <span className="text-sm text-gray-600">
// //               {t("service_currency")}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-between text-red-700 mb-6">
// //           <span className="text-sm">{t("service_discount_rate")}</span>
// //           <span className="font-bold text-lg">10%</span>
// //         </div>

// //         <div className="space-y-3">
// //           <button className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold transition hover:opacity-95">
// //             {t("service_book_now")}
// //           </button>
// //           <button
// //             onClick={() => navigate("/contact")}
// //             className="w-full bg-white border border-[#00786F] text-[#00786F] py-3 rounded-xl font-semibold transition hover:bg-gray-50"
// //           >
// //             {t("service_info")}
// //           </button>
// //         </div>
// //       </section>

// //       <section className="rounded-2xl border bg-white p-6 shadow-sm">
// //         <h2 className="text-xl font-bold text-gray-800 mb-5 ">
// //           {t("المواعيد")}
// //         </h2>
// //         {date.map((item, index) => (
// //           <div
// //             className="border p-3 bg-[#00000000] rounded-xl flex flex-col gap-2 mb-3"
// //             key={index}
// //           >
// //             <p className="text-[#1E2939] font-bold">{item.label}</p>
// //             <p className="text-[#5B626E]">{item.value}</p>
// //           </div>
// //         ))}
// //       </section>

// //       <section className="rounded-2xl border bg-white p-6 shadow-sm">
// //         <h2 className="text-xl font-bold text-gray-800 mb-5 ">
// //           {t("فريق المشرفين")}
// //         </h2>
// //         {trainers.map((item, index) => (
// //           <div
// //             className="border p-3 bg-[#00000000] rounded-xl flex gap-2 mb-3"
// //             key={index}
// //           >
// //             <img
// //               src={assets.image_4}
// //               alt="Trainer"
// //               className="w-12 h-12 rounded-full object-cover mb-2"
// //             />
// //             <div className="flex flex-col gap-1">
// //               <p className="text-[#1E2939] font-bold">{item.label}</p>
// //               <p className="text-[#5B626E]">{item.value}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </section> 
      
// //     </div>
// //   );
// // };

// // export default Right_side;
// import React from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { assets } from "./../../../assets/assets";

// const Right_side = ({ data }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const pricingTiers = data?.pricing?.tiers || [];

//   const prices = pricingTiers
//     .map((item) => Number(item.price))
//     .filter((price) => !Number.isNaN(price));

//   const priceFrom = prices.length > 0 ? Math.min(...prices) : 0;

//   const date = [
//     {
//       label: "التاريخ",
//       value: data?.date?.start_date || "-",
//     },
//     {
//       label: "الوقت",
//       value:
//         data?.date?.start_time && data?.date?.end_time
//           ? `${data.date.start_time} - ${data.date.end_time}`
//           : data?.date?.start_time || data?.date?.end_time || "-",
//     },
//   ];

//   const trainers = data?.trainers || [];

//   return (
//     <div className="space-y-6 sticky top-5">
//       <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
//         <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
//           {t("service_book_now")}
//         </h2>

//         <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
//           <span className="text-sm text-gray-600">
//             {t("service_price_starts_from")}
//           </span>

//           <div className="flex items-baseline gap-1">
//             <span className="text-2xl font-bold text-[#00BFA6]">
//               {priceFrom}
//             </span>

//             <span className="text-sm text-gray-600">
//               {data?.pricing?.currency || t("service_currency")}
//             </span>
//           </div>
//         </div>

//         {data?.pricing?.allow_loyalty_discount && (
//           <div className="flex items-center justify-between text-red-700 mb-6">
//             <span className="text-sm">
//               {t("service_discount_rate")}
//             </span>

//             <span className="font-bold text-lg">
//               {t("service_available")} 
//             </span>
//           </div>
//         )}

//         <div className="space-y-3">
//           <button className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold transition hover:opacity-95">
//             {t("service_book_now")}
//           </button>

//           <button
//             onClick={() => navigate("/contact")}
//             className="w-full bg-white border border-[#00786F] text-[#00786F] py-3 rounded-xl font-semibold transition hover:bg-gray-50"
//           >
//             {t("service_info")}
//           </button>
//         </div>
//       </section>

//       <section className="rounded-2xl border bg-white p-6 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-800 mb-5">
//           {t("المواعيد")}
//         </h2>

//         {date.map((item, index) => (
//           <div
//             className="border p-3 bg-[#00000000] rounded-xl flex flex-col gap-2 mb-3"
//             key={index}
//           >
//             <p className="text-[#1E2939] font-bold">
//               {item.label}
//             </p>

//             <p className="text-[#5B626E]">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </section>

//       {data?.show_trainers && trainers.length > 0 && (
//         <section className="rounded-2xl border bg-white p-6 shadow-sm">
//           <h2 className="text-xl font-bold text-gray-800 mb-5">
//             {t("فريق المشرفين")}
//           </h2>

//           {trainers.map((item, index) => (
//             <div
//               className="border p-3 bg-[#00000000] rounded-xl flex gap-2 mb-3"
//               key={item.trainer_id || index}
//             >
//               <img
//                 src={item.image || assets.image_4}
//                 alt={item.name || "Trainer"}
//                 className="w-12 h-12 rounded-full object-cover mb-2"
//               />

//               <div className="flex flex-col gap-1">
//                 <p className="text-[#1E2939] font-bold">
//                   {item.name}
//                 </p>

//                 <p className="text-[#5B626E]">
//                   {item.role}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// };

// export default Right_side;


import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaPhoneAlt,
  FaRegIdCard,
  FaTimes,
  FaTrashAlt,
  FaUser,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { assets } from "./../../../assets/assets";

const Right_side = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [showBookingPopup, setShowBookingPopup] = useState(false);

  const [selectedApplicantTypes, setSelectedApplicantTypes] = useState({
    self: false,
    relatives: false,
    guests: false,
  });

  const [selectedRelatives, setSelectedRelatives] = useState([]);

  const [guests, setGuests] = useState([]);

  const bookingOpenedRef = useRef(false);

  const pricingTiers = Array.isArray(data?.pricing?.tiers)
    ? data.pricing.tiers
    : [];

  const prices = pricingTiers
    .map((item) => Number(item?.price))
    .filter((price) => !Number.isNaN(price));

  const priceFrom = prices.length > 0 ? Math.min(...prices) : 0;

  /*
    استخدمي المسار المناسب لبيانات الأقارب حسب استجابة الـ API عندك.
    الكود يدعم أكثر من احتمال.
  */
  const relatives = useMemo(() => {
    const list =
      data?.myStatus?.dependants ||
      data?.dependants ||
      data?.relatives ||
      data?.familyMembers ||
      [];

    return Array.isArray(list) ? list : [];
  }, [data]);

  const trainers = Array.isArray(data?.trainers)
    ? data.trainers
    : [];

  const date = [
    {
      label: "التاريخ",
      value: data?.date?.start_date || "-",
    },
    {
      label: "الوقت",
      value:
        data?.date?.start_time && data?.date?.end_time
          ? `${data.date.start_time} - ${data.date.end_time}`
          : data?.date?.start_time || data?.date?.end_time || "-",
    },
  ];

  const handleOpenBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: location.pathname + location.search,
          openServiceBooking: true,
        },
      });

      return;
    }

    setShowBookingPopup(true);
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      location.state?.openServiceBooking === true &&
      token &&
      !bookingOpenedRef.current
    ) {
      bookingOpenedRef.current = true;
      setShowBookingPopup(true);

      navigate(location.pathname + location.search, {
        replace: true,
        state: {},
      });
    }
  }, [
    location.pathname,
    location.search,
    location.state,
    navigate,
  ]);

  const closeBookingPopup = () => {
    setShowBookingPopup(false);

    setSelectedApplicantTypes({
      self: false,
      relatives: false,
      guests: false,
    });

    setSelectedRelatives([]);
    setGuests([]);
  };

  const toggleApplicantType = (type) => {
    setSelectedApplicantTypes((prev) => {
      const newValue = !prev[type];

      if (type === "relatives" && !newValue) {
        setSelectedRelatives([]);
      }

      if (type === "guests" && !newValue) {
        setGuests([]);
      }

      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  const getRelativeId = (relative, index) => {
    return (
      relative?.addressId ||
      relative?.id ||
      relative?.memberId ||
      relative?.name ||
      index
    );
  };

  const toggleRelative = (relative, index) => {
    const relativeId = getRelativeId(relative, index);

    setSelectedRelatives((prev) => {
      const isSelected = prev.some(
        (item) =>
          String(getRelativeId(item.relative, item.index)) ===
          String(relativeId)
      );

      if (isSelected) {
        return prev.filter(
          (item) =>
            String(getRelativeId(item.relative, item.index)) !==
            String(relativeId)
        );
      }

      return [
        ...prev,
        {
          relative,
          index,
        },
      ];
    });
  };

  const addGuest = () => {
    setSelectedApplicantTypes((prev) => ({
      ...prev,
      guests: true,
    }));

    setGuests((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        fullName: "",
        mobile: "",
        nationalId: "",
      },
    ]);
  };

  const removeGuest = (guestId) => {
    setGuests((prev) => {
      const updatedGuests = prev.filter(
        (guest) => guest.id !== guestId
      );

      if (updatedGuests.length === 0) {
        setSelectedApplicantTypes((types) => ({
          ...types,
          guests: false,
        }));
      }

      return updatedGuests;
    });
  };

  const handleGuestChange = (guestId, field, value) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === guestId
          ? {
              ...guest,
              [field]: value,
            }
          : guest
      )
    );
  };

  const validGuests = guests.filter(
    (guest) =>
      guest.fullName.trim() &&
      guest.mobile.trim() &&
      guest.nationalId.trim()
  );

  const totalApplicants =
    (selectedApplicantTypes.self ? 1 : 0) +
    selectedRelatives.length +
    validGuests.length;

  const canContinue = totalApplicants > 0;

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    const serviceId =
      data?.id ||
      data?.service_id ||
      data?.serviceId ||
      "";

    const bookingData = {
      serviceId,

      applyForSelf: selectedApplicantTypes.self,

      relatives: selectedRelatives.map(({ relative }) => ({
        addressId:
          relative?.addressId ||
          relative?.id ||
          relative?.memberId ||
          "",

        name: relative?.name || "",
        relation: relative?.relation || "",
      })),

      guests: validGuests,
    };

    console.log("Service booking data:", bookingData);

  };

  const ApplicantOption = ({
    type,
    title,
    description,
    icon,
  }) => {
    const selected = selectedApplicantTypes[type];

    return (
      <button
        type="button"
        onClick={() => toggleApplicantType(type)}
        className={`w-full rounded-2xl border-2 p-4 transition ${
          selected
            ? "border-[#008C82] bg-[#EAF8F6]"
            : "border-gray-200 bg-white hover:border-[#008C82]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl ${
              selected
                ? "bg-[#008C82] text-white"
                : "bg-[#F2F4F8] text-[#687386]"
            }`}
          >
            {icon}
          </div>

          <div className="flex-1 text-right">
            <h3 className="text-lg font-bold text-gray-800">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>

          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 ${
              selected
                ? "border-[#008C82] bg-[#008C82] text-white"
                : "border-gray-500 bg-white"
            }`}
          >
            {selected && <FaCheck className="text-xs" />}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="sticky top-5 space-y-6">
      {/* Booking Card */}
      <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          {t("service_book_now")}
        </h2>

        <div className="mb-3 flex items-center justify-between border-b border-gray-300 pb-3">
          <span className="text-sm text-gray-600">
            {t("service_price_starts_from")}
          </span>

          <div className="flex items-baseline gap-1">
            {priceFrom === 0 ? (
              <span className="text-2xl font-bold text-[#00BFA6]">
                {t("free")}
              </span>
            ) : (
              <>
                <span className="text-2xl font-bold text-[#00BFA6]">
                  {priceFrom}
                </span>

                <span className="text-sm text-gray-600">
                  {data?.pricing?.currency ||
                    t("service_currency")}
                </span>
              </>
            )}
          </div>
        </div>

        {data?.pricing?.allow_loyalty_discount && (
          <div className="mb-6 flex items-center justify-between text-red-700">
            <span className="text-sm">
              {t("service_discount_rate")}
            </span>

            <span className="text-lg font-bold">
              {t("service_available")}
            </span>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleOpenBooking}
            className="w-full rounded-xl bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] py-3 font-semibold text-white transition hover:opacity-95"
          >
            {t("service_book_now")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="w-full rounded-xl border border-[#00786F] bg-white py-3 font-semibold text-[#00786F] transition hover:bg-gray-50"
          >
            {t("service_info")}
          </button>
        </div>
      </section>

      {/* Dates */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-gray-800">
          {t("المواعيد")}
        </h2>

        {date.map((item, index) => (
          <div
            className="mb-3 flex flex-col gap-2 rounded-xl border bg-transparent p-3"
            key={index}
          >
            <p className="font-bold text-[#1E2939]">
              {item.label}
            </p>

            <p className="text-[#5B626E]">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* Trainers */}
      {data?.show_trainers && trainers.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            {t("فريق المشرفين")}
          </h2>

          {trainers.map((item, index) => (
            <div
              className="mb-3 flex gap-2 rounded-xl border bg-transparent p-3"
              key={item?.trainer_id || index}
            >
              <img
                src={item?.image || assets.image_4}
                alt={item?.name || "Trainer"}
                className="mb-2 h-12 w-12 rounded-full object-cover"
              />

              <div className="flex flex-col gap-1">
                <p className="font-bold text-[#1E2939]">
                  {item?.name}
                </p>

                <p className="text-[#5B626E]">
                  {item?.role}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Booking Popup */}
      {showBookingPopup &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3">
            <div
              className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#F8F9FC] shadow-2xl"
            >
            
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
               
                <div className="space-y-4">
                  <ApplicantOption
                    type="self"
                    title="التقديم لنفسي"
                    description="إضافتك ضمن المتقدمين في هذا الطلب"
                    icon={<FaUser />}
                  />

                  <ApplicantOption
                    type="relatives"
                    title="التقديم للأقارب"
                    description="اختر قريبًا واحدًا أو أكثر"
                    icon={<FaUserFriends />}
                  />

                  {/* Relatives */}
                  {selectedApplicantTypes.relatives && (
                    <div className="rounded-2xl border bg-white p-5">
                      <h3 className="mb-5 text-xl font-bold text-gray-800">
                        اختر الأقارب
                      </h3>

                      {relatives.length > 0 ? (
                        <div className="space-y-4">
                          {relatives.map((relative, index) => {
                            const relativeId = getRelativeId(
                              relative,
                              index
                            );

                            const selected =
                              selectedRelatives.some(
                                (item) =>
                                  String(
                                    getRelativeId(
                                      item.relative,
                                      item.index
                                    )
                                  ) === String(relativeId)
                              );

                            const disabled =
                              relative?.canApply === false;

                            return (
                              <button
                                key={relativeId}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  toggleRelative(relative, index)
                                }
                                className={`flex w-full items-center justify-between gap-4 rounded-xl p-2 text-right transition ${
                                  disabled
                                    ? "cursor-not-allowed opacity-40"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-800">
                                    {relative?.name || "-"}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    {relative?.relation || ""}
                                  </p>

                                  {disabled &&
                                    relative?.statusText && (
                                      <p className="mt-1 text-xs text-red-500">
                                        {relative.statusText}
                                      </p>
                                    )}
                                </div>

                                <span
                                  className={`flex h-6 w-6 items-center justify-center rounded border-2 ${
                                    selected
                                      ? "border-[#008C82] bg-[#008C82] text-white"
                                      : "border-gray-500"
                                  }`}
                                >
                                  {selected && (
                                    <FaCheck className="text-xs" />
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="py-4 text-center text-gray-500">
                          لا يوجد أقارب متاحون للتقديم
                        </p>
                      )}
                    </div>
                  )}

                  <ApplicantOption
                    type="guests"
                    title="التقديم للضيوف"
                    description="إضافة ضيف واحد أو أكثر من غير الأعضاء"
                    icon={<FaUserPlus />}
                  />

                  {/* Guests */}
                  {selectedApplicantTypes.guests && (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">
                          الضيوف
                        </h3>

                        <button
                          type="button"
                          onClick={addGuest}
                          className="font-semibold text-[#5846A6]"
                        >
                          + إضافة ضيف
                        </button>
                      </div>

                      {guests.length === 0 && (
                        <button
                          type="button"
                          onClick={addGuest}
                          className="w-full rounded-xl border-2 border-dashed border-[#008C82] py-4 font-semibold text-[#008C82]"
                        >
                          + إضافة أول ضيف
                        </button>
                      )}

                      <div className="space-y-4">
                        {guests.map((guest, index) => (
                          <div
                            key={guest.id}
                            className="rounded-2xl border bg-white p-5"
                          >
                            <div className="mb-5 flex items-center justify-between">
                              <h4 className="text-lg font-bold text-gray-800">
                                ضيف {index + 1}
                              </h4>

                              <button
                                type="button"
                                onClick={() =>
                                  removeGuest(guest.id)
                                }
                                className="text-red-600"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="relative">
                                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                <input
                                  type="text"
                                  value={guest.fullName}
                                  onChange={(event) =>
                                    handleGuestChange(
                                      guest.id,
                                      "fullName",
                                      event.target.value
                                    )
                                  }
                                  placeholder="الاسم بالكامل *"
                                  className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                />
                              </div>

                              <div className="relative">
                                <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                <input
                                  type="tel"
                                  value={guest.mobile}
                                  onChange={(event) =>
                                    handleGuestChange(
                                      guest.id,
                                      "mobile",
                                      event.target.value
                                    )
                                  }
                                  placeholder="رقم الموبايل *"
                                  className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                />
                              </div>

                              <div className="relative">
                                <FaRegIdCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                <input
                                  type="text"
                                  value={guest.nationalId}
                                  onChange={(event) =>
                                    handleGuestChange(
                                      guest.id,
                                      "nationalId",
                                      event.target.value
                                    )
                                  }
                                  placeholder="الرقم القومي *"
                                  className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-gray-500">
                    إجمالي المتقدمين
                  </span>

                  <span className="text-lg font-bold text-[#008C82]">
                    {totalApplicants}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={handleContinue}
                  className={`w-full rounded-xl py-4 text-lg font-bold transition ${
                    canContinue
                      ? "bg-[#008C82] text-white hover:bg-[#00776F]"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  متابعة
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Right_side;