// import React from 'react'

// const Bookings = () => {
//   return (
//   <div className="bg-white rounded-xl p-4 shadow">
//       <h3 className="font-bold mb-3">الحجوزات القادمة</h3>

//       {[1, 2].map((item) => (
//         <div
//           key={item}
//           className="flex justify-between items-center mb-3"
//         >
//           <div>
//             <p className="font-semibold">درس سباحة</p>
//             <p className="text-xs text-gray-500">
//               10:00 - 11:00
//             </p>
//           </div>

//           <button className="bg-green-500 text-white px-3 py-1 rounded">
//             التفاصيل
//           </button>
//         </div>
//       ))}
//     </div>  )
// }

// export default Bookings

import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

// const bookings = [
//   {
//     title: "تدريب السباحة",
//     status: "مؤكد",
//     statusColor: "text-[#23A26D]",
//     statusBg: "bg-[#EAF9F5]",
//     date: "الإثنين 25 مايو 2026",
//     time: "10:00 - 11:00",
//   },
//   {
//     title: "جلسة تدريب شخصي",
//     status: "قيد الانتظار",
//     statusColor: "text-[#FF8A00]",
//     statusBg: "bg-[#FFF4E8]",
//     date: "الإثنين 25 مايو 2026",
//     time: "10:00 - 11:00",
//   },
// ];

const Bookings = ({ data }) => {
  return (
    <div className="bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 w-full ">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          الحجوزات القادمة
        </h2>
        <span className="text-[#009689] text-xs cursor-pointer">
          ← عرض الكل
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {data?.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-3"
          >

            <div className="flex items-start justify-between">
              <div className="text-right">
                <h3 className="font-bold text-sm text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <IoTimeOutline />
                  <span>{item.date}</span>
                </div>

                <div className="flex items-center justify-end gap-1 text-gray-400 text-[11px] mt-1">
                  <FaRegCalendarAlt />
                  <span>{item.date}</span>
                </div>
              </div>
              <span
                className={`${item.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  } text-[10px] px-3 py-1 rounded-full`}
              >
                {item.status}
              </span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">

              <button className="bg-gradient-to-r from-[#2DC6B3] to-[#00786F] text-white text-sm py-2 rounded-lg font-medium hover:opacity-90 duration-300">
                تفاصيل
              </button>

              <button className="border border-gray-300 text-gray-600 text-sm py-2 rounded-lg font-medium hover:bg-gray-100 duration-300">
                إلغاء
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;