import i18next from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaRegIdCard,
} from "react-icons/fa";
import { MdPermPhoneMsg } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { payment_Fawry } from "../../axiosConfig/APIs/Supscription_payment/Create_fawry";

const QuickActions = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showRenewPopup, setShowRenewPopup] = useState(false);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const subscriptions = Array.isArray(data?.outstandingSubscriptions)
    ? data.outstandingSubscriptions
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
      "حدث خطأ أثناء بدء عملية الدفع.";

    return typeof message === "string"
      ? message
      : "حدث خطأ أثناء بدء عملية الدفع.";
  };

  const openRenewModal = () => {
    setSelectedPaymentItem(null);
    setSelectedPaymentMethod("visa");
    setPaymentError("");
    setShowRenewPopup(true);
  };

  const closeRenewModal = () => {
    if (paymentLoading) return;
    setShowRenewPopup(false);
    setSelectedPaymentItem(null);
    setSelectedPaymentMethod("visa");
    setPaymentError("");
  };

  const openPaymentPopup = (item) => {
    setSelectedPaymentItem(item);
    setSelectedPaymentMethod("visa");
    setPaymentError("");
  };

  const handlePayment = async (paymentMethod) => {
    if (!selectedPaymentItem || paymentLoading) return;

    try {
      setPaymentLoading(true);
      setPaymentError("");

      const invoiceId =
        selectedPaymentItem?.payParams?.invoice_id || selectedPaymentItem?.id;

      if (!invoiceId) {
        setPaymentError("رقم الفاتورة غير موجود.");
        return;
      }

      const response = await payment_Fawry({
        invoice_id: invoiceId,
        payment_method: paymentMethod,
      });

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
        responseData?.message ||
        responseData?.error ||
        "لم يتم استلام رابط الدفع.";

      setPaymentError(
        typeof responseMessage === "string"
          ? responseMessage
          : "لم يتم استلام رابط الدفع."
      );
    } catch (error) {
      setPaymentError(extractPaymentError(error));
    } finally {
      setPaymentLoading(false);
    }
  };

  const inputs = [
    {
      title: t("book_activity_or_service"),
      action: () => navigate("/academy"),
      icon: <CiCirclePlus />,
    },
    {
      title: t("renew_membership"),
      action: openRenewModal,
      icon: <FaRegIdCard />,
    },
    {
      title: t("contact_us"),
      action: () => navigate("/contact"),
      icon: <MdPermPhoneMsg />,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow border ">
      <h3 className="font-bold text-[20px] mb-3">{t("quick_actions")}</h3>

      {inputs.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={item.action}
          className="w-full justify-between border rounded-xl py-3 px-4 mb-3 flex items-center gap-3 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-full bg-[#00786F] text-white flex items-center justify-center text-2xl font-bold">
              {item.icon}
            </span>

            <span className="text-[18px] font-bold">{item.title}</span>
          </div>
          <span className="text-[18px]">
            {i18next.language === "ar" ? (
              <FaRegArrowAltCircleLeft />
            ) : (
              <FaRegArrowAltCircleRight />
            )}{" "}
          </span>
        </button>
      ))}

      {/* Renew Membership Popup */}
      {showRenewPopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
          <div className="relative max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
            <button
              type="button"
              onClick={closeRenewModal}
              disabled={paymentLoading}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              ×
            </button>

            {!selectedPaymentItem ? (
              <>
                <h2 className="mb-5 text-center text-xl font-bold">
                  {t("renew_membership")}
                </h2>

                {subscriptions.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">
                    {t("no_outstanding_payments")}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold">
                              {item.description || "-"}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {t("reced_num")}: {item.id}
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
                              {item.grandTotal ?? item.amount ?? 0}{" "}
                              {item.currency}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              {t("fiscal_year")}
                            </p>

                            <p className="mt-1 font-semibold">
                              {item.fiscalYear || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              {t("dueDate")}
                            </p>

                            <p className="mt-1 font-semibold">
                              {item.dueDate || "-"}
                            </p>
                          </div>
                        </div>

                        {item.blockedReason && (
                          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                            {item.blockedReason}
                          </div>
                        )}

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

                <button
                  type="button"
                  onClick={closeRenewModal}
                  className="mt-4 w-full rounded-xl border border-[#00BFA6] py-3 text-[#00BFA6]"
                >
                  {t("cancel")}
                </button>
              </>
            ) : (
              <>
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
                      {selectedPaymentItem?.currency}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-gray-500">
                      {t("invoice_number")}
                    </span>

                    <span className="font-semibold">
                      {selectedPaymentItem?.id}
                    </span>
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
                    <div className="text-4xl font-black text-blue-900">
                      VISA
                    </div>
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

                {selectedPaymentMethod === "visa" && (
                  <div className="space-y-4">
                    <div className="rounded-xl border p-6 text-center">
                      <p className="text-gray-600">{t("payment_by_card")}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePayment("CARD")}
                      disabled={paymentLoading}
                      className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentLoading ? t("processing") : t("confirm_payment")}
                    </button>
                  </div>
                )}

                {selectedPaymentMethod === "fawry" && (
                  <div className="space-y-5">
                    <div className="flex justify-center rounded-xl border p-8">
                      <div className="rounded bg-yellow-300 px-5 py-3 text-xl font-bold text-blue-800">
                        Fawry
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePayment("PayAtFawry")}
                      disabled={paymentLoading}
                      className="w-full rounded-xl bg-[#00BFA6] py-3 font-semibold text-white transition hover:bg-[#009f8c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentLoading ? t("processing") : t("pay_via_fawry")}
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (paymentLoading) return;
                    setSelectedPaymentItem(null);
                    setPaymentError("");
                  }}
                  disabled={paymentLoading}
                  className="mt-3 w-full rounded-xl border border-[#00BFA6] py-3 text-[#00BFA6] disabled:opacity-50"
                >
                  {t("cancel")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
