// // import React from 'react'

// // const MembershipCard = () => {
// //   return (
// // <div className="bg-white rounded-xl p-4 shadow">
// //       <h2 className="text-sm text-gray-500 mb-3">
// //         بطاقة العضوية الرقمية
// //       </h2>

// //       <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-4 flex justify-between items-center">
// //         <div>
// //           <p className="text-xs">2025 - 2026</p>
// //           <h3 className="text-xl font-bold">A</h3>
// //         </div>

// //         <div className="text-left">
// //           <p className="text-sm font-bold">أحمد محمد علي</p>
// //           <p className="text-xs">@ahmed_mahmoud</p>
// //         </div>
// //       </div>

// //       <div className="mt-4 text-center">
// //         <div className="h-12 bg-gray-300 rounded"></div>
// //         <p className="text-xs mt-2">MO - 2026 - 2027</p>
// //       </div>
// //     </div>  )
// // }

// // export default MembershipCard

// import React from "react";
// import { FaStar , FaCalendar,} from 'react-icons/fa6'
// import { assets } from "../../assets/assets";
// import { IoTimeOutline } from "react-icons/io5";

// const member = {
//   season: "2025 - 2026",
//   grade: "A",
//   code: "OC-123456",
//   name: "أحمد محمد علي",
//   username: "@ahmed_mahmoud",
//   barcode: "MO - 2026 - 2027",
// };
//  const arr_rate = [
//         { star: <FaStar/> },
//         { star: <FaStar /> },
//         { star: <FaStar /> },
//         { star: <FaStar /> },
//         { star: <FaStar /> },
//     ]
//       const arr_schedule = [
//         { day: 'Monday', time: '08:00 AM - 10:00 PM' },
//         { day: 'Tuesday', time: '08:00 AM - 10:00 PM' },
//         { day: 'Wednesday', time: '08:00 AM - 10:00 PM' },

//     ]
// const MembershipCard = () => {
//   return (
//     <div  className="bg-white rounded-xl p-4 shadow">
//       <CardHeader title="بطاقة العضوية الرقمية" />

//       <CardBanner
//         season={member.season}
//         grade={member.grade}
//         code={member.code}
//       />

//       <MemberInfo name={member.name} username={member.username} />

//       <Barcode code={member.barcode} />
//     </div>
//   );
// };

// export default MembershipCard;

// const CardHeader = ({ title }) => {
//   return (
//     <h2 className="text-sm text-gray-500 mb-3 font-semibold">
//       {title}
//     </h2>
//   );
// };

// const CardBanner = ({ season, grade, code }) => {
//   return (
//    <div className='bg-gradient-to-b from-[#009689] to-[#00786F] rounded-t-xl '>
//                     <div className='flex justify-center py-3'>
//                         {arr_rate.map((e, index) => (
//                             <div key={index} className='text-[#FDC700] text-2xl px-1 '>
//                                 {e.star}
//                             </div>
//                         ))}
//                     </div>
//                     <div className='flex px-2 justify-center py-3'>
//                         <div className='rounded-2xl py-1 px-3  bg-white text-[#00786F]'>
//                             2025-2026
//                         </div>
//                         <h2 className='text-white text-center text-2xl font-bold px-5'> Member</h2>
//                         <div className='rounded-2xl py-1 px-3  bg-white text-[#00786F]'>
//                             OC-123456                </div>
//                     </div>


//                 </div>
//   );
// };

// const MemberInfo = ({ name, username }) => {
//   return (
//    <div className='px-5 py-3 flex flex-col justify-center items-center gap-2 '>
//                     <img src={assets.acdemy} className='rounded-full w-40 h-40 border-4 border-[#00786F]' />
//                     <h1 className='text-2xl font-semibold'>Remonda Malak</h1>
//                     <p className='border border-[#21857C] bg-[#F0FDFA] px-2 rounded-lg'>Active Member </p>
//                     <img src={assets.barcode} className='w-52' />
//                     <div className='flex flex-wrap px-5 justify-center'>
//                         <img src={assets.logo} className='w-20 mx-2 border-2 border-[#035657] p-3 rounded-full' />
//                         <img src={assets.logo} className='w-20  border-2 border-[#035657] p-3 rounded-full' />
//                         <img src={assets.sport_ecard} className='w-20 mx-2 border-2 border-[#035657] p-3 rounded-full' />
//                         <img src={assets.sport_ecard} className='w-20 mx-2 border-2 border-[#035657] p-3 rounded-full' />
//                         <img src={assets.sport_ecard} className='w-20 mx-2 border-2 border-[#035657] p-3 rounded-full' />

//                     </div>


//                 </div>
//   );
// };

// const Barcode = ({ code }) => {
//   return (
//     <div className="mt-4 text-center">
//       <div className="h-12 bg-gray-300 rounded"></div>
//       <p className="text-xs mt-2 font-semibold text-gray-700">{code}</p>
//     </div>
//   );
// };

import React from "react";
import { FaStar } from "react-icons/fa6";
import { assets } from "../../assets/assets";

const member = {
  season: "2025 - 2026",
  grade: "A",
  code: "OC-123456",
  name: "أحمد محمد علي",
  username: "@ahmed_mahmoud",
};

const MembershipCard = ({data}) => {
  const stars = [1, 2, 3, 4, 5];
  const sports = [
    assets.logo,
    assets.logo,
    assets.sport_ecard,
    assets.sport_ecard,
    assets.sport_ecard,
  ];

  return (
    <div className="bg-[#F7F7F7] p-3 rounded-2xl w-full  border border-gray-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-700">
          بطاقة العضوية الرقمية
        </h2>
        
        <div className="flex gap-3 text-[#009689] text-sm">
          <span>⤓</span>
          <span>∞</span>
        </div>

        
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#2DC6B3] to-[#00786F] px-5 py-5">
          
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-3">
            {stars.map((item) => (
              <FaStar
                key={item}
                className="text-[#FFD700] text-sm"
              />
            ))}
          </div>

          {/* Info */}
          <div className="flex items-center justify-center gap-4">
            
            <div className="bg-white text-[#00786F] text-[10px] px-3 py-1 rounded-full font-medium">
              {member.season}
            </div>

            <h1 className="text-white text-3xl font-bold">
              {member.grade}
            </h1>

            <div className="bg-white text-[#00786F] text-[10px] px-3 py-1 rounded-full font-medium">
              {member.code}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-5 py-5 ">
          <div className="flex justify-between">
             <div className="flex items-center gap-2 ">
               <img
                src={assets.acdemy}
                alt=""
                className="w-14 h-14 rounded-full object-cover border"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
              <div className="text-right">
                <h3 className="font-bold text-gray-800 text-lg">
                  {member.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {member.username}
                </p>
              </div>

             
            </div>
          </div>
           <div className="border border-[#23A26D] text-[#23A26D]  w-fit h-fit bg-[#F0FFF8] px-3 py-1 rounded-md text-[10px] font-medium">
              عضو نشط
            </div>
          </div>
         
          

          {/* Barcode */}
          <div className="mt-6 flex flex-col items-center">
            <img
              src={assets.barcode}
              alt=""
              className="w-60 object-contain"
              loading="lazy"
            />

            <div className="flex justify-between w-60 text-xs font-bold text-gray-700 mt-1">
              <span>MO - 2026-2027</span>
              <span>0123456789</span>
            </div>
          </div>

          {/* Sports */}
          <div className="flex justify-center gap-2 mt-5">
            {sports.map((sport, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-full border border-[#00786F] flex items-center justify-center"
              >
                <img
                  src={sport}
                  alt=""
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#6C7EA0] w-4/5 mx-auto mt-5"></div>

          {/* Attendance Circles */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {[...Array(28)].map((_, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full ${
                  index < 16
                    ? "bg-gradient-to-r from-[#2DC6B3] to-[#00786F]"
                    : "bg-[#DDE3E3]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#EAF5F3] rounded-xl mt-4 p-3 text-right">
        <h3 className="text-[#009689] text-xs font-bold mb-1">
          قوانين استخدام العضوية الرقمية:
        </h3>

        <ul className="text-[10px] text-gray-500 leading-5">
          <li>• يمنع مشاركة البطاقة مع أي شخص</li>
          <li>• يجب إظهار البطاقة عند الدخول</li>
          <li>• الالتزام بقوانين النادي</li>
        </ul>
      </div>
    </div>
  );
};

export default MembershipCard;