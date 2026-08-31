import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Payments = ({ data }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("subscriptions");

  const subscriptionPayments = Array.isArray(
    data?.subscriptionPayments
  )
    ? data.subscriptionPayments
    : [];

  const feePayments = Array.isArray(data?.feePayments)
    ? data.feePayments
    : [];

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

      case "draft":
        return "bg-gray-100 text-gray-700";

      case "waitlisted":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAttendeeType = (type) => {
    switch (type) {
      case "Self":
        return t("primary_member", {
          defaultValue: "العضو الأساسي",
        });

      case "Dependant":
        return t("dependent_member", {
          defaultValue: "عضو تابع",
        });

      case "Guest":
        return t("guest", {
          defaultValue: "ضيف",
        });

      default:
        return type || "-";
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-md">
      <h2 className="mb-5 text-2xl font-bold">
        {t("payment_history")}
      </h2>

      {/* Tabs */}
      <div className="mb-6 flex gap-3 overflow-x-auto border-b">
        <button
          type="button"
          onClick={() => setActiveTab("subscriptions")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab === "subscriptions"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("subscription_payments")}
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

        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab === "services"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("service_payments", {
            defaultValue: "مدفوعات الخدمات",
          })}
        </button>
      </div>

      {/* Subscription Payments */}
      {activeTab === "subscriptions" && (
        <div>
          {subscriptionPayments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_subscription_payments")}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[750px] text-sm text-right">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">{t("date")}</th>

                    <th className="px-4 py-3">
                      {t("description")}
                    </th>

                    <th className="px-4 py-3">
                      {t("amount")}
                    </th>

                    <th className="px-4 py-3">
                      {t("payment_method")}
                    </th>

                    <th className="px-4 py-3">
                      {t("status")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscriptionPayments.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-4 py-4">
                        {formatDate(item.paymentDate || item.date)}
                      </td>

                      <td className="px-4 py-4">
                        {item.productBundle ||
                          item.serviceType ||
                          item.description ||
                          "-"}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {item.amount ?? item.grandTotal ?? 0}{" "}
                        {item.currency || ""}
                      </td>

                      <td className="px-4 py-4">
                        {item.paymentMethod || "-"}
                      </td>

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

      {/* Academy Payments */}
      {activeTab === "academies" && (
        <div>
          {feePayments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_academy_payments")}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[750px] text-sm text-right">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">{t("date")}</th>

                    <th className="px-4 py-3">
                      {t("description")}
                    </th>

                    <th className="px-4 py-3">
                      {t("amount")}
                    </th>

                    <th className="px-4 py-3">
                      {t("payment_method")}
                    </th>

                    <th className="px-4 py-3">
                      {t("status")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {feePayments.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-4 py-4">
                        {formatDate(item.paymentDate || item.date)}
                      </td>

                      <td className="px-4 py-4">
                        {item.programName ||
                          item.description ||
                          "-"}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {item.amount ?? item.grandTotal ?? 0}{" "}
                        {item.currency || ""}
                      </td>

                      <td className="px-4 py-4">
                        {item.paymentMethod || "-"}
                      </td>

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

      {/* Service Payments */}
      {activeTab === "services" && (
        <div>
          {servicePayments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_service_payments", {
                defaultValue: "لا توجد مدفوعات خدمات",
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {servicePayments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.serviceName || "-"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {t("booking_number", {
                          defaultValue: "رقم الحجز",
                        })}
                        : {item.bookingId || "-"}
                      </p>

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

                  {/* Details */}
                  <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("date")}
                      </p>

                      <p className="mt-1 font-semibold">
                        {formatDate(item.paymentDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("service_tier", {
                          defaultValue: "الفئة",
                        })}
                      </p>

                      <p className="mt-1 font-semibold">
                        {item.tier || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("attendee_count", {
                          defaultValue: "عدد المتقدمين",
                        })}
                      </p>

                      <p className="mt-1 font-semibold">
                        {item.attendeeCount ??
                          item.attendees?.length ??
                          0}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("amount")}
                      </p>

                      <p className="mt-1 font-bold text-[#00BFA6]">
                        {item.amount ?? 0} {item.currency || ""}
                      </p>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="mt-4 flex flex-wrap gap-3 rounded-xl bg-gray-50 p-4 text-sm">
                    <div>
                      <span className="text-gray-500">
                        {t("payment_method")}:
                      </span>{" "}
                      <span className="font-semibold">
                        {item.paidOnline
                          ? t("online_payment", {
                              defaultValue: "دفع إلكتروني",
                            })
                          : item.paymentMethod || "-"}
                      </span>
                    </div>

                    {(item.day || item.time) && (
                      <>
                        <div>
                          <span className="text-gray-500">
                            {t("day", {
                              defaultValue: "اليوم",
                            })}
                            :
                          </span>{" "}
                          <span className="font-semibold">
                            {item.day || "-"}
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-500">
                            {t("time", {
                              defaultValue: "الوقت",
                            })}
                            :
                          </span>{" "}
                          <span className="font-semibold">
                            {item.time || "-"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Attendees */}
                  {Array.isArray(item.attendees) &&
                    item.attendees.length > 0 && (
                      <div className="mt-4 rounded-xl bg-gray-50 p-4">
                        <p className="mb-3 font-semibold text-gray-700">
                          {t("attendees", {
                            defaultValue: "المتقدمون",
                          })}
                        </p>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {item.attendees.map(
                            (attendee, index) => (
                              <div
                                key={`${item.id}-${index}`}
                                className="flex items-center justify-between rounded-xl border bg-white p-3"
                              >
                                <div>
                                  <p className="font-semibold text-gray-800">
                                    {attendee.name || "-"}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">
                                    {getAttendeeType(attendee.type)}
                                  </p>
                                </div>

                                {attendee.isDependant && (
                                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {t("dependent", {
                                      defaultValue: "تابع",
                                    })}
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;