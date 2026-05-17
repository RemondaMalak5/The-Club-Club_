// import React from "react";

// const Achievements = () => {
//   const achievements = [
//     {
//       title: "كرة السلة",
//       icon: "🏀",
//       total: 16,
//       indoor: 10,
//       outdoor: 6,
//     },
//     {
//       title: "الكاراتيه",
//       icon: "🥋",
//       total: 14,
//       indoor: 8,
//       outdoor: 6,
//     },
//     {
//       title: "السباحة",
//       icon: "🏊",
//       total: 18,
//       indoor: 12,
//       outdoor: 6,
//     },
//     {
//       title: "كرة القدم",
//       icon: "⚽",
//       total: 24,
//       indoor: 15,
//       outdoor: 9,
//     },
//   ];

//   return (
//     <div className="">
      
//       {/* Title */}
//       <h2 className="text-right text-xl font-semibold mb-6">
//         الإنجازات الرياضية
//       </h2>

//       {/* Grid */}
//       <div className="flex flex-wrap px-5">
//         {achievements.map((item, index) => (
//           <div key={index} className="w-full md:w-1/2 lg:w-[280px] px-3">
// <div
//             className="  bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition duration-300"
//           >
            
//             {/* Top */}
//             <div className="flex justify-between items-center">
//                             <div className="text-3xl">{item.icon}</div>
  
  
//               <div>
//                 <h2 className="text-2xl font-bold text-teal-600">
//                   {item.total}
//                 </h2>
//                 <p className="text-sm text-gray-400">بطولة</p>
//               </div>

//             </div>

//             {/* Title */}
//             <h3 className="mt-3 text-gray-700 font-medium text-right">
//               {item.title}
//             </h3>

//             {/* Bottom */}
//             <div className="flex gap-3 mt-4 w-full justify-between ">
              
//               <div className=" bg-[#FFF7ED]  px-4 py-2 rounded-lg flex flex-col items-center justify-center">
//                <span className="text-orange-500 "> {item.outdoor}</span>  
//                <p>خارجية</p>
//               </div>
//               <div className=" bg-[#F0FDFA]  px-4 py-2 rounded-lg flex flex-col items-center justify-center">
//                <span className="text-teal-600 "> {item.indoor}</span>  
//                <p>داخلية</p>
//               </div>

            

//             </div>

//           </div>
//           </div>
          

//         ))}
//       </div>

//     </div>
//   );
// };

// export default Achievements;

import React, { useEffect, useState } from "react";
import { Get_Trophies } from "../../axiosConfig/APIs/Champanship/Trophies List";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Get_Trophies();

        const stats = res?.message?.sportStats || [];

        const mapped = stats.map((item) => ({
          title: item.sport,
          icon: getIcon(item.sport),
          total: item.total_items,
          indoor: item.internal,
          outdoor: item.external,
        }));

        setAchievements(mapped);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const getIcon = (sport) => {
    switch (sport) {
      case "كرة السلة":
        return "🏀";
      case "كرة القدم":
        return "⚽";
      case "سباحة":
        return "🏊";
      case "كاراتيه":
        return "🥋";
      case "تنس":
        return "🎾";
      default:
        return "🏆";
    }
  };

  return (
    <div>
      <h2 className="text-right text-xl font-semibold mb-6">
        الإنجازات الرياضية
      </h2>

      <div className="flex flex-wrap px-5">
        {achievements.map((item, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-[280px] px-3">
            <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition duration-300">

              {/* Top */}
              <div className="flex justify-between items-center">
                <div className="text-3xl">{item.icon}</div>

                <div>
                  <h2 className="text-2xl font-bold text-teal-600">
                    {item.total}
                  </h2>
                  <p className="text-sm text-gray-400">بطولة</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-gray-700 font-medium text-right">
                {item.title}
              </h3>

              {/* Bottom */}
              <div className="flex gap-3 mt-4 w-full justify-between">

                <div className="bg-[#FFF7ED] px-4 py-2 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-orange-500">{item.outdoor}</span>
                  <p>خارجية</p>
                </div>

                <div className="bg-[#F0FDFA] px-4 py-2 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-teal-600">{item.indoor}</span>
                  <p>داخلية</p>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;