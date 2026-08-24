import React, { useState } from "react";
import { payment_Fawry } from "../../axiosConfig/APIs/Supscription_payment/Create_fawry";
import { academyFeePayment } from "../../axiosConfig/APIs/Academy/Academy_Payment";
import { useTranslation } from "react-i18next";

const Outstanding = ({ data }) => {
 const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("subscriptions");

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("visa");

  const [selectedPaymentItem, setSelectedPaymentItem] =
    useState(null);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const subscriptions =
    data?.outstandingSubscriptions || [] ;

  const fees =
    data?.outstandingFees || [];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Unpaid":
        return "bg-yellow-100 text-yellow-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      case "Draft":
        return "bg-gray-100 text-gray-700";

      case "Paid":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  const openPaymentPopup = (item) => {

    setSelectedPaymentItem(item);
    setSelectedPaymentMethod("visa");
    setShowPaymentPopup(true);
  };




  const closePaymentPopup = () => {
    if (paymentLoading) return;

    setShowPaymentPopup(false);
    setSelectedPaymentItem(null);
    setSelectedPaymentMethod("visa");
  };


  const handlePayment = async (paymentMethod) => {
    if (!selectedPaymentItem) return;

    try {
      setPaymentLoading(true);

      let response;

     

      if (selectedPaymentItem.type === "fee") {
        const payMethod =
          selectedPaymentItem.payMethod;

        const payParams =
          selectedPaymentItem.payParams || {};

        if (!payMethod) {
         
          return;
        }

        const params = {
          ...payParams,
          payment_method: paymentMethod,
        };

        response = await academyFeePayment(
          payMethod,
          params
        );
      }


      else {
        const body = {
          invoice_id:
            selectedPaymentItem.id,

          payment_method:
            paymentMethod,
        };

     

        response = await payment_Fawry(body);
      }

      const status =
        response?.message?.status;

      const paymentLink =
        response?.message?.payment_link;

      if (
        status === "success" &&
        paymentLink
      ) {
        window.location.href =
          paymentLink;
      } else {
        
      }
    } catch (error) {
      

     
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="border rounded-3xl p-5 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-5">
        {t("outstanding_payments")}
      </h2>

      <div className="flex gap-3 border-b mb-6">
        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "subscriptions"
            )
          }
          className={`px-5 py-3 font-semibold border-b-2 transition ${
            activeTab ===
            "subscriptions"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("renew_membership")}
        </button>

        {/* الأنشطة */}

        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "academies"
            )
          }
          className={`px-5 py-3 font-semibold border-b-2 transition ${
            activeTab ===
            "academies"
              ? "border-[#00BFA6] text-[#00BFA6]"
              : "border-transparent text-gray-500"
          }`}
        >
          {t("academy_fees")}
        </button>

      </div>



      {activeTab ===
        "subscriptions" && (
        <div>

          {subscriptions.length ===
          0 ? (

            <div className="py-10 text-center text-gray-500">
              {t("no_outstanding_payments")}
            </div>

          ) : (

            <div className="space-y-4">

              {subscriptions.map(
                (item) => (

                  <div
                    key={item.id}
                    className="bg-white border rounded-2xl p-5 shadow-sm"
                  >

                    {/* Header */}

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.description}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                         {t("reced_num")}:{" "}
                          {item.id}
                        </p>

                      </div>

                      <span
                        className={`w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                    </div>

                    {/* Details */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 border-t pt-5">

                      <div>

                        <p className="text-sm text-gray-500">
                        {t("amount")}
                        </p>

                        <p className="font-bold text-[#00BFA6] mt-1">
                          {item.grandTotal}{" "}
                          {item.currency}
                        </p>

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
{t("fiscal_year")}                        </p>

                        <p className="font-semibold mt-1">
                          {item.fiscalYear ||
                            "-"}
                        </p>

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
{t("dueDate")}                        </p>

                        <p className="font-semibold mt-1">
                          {item.dueDate || "-"}
                        </p>

                      </div>

                    </div>

                    {/* Blocked */}

                    {item.blockedReason && (

                      <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-xl text-sm">
                        {item.blockedReason}
                      </div>

                    )}

                    {/* Pay */}

                    {item.payable && (

                      <button
                        type="button"
                        onClick={() =>
                          openPaymentPopup(
                            item
                          )
                        }
                        className="w-full mt-5 bg-[#00BFA6] hover:bg-[#009f8c] text-white py-3 rounded-xl font-semibold transition"
                      >
{t("pay_now")}                      </button>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </div>
      )}


      {activeTab ===
        "academies" && (
        <div>

          {fees.length === 0 ? (

            <div className="py-10 text-center text-gray-500">
{t("noacademy")}            </div>

          ) : (

            <div className="space-y-4">

              {fees.map(
                (item) => (

                  <div
                    key={item.id}
                    className="bg-white border rounded-2xl p-5 shadow-sm"
                  >

                    {/* Header */}

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.programName}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.studentName}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {t("fee_number")}: {item.id}
                        </p>

                      </div>

                      <span
                        className={`w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                    </div>

                    {/* Details */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 border-t pt-5">

                      {/* Amount */}

                      <div>

                        <p className="text-sm text-gray-500">
                          {t("amount")}
                        </p>

                        <p className="font-bold text-[#00BFA6] mt-1">
                          {item.grandTotal}{" "}
                          {item.currency}
                        </p>

                      </div>

                      {/* Academic Year */}

                      <div>

                        <p className="text-sm text-gray-500">
                          {t("academic_year")}
                        </p>

                        <p className="font-semibold mt-1">
                          {item.academicYear ||
                            "-"}
                        </p>

                      </div>

                      {/* Academic Term */}

                      <div>

                        <p className="text-sm text-gray-500">
                          {t("academic_term")}
                        </p>

                        <p className="font-semibold mt-1">
                          {item.academicTerm ||
                            "-"}
                        </p>

                      </div>

                      {/* Due Date */}

                      <div>

                        <p className="text-sm text-gray-500">
                          {t("due_date")}
                        </p>

                        <p className="font-semibold mt-1">
                          {item.dueDate || "-"}
                        </p>

                      </div>

                    </div>

                    {/* Student Type */}

                    <div className="mt-4 bg-gray-50 rounded-xl p-3 text-sm">

                      {t("student_type")}:

                      <span className="font-semibold">
                        {item.isDependant
                          ? t("dependent_member")
                          : t("primary_member")}
                      </span>

                    </div>

                    {/* Pay Button */}

                    {item.payable && (

                      <button
                        type="button"
                        onClick={() =>
                          openPaymentPopup(
                            item
                          )
                        }
                        className="w-full mt-5 bg-[#00BFA6] hover:bg-[#009f8c] text-white py-3 rounded-xl font-semibold transition"
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

      {/* ======================================
          PAYMENT POPUP
      ====================================== */}

      {showPaymentPopup && (

        <div className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

            {/* Close */}

            <button
              type="button"
              onClick={
                closePaymentPopup
              }
              disabled={
                paymentLoading
              }
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              ×
            </button>

            {/* Title */}

            <h2 className="text-xl font-bold text-center mb-5">
              {t("select_payment_method")}
            </h2>

            {/* ======================================
                ITEM INFO
            ====================================== */}

            <div className="bg-gray-50 rounded-xl p-4 mb-5">

              {/* لو نشاط */}

              {selectedPaymentItem?.type ===
                "fee" && (

                <div className="mb-4 pb-4 border-b">

                  <p className="text-sm text-gray-500">
                    {t("activity")}
                  </p>

                  <p className="font-bold mt-1">
                    {
                      selectedPaymentItem?.programName
                    }
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {
                      selectedPaymentItem?.studentName
                    }
                  </p>

                </div>

              )}

              {/* Amount */}

              <div className="flex justify-between items-center">

                <span className="text-gray-500">
                  {t("amount")}
                </span>

                <span className="font-bold text-[#00BFA6]">
                  {
                    selectedPaymentItem?.grandTotal
                  }{" "}
                  {
                    selectedPaymentItem?.currency
                  }
                </span>

              </div>

              {/* ID */}

              <div className="flex justify-between items-center mt-2">

                <span className="text-gray-500">

                  {selectedPaymentItem?.type ===
                  "fee"
                    ? t("fee_number")
                    : t("invoice_number")}

                </span>

                <span className="font-semibold">
                  {
                    selectedPaymentItem?.id
                  }
                </span>

              </div>

            </div>

            {/* ======================================
                PAYMENT METHODS
            ====================================== */}

            <div className="grid grid-cols-2 gap-4 mb-6">

              {/* VISA */}

              <button
                type="button"
                onClick={() =>
                  setSelectedPaymentMethod(
                    "visa"
                  )
                }
                disabled={
                  paymentLoading
                }
                className={`border rounded-xl p-5 transition disabled:opacity-50 ${
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

              {/* FAWRY */}

              <button
                type="button"
                onClick={() =>
                  setSelectedPaymentMethod(
                    "fawry"
                  )
                }
                disabled={
                  paymentLoading
                }
                className={`border rounded-xl p-5 transition disabled:opacity-50 ${
                  selectedPaymentMethod ===
                  "fawry"
                    ? "border-[#00BFA6] shadow-md"
                    : "border-gray-200"
                }`}
              >

                <div className="inline-block bg-yellow-300 px-4 py-2 rounded font-bold text-blue-800">
                  Fawry
                </div>

              </button>

            </div>

            {/* ======================================
                VISA
            ====================================== */}

            {selectedPaymentMethod ===
              "visa" && (

              <div className="space-y-4">

                <div className="border rounded-xl p-6 text-center">

                  <p className="text-gray-600">
                        {t("payment_by_card")}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePayment("CARD")
                  }
                  disabled={
                    paymentLoading
                  }
                  className="w-full bg-[#00BFA6] hover:bg-[#009f8c] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-semibold transition"
                >

                  {paymentLoading
                    ? t("processing")
                    : t("confirm_payment")}

                </button>

              </div>

            )}

            {/* ======================================
                FAWRY
            ====================================== */}

            {selectedPaymentMethod ===
              "fawry" && (

              <div className="space-y-5">

                <div className="border rounded-xl p-8 flex justify-center">

                  <div className="bg-yellow-300 px-5 py-3 rounded font-bold text-blue-800 text-xl">
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
                  disabled={
                    paymentLoading
                  }
                  className="w-full bg-[#00BFA6] hover:bg-[#009f8c] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-semibold transition"
                >

                  {paymentLoading
                    ? t("processing")
                    : t("pay_via_fawry")}

                </button>

              </div>

            )}

            {/* ======================================
                CANCEL
            ====================================== */}

            <button
              type="button"
              onClick={
                closePaymentPopup
              }
              disabled={
                paymentLoading
              }
              className="w-full mt-3 border border-[#00BFA6] text-[#00BFA6] rounded-xl py-3 disabled:opacity-50"
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