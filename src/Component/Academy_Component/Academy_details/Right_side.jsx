
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaCheckCircle, FaTimes } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { Application_prefill } from "../../../axiosConfig/APIs/Academy/Application_prefll";
import i18next from "i18next";
import { Submit_Application } from "../../../axiosConfig/APIs/Academy/Submit_Appication";
import { createPortal } from "react-dom";

const Right_side = ({ data }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [prefillData, setPrefillData] = useState(null);

  const [selectedType, setSelectedType] = useState("member");

  const [selectedDependant, setSelectedDependant] = useState("");

  const [editableFields, setEditableFields] = useState([]);

  const [messagePopup, setMessagePopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const bookingOpenedRef = useRef(false);

  const formFields = [
    "fullName",
    "dateOfBirth",
    "gender",
    "mobile",
    "email",
    "nationality",
    "address",
    "nationalId",
  ];

  

  const openMessagePopup = (
    title,
    message,
    type = "success"
  ) => {
    setMessagePopup({
      show: true,
      title,
      message,
      type,
    });
  };

  const closeMessagePopup = () => {
    setMessagePopup((prev) => ({
      ...prev,
      show: false,
    }));
  };

 

  const statusText =
    data?.myStatus?.statusText || "";

  const normalizedStatus =
    String(statusText).toLowerCase();

  const isRejected =
    normalizedStatus === "rejected" ||
    normalizedStatus.includes("reject") ||
    statusText === "مرفوض" ||
    statusText === "تم الرفض";

  

  const Prefill = async (
    dependantAddressId = ""
  ) => {
    const params = {
      language: i18next.language,
      dependantAddressId,
    };

    try {
      const response =
        await Application_prefill(params);

      console.log(
        "Prefill response:",
        response
      );

      console.log(
        "dependantAddressId:",
        dependantAddressId
      );

      const responseData =
        response?.message?.data || {};

      const prefill =
        responseData?.prefill || {};

      const emptyFields =
        formFields.filter(
          (fieldName) => {
            const value =
              prefill[fieldName];

            return (
              value === null ||
              value === undefined ||
              value === ""
            );
          }
        );

      setPrefillData({
        ...responseData,
        prefill,
      });

      setEditableFields(
        emptyFields
      );

      setShowBookingForm(true);
    } catch (error) {
      console.log(
        "Prefill error:",
        error
      );

      openMessagePopup(
        "حدث خطأ",
        "حدث خطأ أثناء تحميل بيانات الحجز",
        "error"
      );
    }
  };


  const isFieldEditable = (
    fieldName
  ) => {
    return editableFields.includes(
      fieldName
    );
  };

  const handleFieldChange = (
    fieldName,
    value
  ) => {
    setPrefillData((prev) => ({
      ...prev,

      prefill: {
        ...prev?.prefill,

        [fieldName]: value,
      },
    }));
  };

 

  const handleMember = () => {
  const token = localStorage.getItem("token"); // أو اسم التوكن عندكم

  if (!token) {
    navigate("/login", {
      state: {
        from: location.pathname,
        openBooking: true,
      },
    });
    return;
  }

  if (isRejected) {
    setShowBookingForm(false);

    openMessagePopup(
      "تم رفض الطلب",
      data?.myStatus?.statusText
        ? `حالة الطلب: ${data.myStatus.statusText}`
        : "تم رفض طلب التقديم على هذه الأكاديمية",
      "error"
    );

    return;
  }

  if (data?.myStatus?.canApply === false) {
    setShowBookingForm(false);

    openMessagePopup(
      "تم التقديم مسبقًا",
      data?.myStatus?.statusText
        ? `حالة الطلب: ${data.myStatus.statusText}`
        : "لقد تم التقديم على هذه الأكاديمية بالفعل",
      "warning"
    );

    return;
  }

  setSelectedType("member");
  setSelectedDependant("");
  setPrefillData(null);
  setEditableFields([]);

  Prefill("");
};



  useEffect(() => {
    if (
      location.state
        ?.openBooking === true &&
      data &&
      !bookingOpenedRef.current
    ) {
      bookingOpenedRef.current =
        true;

      handleMember();

      navigate(
        location.pathname,
        {
          replace: true,

          state: {
            ...location.state,
            openBooking: false,
          },
        }
      );
    }
  }, [
    location.state?.openBooking,
    data,
  ]);



  const handleDependant = () => {
    setSelectedType(
      "dependant"
    );

    setSelectedDependant("");

    setPrefillData(null);

    setEditableFields([]);

    setShowBookingForm(true);
  };

  

  const handleDependantChange = (
    e
  ) => {
    const addressId =
      e.target.value;

    if (!addressId) {
      setSelectedDependant("");

      setPrefillData(null);

      setEditableFields([]);

      return;
    }

    const dependant =
      data?.myStatus?.dependants?.find(
        (item) =>
          String(
            item.addressId
          ) ===
          String(addressId)
      );

    if (!dependant) {
      return;
    }

    const dependantStatus =
      dependant?.statusText || "";

    const normalizedDependantStatus =
      String(
        dependantStatus
      ).toLowerCase();

    const dependantRejected =
      normalizedDependantStatus ===
        "rejected" ||
      normalizedDependantStatus.includes(
        "reject"
      ) ||
      dependantStatus ===
        "مرفوض" ||
      dependantStatus ===
        "تم الرفض";

    // لو طلب العضو التابع مرفوض
    if (dependantRejected) {
      setSelectedDependant("");

      setPrefillData(null);

      setEditableFields([]);

      openMessagePopup(
        "تم رفض الطلب",
        dependant?.statusText
          ? `حالة طلب ${dependant.name}: ${dependant.statusText}`
          : "تم رفض طلب هذا العضو",
        "error"
      );

      return;
    }

    if (
      dependant?.canApply ===
      false
    ) {
      setSelectedDependant("");

      setPrefillData(null);

      setEditableFields([]);

      openMessagePopup(
        "تم التقديم مسبقًا",
        dependant?.statusText
          ? `حالة طلب ${dependant.name}: ${dependant.statusText}`
          : "تم التقديم لهذا العضو بالفعل",
        "warning"
      );

      return;
    }

    setSelectedDependant(
      addressId
    );

    Prefill(addressId);
  };

 

  const SubmitApplication =
    async (e) => {
      e.preventDefault();

      const body = {
        fullName:
          prefillData?.prefill
            ?.fullName || "",

        programId: data?.id,

        dateOfBirth:
          prefillData?.prefill
            ?.dateOfBirth || "",

        mobile:
          prefillData?.prefill
            ?.mobile || "",

        email:
          prefillData?.prefill
            ?.email || "",

        nationality:
          prefillData?.prefill
            ?.nationality || "",

        nationalId:
          prefillData?.prefill
            ?.nationalId || "",

        address:
          prefillData?.prefill
            ?.address || "",

        gender:
          prefillData?.prefill
            ?.gender || "",

        studentId:
          prefillData?.prefill
            ?.studentId || "",

        language:
          i18next.language,

        dependantAddressId:
          selectedType ===
          "dependant"
            ? selectedDependant
            : "",
      };

      console.log(
        "Submit Body:",
        body
      );

      try {
        const response =
          await Submit_Application(
            body
          );

        console.log(
          "Submit Response:",
          response
        );

        setShowBookingForm(false);

        setPrefillData(null);

        setSelectedDependant("");

        setEditableFields([]);

        openMessagePopup(
          "تم إرسال الطلب",
          "تم التقديم على الأكاديمية بنجاح",
          "success"
        );
      } catch (error) {
        console.log(
          "Submit Error:",
          error
        );

        console.log(
          "Backend Error:",
          error?.response?.data
        );

        openMessagePopup(
          "حدث خطأ",
          error?.response?.data
            ?.message ||
            "حدث خطأ أثناء إرسال الطلب",
          "error"
        );
      }
    };

  // ============================
  // CLOSE BOOKING POPUP
  // ============================

  const closeBookingPopup =
    () => {
      setShowBookingForm(false);

      setSelectedDependant("");

      setPrefillData(null);

      setEditableFields([]);
    };

  return (
    <div className="col-span-3 space-y-6 sticky top-5">
      

      <div className="bg-gray-100 rounded-2xl p-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 pb-4">
          {t(
            "academy_book_now"
          )}
        </h2>

        <div className="flex items-center gap-3 justify-between">
          <p className="text-sm text-gray-600">
            {t(
              "academy_price_starts_from"
            )}
          </p>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#00BFA6]">
              {data?.minPrice}
            </span>

            <span className="text-sm text-gray-600">
              {t(
                "academy_currency"
              )}
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-[#1E2939] my-1" />

        <div className="flex items-end justify-between mb-5">
          <p className="text-sm text-red-700">
            {t(
              "academy_discount_rate"
            )}
          </p>

          <p className="text-red-700 font-bold text-lg">
            10%
          </p>
        </div>

        <div className="space-y-3">

          {/* =====================
              MEMBER STATUS
          ===================== */}

          {isRejected ? (
            <div className="w-full rounded-xl border border-red-300 bg-red-50 p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">
                ×
              </div>

              <p className="font-bold text-red-700">
{                t("rejected_application")}              </p>

              {data?.myStatus
                ?.statusText && (
                <p className="text-sm text-gray-600 mt-1">
                  الحالة:{" "}
                  {
                    data
                      .myStatus
                      .statusText
                  }
                </p>
              )}

              {data?.myStatus
                ?.applicantId && (
                <p className="text-xs text-gray-500 mt-1">
                  رقم الطلب:{" "}
                  {
                    data
                      .myStatus
                      .applicantId
                  }
                </p>
              )}
            </div>
          ) : data?.myStatus
              ?.canApply ===
            false ? (
            <div className="w-full rounded-xl border border-green-300 bg-green-50 p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                ✓
              </div>

              <p className="font-bold text-green-700">
                تم التقديم على
                الطلب
              </p>

              {data?.myStatus
                ?.statusText && (
                <p className="text-sm text-gray-600 mt-1">
                  الحالة:{" "}
                  {
                    data
                      .myStatus
                      .statusText
                  }
                </p>
              )}

              {data?.myStatus
                ?.applicantId && (
                <p className="text-xs text-gray-500 mt-1">
                  رقم الطلب:{" "}
                  {
                    data
                      .myStatus
                      .applicantId
                  }
                </p>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={
                handleMember
              }
              className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] duration-300 text-white py-3 rounded-xl font-semibold transition"
            >
              {t(
                "academy_book_now"
              )}
            </button>
          )}

        

          {data?.myStatus
            ?.dependants?.length >
            0 && (
            <button
              type="button"
              onClick={
                handleDependant
              }
              className="w-full bg-white border-2 border-[#00BFA6] text-[#00BFA6] py-3 rounded-xl font-semibold hover:bg-[#00BFA6] hover:text-white transition"
            >
{t("dependent_booking")}
            </button>
          )}

        

          {showBookingForm &&
            createPortal(
              <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">
                  <button
                    type="button"
                    onClick={
                      closeBookingPopup
                    }
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
                  >
                    <FaTimes/>
                  </button>

                  <h2 className="text-2xl font-bold text-center">
                    {t(
                      "academy_book_now"
                    )}
                  </h2>

                  {/* MEMBER TYPE */}

                  <div className="flex gap-4 my-4">
                    <button
                      type="button"
                      onClick={
                        handleMember
                      }
                      disabled={
                        isRejected ||
                        data
                          ?.myStatus
                          ?.canApply ===
                          false
                      }
                      className={`p-3 w-1/2 border rounded-xl font-semibold transition ${
                        isRejected ||
                        data
                          ?.myStatus
                          ?.canApply ===
                          false
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedType ===
                            "member"
                          ? "bg-[#00BFA6] text-white"
                          : "bg-white"
                      }`}
                    >
{t("member")}                    </button>

                    <button
                      type="button"
                      onClick={
                        handleDependant
                      }
                      className={`p-3 w-1/2 border rounded-xl font-semibold ${
                        selectedType ===
                        "dependant"
                          ? "bg-[#00BFA6] text-white"
                          : "bg-white"
                      }`}
                    >
{t("dependant")}                    </button>
                  </div>

          

                  {selectedType ===
                    "dependant" && (
                    <div className="mb-5">
                      <label className="block mb-2 font-medium">
{t("select_dependant")}                      </label>

                      <select
                        value={
                          selectedDependant
                        }
                        onChange={
                          handleDependantChange
                        }
                        className="w-full border border-[#00BFA6] rounded-xl px-4 py-3 outline-none"
                      >
                        <option value="">
                          {t("select_dependant")}
                        </option>

                        {data?.myStatus?.dependants?.map(
                          (item) => {
                            const itemStatus =
                              item?.statusText ||
                              "";

                            const normalizedItemStatus =
                              String(
                                itemStatus
                              ).toLowerCase();

                            const itemRejected =
                              normalizedItemStatus ===
                                "rejected" ||
                              normalizedItemStatus.includes(
                                "reject"
                              ) ||
                              itemStatus ===
                                "rejected" ||
                              itemStatus ===
                                "rejected" ;

                            return (
                              <option
                                key={
                                  item.addressId
                                }
                                value={
                                  item.addressId
                                }
                                disabled={
                                  !item.canApply ||
                                  itemRejected
                                }
                              >
                                {
                                  item.name
                                }{" "}
                                -{" "}
                                {
                                  item.relation
                                }

                                {itemRejected
                                  ? " - مرفوض"
                                  : !item.canApply
                                  ? ` - ${
                                      item.statusText ||
                                      "تم التقديم"
                                    }`
                                  : ""}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  )}

                  {/* =====================
                      FORM
                  ===================== */}

                  {prefillData && (
                    <form
                      onSubmit={
                        SubmitApplication
                      }
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {/* FULL NAME */}

                      <div>
                        <label className="block mb-2 font-medium">
                          {t("full_name_label")}
                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.fullName ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "fullName"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "fullName",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "fullName"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* DATE OF BIRTH */}

                      <div>
                        <label className="block mb-2 font-medium">
                          {t("date_of_birth")}
                        </label>

                        <input
                          type="date"
                          value={
                            prefillData
                              ?.prefill
                              ?.dateOfBirth ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "dateOfBirth"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "dateOfBirth",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "dateOfBirth"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* GENDER */}

                      <div>
                        <label className="block mb-2 font-medium">
                          {t("gender")}
                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.gender ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "gender"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "gender",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "gender"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* MOBILE */}

                      <div>
                        <label className="block mb-2 font-medium">
{                          t("phone")
}                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.mobile ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "mobile"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "mobile",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "mobile"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* EMAIL */}

                      <div>
                        <label className="block mb-2 font-medium">
                          {t("email")}
                        </label>

                        <input
                          type="email"
                          value={
                            prefillData
                              ?.prefill
                              ?.email ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "email"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "email",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "email"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>


                      <div>
                        <label className="block mb-2 font-medium">
                          {t("nationality")}
                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.nationality ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "nationality"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "nationality",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "nationality"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* ADDRESS */}

                      <div>
                        <label className="block mb-2 font-medium">
                          {t("address")}
                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.address ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "address"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "address",
                              e.target
                                .value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "address"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>


                      <div>
                        <label className="block mb-2 font-medium">
{  t("national_id_label")}
                        </label>

                        <input
                          type="text"
                          value={
                            prefillData
                              ?.prefill
                              ?.nationalId ||
                            ""
                          }
                          readOnly={
                            !isFieldEditable(
                              "nationalId"
                            )
                          }
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "nationalId",
                              e.target
                                .value
                            )
                          }
                          placeholder={
                            isFieldEditable(
                              "nationalId"
                            )
                              ? t("national_id_placeholder")
                              : ""
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable(
                              "nationalId"
                            )
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />
                      </div>

                      {/* SUBMIT */}

                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold"
                        >
{                          t("confirm_booking")}                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>,

              document.body
            )}

          {/* CONTACT */}

          <button
            type="button"
            onClick={() =>
              navigate("/contact")
            }
            className="w-full bg-white border-2 border-[#00786F] hover:bg-gray-50 duration-300 text-[#00786F] py-3 rounded-xl font-semibold transition"
          >
            {t("academy_info")}
          </button>
        </div>
      </div>

     

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {t(
            "academy_trainers_title"
          )}
        </h2>

        <div className="space-y-5">
          {data?.trainers?.map(
            (trainer, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      trainer.photo
                    }
                    alt={
                      trainer.name
                    }
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">
                      {
                        trainer.name
                      }
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {
                        trainer.role
                      }
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {trainer.certifications?.map(
                    (
                      cert,
                      i
                    ) => (
                      <span
                        key={i}
                        className="text-xs text-[#00BFA6] cursor-pointer hover:underline border border-[#00BFA6] rounded-full px-2 py-1"
                      >
                        {cert}
                      </span>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t(
            "academy_facilities_title"
          )}
        </h2>

        <div className="space-y-3">
          {data?.facilities?.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

                <p className="text-gray-600 text-sm leading-6 flex-1">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </div>



      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t(
            "academy_join_conditions_title"
          )}
        </h2>

        <div className="space-y-3">
          {data?.joinConditions?.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

                <p className="text-gray-600 text-sm leading-6 flex-1">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-[25px] font-bold mb-5">
          {t(
            "academy_achievements_title"
          )}
        </h2>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data?.achievements?.map(
            (e, index) => (
              <div
                key={index}
                className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2 border rounded-lg"
              >
                <img
                  src={
                    assets.image_1
                  }
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                  alt=""
                />

                <div className="flex flex-col">
                  <span className="font-bold text-[16px]">
                    {e?.title}
                  </span>

                  <p>
                    {e?.season}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>


      {messagePopup.show &&
        createPortal(
          <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center relative">

              <button
                type="button"
                onClick={
                  closeMessagePopup
                }
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
              >
                <FaTimes/>

              </button>


              <div
                className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold ${
                  messagePopup.type ===
                  "success"
                    ? "bg-green-100 text-green-600"
                    : messagePopup.type ===
                      "error"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {messagePopup.type ===
                "success"
                  ? <FaCheck/>

                  : messagePopup.type ===
                    "error"
                  ? <FaTimes/>
                  : "!"}
              </div>

              {/* TITLE */}

              <h2
                className={`text-xl font-bold mb-2 ${
                  messagePopup.type ===
                  "error"
                    ? "text-red-700"
                    : messagePopup.type ===
                      "success"
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {
                  messagePopup.title
                }
              </h2>


              <p className="text-gray-600 mb-6">
                {
                  messagePopup.message
                }
              </p>

              {/* BUTTON */}

              <button
                type="button"
                onClick={
                  closeMessagePopup
                }
                className="w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold"
              >
              {t("ok")}
              </button>
            </div>
          </div>,

          document.body
        )}
    </div>
  );
};

export default Right_side;