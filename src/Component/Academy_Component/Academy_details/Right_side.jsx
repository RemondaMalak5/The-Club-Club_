import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Application_prefill } from "../../../axiosConfig/APIs/Academy/Application_prefll";
import i18next from "i18next";
import { Submit_Application } from "../../../axiosConfig/APIs/Academy/Submit_Appication";

const Right_side = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [prefillData, setPrefillData] = useState(null);
  const [selectedType, setSelectedType] = useState("member");
  const [selectedDependant, setSelectedDependant] = useState("");

  const Prefill = async (dependantAddressId = "") => {
    const params = {
      language: i18next.language,
      dependantAddressId: dependantAddressId,
    };

    try {
      const response = await Application_prefill(params);

      console.log("Prefill response:", response);
      console.log("dependantAddressId:", dependantAddressId);

      setPrefillData(response.message.data);
      setShowBookingForm(true);
    } catch (error) {
      console.log("Prefill error:", error);
    }
  };

  const SubmitApplication = async (e) => {
  e.preventDefault();

  const body = {
    fullName: prefillData?.prefill?.fullName || "",
programId: data?.id,
    dateOfBirth: prefillData?.prefill?.dateOfBirth || "",
    mobile: prefillData?.prefill?.mobile || "",
    email: prefillData?.prefill?.email || "",
    nationality: prefillData?.prefill?.nationality || "",
    nationalId: prefillData?.prefill?.nationalId || "",
    address: prefillData?.prefill?.address || "",
    gender: prefillData?.prefill?.gender || "",
    studentId: prefillData?.prefill?.studentId || "",
    language: i18next.language,

    dependantAddressId:
      selectedType === "dependant"
        ? selectedDependant
        : "",
  };

  console.log("Submit Body:", body);

  try {
    const response = await Submit_Application(body);

    console.log("Submit Response:", response);

    alert("تم إرسال طلب الحجز بنجاح");

    setShowBookingForm(false);
  } 
    catch (error) {
  console.log("Submit Error:", error);
  console.log("Backend Error:", error?.response?.data);

  }
};

  const handleMember = () => {
    setSelectedType("member");
    setSelectedDependant("");
    Prefill("");
  };

  const handleDependant = () => {
    setSelectedType("dependant");
    setSelectedDependant("");
    setPrefillData(null);
  };

  const handleDependantChange = (e) => {
    const addressId = e.target.value;

    setSelectedDependant(addressId);

    if (addressId) {
      Prefill(addressId);
    } else {
      setPrefillData(null);
    }
  };

  return (
    <div className="col-span-3 space-y-6 sticky top-5">
      {/* Price Card */}
      <div className="bg-gray-100 rounded-2xl p-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 pb-4">
          {t("academy_book_now")}
        </h2>

        <div className="flex items-center gap-3 justify-between">
          <p className="text-sm text-gray-600">
            {t("academy_price_starts_from")}
          </p>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#00BFA6]">
              {data?.minPrice}
            </span>

            <span className="text-sm text-gray-600">
              {t("academy_currency")}
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-[#1E2939]"></div>

        <div className="flex items-end justify-between mb-8">
          <p className="text-sm text-red-700">
            {t("academy_discount_rate")}
          </p>

          <p className="text-red-700 font-bold text-lg">10%</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleMember}
            className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] duration-300 text-white py-3 rounded-xl font-semibold transition"
          >
            {t("academy_book_now")}
          </button>

          {showBookingForm && (
            <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">
              <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold text-center">
                  {t("academy_book_now")}
                </h2>

                {/* Member Type */}
                <div className="flex gap-4 my-4">
                  <button
                    type="button"
                    onClick={handleMember}
                    className={`p-3 w-1/2 border rounded-xl font-semibold ${
                      selectedType === "member"
                        ? "bg-[#00BFA6] text-white"
                        : "bg-white"
                    }`}
                  >
                    عضو
                  </button>

                  <button
                    type="button"
                    onClick={handleDependant}
                    className={`p-3 w-1/2 border rounded-xl font-semibold ${
                      selectedType === "dependant"
                        ? "bg-[#00BFA6] text-white"
                        : "bg-white"
                    }`}
                  >
                    عضو تابع
                  </button>
                </div>

                {/* Dependants Select */}
                {selectedType === "dependant" && (
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      اختر العضو التابع
                    </label>

                    <select
                      value={selectedDependant}
                      onChange={handleDependantChange}
                      className="w-full border border-[#00BFA6] rounded-xl px-4 py-3 outline-none"
                    >
                      <option value="">اختر العضو التابع</option>

                      {data?.myStatus?.dependants?.map((item) => (
                        <option
                          key={item.addressId}
                          value={item.addressId}
                        >
                          {item.name} - {item.relation}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <form   onSubmit={SubmitApplication}

                 className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 font-medium">
                      الاسم بالكامل
                    </label>

                    <input
                      type="text"
                      value={prefillData?.prefill?.fullName || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("fullName")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            fullName: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("fullName")
                          ? "border-[#00BFA6] bg-white"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Date Of Birth */}
                  <div>
                    <label className="block mb-2 font-medium">
                      تاريخ الميلاد
                    </label>

                    <input
                      type="date"
                      value={prefillData?.prefill?.dateOfBirth || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("dateOfBirth")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            dateOfBirth: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("dateOfBirth")
                          ? "border-[#00BFA6] bg-white"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block mb-2 font-medium">
                      النوع
                    </label>

                    <input
                      type="text"
                      value={prefillData?.prefill?.gender || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("gender")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            gender: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("gender")
                          ? "border-[#00BFA6]"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block mb-2 font-medium">
                      رقم الموبايل
                    </label>

                    <input
                      type="text"
                      value={prefillData?.prefill?.mobile || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("mobile")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            mobile: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("mobile")
                          ? "border-[#00BFA6]"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 font-medium">
                      البريد الإلكتروني
                    </label>

                    <input
                      type="email"
                      value={prefillData?.prefill?.email || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("email")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            email: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("email")
                          ? "border-[#00BFA6]"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block mb-2 font-medium">
                      الجنسية
                    </label>

                    <input
                      type="text"
                      value={prefillData?.prefill?.nationality || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("nationality")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            nationality: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("nationality")
                          ? "border-[#00BFA6]"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block mb-2 font-medium">
                      العنوان
                    </label>

                    <input
                      type="text"
                      value={prefillData?.prefill?.address || ""}
                      readOnly={
                        !prefillData?.requiredFields?.includes("address")
                      }
                      onChange={(e) =>
                        setPrefillData((prev) => ({
                          ...prev,
                          prefill: {
                            ...prev?.prefill,
                            address: e.target.value,
                          },
                        }))
                      }
                      className={`w-full border rounded-xl px-4 py-3 outline-none ${
                        prefillData?.requiredFields?.includes("address")
                          ? "border-[#00BFA6]"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>

                  {/* National ID */}
                  {prefillData?.requiredFields?.includes("nationalId") && (
                    <div>
                      <label className="block mb-2 font-medium">
                        {prefillData?.requiredLabels?.nationalId ||
                          "الرقم القومي"}
                        <span className="text-red-500"> *</span>
                      </label>

                      <input
                        type="text"
                        value={prefillData?.prefill?.nationalId || ""}
                        onChange={(e) =>
                          setPrefillData((prev) => ({
                            ...prev,
                            prefill: {
                              ...prev?.prefill,
                              nationalId: e.target.value,
                            },
                          }))
                        }
                        required
                        placeholder="ادخل الرقم القومي"
                        className="w-full border border-[#00BFA6] rounded-xl px-4 py-3 outline-none"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold"
                    >
                      تأكيد الحجز
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/contact")}
            className="w-full bg-white border-2 border-[#00786F] hover:bg-gray-50 duration-300 text-[#00786F] py-3 rounded-xl font-semibold transition"
          >
            {t("academy_info")}
          </button>
        </div>
      </div>

      {/* Trainers */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {t("academy_trainers_title")}
        </h2>

        <div className="space-y-5">
          {data?.trainers?.map((trainer, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {trainer.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {trainer.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {trainer.certifications?.map((cert, i) => (
                  <span
                    key={i}
                    className="text-xs text-[#00BFA6] cursor-pointer hover:underline border border-[#00BFA6] rounded-full px-2 py-1"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t("academy_facilities_title")}
        </h2>

        <div className="space-y-3">
          {data?.facilities?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

              <p className="text-gray-600 text-sm leading-6 flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t("academy_join_conditions_title")}
        </h2>

        <div className="space-y-3">
          {data?.joinConditions?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

              <p className="text-gray-600 text-sm leading-6 flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-[25px] font-bold mb-5">
          {t("academy_achievements_title")}
        </h2>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data?.achievements?.map((e, index) => (
            <div
              key={index}
              className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2 border rounded-lg"
            >
              <img
                src={assets.image_1}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                loading="lazy"
                alt=""
              />

              <div className="flex flex-col">
                <span className="font-bold text-[16px]">
                  {e?.title}
                </span>

                <p>{e?.season}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right_side;