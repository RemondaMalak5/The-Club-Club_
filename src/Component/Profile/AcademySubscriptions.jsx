// import React from "react";
// import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import i18next from "i18next";
// import i18n from './../../i18n/i18n';
// import { useTranslation } from "react-i18next";

// const AcademySubscriptions = ({ data }) => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   return (
//     <div className="bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold text-gray-800">
//           {t("subscribed_academies")}
//         </h2>

//         {/* <span
//           onClick={() => {
//             navigate("/academy");
//           }}
//           className="text-[#009689] text-xs cursor-pointer flex items-center"
//         >
//           {t("view_all")} {i18n.language === "ar" ? <MdArrowBackIos /> : <MdArrowForwardIos />}
//         </span> */}
//       </div>

//       <div className="flex flex-col gap-4">
//         {data?.length > 0 ? (
//           data.slice(0, 3).map((academy) => (
//             <div
//               key={academy.id}
//               className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
//             >
//               <div className="flex flex-wrap justify-between ">
//                 <div className="flex flex-col items-start justify-between gap-3">
//                   <div className="flex justify-center items-center gap-3 ">  <img
//                     src={academy.image}
//                     alt={academy.program}
//                     className="w-12 h-12 rounded-full object-cover "
//                   />

//                   <h3 className="font-bold text-lg text-gray-800 mb-2">
//                     {academy.program}
//                   </h3>
// </div>
                 
//                   <div className="flex gap-5 items-center ">
//                     <span className="flex items-center gap-1 text-gray-500 text-sm ">
//                       <FaRegCalendarAlt className="text-[#00786F]" /> {academy.startDate }
//                     </span>
//                     <span className="flex justify-center items-center gap-1 text-gray-500 text-sm ">
//                      <IoTimeOutline  className="text-[#00786F]"/> {academy.dueDate} 
//                     </span>
                    
//                   </div>

                 

//               </div>
//               <span className="bg-[#EAF9F5] text-[#23A26D] border border-[#B7F3D0] text-[11px] px-4 py-1 rounded-full h-fit">
//                   {t("active")}
//                 </span>
//                 </div>
              

//               {/* <button
//              onClick={() =>
//     navigate("/academy/details", {
//       state: { academy },
//     })
//   }
//                 className="w-full mt-5 bg-gradient-to-r from-[#2DC6B3] to-[#00786F] text-white text-sm py-3 rounded-lg font-medium"
//               >
//                 {t("view_details")}
//               </button> */}
//             </div>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500 text-center py-4">
//             {t("no_subscribed_academies")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AcademySubscriptions;
import React from "react";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
  IoSchoolOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineBadge } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AcademySubscriptions = ({ data = [] }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsedDate);
  };

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) return "—";

    return new Intl.NumberFormat(isArabic ? "ar-EG" : "en-US", {
      maximumFractionDigits: 2,
    }).format(Number(amount));
  };

  return (
    <section
      className="w-full rounded-2xl border border-gray-200 bg-[#F8F8F8] p-4"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#172033]">
          {t("subscribed_academies")}
        </h2>

        <span className="rounded-full bg-[#E8F7F5] px-3 py-1 text-xs font-semibold text-[#00786F]">
          {data.length}
        </span>
      </div>

      {data.length > 0 ? (
  <Swiper
    modules={[Pagination , Autoplay]}
    spaceBetween={16}
    slidesPerView={1}
    pagination={{ clickable: true }}
    autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
    className="pb-10"
  >
    {data.slice(0, 3).map((academy, index) => {
      const cardKey = `${academy.student}-${academy.programName}-${academy.startDate}-${index}`;

      return (
        <SwiperSlide key={cardKey} className="h-auto">
          <article className="h-full overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
            <div className="relative h-44 w-full overflow-hidden bg-[#EAF7F5]">
              {academy.image ? (
                <img
                  src={academy.image}
                  alt={academy.program || academy.programName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <IoSchoolOutline className="text-6xl text-[#008C80]" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-medium text-gray-400">
                    {academy.programName || t("academy")}
                  </p>

                  <h3 className="text-xl font-bold leading-8 text-[#172033]">
                    {academy.program || academy.programName || "—"}
                  </h3>
                </div>

                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    academy.isPaid
                      ? "border-[#B7F3D0] bg-[#EAF9F5] text-[#159765]"
                      : "border-[#F8D6A9] bg-[#FFF7EA] text-[#C46A14]"
                  }`}
                >
                  <IoTimeOutline className="text-sm" />

                  {academy.isPaid
                    ? t("paid", { defaultValue: "مدفوع" })
                    : t("unpaid", { defaultValue: "غير مدفوع" })}
                </span>
              </div>

              <div className="space-y-4">
                <InfoRow
                  icon={<IoPersonOutline />}
                  label={t("student_name", {
                    defaultValue: "اسم اللاعب",
                  })}
                  value={academy.studentName}
                />

                <InfoRow
                  icon={<MdOutlineBadge />}
                  label={t("student_code", {
                    defaultValue: "الرقم الأكاديمي",
                  })}
                  value={academy.student}
                />
              </div>

              <div className="my-2 h-px bg-gray-100" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DateBox
                  icon={<IoCalendarOutline />}
                  label={t("start_date", {
                    defaultValue: "تاريخ البداية",
                  })}
                  value={formatDate(academy.startDate)}
                />

                <DateBox
                  icon={<IoCalendarOutline />}
                  label={t("due_date", {
                    defaultValue: "تاريخ الاستحقاق",
                  })}
                  value={formatDate(academy.dueDate)}
                />
              </div>
            </div>
          </article>
        </SwiperSlide>
      );
    })}
  </Swiper>
) : (
  <div className="rounded-2xl bg-white py-10 text-center">
    <IoSchoolOutline className="mx-auto mb-3 text-5xl text-gray-300" />

    <p className="text-sm text-gray-500">
      {t("no_subscribed_academies")}
    </p>
  </div>
)}
    </section>
  );
};

const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F6F8] text-xl text-[#607086]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="mb-0.5 text-xs text-gray-400">{label}</p>

        <p className="break-words text-sm font-semibold leading-6 text-[#344054]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const DateBox = ({ icon, label, value }) => {
  return (
    <div className="flex items-center  gap-1 rounded-2xl border border-gray-200 bg-[#FAFCFC] p-4">
           <div className="text-xl text-[#00786F]">{icon}</div>

      <div>
        <p className="mb-1 text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold leading-6 text-[#344054]">{value}</p>
      </div>

    </div>
  );
};

export default AcademySubscriptions;