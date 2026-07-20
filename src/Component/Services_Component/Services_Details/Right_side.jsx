// import React from "react";
// import { useTranslation } from "react-i18next";
// import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { assets } from "./../../../assets/assets";

// const Right_side = ({ data }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const date = [
//     {
//       label: "الذهاب",
//       value: "يوم الجمعه 1 فبراير",
//     },
//     {
//       label: "العودة",
//       value: "يوم الجمعه 1 فبراير",
//     },
//   ];
//   const trainers = [
//     {
//       label: "التدريب",
//       value: "مدرب خبير",
//     },
//   ];
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
//               {data?.price_from || 0}
//             </span>
//             <span className="text-sm text-gray-600">
//               {t("service_currency")}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between text-red-700 mb-6">
//           <span className="text-sm">{t("service_discount_rate")}</span>
//           <span className="font-bold text-lg">10%</span>
//         </div>

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
//         <h2 className="text-xl font-bold text-gray-800 mb-5 ">
//           {t("المواعيد")}
//         </h2>
//         {date.map((item, index) => (
//           <div
//             className="border p-3 bg-[#00000000] rounded-xl flex flex-col gap-2 mb-3"
//             key={index}
//           >
//             <p className="text-[#1E2939] font-bold">{item.label}</p>
//             <p className="text-[#5B626E]">{item.value}</p>
//           </div>
//         ))}
//       </section>

//       <section className="rounded-2xl border bg-white p-6 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-800 mb-5 ">
//           {t("فريق المشرفين")}
//         </h2>
//         {trainers.map((item, index) => (
//           <div
//             className="border p-3 bg-[#00000000] rounded-xl flex gap-2 mb-3"
//             key={index}
//           >
//             <img
//               src={assets.image_4}
//               alt="Trainer"
//               className="w-12 h-12 rounded-full object-cover mb-2"
//             />
//             <div className="flex flex-col gap-1">
//               <p className="text-[#1E2939] font-bold">{item.label}</p>
//               <p className="text-[#5B626E]">{item.value}</p>
//             </div>
//           </div>
//         ))}
//       </section> 
      
//     </div>
//   );
// };

// export default Right_side;
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { assets } from "./../../../assets/assets";

const Right_side = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pricingTiers = data?.pricing?.tiers || [];

  const prices = pricingTiers
    .map((item) => Number(item.price))
    .filter((price) => !Number.isNaN(price));

  const priceFrom = prices.length > 0 ? Math.min(...prices) : 0;

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

  const trainers = data?.trainers || [];

  return (
    <div className="space-y-6 sticky top-5">
      <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          {t("service_book_now")}
        </h2>

        <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
          <span className="text-sm text-gray-600">
            {t("service_price_starts_from")}
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#00BFA6]">
              {priceFrom}
            </span>

            <span className="text-sm text-gray-600">
              {data?.pricing?.currency || t("service_currency")}
            </span>
          </div>
        </div>

        {data?.pricing?.allow_loyalty_discount && (
          <div className="flex items-center justify-between text-red-700 mb-6">
            <span className="text-sm">
              {t("service_discount_rate")}
            </span>

            <span className="font-bold text-lg">
              {t("service_available")} 
            </span>
          </div>
        )}

        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold transition hover:opacity-95">
            {t("service_book_now")}
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="w-full bg-white border border-[#00786F] text-[#00786F] py-3 rounded-xl font-semibold transition hover:bg-gray-50"
          >
            {t("service_info")}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t("المواعيد")}
        </h2>

        {date.map((item, index) => (
          <div
            className="border p-3 bg-[#00000000] rounded-xl flex flex-col gap-2 mb-3"
            key={index}
          >
            <p className="text-[#1E2939] font-bold">
              {item.label}
            </p>

            <p className="text-[#5B626E]">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {data?.show_trainers && trainers.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            {t("فريق المشرفين")}
          </h2>

          {trainers.map((item, index) => (
            <div
              className="border p-3 bg-[#00000000] rounded-xl flex gap-2 mb-3"
              key={item.trainer_id || index}
            >
              <img
                src={item.image || assets.image_4}
                alt={item.name || "Trainer"}
                className="w-12 h-12 rounded-full object-cover mb-2"
              />

              <div className="flex flex-col gap-1">
                <p className="text-[#1E2939] font-bold">
                  {item.name}
                </p>

                <p className="text-[#5B626E]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Right_side;