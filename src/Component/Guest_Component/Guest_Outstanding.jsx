import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { payment_Fawry } from "../../axiosConfig/APIs/Supscription_payment/Create_fawry";
import { academyFeePayment } from "../../axiosConfig/APIs/Academy/Academy_Payment";

const Guest_Outstanding = ({ data }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("services");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const fees = Array.isArray(data?.outstandingFees) ? data.outstandingFees : [];
  const services = Array.isArray(data?.outstandingServices)
    ? data.outstandingServices
    : [];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Unpaid":
      case "Pending Payment":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Waitlisted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const extractPaymentError = (error) => {
    const errorData = error?.response?.data || {};
    const nestedMessage = errorData?.message;
    const message =
      nestedMessage?.error ||
      nestedMessage?.message ||
      errorData?.error ||
      errorData?.message ||
      error?.message ||
      t("generic_error");

    return typeof message === "string" ? message : t("generic_error");
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

  const handlePayment = async (paymentMethod) => {
    if (!selectedPaymentItem || paymentLoading) return;

    try {
      setPaymentLoading(true);
      setPaymentError("");

      const rawPayMethod = selectedPaymentItem?.payMethod;
      const payMethod = rawPayMethod
        ? String(rawPayMethod).replace(/^\/?(api\/)?method\//, "")
        : "";
      const payParams = selectedPaymentItem?.payParams || {};
      const invoiceId =
        payParams?.invoice_id ||
        selectedPaymentItem?.invoice_id ||
        selectedPaymentItem?.invoiceId ||
        selectedPaymentItem?.id;

      let response;

      if (selectedPaymentItem.type === "fee" || payMethod) {
        if (!payMethod) {
          setPaymentError(t("generic_error"));
          return;
        }

        response = await academyFeePayment(payMethod, {
          ...payParams,
          ...(invoiceId &&
          selectedPaymentItem.type !== "fee" &&
          !payParams.invoice_id
            ? { invoice_id: invoiceId }
            : {}),
          payment_method: paymentMethod,
        });
      } else {
        if (!invoiceId) {
          setPaymentError(t("generic_error"));
          return;
        }

        response = await payment_Fawry({
          invoice_id: invoiceId,
          payment_method: paymentMethod,
        });
      }

      const responseData =
        response?.message?.data ||
        response?.message ||
        response?.data ||
        response ||
        {};

      const paymentLink =
        responseData?.payment_link || responseData?.paymentLink;

      if (paymentLink) {
        window.location.href = paymentLink;
        return;
      }

      const responseMessage =
        responseData?.message || responseData?.error || t("generic_error");

      setPaymentError(
        typeof responseMessage === "string"
          ? responseMessage
          : t("generic_error")
      );
    } catch (error) {
      setPaymentError(extractPaymentError(error));
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-md">
      <h2 className="mb-5 text-2xl font-bold">{t("outstanding_payments")}</h2>

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
          {t("services")}
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
          {t("academy_fees")}
        </button>
      </div>

      {activeTab === "services" && (
        <div>
          {services.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t("no_outstanding_services")}
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((item) => {
                const serviceStatus = item.bookingStatus || item.status;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {item.serviceName || "-"}
                        </h3>
                        {item.bookingId && (
                          <p className="mt-1 text-sm text-gray-500">
                            {t("booking_number", {
                              defaultValue: "Booking #",
                            })}
                            : {item.bookingId}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-400">
                          {t("invoice_number")}: {item.id}
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

                    <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-gray-500">{t("amount")}</p>
                        <p className="mt-1 font-bold text-[#00BFA6]">
                          {item.grandTotal ?? item.amount ?? 0}{" "}
                          {item.currency || ""}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          {t("service_tier", { defaultValue: "Tier" })}
                        </p>
                        <p className="mt-1 font-semibold">{item.tier || "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">{t("due_date")}</p>
                        <p className="mt-1 font-semibold">
                          {item.dueDate || "-"}
                        </p>
                      </div>
                    </div>

                    {item.payable && (
                      <button
                        type="button"
                        onClick={() => openPaymentPopup(item)}
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

      {activeTab === "academies" && (
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
                        {item.programName || "-"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.studentName || "-"}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        {t("fee_number")}: {item.id}
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
                      <p className="text-sm text-gray-500">{t("amount")}</p>
                      <p className="mt-1 font-bold text-[#00BFA6]">
                        {item.grandTotal ?? item.amount ?? 0}{" "}
                        {item.currency || ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {t("academic_year")}
                      </p>
                      <p className="mt-1 font-semibold">
                        {item.academicYear || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">{t("due_date")}</p>
                      <p className="mt-1 font-semibold">
                        {item.dueDate || "-"}
                      </p>
                    </div>
                  </div>

                  {item.payable && (
                    <button
                      type="button"
                      onClick={() => openPaymentPopup(item)}
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

      {showPaymentPopup && selectedPaymentItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
          <div className="relative max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
            <button
              type="button"
              onClick={closePaymentPopup}
              disabled={paymentLoading}
              className="absolute end-4 top-4 text-2xl text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              ×
            </button>

            <h2 className="mb-5 text-center text-xl font-bold">
              {t("select_payment_method")}
            </h2>

            <div className="mb-5 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">{t("amount")}</span>
                <span className="font-bold text-[#00BFA6]">
                  {selectedPaymentItem?.grandTotal ??
                    selectedPaymentItem?.amount ??
                    0}{" "}
                  {selectedPaymentItem?.currency || ""}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-500">{t("invoice_number")}</span>
                <span className="font-semibold">{selectedPaymentItem?.id}</span>
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
                {paymentError}
              </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedPaymentMethod("visa");
                  setPaymentError("");
                }}
                disabled={paymentLoading}
                className={`rounded-xl border p-5 transition disabled:opacity-50 ${
                  selectedPaymentMethod === "visa"
                    ? "border-[#00BFA6] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="text-3xl font-black text-blue-900">VISA</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPaymentMethod("fawry");
                  setPaymentError("");
                }}
                disabled={paymentLoading}
                className={`rounded-xl border p-5 transition disabled:opacity-50 ${
                  selectedPaymentMethod === "fawry"
                    ? "border-[#00BFA6] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="inline-block rounded bg-yellow-300 px-4 py-2 font-bold text-blue-800">
                  Fawry
                </div>
              </button>
            </div>

            {selectedPaymentMethod === "visa" ? (
              <button
                type="button"
                onClick={() => handlePayment("CARD")}
                disabled={paymentLoading}
                className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:opacity-50"
              >
                {paymentLoading ? t("processing") : t("confirm_payment")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handlePayment("PayAtFawry")}
                disabled={paymentLoading}
                className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:opacity-50"
              >
                {paymentLoading ? t("processing") : t("pay_via_fawry")}
              </button>
            )}

            <button
              type="button"
              onClick={closePaymentPopup}
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

export default Guest_Outstanding;
