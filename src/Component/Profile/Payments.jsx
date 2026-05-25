// import React from 'react'

// const Payments = () => {
//   return (
//  <div className="bg-white rounded-xl p-4 shadow">
//       <h3 className="font-bold mb-3">سجل المدفوعات</h3>

//       <table className="w-full text-sm">
//         <thead>
//           <tr className="text-gray-500">
//             <th>التاريخ</th>
//             <th>الوصف</th>
//             <th>المبلغ</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>2025</td>
//             <td>اشتراك</td>
//             <td>500 جنيه</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>  )
// }

// export default Payments

import React from "react";

const Payments = () => {
  const transactions = [
    {
      id: 1,
      date: "1 يناير 2026",
      description: "تجديد عضوية عائلية",
      amount: "15,000 جنيه",
      status: "مدفوع",
    },
    {
      id: 2,
      date: "15 فبراير 2026",
      description: "حصة خاصة - سباحة",
      amount: "500 جنيه",
      status: "مدفوع",
    },
    {
      id: 3,
      date: "20 فبراير 2026",
      description: "اشتراك أكاديمية التنس",
      amount: "2,000 جنيه",
      status: "مدفوع",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          سجل المدفوعات
        </h2>

        <button className="text-green-600 text-sm font-medium hover:underline">
           تحميل الكشف
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">التاريخ</th>
              <th className="px-4 py-3 font-semibold">الوصف</th>
              <th className="px-4 py-3 font-semibold">المبلغ</th>
              <th className="px-4 py-3 font-semibold">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-100"
              >
                <td className="px-4 py-4 text-gray-600">
                  {item.date}
                </td>

                <td className="px-4 py-4 text-gray-700">
                  {item.description}
                </td>

                <td className="px-4 py-4 font-semibold text-gray-800">
                  {item.amount}
                </td>

                <td className="px-4 py-4">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center mt-4">
        <button className="text-green-600 text-sm font-medium hover:underline">
          عرض المزيد من المدفوعات كاملة
        </button>
      </div>
    </div>
  );
};

export default Payments;