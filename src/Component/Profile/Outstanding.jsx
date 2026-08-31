import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { payment_Fawry } from "../../axiosConfig/APIs/Supscription_payment/Create_fawry";
import { academyFeePayment } from "../../axiosConfig/APIs/Academy/Academy_Payment";

const Outstanding = ({ data }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] =
    useState("subscriptions");

  const [showPaymentPopup, setShowPaymentPopup] =
    useState(false);

  const [
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  ] = useState("visa");

  const [
    selectedPaymentItem,
    setSelectedPaymentItem,
  ] = useState(null);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState("");

  const subscriptions = Array.isArray(
    data?.outstandingSubscriptions
  )
    ? data.outstandingSubscriptions
    : [];

  const fees = Array.isArray(
    data?.outstandingFees
  )
    ? data.outstandingFees
    : [];

  const services = Array.isArray(
    data?.outstandingServices
  )
    ? data.outstandingServices
    : [];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Unpaid":
      case "Pending Payment":
        return "bg-yellow-100 text-yellow-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      case "Draft":
        return "bg-gray-100 text-gray-700";

      case "Paid":
        return "bg-green-100 text-green-700";

      case "Waitlisted":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const extractPaymentError = (error) => {
    const errorData =
      error?.response?.data || {};

    const nestedMessage =
      errorData?.message;

    const message =
      nestedMessage?.error ||
      nestedMessage?.message ||
      errorData?.error ||
      errorData?.message ||
      error?.message ||
      "حدث خطأ أثناء بدء عملية الدفع.";

    return typeof message === "string"
      ? message
      : "حدث خطأ أثناء بدء عملية الدفع.";
  };

  const openPaymentPopup = (item) => {
    setSelectedPaymentItem(item);
    setSelectedPaymentMethod("visa");
    setPaymentError("");
    setShowPaymentPopup(true);
  };

  const closePaymentPopup = () => {
    if (paymentLoading) return;

    setShowPaymentPopup(false);
    setSelectedPaymentItem(null);
    setSelectedPaymentMethod("visa");
    setPaymentError("");
  };

  const handlePayment = async (
    paymentMethod
  ) => {
    if (
      !selectedPaymentItem ||
      paymentLoading
    ) {
      return;
    }

    try {
      setPaymentLoading(true);
      setPaymentError("");

      let response;

      /*
       * رسوم الأكاديميات تستخدم API منفصل.
       */
      if (
        selectedPaymentItem.type === "fee"
      ) {
        const payMethod =
          selectedPaymentItem?.payMethod;

        const payParams =
          selectedPaymentItem?.payParams ||
          {};

        if (!payMethod) {
          setPaymentError(
            "طريقة دفع رسوم الأكاديمية غير موجودة."
          );

          return;
        }

        response =
          await academyFeePayment(
            payMethod,
            {
              ...payParams,
              payment_method:
                paymentMethod,
            }
          );
      } else {
        /*
         * الاشتراكات والخدمات تستخدم
         * payment_Fawry.
         */
        const invoiceId =
          selectedPaymentItem
            ?.payParams?.invoice_id ||
          selectedPaymentItem?.id;

        if (!invoiceId) {
          setPaymentError(
            "رقم الفاتورة غير موجود."
          );

          return;
        }

        const body = {
          invoice_id: invoiceId,
          payment_method:
            paymentMethod,
        };

        response =
          await payment_Fawry(body);
      }

      const responseData =
        response?.message?.data ||
        response?.message ||
        response?.data ||
        response ||
        {};

      const status =
        responseData?.status;

      const paymentLink =
        responseData?.payment_link ||
        responseData?.paymentLink;

      if (
        String(status).toLowerCase() ===
          "success" &&
        paymentLink
      ) {
        window.location.href =
          paymentLink;

        return;
      }

      if (paymentLink) {
        window.location.href =
          paymentLink;

        return;
      }

      const responseMessage =
        responseData?.message ||
        responseData?.error ||
        "لم يتم استلام رابط الدفع.";

      setPaymentError(
        typeof responseMessage ===
          "string"
          ? responseMessage
          : "لم يتم استلام رابط الدفع."
      );

      console.error(
        "Payment response:",
        response
      );
    } catch (error) {
      console.error(
        "Payment error:",
        error?.response?.data ||
          error
      );

      setPaymentError(
        extractPaymentError(error)
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-md">
      <h2 className="mb-5 text-2xl font-bold">
        {t("outstanding_payments")}
      </h2>

      {/* Tabs */}
      <div className="mb-6 flex gap-3 overflow-x-auto border-b">
        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "subscriptions"
            )
          }
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab ===
            "subscriptions"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("renew_membership")}
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "academies"
            )
          }
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab ===
            "academies"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("academy_fees")}
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("services")
          }
          className={`whitespace-nowrap border-b-2 px-5 py-3 font-semibold transition ${
            activeTab === "services"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("services")}
        </button>
      </div>

      {/* Subscriptions */}
      {activeTab ===
        "subscriptions" && (
        <div>
          {subscriptions.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t(
                "no_outstanding_payments"
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map(
                (item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {item.description ||
                            "-"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {t(
                            "reced_num"
                          )}
                          : {item.id}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("amount")}
                        </p>

                        <p className="mt-1 font-bold text-[#00BFA6]">
                          {item.grandTotal ??
                            item.amount ??
                            0}{" "}
                          {item.currency}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t(
                            "fiscal_year"
                          )}
                        </p>

                        <p className="mt-1 font-semibold">
                          {item.fiscalYear ||
                            "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t("dueDate")}
                        </p>

                        <p className="mt-1 font-semibold">
                          {item.dueDate ||
                            "-"}
                        </p>
                      </div>
                    </div>

                    {item.blockedReason && (
                      <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        {
                          item.blockedReason
                        }
                      </div>
                    )}

                    {item.payable && (
                      <button
                        type="button"
                        onClick={() =>
                          openPaymentPopup(
                            item
                          )
                        }
                        className="mt-5 w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c]"
                      >
                        {t("pay_now")}
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* Academies */}
      {activeTab ===
        "academies" && (
        <div>
          {fees.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("noacademy")}
            </div>
          ) : (
            <div className="space-y-4">
              {fees.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        {item.programName ||
                          "-"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.studentName ||
                          "-"}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {t(
                          "fee_number"
                        )}
                        : {item.id}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("amount")}
                      </p>

                      <p className="mt-1 font-bold text-[#00BFA6]">
                        {item.grandTotal ??
                          item.amount ??
                          0}{" "}
                        {item.currency}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t(
                          "academic_year"
                        )}
                      </p>

                      <p className="mt-1 font-semibold">
                        {item.academicYear ||
                          "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t(
                          "academic_term"
                        )}
                      </p>

                      <p className="mt-1 font-semibold">
                        {item.academicTerm ||
                          "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("due_date")}
                      </p>

                      <p className="mt-1 font-semibold">
                        {item.dueDate ||
                          "-"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
                    {t("student_type")}
                    :{" "}

                    <span className="font-semibold">
                      {item.isDependant
                        ? t(
                            "dependent_member"
                          )
                        : t(
                            "primary_member"
                          )}
                    </span>
                  </div>

                  {item.payable && (
                    <button
                      type="button"
                      onClick={() =>
                        openPaymentPopup(
                          item
                        )
                      }
                      className="mt-5 w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c]"
                    >
                      {t("pay_now")}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Services */}
      {activeTab === "services" && (
        <div>
          {services.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t(
                "no_outstanding_services",
                {
                  defaultValue:
                    "لا توجد خدمات مستحقة الدفع",
                }
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((item) => {
                const serviceStatus =
                  item.bookingStatus ||
                  item.status;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {item.serviceName ||
                            "-"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {t(
                            "booking_number",
                            {
                              defaultValue:
                                "رقم الحجز",
                            }
                          )}
                          :{" "}
                          {item.bookingId ||
                            "-"}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {t(
                            "invoice_number"
                          )}
                          : {item.id}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                          serviceStatus
                        )}`}
                      >
                        {serviceStatus}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {t(
                            "service_tier",
                            {
                              defaultValue:
                                "الفئة",
                            }
                          )}
                        </p>

                        <p className="mt-1 font-semibold">
                          {item.tier ||
                            "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t(
                            "attendee_count",
                            {
                              defaultValue:
                                "عدد المتقدمين",
                            }
                          )}
                        </p>

                        <p className="mt-1 font-semibold">
                          {item.attendeeCount ??
                            item.attendees
                              ?.length ??
                            0}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t("amount")}
                        </p>

                        <p className="mt-1 font-bold text-[#00BFA6]">
                          {item.grandTotal ??
                            item.amount ??
                            0}{" "}
                          {item.currency}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t("due_date")}
                        </p>

                        <p className="mt-1 font-semibold">
                          {item.dueDate ||
                            "-"}
                        </p>
                      </div>
                    </div>

                    {Array.isArray(
                      item.attendees
                    ) &&
                      item.attendees
                        .length > 0 && (
                        <div className="mt-4 rounded-xl bg-gray-50 p-4">
                          <p className="mb-3 font-semibold text-gray-700">
                            {t(
                              "attendees",
                              {
                                defaultValue:
                                  "المتقدمون",
                              }
                            )}
                          </p>

                          <div className="space-y-2">
                            {item.attendees.map(
                              (
                                attendee,
                                index
                              ) => (
                                <div
                                  key={`${item.id}-${index}`}
                                  className="flex items-center justify-between rounded-lg bg-white p-3"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-800">
                                      {attendee.name ||
                                        "-"}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                      {attendee.type ===
                                      "Self"
                                        ? t(
                                            "primary_member"
                                          )
                                        : attendee.type ===
                                          "Dependant"
                                        ? t(
                                            "dependent_member"
                                          )
                                        : t(
                                            "guest",
                                            {
                                              defaultValue:
                                                "ضيف",
                                            }
                                          )}
                                    </p>
                                  </div>

                                  {attendee.isDependant && (
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                                      {t(
                                        "dependent",
                                        {
                                          defaultValue:
                                            "تابع",
                                        }
                                      )}
                                    </span>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {(item.day ||
                      item.time) && (
                      <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            {t(
                              "day",
                              {
                                defaultValue:
                                  "اليوم",
                              }
                            )}
                          </p>

                          <p className="mt-1 font-semibold">
                            {item.day ||
                              "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            {t(
                              "time",
                              {
                                defaultValue:
                                  "الوقت",
                              }
                            )}
                          </p>

                          <p className="mt-1 font-semibold">
                            {item.time ||
                              "-"}
                          </p>
                        </div>
                      </div>
                    )}

                    {item.payable && (
                      <button
                        type="button"
                        onClick={() =>
                          openPaymentPopup(
                            item
                          )
                        }
                        className="mt-5 w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c]"
                      >
                        {t("pay_now")}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
          <div className="relative max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
            <button
              type="button"
              onClick={
                closePaymentPopup
              }
              disabled={paymentLoading}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              ×
            </button>

            <h2 className="mb-5 text-center text-xl font-bold">
              {t(
                "select_payment_method"
              )}
            </h2>

            {/* Item Info */}
            <div className="mb-5 rounded-xl bg-gray-50 p-4">
              {/* Academy */}
              {selectedPaymentItem?.type ===
                "fee" && (
                <div className="mb-4 border-b pb-4">
                  <p className="text-sm text-gray-500">
                    {t("activity")}
                  </p>

                  <p className="mt-1 font-bold">
                    {
                      selectedPaymentItem?.programName
                    }
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {
                      selectedPaymentItem?.studentName
                    }
                  </p>
                </div>
              )}

              {/* Service */}
              {selectedPaymentItem?.type ===
                "service" && (
                <div className="mb-4 border-b pb-4">
                  <p className="text-sm text-gray-500">
                    {t(
                      "service",
                      {
                        defaultValue:
                          "الخدمة",
                      }
                    )}
                  </p>

                  <p className="mt-1 font-bold">
                    {
                      selectedPaymentItem?.serviceName
                    }
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {t(
                      "service_tier",
                      {
                        defaultValue:
                          "الفئة",
                      }
                    )}
                    :{" "}
                    {selectedPaymentItem?.tier ||
                      "-"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {t(
                      "booking_number",
                      {
                        defaultValue:
                          "رقم الحجز",
                      }
                    )}
                    :{" "}
                    {selectedPaymentItem?.bookingId ||
                      "-"}
                  </p>

                  {Array.isArray(
                    selectedPaymentItem?.attendees
                  ) &&
                    selectedPaymentItem
                      .attendees.length >
                      0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold">
                          {t(
                            "attendees",
                            {
                              defaultValue:
                                "المتقدمون",
                            }
                          )}
                          :
                        </p>

                        {selectedPaymentItem.attendees.map(
                          (
                            person,
                            index
                          ) => (
                            <p
                              key={index}
                              className="text-sm text-gray-600"
                            >
                              •{" "}
                              {person.name ||
                                "-"}
                            </p>
                          )
                        )}
                      </div>
                    )}
                </div>
              )}

              {/* Amount */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  {t("amount")}
                </span>

                <span className="font-bold text-[#00BFA6]">
                  {selectedPaymentItem?.grandTotal ??
                    selectedPaymentItem?.amount ??
                    0}{" "}
                  {
                    selectedPaymentItem?.currency
                  }
                </span>
              </div>

              {/* ID */}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-500">
                  {selectedPaymentItem?.type ===
                  "fee"
                    ? t(
                        "fee_number"
                      )
                    : t(
                        "invoice_number"
                      )}
                </span>

                <span className="font-semibold">
                  {
                    selectedPaymentItem?.id
                  }
                </span>
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
                {paymentError}
              </div>
            )}

            {/* Payment Methods */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedPaymentMethod(
                    "visa"
                  );
                  setPaymentError("");
                }}
                disabled={paymentLoading}
                className={`rounded-xl border p-5 transition disabled:opacity-50 ${
                  selectedPaymentMethod ===
                  "visa"
                    ? "border-[#00BFA6] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="text-4xl font-black text-blue-900">
                  VISA
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPaymentMethod(
                    "fawry"
                  );
                  setPaymentError("");
                }}
                disabled={paymentLoading}
                className={`rounded-xl border p-5 transition disabled:opacity-50 ${
                  selectedPaymentMethod ===
                  "fawry"
                    ? "border-[#00BFA6] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="inline-block rounded bg-yellow-300 px-4 py-2 font-bold text-blue-800">
                  Fawry
                </div>
              </button>
            </div>

            {/* Visa */}
            {selectedPaymentMethod ===
              "visa" && (
              <div className="space-y-4">
                <div className="rounded-xl border p-6 text-center">
                  <p className="text-gray-600">
                    {t(
                      "payment_by_card"
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePayment(
                      "CARD"
                    )
                  }
                  disabled={paymentLoading}
                  className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {paymentLoading
                    ? t(
                        "processing"
                      )
                    : t(
                        "confirm_payment"
                      )}
                </button>
              </div>
            )}

            {/* Fawry */}
            {selectedPaymentMethod ===
              "fawry" && (
              <div className="space-y-5">
                <div className="flex justify-center rounded-xl border p-8">
                  <div className="rounded bg-yellow-300 px-5 py-3 text-xl font-bold text-blue-800">
                    Fawry
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePayment(
                      "PayAtFawry"
                    )
                  }
                  disabled={paymentLoading}
                  className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {paymentLoading
                    ? t(
                        "processing"
                      )
                    : t(
                        "pay_via_fawry"
                      )}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={
                closePaymentPopup
              }
              disabled={paymentLoading}
              className="mt-3 w-full rounded-xl border border-[#00BFA6] py-3 text-[#00BFA6] disabled:opacity-50"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outstanding;