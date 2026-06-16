

import React from "react";

const Payments = ({ data }) => {
  const payments = data?.items || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          سجل المدفوعات
        </h2>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">التاريخ</th>
              <th className="px-4 py-3">الوصف</th>
              <th className="px-4 py-3">المبلغ</th>
              <th className="px-4 py-3">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100"
                >
                  <td className="px-4 py-4">
                    {new Date(item.date).toLocaleDateString("ar-EG")}
                  </td>

                  <td className="px-4 py-4">
                    {item.description}
                  </td>

                  <td className="px-4 py-4 font-semibold">
                    {item.amount} {item.currency}
                  </td>

                  <td className="px-4 py-4">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {item.status === "paid"
                        ? "مدفوع"
                        : item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-500"
                >
                  لا توجد مدفوعات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;