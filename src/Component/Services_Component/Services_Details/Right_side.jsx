import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createPortal } from "react-dom";

import {
  FaCheck,
  FaPhoneAlt,
  FaRegIdCard,
  FaTimes,
  FaTrashAlt,
  FaUser,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

import { assets } from "./../../../assets/assets";

import { Create_booking } from "../../../axiosConfig/APIs/Services/Get_booking";

const Right_side = ({ data }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingOpenedRef = useRef(false);

  const [showBookingPopup, setShowBookingPopup] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingError, setBookingError] =
    useState(null);

  const [selectedTierId, setSelectedTierId] =
    useState("");

  const [selectedApplicantTypes, setSelectedApplicantTypes] =
    useState({
      self: false,
      relatives: false,
      guests: false,
    });

  const [selectedRelatives, setSelectedRelatives] =
    useState([]);

  const [guests, setGuests] = useState([]);

  const [resultPopup, setResultPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
    data: null,
  });

  /*
   * Pricing tiers
   */
  const pricingTiers = useMemo(() => {
    return Array.isArray(data?.pricing?.tiers)
      ? data.pricing.tiers
      : [];
  }, [data]);

  const getTierId = (tier) => {
    return (
      tier?.price_plan_name ||
      tier?.tier_id ||
      tier?.id ||
      tier?.name ||
      ""
    );
  };

  const getTierTitle = (tier, index) => {
    return (
      tier?.title ||
      tier?.label ||
      tier?.price_plan_title ||
      tier?.price_plan_name ||
      tier?.tier_id ||
      tier?.name ||
      `الفئة ${index + 1}`
    );
  };

  const getTierPrice = (tier) => {
    const price = Number(
      tier?.price ??
        tier?.unit_price ??
        tier?.amount ??
        0
    );

    return Number.isNaN(price) ? 0 : price;
  };

  const isTierDisabled = (tier) => {
    return (
      tier?.eligible === false ||
      tier?.can_book === false ||
      tier?.is_allowed === false ||
      tier?.available === false
    );
  };

  const prices = pricingTiers
    .filter((tier) => !isTierDisabled(tier))
    .map((tier) => getTierPrice(tier))
    .filter((price) => !Number.isNaN(price));

  const priceFrom =
    prices.length > 0 ? Math.min(...prices) : 0;

  /*
   * Select an allowed tier automatically.
   */
  useEffect(() => {
    if (!pricingTiers.length) {
      setSelectedTierId("");
      return;
    }

    const currentlySelectedExists =
      pricingTiers.some(
        (tier) =>
          String(getTierId(tier)) ===
            String(selectedTierId) &&
          !isTierDisabled(tier)
      );

    if (currentlySelectedExists) {
      return;
    }

    const firstAllowedTier = pricingTiers.find(
      (tier) =>
        getTierId(tier) && !isTierDisabled(tier)
    );

    setSelectedTierId(
      firstAllowedTier
        ? getTierId(firstAllowedTier)
        : ""
    );
  }, [pricingTiers, selectedTierId]);

  const selectedTier = useMemo(() => {
    return (
      pricingTiers.find(
        (tier) =>
          String(getTierId(tier)) ===
          String(selectedTierId)
      ) || null
    );
  }, [pricingTiers, selectedTierId]);

  /*
   * Dependants
   */
  const relatives = useMemo(() => {
    const list =
      data?.myStatus?.dependants ||
      data?.my_status?.dependants ||
      data?.dependants ||
      data?.relatives ||
      data?.familyMembers ||
      [];

    return Array.isArray(list) ? list : [];
  }, [data]);

  /*
   * Trainers
   */
  const trainers = Array.isArray(data?.trainers)
    ? data.trainers
    : [];

  /*
   * Date data
   */
  const dates = [
    {
      label: "التاريخ",
      value: data?.date?.start_date || "-",
    },
    {
      label: "الوقت",
      value:
        data?.date?.start_time &&
        data?.date?.end_time
          ? `${data.date.start_time} - ${data.date.end_time}`
          : data?.date?.start_time ||
            data?.date?.end_time ||
            "-",
    },
  ];

  /*
   * Helpers
   */
  const getRelativeId = (relative, index) => {
    return (
      relative?.addressId ||
      relative?.address_id ||
      relative?.id ||
      index
    );
  };

  const getRelativeName = (relative) => {
    return (
      relative?.name ||
      relative?.fullName ||
      relative?.full_name ||
      "-"
    );
  };

  const extractApiResponse = (response) => {
    return (
      response?.message?.data ||
      response?.data ||
      response?.message ||
      response ||
      {}
    );
  };

  const extractErrorData = (error) => {
    const responseData =
      error?.response?.data || {};

    const nestedMessage =
      responseData?.message || {};

    return {
      status:
        error?.response?.status ||
        nestedMessage?.status_code ||
        responseData?.status_code,

      code:
        nestedMessage?.code ||
        responseData?.code ||
        "unknown_error",

      message:
        nestedMessage?.error ||
        nestedMessage?.message ||
        responseData?.error ||
        responseData?.message ||
        error?.message ||
        "حدث خطأ أثناء إنشاء الحجز",

      available:
        nestedMessage?.available ??
        responseData?.available,

      requested:
        nestedMessage?.requested ??
        responseData?.requested,
    };
  };

  const getFallbackErrorMessage = (code) => {
    switch (code) {
      case "unauthorized":
        return "يجب تسجيل الدخول أولًا لإتمام الحجز.";

      case "not_enough_places":
        return "الأماكن المتاحة لا تكفي لكل المتقدمين.";

      case "already_booked":
        return "أحد الأشخاص المختارين لديه حجز بالفعل.";

      case "validation_error":
        return "بيانات الحجز غير صحيحة أو الفئة السعرية لا تناسب نوع العضوية.";

      case "permission_error":
        return "ليس لديك صلاحية للحجز للأشخاص المختارين.";

      case "invalid_tier":
        return "الفئة السعرية لا تتوافق مع نوع العضوية.";

      case "not_found":
        return "الخدمة غير موجودة.";

      case "unavailable":
        return "الخدمة غير متاحة للحجز حاليًا.";

      default:
        return "حدث خطأ أثناء إنشاء الحجز.";
    }
  };

  /*
   * Open booking
   */
  const handleOpenBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from:
            location.pathname +
            location.search,
          openServiceBooking: true,
        },
      });

      return;
    }

    setBookingError(null);
    setShowBookingPopup(true);
  };

  /*
   * Reopen popup after login
   */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      location.state?.openServiceBooking === true &&
      token &&
      !bookingOpenedRef.current
    ) {
      bookingOpenedRef.current = true;

      setBookingError(null);
      setShowBookingPopup(true);

      navigate(
        location.pathname + location.search,
        {
          replace: true,
          state: {},
        }
      );
    }
  }, [
    location.pathname,
    location.search,
    location.state,
    navigate,
  ]);

  /*
   * Prevent page scrolling while modal is open.
   */
  useEffect(() => {
    const anyPopupOpen =
      showBookingPopup ||
      resultPopup.show;

    if (!anyPopupOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showBookingPopup, resultPopup.show]);

  /*
   * Close booking popup
   */
  const closeBookingPopup = () => {
    if (bookingLoading) return;

    setShowBookingPopup(false);
    setBookingError(null);

    setSelectedApplicantTypes({
      self: false,
      relatives: false,
      guests: false,
    });

    setSelectedRelatives([]);
    setGuests([]);
  };

  /*
   * Applicant types
   */
  const toggleApplicantType = (type) => {
    setBookingError(null);

    setSelectedApplicantTypes((previous) => {
      const newValue = !previous[type];

      if (
        type === "relatives" &&
        !newValue
      ) {
        setSelectedRelatives([]);
      }

      if (
        type === "guests" &&
        !newValue
      ) {
        setGuests([]);
      }

      return {
        ...previous,
        [type]: newValue,
      };
    });
  };

  /*
   * Dependants
   */
  const toggleRelative = (
    relative,
    index
  ) => {
    setBookingError(null);

    const relativeId = getRelativeId(
      relative,
      index
    );

    setSelectedRelatives((previous) => {
      const isSelected = previous.some(
        (item) =>
          String(
            getRelativeId(
              item.relative,
              item.index
            )
          ) === String(relativeId)
      );

      if (isSelected) {
        return previous.filter(
          (item) =>
            String(
              getRelativeId(
                item.relative,
                item.index
              )
            ) !== String(relativeId)
        );
      }

      return [
        ...previous,
        {
          relative,
          index,
        },
      ];
    });
  };

  /*
   * Guests
   */
  const addGuest = () => {
    setBookingError(null);

    setSelectedApplicantTypes(
      (previous) => ({
        ...previous,
        guests: true,
      })
    );

    setGuests((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${previous.length}`,
        fullName: "",
        mobile: "",
        nationalId: "",
      },
    ]);
  };

  const removeGuest = (guestId) => {
    setBookingError(null);

    setGuests((previous) => {
      const updatedGuests =
        previous.filter(
          (guest) =>
            guest.id !== guestId
        );

      if (updatedGuests.length === 0) {
        setSelectedApplicantTypes(
          (types) => ({
            ...types,
            guests: false,
          })
        );
      }

      return updatedGuests;
    });
  };

  const handleGuestChange = (
    guestId,
    field,
    value
  ) => {
    setBookingError(null);

    setGuests((previous) =>
      previous.map((guest) =>
        guest.id === guestId
          ? {
              ...guest,
              [field]: value,
            }
          : guest
      )
    );
  };

  const validGuests = guests.filter(
    (guest) =>
      guest.fullName.trim() &&
      guest.mobile.trim() &&
      guest.nationalId.trim()
  );

  const hasIncompleteGuests =
    selectedApplicantTypes.guests &&
    guests.some(
      (guest) =>
        !guest.fullName.trim() ||
        !guest.mobile.trim() ||
        !guest.nationalId.trim()
    );

  const totalApplicants =
    (selectedApplicantTypes.self
      ? 1
      : 0) +
    selectedRelatives.length +
    validGuests.length;

  const canContinue =
    totalApplicants > 0 &&
    Boolean(selectedTierId) &&
    !hasIncompleteGuests;

  /*
   * Result popup
   */
  const showResultMessage = ({
    type,
    title,
    message,
    resultData = null,
  }) => {
    setResultPopup({
      show: true,
      type,
      title,
      message,
      data: resultData,
    });
  };

  const closeResultPopup = () => {
    setResultPopup({
      show: false,
      type: "success",
      title: "",
      message: "",
      data: null,
    });
  };

  /*
   * Booking request
   */
  const handleContinue = async ({
    addAllToWaitingList = false,
  } = {}) => {
    if (
      !canContinue ||
      bookingLoading
    ) {
      return;
    }

    const serviceId =
      data?.service_id ||
      data?.serviceId ||
      data?.id ||
      "";

    if (!serviceId) {
      setBookingError({
        code: "validation_error",
        message:
          "رقم الخدمة غير موجود.",
      });

      return;
    }

    if (!selectedTierId) {
      setBookingError({
        code: "invalid_tier",
        message:
          "اختاري الفئة السعرية المناسبة أولًا.",
      });

      return;
    }

    if (
      selectedApplicantTypes.relatives &&
      selectedRelatives.length === 0
    ) {
      setBookingError({
        code: "validation_error",
        message:
          "اختاري تابعًا واحدًا على الأقل.",
      });

      return;
    }

    if (
      selectedApplicantTypes.guests &&
      guests.length === 0
    ) {
      setBookingError({
        code: "validation_error",
        message:
          "أضيفي بيانات ضيف واحد على الأقل.",
      });

      return;
    }

    if (hasIncompleteGuests) {
      setBookingError({
        code: "validation_error",
        message:
          "أكملي جميع بيانات الضيوف.",
      });

      return;
    }

    /*
     * The API requires addressId as dependantId.
     */
    const dependantAttendees =
      selectedRelatives.map(
        ({ relative }) => ({
          attendeeType: "Dependant",
          dependantId:
            relative?.addressId ||
            relative?.address_id ||
            "",
        })
      );

    const missingDependantId =
      dependantAttendees.some(
        (attendee) =>
          !attendee.dependantId
      );

    if (missingDependantId) {
      setBookingError({
        code: "validation_error",
        message:
          "رقم أحد التابعين غير موجود.",
      });

      return;
    }

    const guestAttendees =
      validGuests.map((guest) => ({
        attendeeType: "Guest",
        fullName:
          guest.fullName.trim(),
        mobileNo:
          guest.mobile.trim(),
        nationalId:
          guest.nationalId.trim(),
      }));

    const attendees = [
      ...dependantAttendees,
      ...guestAttendees,
    ];

    const bookingData = {
      service_id: serviceId,

      /*
       * The API expects price_plan_name,
       * for example: adults
       */
      tier_id: selectedTierId,

      book_for_myself:
        selectedApplicantTypes.self,

      booking_for_dependants:
        dependantAttendees.length > 0,

      booking_for_guests:
        guestAttendees.length > 0,

      add_all_to_waiting_list:
        addAllToWaitingList,

      use_loyalty_points: false,

      branchId:
        data?.branchId ||
        data?.branch_id ||
        data?.branch?.id ||
        data?.branch?.branchId ||
        localStorage.getItem(
          "branchId"
        ) ||
        "",

      lang:
        i18n.language?.startsWith(
          "en"
        )
          ? "en"
          : "ar",
    };

    /*
     * Do not send attendees when
     * booking only for yourself.
     */
    if (attendees.length > 0) {
      bookingData.attendees =
        attendees;
    }

    /*
     * Weekly schedule values.
     */
    const selectedDay =
      data?.selected_day ||
      data?.selectedDay;

    const selectedTime =
      data?.selected_time ||
      data?.selectedTime;

    if (selectedDay) {
      bookingData.selected_day =
        selectedDay;
    }

    if (selectedTime) {
      bookingData.selected_time =
        selectedTime;
    }

    /*
     * Send unit quantity only when
     * this tier is priced per unit.
     */
    const unitQuantity = Number(
      selectedTier?.unit_quantity ||
        data?.unit_quantity ||
        0
    );

    if (unitQuantity > 0) {
      bookingData.unit_quantity =
        unitQuantity;
    }

    try {
      setBookingLoading(true);
      setBookingError(null);

      console.log(
        "Booking payload:",
        JSON.stringify(
          bookingData,
          null,
          2
        )
      );

      const response =
        await Create_booking(
          bookingData
        );

      const result =
        extractApiResponse(response);

      console.log(
        "Booking response:",
        result
      );

      setShowBookingPopup(false);

      /*
       * Waiting list success
       */
      if (
        result?.status ===
        "Waitlisted"
      ) {
        showResultMessage({
          type: "success",
          title:
            "تمت الإضافة لقائمة الانتظار",
          message:
            result?.message ||
            `تمت إضافة المتقدمين لقائمة الانتظار${
              result?.position
                ? `، الترتيب ${result.position}`
                : ""
            }.`,
          resultData: result,
        });

        return;
      }

      /*
       * Pending payment success
       */
      if (
        result?.status ===
        "Pending Payment"
      ) {
        showResultMessage({
          type: "success",
          title:
            "تم إنشاء الحجز بنجاح",
          message: `تم إنشاء الحجز${
            result?.booking_id
              ? ` رقم ${result.booking_id}`
              : ""
          }، والمبلغ المطلوب ${
            result?.final_price ??
            result?.total_price ??
            ""
          } ${
            result?.currency || ""
          }.`,

          resultData: result,
        });

        return;
      }

      /*
       * Other successful response
       */
      showResultMessage({
        type: "success",
        title:
          "تم الحجز بنجاح",
        message:
          result?.message ||
          "تم إنشاء الحجز بنجاح.",
        resultData: result,
      });
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      const errorInfo =
        extractErrorData(error);

      const errorMessage =
        typeof errorInfo.message ===
          "string" &&
        errorInfo.message.trim()
          ? errorInfo.message
          : getFallbackErrorMessage(
              errorInfo.code
            );

      /*
       * Keep booking popup open and
       * show waiting-list action.
       */
      if (
        errorInfo.status === 409 ||
        errorInfo.code ===
          "not_enough_places"
      ) {
        setBookingError({
          code:
            "not_enough_places",
          message: errorMessage,
          available:
            errorInfo.available,
          requested:
            errorInfo.requested,
        });

        return;
      }

      /*
       * Display server error inside
       * the booking popup.
       */
      setBookingError({
        code: errorInfo.code,
        message: errorMessage,
      });
    } finally {
      setBookingLoading(false);
    }
  };

  /*
   * Applicant option
   */
  const ApplicantOption = ({
    type,
    title,
    description,
    icon,
  }) => {
    const selected =
      selectedApplicantTypes[type];

    return (
      <button
        type="button"
        onClick={() =>
          toggleApplicantType(type)
        }
        className={`w-full rounded-2xl border-2 p-4 transition ${
          selected
            ? "border-[#008C82] bg-[#EAF8F6]"
            : "border-gray-200 bg-white hover:border-[#008C82]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl ${
              selected
                ? "bg-[#008C82] text-white"
                : "bg-[#F2F4F8] text-[#687386]"
            }`}
          >
            {icon}
          </div>

          <div className="flex-1 text-right">
            <h3 className="text-lg font-bold text-gray-800">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>

          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 ${
              selected
                ? "border-[#008C82] bg-[#008C82] text-white"
                : "border-gray-500 bg-white"
            }`}
          >
            {selected && (
              <FaCheck className="text-xs" />
            )}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="sticky top-5 space-y-6">
      {/* Booking card */}
      <section className="rounded-2xl bg-gray-100 p-6 shadow-sm">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          {t("service_book_now")}
        </h2>

        <div className="mb-3 flex items-center justify-between border-b border-gray-300 pb-3">
          <span className="text-sm text-gray-600">
            {t(
              "service_price_starts_from"
            )}
          </span>

          <div className="flex items-baseline gap-1">
            {priceFrom === 0 ? (
              <span className="text-2xl font-bold text-[#00BFA6]">
                {t("free")}
              </span>
            ) : (
              <>
                <span className="text-2xl font-bold text-[#00BFA6]">
                  {priceFrom}
                </span>

                <span className="text-sm text-gray-600">
                  {data?.pricing
                    ?.currency ||
                    t(
                      "service_currency"
                    )}
                </span>
              </>
            )}
          </div>
        </div>

        {data?.pricing
          ?.allow_loyalty_discount && (
          <div className="mb-6 flex items-center justify-between text-red-700">
            <span className="text-sm">
              {t(
                "service_discount_rate"
              )}
            </span>

            <span className="text-lg font-bold">
              {t(
                "service_available"
              )}
            </span>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={
              handleOpenBooking
            }
            className="w-full rounded-xl bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] py-3 font-semibold text-white transition hover:opacity-95"
          >
            {t(
              "service_book_now"
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/contact")
            }
            className="w-full rounded-xl border border-[#00786F] bg-white py-3 font-semibold text-[#00786F] transition hover:bg-gray-50"
          >
            {t("service_info")}
          </button>
        </div>
      </section>

      {/* Dates */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-gray-800">
          {t("المواعيد")}
        </h2>

        {dates.map(
          (item, index) => (
            <div
              key={index}
              className="mb-3 flex flex-col gap-2 rounded-xl border bg-transparent p-3"
            >
              <p className="font-bold text-[#1E2939]">
                {item.label}
              </p>

              <p className="text-[#5B626E]">
                {item.value}
              </p>
            </div>
          )
        )}
      </section>

      {/* Trainers */}
      {data?.show_trainers &&
        trainers.length > 0 && (
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              {t(
                "فريق المشرفين"
              )}
            </h2>

            {trainers.map(
              (item, index) => (
                <div
                  key={
                    item?.trainer_id ||
                    index
                  }
                  className="mb-3 flex gap-2 rounded-xl border bg-transparent p-3"
                >
                  <img
                    src={
                      item?.image ||
                      assets.image_4
                    }
                    alt={
                      item?.name ||
                      "Trainer"
                    }
                    className="mb-2 h-12 w-12 rounded-full object-cover"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[#1E2939]">
                      {item?.name}
                    </p>

                    <p className="text-[#5B626E]">
                      {item?.role}
                    </p>
                  </div>
                </div>
              )
            )}
          </section>
        )}

      {/* Booking popup */}
      {showBookingPopup &&
        createPortal(
          <div
            dir="rtl"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3"
          >
            <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#F8F9FC] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-white px-5 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                  حجز الخدمة
                </h2>

                <button
                  type="button"
                  disabled={
                    bookingLoading
                  }
                  onClick={
                    closeBookingPopup
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-4">
                  {/* Pricing tiers */}
                  <div className="rounded-2xl border bg-white p-5">
                    <h3 className="mb-4 text-lg font-bold text-gray-800">
                      اختر الفئة السعرية
                    </h3>

                    {pricingTiers.length >
                    0 ? (
                      <div className="space-y-3">
                        {pricingTiers.map(
                          (
                            tier,
                            index
                          ) => {
                            const tierId =
                              getTierId(
                                tier
                              );

                            const disabled =
                              isTierDisabled(
                                tier
                              );

                            const selected =
                              String(
                                selectedTierId
                              ) ===
                              String(
                                tierId
                              );

                            return (
                              <button
                                key={
                                  tierId ||
                                  index
                                }
                                type="button"
                                disabled={
                                  disabled
                                }
                                onClick={() => {
                                  setSelectedTierId(
                                    tierId
                                  );

                                  setBookingError(
                                    null
                                  );
                                }}
                                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-right transition ${
                                  disabled
                                    ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
                                    : selected
                                    ? "border-[#008C82] bg-[#EAF8F6]"
                                    : "border-gray-200 bg-white hover:border-[#008C82]"
                                }`}
                              >
                                <div>
                                  <p className="font-bold text-gray-800">
                                    {getTierTitle(
                                      tier,
                                      index
                                    )}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    {getTierPrice(
                                      tier
                                    )}{" "}
                                    {data
                                      ?.pricing
                                      ?.currency ||
                                      "EGP"}
                                  </p>

                                  {disabled && (
                                    <p className="mt-1 text-xs text-red-500">
                                      غير متاحة
                                      لنوع
                                      عضويتك
                                    </p>
                                  )}
                                </div>

                                <span
                                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                    selected
                                      ? "border-[#008C82] bg-[#008C82] text-white"
                                      : "border-gray-400"
                                  }`}
                                >
                                  {selected && (
                                    <FaCheck className="text-xs" />
                                  )}
                                </span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-sm text-gray-500">
                        لا توجد فئات
                        سعرية متاحة.
                      </p>
                    )}
                  </div>

                  <ApplicantOption
                    type="self"
                    title="التقديم لنفسي"
                    description="إضافتك ضمن المتقدمين في هذا الطلب"
                    icon={<FaUser />}
                  />

                  <ApplicantOption
                    type="relatives"
                    title="التقديم للأقارب"
                    description="اختر تابعًا واحدًا أو أكثر"
                    icon={
                      <FaUserFriends />
                    }
                  />

                  {/* Dependants */}
                  {selectedApplicantTypes.relatives && (
                    <div className="rounded-2xl border bg-white p-5">
                      <h3 className="mb-5 text-xl font-bold text-gray-800">
                        اختر الأقارب
                      </h3>

                      {relatives.length >
                      0 ? (
                        <div className="space-y-4">
                          {relatives.map(
                            (
                              relative,
                              index
                            ) => {
                              const relativeId =
                                getRelativeId(
                                  relative,
                                  index
                                );

                              const selected =
                                selectedRelatives.some(
                                  (
                                    item
                                  ) =>
                                    String(
                                      getRelativeId(
                                        item.relative,
                                        item.index
                                      )
                                    ) ===
                                    String(
                                      relativeId
                                    )
                                );

                              const disabled =
                                relative?.canApply ===
                                  false ||
                                relative?.can_apply ===
                                  false;

                              return (
                                <button
                                  key={
                                    relativeId
                                  }
                                  type="button"
                                  disabled={
                                    disabled
                                  }
                                  onClick={() =>
                                    toggleRelative(
                                      relative,
                                      index
                                    )
                                  }
                                  className={`flex w-full items-center justify-between gap-4 rounded-xl p-3 text-right transition ${
                                    disabled
                                      ? "cursor-not-allowed bg-gray-50 opacity-40"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                      {getRelativeName(
                                        relative
                                      )}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                      {relative?.relation ||
                                        relative?.relationship ||
                                        ""}
                                    </p>

                                    {disabled &&
                                      (relative?.statusText ||
                                        relative?.status_text) && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {relative?.statusText ||
                                            relative?.status_text}
                                        </p>
                                      )}
                                  </div>

                                  <span
                                    className={`flex h-6 w-6 items-center justify-center rounded border-2 ${
                                      selected
                                        ? "border-[#008C82] bg-[#008C82] text-white"
                                        : "border-gray-500"
                                    }`}
                                  >
                                    {selected && (
                                      <FaCheck className="text-xs" />
                                    )}
                                  </span>
                                </button>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <p className="py-4 text-center text-gray-500">
                          لا يوجد أقارب
                          متاحون للتقديم.
                        </p>
                      )}
                    </div>
                  )}

                  <ApplicantOption
                    type="guests"
                    title="التقديم للضيوف"
                    description="إضافة ضيف واحد أو أكثر من غير الأعضاء"
                    icon={
                      <FaUserPlus />
                    }
                  />

                  {/* Guests */}
                  {selectedApplicantTypes.guests && (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">
                          الضيوف
                        </h3>

                        <button
                          type="button"
                          onClick={
                            addGuest
                          }
                          className="font-semibold text-[#5846A6]"
                        >
                          + إضافة ضيف
                        </button>
                      </div>

                      {guests.length ===
                        0 && (
                        <button
                          type="button"
                          onClick={
                            addGuest
                          }
                          className="w-full rounded-xl border-2 border-dashed border-[#008C82] py-4 font-semibold text-[#008C82]"
                        >
                          + إضافة أول
                          ضيف
                        </button>
                      )}

                      <div className="space-y-4">
                        {guests.map(
                          (
                            guest,
                            index
                          ) => (
                            <div
                              key={
                                guest.id
                              }
                              className="rounded-2xl border bg-white p-5"
                            >
                              <div className="mb-5 flex items-center justify-between">
                                <h4 className="text-lg font-bold text-gray-800">
                                  ضيف{" "}
                                  {index +
                                    1}
                                </h4>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeGuest(
                                      guest.id
                                    )
                                  }
                                  className="text-red-600"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>

                              <div className="space-y-4">
                                <div className="relative">
                                  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                  <input
                                    type="text"
                                    value={
                                      guest.fullName
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      handleGuestChange(
                                        guest.id,
                                        "fullName",
                                        event
                                          .target
                                          .value
                                      )
                                    }
                                    placeholder="الاسم بالكامل *"
                                    className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                  />
                                </div>

                                <div className="relative">
                                  <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                  <input
                                    type="tel"
                                    value={
                                      guest.mobile
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      handleGuestChange(
                                        guest.id,
                                        "mobile",
                                        event
                                          .target
                                          .value
                                      )
                                    }
                                    placeholder="رقم الموبايل *"
                                    className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                  />
                                </div>

                                <div className="relative">
                                  <FaRegIdCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />

                                  <input
                                    type="text"
                                    value={
                                      guest.nationalId
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      handleGuestChange(
                                        guest.id,
                                        "nationalId",
                                        event
                                          .target
                                          .value
                                      )
                                    }
                                    placeholder="الرقم القومي *"
                                    className="w-full rounded-xl border border-gray-400 py-4 pe-12 ps-4 outline-none focus:border-[#008C82]"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-gray-500">
                    إجمالي المتقدمين
                  </span>

                  <span className="text-lg font-bold text-[#008C82]">
                    {totalApplicants}
                  </span>
                </div>

                {hasIncompleteGuests && (
                  <p className="mb-3 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-700">
                    أكملي جميع بيانات
                    الضيوف للمتابعة.
                  </p>
                )}

                {bookingError?.message && (
                  <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <p>
                      {
                        bookingError.message
                      }
                    </p>

                    {bookingError.code ===
                      "not_enough_places" && (
                      <div className="mt-2 space-y-1 text-xs">
                        {bookingError.available !==
                          undefined && (
                          <p>
                            الأماكن
                            المتاحة:{" "}
                            {
                              bookingError.available
                            }
                          </p>
                        )}

                        {bookingError.requested !==
                          undefined && (
                          <p>
                            عدد
                            المتقدمين:{" "}
                            {
                              bookingError.requested
                            }
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {bookingError?.code ===
                  "not_enough_places" && (
                  <button
                    type="button"
                    disabled={
                      bookingLoading
                    }
                    onClick={() =>
                      handleContinue({
                        addAllToWaitingList:
                          true,
                      })
                    }
                    className="mb-3 w-full rounded-xl border border-[#008C82] bg-white py-4 font-bold text-[#008C82] transition hover:bg-[#EAF8F6] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {bookingLoading
                      ? "جاري الإضافة..."
                      : "إضافة الجميع لقائمة الانتظار"}
                  </button>
                )}

                <button
                  type="button"
                  disabled={
                    !canContinue ||
                    bookingLoading
                  }
                  onClick={() =>
                    handleContinue()
                  }
                  className={`w-full rounded-xl py-4 text-lg font-bold transition ${
                    canContinue &&
                    !bookingLoading
                      ? "bg-[#008C82] text-white hover:bg-[#00776F]"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  {bookingLoading
                    ? "جاري إنشاء الحجز..."
                    : "متابعة"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Result popup */}
      {resultPopup.show &&
        createPortal(
          <div
            dir="rtl"
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
          >
            <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
                  resultPopup.type ===
                  "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {resultPopup.type ===
                "success" ? (
                  <FaCheck />
                ) : (
                  <FaTimes />
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                {resultPopup.title}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {resultPopup.message}
              </p>

              {resultPopup.data
                ?.booking_id && (
                <p className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                  رقم الحجز:{" "}
                  <span className="font-bold">
                    {
                      resultPopup
                        .data
                        .booking_id
                    }
                  </span>
                </p>
              )}

              {resultPopup.data
                ?.status ===
                "Pending Payment" &&
              resultPopup.data
                ?.payParams ? (
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      const result =
                        resultPopup.data;

                      closeResultPopup();

                      navigate(
                        "/payment",
                        {
                          state: {
                            bookingId:
                              result?.booking_id,

                            invoiceId:
                              result?.invoice_id,

                            payMethod:
                              result?.payMethod,

                            payParams:
                              result?.payParams,

                            bookingResponse:
                              result,
                          },
                        }
                      );
                    }}
                    className="w-full rounded-xl bg-[#008C82] py-3 font-bold text-white transition hover:bg-[#00776F]"
                  >
                    الانتقال للدفع
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeResultPopup();

                      navigate(
                        "/profile"
                      );
                    }}
                    className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700"
                  >
                    الدفع لاحقًا
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    closeResultPopup();

                    navigate(
                      "/profile"
                    );
                  }}
                  className="mt-6 w-full rounded-xl bg-[#008C82] py-3 font-bold text-white transition hover:bg-[#00776F]"
                >
                  تم
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Right_side;