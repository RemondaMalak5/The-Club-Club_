// import React from 'react'
// import { LuCircleCheckBig } from 'react-icons/lu';

// const Memberships_home = () => {
//   const memberships = [
//     {
//       type: 'فردي',
//       badge: 'Starter',
//       features: ['دخول النادي + أنشطة مختارة', 'حجز عضو', 'حجز أنشطة', 'إشعارات وتجديد'],
//       popular: false,
//     },
//     {
//       type: 'عائلي',
//       badge: 'Most Popular',
//       features: ['التسجيل للأسر والأطفال', '3 فحصات طبية', 'QR للدخول', 'أولوية في الحجز'],
//       popular: true,
//     },
//     {
//       type: 'شركات',
//       badge: 'Corporate',
//       features: ['باقة الشركات والمؤسسات', 'تقرير استخدام', 'شروط خاصة', 'حجز حسابات'],
//       popular: false,
//     },
//   ];

//   return (
//     <div className="py-5 px-10">
//       <h2 className="text-[36px] font-bold ">العضويات</h2>
//       <p className="text-gray-500 mb-8 ">اختر الخطة الأنسب لك ولأسرتك</p>

//       <div className="grid md:grid-cols-3 gap-5 justify-items-center">
//         {memberships.map((e, idx) => (
//           <div
//             key={idx}
//           className={`w-96 border rounded-2xl p-5 flex flex-col justify-between
//             ${idx === 1 ? 'scale-110 border border-[#00786F] shadow-2xl' : 'border-gray-300'}`} // الكارد الأوسط أكبر
//           >
//             <h3 className="mt-4 text-xl font-bold flex justify-between items-center">
//               {e.type}
//               <span className={`text-[13px] font-semibold px-5 py-2 w-fit rounded-md 
//                                ${e.popular ? 'bg-[#08AC85DB] text-white' : 'bg-gray-200 text-gray-700'}`}>
//                 {e.badge}
//               </span>
//             </h3>

//             <ul className="my-5 space-y-2 text-right">
//               {e.features.map((feat, i) => (
//                 <li key={i} className="flex items-center gap-2 text-[#6A7282] font-medium">
//                   <LuCircleCheckBig />
//                   <span>{feat}</span>
//                 </li>
//               ))}
//             </ul>

//             <button
//               className={`my-8 py-2 px-4 rounded-xl font-bold ${
//                 e.popular
//                   ? 'bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white'
//                   : 'border border-[#08AC85DB] text-[#08AC85DB] hover:bg-[#08AC85DB] hover:text-white'
//               }`}
//             >
//               اختر الخطة
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Memberships_home


import React, { useEffect, useState } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { Memberships } from "../../axiosConfig/APIs/Home/Membership";
import i18next from "i18next";

const Memberships_home = () => {

const [data, setData] = useState([]);
const [error, setError] = useState(false);
const [totalPages, setTotalPages] = useState(1);
  // const memberships = [
  //   {
  //     type: "فردي",
  //     badge: "Starter",
  //     features: [
  //       "دخول النادي + أنشطة مختارة",
  //       "حجز عضو",
  //       "حجز أنشطة",
  //       "إشعارات وتجديد",
  //     ],
  //     popular: false,
  //   },
  //   {
  //     type: "عائلي",
  //     badge: "Most Popular",
  //     features: [
  //       "التسجيل للأسر والأطفال",
  //       "3 فحصات طبية",
  //       "QR للدخول",
  //       "أولوية في الحجز",
  //     ],
  //     popular: true,
  //   },
  //   {
  //     type: "شركات",
  //     badge: "Corporate",
  //     features: [
  //       "باقة الشركات والمؤسسات",
  //       "تقرير استخدام",
  //       "شروط خاصة",
  //       "حجز حسابات",
  //     ],
  //     popular: false,
  //   },
  // ];
 
   const Get_Memberships = async () => {
    const params = {
      "language": i18next.language,
    }
    try {
      const response = await Memberships(params);
      setData(response.message.data);
      setTotalPages(response.message.total_pages);
    }
    catch (error) {
      setError(true);
      console.error("Error fetching news:", error);
    }

  }
 
  useEffect(() => {
    Get_Memberships();
  }, [i18next.language]);

  return (
    <div className="py-10 px-5 md:px-10 overflow-hidden">
      <h2 className="text-[36px] font-bold text-center md:text-right">
        العضويات
      </h2>

      <p className="text-gray-500 mb-12 text-center md:text-right">
        اختر الخطة الأنسب لك ولأسرتك
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {data.slice(0,3).map((e, idx) => (
          <div
            key={idx}
            className={`
              relative
              transition-all duration-500 ease-in-out
              rounded-3xl p-6 flex flex-col justify-between
              border bg-white
              hover:-translate-y-3 hover:shadow-2xl
              
              ${
                idx === 1
                  ? "md:scale-110 border-[#00786F] shadow-2xl z-10"
                  : "border-gray-200 hover:scale-105"
              }
            `}
          >
            {/* glow effect */}
            {idx === 1 && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#08AC85]/10 to-[#00786F]/10 blur-2xl -z-10"></div>
            )}

            <div>
              <h3 className="mt-2 text-2xl font-bold flex justify-between items-center">
                {e.name}

                <span
                  className={`
                    text-[13px] font-semibold px-4 py-2 rounded-full
                    ${
                      e.popular
                        ? "bg-[#08AC85DB] text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {e.discount}
                </span>
              </h3>

              <ul className="my-8 space-y-4">
                {e.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#6A7282] font-medium"
                  >
                    <LuCircleCheckBig className="text-[#08AC85] text-xl" />

                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`
                mt-5 py-3 px-4 rounded-2xl font-bold transition-all duration-300
                ${
                  e.popular
                    ? "bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white hover:scale-105"
                    : "border border-[#08AC85DB] text-[#08AC85DB] hover:bg-[#08AC85DB] hover:text-white hover:scale-105"
                }
              `}
            >
              اختر الخطة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memberships_home;