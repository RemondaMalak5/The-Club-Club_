import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Guest_Payments = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("services");

  const feePayments = Array.isArray(data?.feePayments) ? data.feePayments : [];
  const servicePayments = Array.isArray(data?.servicePayments)
    ? data.servicePayments
    : [];

  const getStatusStyle = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "paid":
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "unpaid":
      case "pending payment":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "waitlisted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleString(
      i18n.language === "ar" ? "ar-EG" : "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-md">
      <h2 className="mb-5 text-2xl font-bold">{t("payment_history")}</h2>

      <div className="mb-6 flex gap-3 overflow-x-auto border-b">
        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab === "services"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("service_payments")}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("academies")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab === "academies"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("academy_payments")}
        </button>
      </div>

      {activeTab === "services" && (
        <div>
          {servicePayments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_service_payments")}
            </div>
          ) : (
            <div className="space-y-4">
              {servicePayments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.serviceName || "-"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {t("invoice_number")}: {item.id || "-"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status || "-"}
                      </span>

                      {item.bookingStatus && (
                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            item.bookingStatus
                          )}`}
                        >
                          {item.bookingStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-500">{t("date")}</p>
                      <p className="mt-1 font-semibold">
                        {formatDate(item.paymentDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("payment_method")}
                      </p>
                      <p className="mt-1 font-semibold">
                        {item.paymentMethod || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">{t("amount")}</p>
                      <p className="mt-1 font-bold text-[#00BFA6]">
                        {item.amount ?? 0} {item.currency || ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "academies" && (
        <div>
          {feePayments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_academy_payments")}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[650px] text-start text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-start">{t("date")}</th>
                    <th className="px-4 py-3 text-start">{t("description")}</th>
                    <th className="px-4 py-3 text-start">{t("amount")}</th>
                    <th className="px-4 py-3 text-start">
                      {t("payment_method")}
                    </th>
                    <th className="px-4 py-3 text-start">{t("status")}</th>
                  </tr>
                </thead>

                <tbody>
                  {feePayments.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="px-4 py-4">
                        {formatDate(item.paymentDate || item.date)}
                      </td>
                      <td className="px-4 py-4">
                        {item.programName || item.description || "-"}
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        {item.amount ?? item.grandTotal ?? 0}{" "}
                        {item.currency || ""}
                      </td>
                      <td className="px-4 py-4">{item.paymentMethod || "-"}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Guest_Payments;
