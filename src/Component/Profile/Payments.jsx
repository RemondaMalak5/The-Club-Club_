

// import React from "react";
// import { useTranslation } from "react-i18next";

// const Payments = ({ data }) => {
//   const payments = data || [];

//   const { t } = useTranslation();

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-800">
//           {t("payment_history")}
//         </h2>
//       </div>

//       <div className="overflow-x-auto border border-gray-200 rounded-xl">
//         <table className="w-full text-sm text-right">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-4 py-3">{t("date")}</th>
//               <th className="px-4 py-3">{t("description")}</th>
//               <th className="px-4 py-3">{t("amount")}</th>
//               <th className="px-4 py-3">{t("status")}</th>
//             </tr>
//           </thead>

//           <tbody>
//             {payments.length > 0 ? (
//               payments.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="border-t border-gray-100"
//                 >
//                   <td className="px-4 py-4">
//                     {new Date(item.date).toLocaleDateString()}
//                   </td>

//                   <td className="px-4 py-4">
//                     {item.description}
//                   </td>

//                   <td className="px-4 py-4 font-semibold">
//                     {item.amount} {item.currency}
//                   </td>

//                   <td className="px-4 py-4">
//                     <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
//                       {item.status === "paid"
//                         ? t("paid")
//                         : item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="py-8 text-center text-gray-500"
//                 >
//                   لا توجد مدفوعات
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Payments;
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Payments = ({ data }) => {
  const { t } = useTranslation();

  // التاب المفتوح
  const [activeTab, setActiveTab] = useState("subscriptions");

  // مدفوعات العضويات
  const subscriptionPayments =
    data?.subscriptionPayments || [];

  // مدفوعات الأنشطة / الأكاديميات
  const feePayments =
    data?.feePayments || [];

  // ==========================
  // لون حالة الدفع
  // ==========================

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";

      case "unpaid":
        return "bg-yellow-100 text-yellow-700";

      case "overdue":
        return "bg-red-100 text-red-700";

      case "draft":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border rounded-3xl p-5 bg-white shadow-md">

      {/* ==========================
          TITLE
      ========================== */}

      <h2 className="text-2xl font-bold mb-5">
        {t("payment_history")}
      </h2>


      {/* ==========================
          TABS
      ========================== */}

      <div className="flex gap-3 border-b mb-6">

        {/* Membership Tab */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("subscriptions")
          }
          className={`px-5 py-3 font-semibold border-b-2 transition ${
            activeTab === "subscriptions"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          مدفوعات العضوية
        </button>


        {/* Academies Tab */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("academies")
          }
          className={`px-5 py-3 font-semibold border-b-2 transition ${
            activeTab === "academies"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          مدفوعات الأنشطة
        </button>

      </div>


      {/* =====================================
          SUBSCRIPTION PAYMENTS
      ===================================== */}

      {activeTab === "subscriptions" && (
        <div>

          {subscriptionPayments.length === 0 ? (

            <div className="py-10 text-center text-gray-500">
              لا توجد مدفوعات عضوية
            </div>

          ) : (

            <div className="overflow-x-auto border border-gray-200 rounded-xl">

              <table className="w-full text-sm text-right">

                <thead className="bg-gray-50 text-gray-600">

                  <tr>
                    <th className="px-4 py-3">
                      التاريخ
                    </th>

                    <th className="px-4 py-3">
                      الوصف
                    </th>

                    <th className="px-4 py-3">
                      المبلغ
                    </th>

                    <th className="px-4 py-3">
                      طريقة الدفع
                    </th>

                    <th className="px-4 py-3">
                      الحالة
                    </th>
                  </tr>

                </thead>


                <tbody>

                  {subscriptionPayments.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-t border-gray-100"
                      >

                        {/* Date */}

                        <td className="px-4 py-4">
                          {item.paymentDate || "-"}
                        </td>


                        {/* Description */}

                        <td className="px-4 py-4">

                          {item.productBundle ||
                            item.serviceType ||
                            "-"}

                        </td>


                        {/* Amount */}

                        <td className="px-4 py-4 font-semibold">

                          {item.amount}{" "}
                          {item.currency}

                        </td>


                        {/* Payment Method */}

                        <td className="px-4 py-4">

                          {item.paymentMethod || "-"}

                        </td>


                        {/* Status */}

                        <td className="px-4 py-4">

                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>
      )}


      {/* =====================================
          ACADEMY PAYMENTS
      ===================================== */}

      {activeTab === "academies" && (
        <div>

          {feePayments.length === 0 ? (

            <div className="py-10 text-center text-gray-500">
              لا توجد مدفوعات أنشطة
            </div>

          ) : (

            <div className="overflow-x-auto border border-gray-200 rounded-xl">

              <table className="w-full text-sm text-right">

                <thead className="bg-gray-50 text-gray-600">

                  <tr>

                    <th className="px-4 py-3">
                      التاريخ
                    </th>

                    <th className="px-4 py-3">
                      الوصف
                    </th>

                    <th className="px-4 py-3">
                      المبلغ
                    </th>

                    <th className="px-4 py-3">
                      طريقة الدفع
                    </th>

                    <th className="px-4 py-3">
                      الحالة
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {feePayments.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-t border-gray-100"
                      >

                        {/* Date */}

                        <td className="px-4 py-4">

                          {item.paymentDate ||
                            item.date ||
                            "-"}

                        </td>


                        {/* Description */}

                        <td className="px-4 py-4">

                          {item.programName ||
                            item.description ||
                            "-"}

                        </td>


                        {/* Amount */}

                        <td className="px-4 py-4 font-semibold">

                          {item.amount}{" "}
                          {item.currency}

                        </td>


                        {/* Payment Method */}

                        <td className="px-4 py-4">

                          {item.paymentMethod || "-"}

                        </td>


                        {/* Status */}

                        <td className="px-4 py-4">

                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default Payments;