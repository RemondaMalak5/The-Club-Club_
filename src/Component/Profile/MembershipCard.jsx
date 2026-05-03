// import React from 'react'

// const MembershipCard = () => {
//   return (
// <div className="bg-white rounded-xl p-4 shadow">
//       <h2 className="text-sm text-gray-500 mb-3">
//         بطاقة العضوية الرقمية
//       </h2>

//       <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-4 flex justify-between items-center">
//         <div>
//           <p className="text-xs">2025 - 2026</p>
//           <h3 className="text-xl font-bold">A</h3>
//         </div>

//         <div className="text-left">
//           <p className="text-sm font-bold">أحمد محمد علي</p>
//           <p className="text-xs">@ahmed_mahmoud</p>
//         </div>
//       </div>

//       <div className="mt-4 text-center">
//         <div className="h-12 bg-gray-300 rounded"></div>
//         <p className="text-xs mt-2">MO - 2026 - 2027</p>
//       </div>
//     </div>  )
// }

// export default MembershipCard

import React from "react";

const member = {
  season: "2025 - 2026",
  grade: "A",
  code: "OC-123456",
  name: "أحمد محمد علي",
  username: "@ahmed_mahmoud",
  barcode: "MO - 2026 - 2027",
};

const MembershipCard = () => {
  return (
    <div  className="bg-white rounded-xl p-4 shadow">
      <CardHeader title="بطاقة العضوية الرقمية" />

      <CardBanner
        season={member.season}
        grade={member.grade}
        code={member.code}
      />

      <MemberInfo name={member.name} username={member.username} />

      <Barcode code={member.barcode} />
    </div>
  );
};

export default MembershipCard;

const CardHeader = ({ title }) => {
  return (
    <h2 className="text-sm text-gray-500 mb-3 font-semibold">
      {title}
    </h2>
  );
};

const CardBanner = ({ season, grade, code }) => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-4 flex justify-between items-center">
      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
        {season}
      </span>

      <h3 className="text-xl font-bold">{grade}</h3>

      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
        {code}
      </span>
    </div>
  );
};

const MemberInfo = ({ name, username }) => {
  return (
    <div className="mt-4 text-right">
      <p className="text-sm font-bold text-gray-800">{name}</p>
      <p className="text-xs text-gray-500">{username}</p>
    </div>
  );
};

const Barcode = ({ code }) => {
  return (
    <div className="mt-4 text-center">
      <div className="h-12 bg-gray-300 rounded"></div>
      <p className="text-xs mt-2 font-semibold text-gray-700">{code}</p>
    </div>
  );
};