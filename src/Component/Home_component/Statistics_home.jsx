// import React from 'react'
// import { CiCircleInfo } from 'react-icons/ci';

// const Statistics_home = () => {
//   const data = [
//     { currentMembers: 72, name: "الاعضاء الحاليين" },
//     { currentMembers: 100, name: "اجمالى الدخول اليوم  " },
//     { currentMembers: 250, name: "اجمالى الخروج اليوم " },
//     { currentMembers: "ساعتين", name: "متوسط مده الزيارات  " },
//   ];
//   const branches = [
//     { name: "فرع 6 اكتوبر" },
//     { name: "فرع الشيراتون" },
//     { name: "فرع العاصمه" },
//   ];
//   return (
//     <div className='px-14 py-10'>
//       <div className='text-center'>
//         <h2 className="text-[36px] font-bold ">
//           إحصائيات
//           <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">   الدخول والخروج
//           </span>  بالفروع
//         </h2>
//         <p className="text-gray-500 text-sm"> إحصائيات الحركة اليومية للأعضاء في الفروع  </p>
//       </div>
//       {branches.map((e, index) => (
//         <div key={index} className='flex border rounded-2xl my-5 relative'>
//           <div className='w-1/5 py-4 bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white rounded-s-xl font-bold text-[22px] text-center px-10'>
//             {e.name}
//           </div>
//           <div className='bg-[#edf5f357] w-4/5 py-4'>
//             <div className='flex justify-around w-[85%]'>
//               {data.map((item, index) => (
//                 <div key={index} className='flex flex-col items-center p-2'>
//                   <h2 className='text-[#00786F] font-bold text-[30px]'>  {item.currentMembers} </h2>
//                   <p className='text-[#364153] font-semibold text-[18px]'> {item.name} </p>
//                 </div>
//               ))}

//               <div className="absolute left-10 top-0 w-[140px]">
//                 <div
//                   className="bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white 
//                   text-center py-4 px-3 flex flex-col items-end justify-center gap-1 "
//                   style={{
//                     clipPath: "polygon(0 0, 82% 0, 56% 100%, 0% 100%)",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0)",
//                   }}
//                 >
//                   <span className='px-4'>
//                   <CiCircleInfo size={20} />
//                   </span>
//                   <span className="font-semibold text-sm">اخر تحديث</span>
//                   <span className="text-xs">منذ 3 ساعات</span>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       ))}


//     </div>
//   )
// }

// export default Statistics_home

import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { Branch_stats } from "../../axiosConfig/APIs/Home/Branch_stats";

const Statistics_home = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranchStats = async () => {
      try {
        setLoading(true);

        const response = await Branch_stats();

        if (response?.message?.data) {
          setBranches(response.message.data);
        }
      } catch (error) {
        console.log("Error fetching branch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchStats();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("ar-EG", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="px-4 md:px-10 lg:px-14 py-10">
      {/* title */}
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[36px] font-bold">
          إحصائيات
          <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
            {" "}
            الدخول والخروج
          </span>{" "}
          بالفروع
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          إحصائيات الحركة اليومية للأعضاء في الفروع
        </p>
      </div>

      {/* loading */}
      {loading ? (
        <div className="text-center text-lg text-gray-500">
          جاري تحميل البيانات...
        </div>
      ) : (
        branches.slice(0, 3).map((branch, index) => {
          const stats = [
            {
              value: branch.currentMembers,
              name: "الأعضاء الحاليين",
            },
            {
              value: branch.todayEntry,
              name: "إجمالي الدخول اليوم",
            },
            {
              value: branch.todayExit,
              name: "إجمالي الخروج اليوم",
            },
            {
              value:
                branch.averageVisitDuration > 0
                  ? `${branch.averageVisitDuration} ساعة`
                  : "0 ساعة",
              name: "متوسط مدة الزيارات",
            },
          ];

          return (
            <div
              key={index}
              className="flex flex-col lg:flex-row border rounded-2xl my-6 overflow-hidden shadow-sm"
            >
              {/* branch name */}
              <div className="lg:w-1/5 py-6 bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white font-bold text-[22px] text-center flex items-center justify-center px-6">
                {branch.branchName}
              </div>

              {/* stats */}
              <div className="bg-[#edf5f357] lg:w-4/5 py-6 px-4 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {stats.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center"
                    >
                      <h2 className="text-[#00786F] font-bold text-[28px]">
                        {item.value}
                      </h2>

                      <p className="text-[#364153] font-semibold text-[16px]">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* last update */}
                <div className="absolute left-9 top-0 hidden md:block w-[140px]">
                  <div
                    className="bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white 
                    text-center py-4 px-3 flex flex-col items-end justify-center gap-1"
                    style={{
                      clipPath: "polygon(0 0, 82% 0, 56% 100%, 0% 100%)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <span className="px-4">
                      <CiCircleInfo size={20} />
                    </span>

                    <span className="font-semibold text-sm">
                      آخر تحديث
                    </span>

                    <span className="text-xs">
                      {formatDate(branch.lastUpdated)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Statistics_home;