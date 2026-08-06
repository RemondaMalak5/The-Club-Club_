// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { FaCheckCircle } from "react-icons/fa";
// import { assets } from "../../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { Application_prefill } from "../../../axiosConfig/APIs/Academy/Application_prefll";
// import i18next from "i18next";
// import { Submit_Application } from "../../../axiosConfig/APIs/Academy/Submit_Appication";
// import { createPortal } from "react-dom";

// const Right_side = ({ data }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [prefillData, setPrefillData] = useState(null);
//   const [selectedType, setSelectedType] = useState("member");
//   const [selectedDependant, setSelectedDependant] = useState("");

//   // الحقول اللي المستخدم مسموح له يكتب فيها
//   const [editableFields, setEditableFields] = useState([]);

//   // الحقول الموجودة في الفورم
//   const formFields = [
//     "fullName",
//     "dateOfBirth",
//     "gender",
//     "mobile",
//     "email",
//     "nationality",
//     "address",
//     "nationalId",
//   ];

//   // ============================
//   // PREFILL
//   // ============================

//   const Prefill = async (dependantAddressId = "") => {
//     const params = {
//       language: i18next.language,
//       dependantAddressId,
//     };

//     try {
//       const response = await Application_prefill(params);

//       console.log("Prefill response:", response);
//       console.log("dependantAddressId:", dependantAddressId);

//       const responseData = response?.message?.data || {};

//       const prefill = responseData?.prefill || {};

//       // نحدد الحقول الفاضية
//       const emptyFields = formFields.filter((fieldName) => {
//         const value = prefill[fieldName];

//         return (
//           value === null ||
//           value === undefined ||
//           value === ""
//         );
//       });

//       console.log("Editable Fields:", emptyFields);

//       // نخزن بيانات الـ prefill
//       setPrefillData({
//         ...responseData,
//         prefill,
//       });

//       // نخزن الحقول اللي المستخدم يقدر يكتب فيها
//       setEditableFields(emptyFields);

//       // نفتح الـ popup
//       setShowBookingForm(true);
//     } catch (error) {
//       console.log("Prefill error:", error);
//     }
//   };

//   // ============================
//   // هل الحقل Editable؟
//   // ============================

//   const isFieldEditable = (fieldName) => {
//     return editableFields.includes(fieldName);
//   };

//   // ============================
//   // تغيير قيمة أي Input
//   // ============================

//   const handleFieldChange = (fieldName, value) => {
//     setPrefillData((prev) => ({
//       ...prev,

//       prefill: {
//         ...prev?.prefill,

//         [fieldName]: value,
//       },
//     }));
//   };

//   // ============================
//   // SUBMIT
//   // ============================

//   const SubmitApplication = async (e) => {
//     e.preventDefault();

//     const body = {
//       fullName: prefillData?.prefill?.fullName || "",

//       programId: data?.id,

//       dateOfBirth: prefillData?.prefill?.dateOfBirth || "",

//       mobile: prefillData?.prefill?.mobile || "",

//       email: prefillData?.prefill?.email || "",

//       nationality: prefillData?.prefill?.nationality || "",

//       nationalId: prefillData?.prefill?.nationalId || "",

//       address: prefillData?.prefill?.address || "",

//       gender: prefillData?.prefill?.gender || "",

//       studentId: prefillData?.prefill?.studentId || "",

//       language: i18next.language,

//       dependantAddressId:
//         selectedType === "dependant"
//           ? selectedDependant
//           : "",
//     };

//     console.log("Submit Body:", body);

//     try {
//       const response = await Submit_Application(body);

//       console.log("Submit Response:", response);

//       alert("تم إرسال طلب الحجز بنجاح");

//       setShowBookingForm(false);
//     } catch (error) {
//       console.log("Submit Error:", error);

//       console.log(
//         "Backend Error:",
//         error?.response?.data
//       );
//     }
//   };

//   // ============================
//   // MEMBER
//   // ============================

//   const handleMember = () => {
//     setSelectedType("member");

//     setSelectedDependant("");

//     Prefill("");
//   };

//   // ============================
//   // DEPENDANT
//   // ============================

//   const handleDependant = () => {
//     setSelectedType("dependant");

//     setSelectedDependant("");

//     setPrefillData(null);

//     setEditableFields([]);
//   };

//   // ============================
//   // اختيار عضو تابع
//   // ============================

//   const handleDependantChange = (e) => {
//     const addressId = e.target.value;

//     setSelectedDependant(addressId);

//     if (addressId) {
//       Prefill(addressId);
//     } else {
//       setPrefillData(null);

//       setEditableFields([]);
//     }
//   };

//   return (
//     <div className="col-span-3 space-y-6 sticky top-5">

//       {/* ============================
//           PRICE CARD
//       ============================ */}

//       <div className="bg-gray-100 rounded-2xl p-8">

//         <h2 className="text-center text-2xl font-bold text-gray-800 pb-4">
//           {t("academy_book_now")}
//         </h2>

//         <div className="flex items-center gap-3 justify-between">

//           <p className="text-sm text-gray-600">
//             {t("academy_price_starts_from")}
//           </p>

//           <div className="flex items-baseline gap-1">

//             <span className="text-2xl font-bold text-[#00BFA6]">
//               {data?.minPrice}
//             </span>

//             <span className="text-sm text-gray-600">
//               {t("academy_currency")}
//             </span>

//           </div>

//         </div>

//         <div className="h-[1px] bg-[#1E2939]"></div>

//         <div className="flex items-end justify-between mb-8">

//           <p className="text-sm text-red-700">
//             {t("academy_discount_rate")}
//           </p>

//           <p className="text-red-700 font-bold text-lg">
//             10%
//           </p>

//         </div>

//         <div className="space-y-3">

//           {/* BOOK BUTTON */}

//           <button
//             type="button"
//             onClick={handleMember}
//             className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] duration-300 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {t("academy_book_now")}
//           </button>

//           {/* ============================
//               POPUP
//           ============================ */}

//           {showBookingForm &&
//             createPortal(

//               <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">

//                 <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">

//                   {/* CLOSE */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowBookingForm(false)
//                     }
//                     className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
//                   >
//                     ×
//                   </button>

//                   <h2 className="text-2xl font-bold text-center">
//                     {t("academy_book_now")}
//                   </h2>

//                   {/* ============================
//                       MEMBER TYPE
//                   ============================ */}

//                   <div className="flex gap-4 my-4">

//                     <button
//                       type="button"
//                       onClick={handleMember}
//                       className={`p-3 w-1/2 border rounded-xl font-semibold ${
//                         selectedType === "member"
//                           ? "bg-[#00BFA6] text-white"
//                           : "bg-white"
//                       }`}
//                     >
//                       عضو
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleDependant}
//                       className={`p-3 w-1/2 border rounded-xl font-semibold ${
//                         selectedType === "dependant"
//                           ? "bg-[#00BFA6] text-white"
//                           : "bg-white"
//                       }`}
//                     >
//                       عضو تابع
//                     </button>

//                   </div>

//                   {/* ============================
//                       DEPENDANTS
//                   ============================ */}

//                   {selectedType === "dependant" && (

//                     <div className="mb-5">

//                       <label className="block mb-2 font-medium">
//                         اختر العضو التابع
//                       </label>

//                       <select
//                         value={selectedDependant}
//                         onChange={handleDependantChange}
//                         className="w-full border border-[#00BFA6] rounded-xl px-4 py-3 outline-none"
//                       >

//                         <option value="">
//                           اختر العضو التابع
//                         </option>

//                         {data?.myStatus?.dependants?.map(
//                           (item) => (

//                             <option
//                               key={item.addressId}
//                               value={item.addressId}
//                             >
//                               {item.name} -{" "}
//                               {item.relation}
//                             </option>

//                           )
//                         )}

//                       </select>

//                     </div>

//                   )}

//                   {/* ============================
//                       FORM
//                   ============================ */}

//                   <form
//                     onSubmit={SubmitApplication}
//                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                   >

//                     {/* FULL NAME */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         الاسم بالكامل
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.fullName || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "fullName"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "fullName",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "fullName"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* DATE OF BIRTH */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         تاريخ الميلاد
//                       </label>

//                       <input
//                         type="date"
//                         value={
//                           prefillData?.prefill
//                             ?.dateOfBirth || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "dateOfBirth"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "dateOfBirth",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "dateOfBirth"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* GENDER */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         النوع
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.gender || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "gender"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "gender",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "gender"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* MOBILE */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         رقم الموبايل
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.mobile || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "mobile"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "mobile",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "mobile"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* EMAIL */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         البريد الإلكتروني
//                       </label>

//                       <input
//                         type="email"
//                         value={
//                           prefillData?.prefill
//                             ?.email || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "email"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "email",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "email"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* NATIONALITY */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         الجنسية
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.nationality || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "nationality"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "nationality",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "nationality"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* ADDRESS */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         العنوان
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.address || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "address"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "address",
//                             e.target.value
//                           )
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "address"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* NATIONAL ID */}

//                     <div>

//                       <label className="block mb-2 font-medium">
//                         الرقم القومي
//                       </label>

//                       <input
//                         type="text"
//                         value={
//                           prefillData?.prefill
//                             ?.nationalId || ""
//                         }
//                         readOnly={
//                           !isFieldEditable(
//                             "nationalId"
//                           )
//                         }
//                         onChange={(e) =>
//                           handleFieldChange(
//                             "nationalId",
//                             e.target.value
//                           )
//                         }
//                         placeholder={
//                           isFieldEditable(
//                             "nationalId"
//                           )
//                             ? "ادخل الرقم القومي"
//                             : ""
//                         }
//                         className={`w-full border rounded-xl px-4 py-3 outline-none ${
//                           isFieldEditable(
//                             "nationalId"
//                           )
//                             ? "border-[#00BFA6] bg-white"
//                             : "bg-gray-100"
//                         }`}
//                       />

//                     </div>

//                     {/* SUBMIT */}

//                     <div className="md:col-span-2">

//                       <button
//                         type="submit"
//                         className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white py-3 rounded-xl font-semibold"
//                       >
//                         تأكيد الحجز
//                       </button>

//                     </div>

//                   </form>

//                 </div>

//               </div>,

//               document.body
//             )
//           }

//           {/* CONTACT */}

//           <button
//             onClick={() =>
//               navigate("/contact")
//             }
//             className="w-full bg-white border-2 border-[#00786F] hover:bg-gray-50 duration-300 text-[#00786F] py-3 rounded-xl font-semibold transition"
//           >
//             {t("academy_info")}
//           </button>

//         </div>

//       </div>

     

//       <div className="bg-white border rounded-2xl shadow-sm p-6">

//         <h2 className="text-xl font-bold text-gray-800 mb-6">
//           {t("academy_trainers_title")}
//         </h2>

//         <div className="space-y-5">

//           {data?.trainers?.map(
//             (trainer, index) => (

//               <div
//                 key={index}
//                 className="border rounded-2xl p-4 hover:shadow-md transition"
//               >

//                 <div className="flex items-center gap-4">

//                   <img
//                     src={trainer.photo}
//                     alt={trainer.name}
//                     className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//                     loading="lazy"
//                   />

//                   <div className="flex-1">

//                     <h3 className="font-bold text-gray-800">
//                       {trainer.name}
//                     </h3>

//                     <p className="text-sm text-gray-500 mt-1">
//                       {trainer.role}
//                     </p>

//                   </div>

//                 </div>

//                 <div className="flex flex-wrap gap-2 mt-4">

//                   {trainer.certifications?.map(
//                     (cert, i) => (

//                       <span
//                         key={i}
//                         className="text-xs text-[#00BFA6] cursor-pointer hover:underline border border-[#00BFA6] rounded-full px-2 py-1"
//                       >
//                         {cert}
//                       </span>

//                     )
//                   )}

//                 </div>

//               </div>

//             )
//           )}

//         </div>

//       </div>

    

//       <div className="bg-white border rounded-2xl shadow-sm p-6">

//         <h2 className="text-xl font-bold text-gray-800 mb-5">
//           {t("academy_facilities_title")}
//         </h2>

//         <div className="space-y-3">

//           {data?.facilities?.map(
//             (item, index) => (

//               <div
//                 key={index}
//                 className="flex items-start gap-3"
//               >

//                 <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

//                 <p className="text-gray-600 text-sm leading-6 flex-1">
//                   {item}
//                 </p>

//               </div>

//             )
//           )}

//         </div>

//       </div>

     

//       <div className="bg-white border rounded-2xl shadow-sm p-6">

//         <h2 className="text-xl font-bold text-gray-800 mb-5">
//           {t("academy_join_conditions_title")}
//         </h2>

//         <div className="space-y-3">

//           {data?.joinConditions?.map(
//             (item, index) => (

//               <div
//                 key={index}
//                 className="flex items-start gap-3"
//               >

//                 <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

//                 <p className="text-gray-600 text-sm leading-6 flex-1">
//                   {item}
//                 </p>

//               </div>

//             )
//           )}

//         </div>

//       </div>

   

//       <div className="bg-white rounded-2xl shadow-sm p-6">

//         <h2 className="text-[25px] font-bold mb-5">
//           {t("academy_achievements_title")}
//         </h2>

//         <div className="space-y-3 max-h-[500px] overflow-y-auto">

//           {data?.achievements?.map(
//             (e, index) => (

//               <div
//                 key={index}
//                 className="flex items-center gap-3 pb-3 bg-[#F9FAFB] hover:bg-gray-50 p-2 border rounded-lg"
//               >

//                 <img
//                   src={assets.image_1}
//                   className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                   loading="lazy"
//                   alt=""
//                 />

//                 <div className="flex flex-col">

//                   <span className="font-bold text-[16px]">
//                     {e?.title}
//                   </span>

//                   <p>
//                     {e?.season}
//                   </p>

//                 </div>

//               </div>

//             )
//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Right_side;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Application_prefill } from "../../../axiosConfig/APIs/Academy/Application_prefll";
import i18next from "i18next";
import { Submit_Application } from "../../../axiosConfig/APIs/Academy/Submit_Appication";
import { createPortal } from "react-dom";

const Right_side = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [prefillData, setPrefillData] = useState(null);
  const [selectedType, setSelectedType] = useState("member");
  const [selectedDependant, setSelectedDependant] = useState("");
  const [editableFields, setEditableFields] = useState([]);

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

  // ============================
  // PREFILL
  // ============================

  const Prefill = async (dependantAddressId = "") => {
    const params = {
      language: i18next.language,
      dependantAddressId,
    };

    try {
      const response = await Application_prefill(params);

      console.log("Prefill response:", response);
      console.log("dependantAddressId:", dependantAddressId);

      const responseData = response?.message?.data || {};
      const prefill = responseData?.prefill || {};

      const emptyFields = formFields.filter((fieldName) => {
        const value = prefill[fieldName];

        return (
          value === null ||
          value === undefined ||
          value === ""
        );
      });

      setPrefillData({
        ...responseData,
        prefill,
      });

      setEditableFields(emptyFields);
      setShowBookingForm(true);
    } catch (error) {
      console.log("Prefill error:", error);
    }
  };

  // ============================
  // FIELD HELPERS
  // ============================

  const isFieldEditable = (fieldName) => {
    return editableFields.includes(fieldName);
  };

  const handleFieldChange = (fieldName, value) => {
    setPrefillData((prev) => ({
      ...prev,
      prefill: {
        ...prev?.prefill,
        [fieldName]: value,
      },
    }));
  };

  // ============================
  // SUBMIT
  // ============================

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

      alert("تم التقديم على الطلب بنجاح");

      setShowBookingForm(false);
    } catch (error) {
      console.log("Submit Error:", error);
      console.log("Backend Error:", error?.response?.data);
    }
  };

  // ============================
  // MEMBER
  // ============================

  const handleMember = () => {
    if (data?.myStatus?.canApply === false) {
      alert(
        `تم التقديم على الطلب بالفعل${
          data?.myStatus?.statusText
            ? ` - ${data.myStatus.statusText}`
            : ""
        }`
      );

      return;
    }

    setSelectedType("member");
    setSelectedDependant("");
    setPrefillData(null);
    setEditableFields([]);

    Prefill("");
  };

  // ============================
  // DEPENDANT
  // ============================

  const handleDependant = () => {
    setSelectedType("dependant");
    setSelectedDependant("");
    setPrefillData(null);
    setEditableFields([]);

    // لو الـ popup مش مفتوحة أصلا
    setShowBookingForm(true);
  };

  // ============================
  // DEPENDANT CHANGE
  // ============================

  const handleDependantChange = (e) => {
    const addressId = e.target.value;

    if (!addressId) {
      setSelectedDependant("");
      setPrefillData(null);
      setEditableFields([]);
      return;
    }

    const dependant = data?.myStatus?.dependants?.find(
      (item) => item.addressId === addressId
    );

    if (!dependant) {
      return;
    }

    if (dependant?.canApply === false) {
      alert(
        `تم التقديم لهذا العضو بالفعل${
          dependant?.statusText
            ? ` - ${dependant.statusText}`
            : ""
        }`
      );

      setSelectedDependant("");
      setPrefillData(null);
      setEditableFields([]);

      return;
    }

    setSelectedDependant(addressId);

    Prefill(addressId);
  };

  return (
    <div className="col-span-3 space-y-6 sticky top-5">
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

        <div className="h-[1px] bg-[#1E2939] my-1"></div>

        <div className="flex items-end justify-between mb-5">

          <p className="text-sm text-red-700">
            {t("academy_discount_rate")}
          </p>

          <p className="text-red-700 font-bold text-lg">
            10%
          </p>

        </div>

        <div className="space-y-3">


          {data?.myStatus?.canApply === false ? (

            <div className="w-full rounded-xl border border-green-300 bg-green-50 p-4 text-center">

              <p className="font-bold text-green-700">
                تم التقديم على الطلب
              </p>

              {data?.myStatus?.statusText && (
                <p className="text-sm text-gray-600 mt-1">
                  الحالة: {data.myStatus.statusText}
                </p>
              )}

              {data?.myStatus?.applicantId && (
                <p className="text-xs text-gray-500 mt-1">
                  رقم الطلب: {data.myStatus.applicantId}
                </p>
              )}

            </div>

          ) : (

            <button
              type="button"
              onClick={handleMember}
              className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] duration-300 text-white py-3 rounded-xl font-semibold transition"
            >
              {t("academy_book_now")}
            </button>

          )}


          {data?.myStatus?.dependants?.length > 0 && (

            <button
              type="button"
              onClick={handleDependant}
              className="w-full bg-white border-2 border-[#00BFA6] text-[#00BFA6] py-3 rounded-xl font-semibold hover:bg-[#00BFA6] hover:text-white transition"
            >
              الحجز لعضو تابع
            </button>

          )}

      

          {showBookingForm &&
            createPortal(

              <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">

                <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">

                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedDependant("");
                      setPrefillData(null);
                      setEditableFields([]);
                    }}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>

                  <h2 className="text-2xl font-bold text-center">
                    {t("academy_book_now")}
                  </h2>

                 

                  <div className="flex gap-4 my-4">

                    <button
                      type="button"
                      onClick={handleMember}
                      disabled={data?.myStatus?.canApply === false}
                      className={`p-3 w-1/2 border rounded-xl font-semibold transition ${
                        data?.myStatus?.canApply === false
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedType === "member"
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

                  {/* حالة العضو الأساسي */}

                  {selectedType === "member" &&
                    data?.myStatus?.canApply === false && (

                      <div className="mb-5 rounded-xl bg-green-50 border border-green-300 p-4 text-center">

                        <p className="font-bold text-green-700">
                          تم التقديم على الطلب بالفعل
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {data?.myStatus?.statusText}
                        </p>

                      </div>

                    )}

             

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

                        <option value="">
                          اختر العضو التابع
                        </option>

                        {data?.myStatus?.dependants?.map((item) => (

                          <option
                            key={item.addressId}
                            value={item.addressId}
                            disabled={!item.canApply}
                          >
                            {item.name} - {item.relation}
                            {!item.canApply
                              ? ` - ${
                                  item.statusText ||
                                  "تم التقديم"
                                }`
                              : ""}
                          </option>

                        ))}

                      </select>

                    </div>

                  )}

                  

                  {prefillData && (

                    <form
                      onSubmit={SubmitApplication}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                      {/* FULL NAME */}

                      <div>

                        <label className="block mb-2 font-medium">
                          الاسم بالكامل
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.fullName || ""}
                          readOnly={!isFieldEditable("fullName")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "fullName",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("fullName")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* DATE OF BIRTH */}

                      <div>

                        <label className="block mb-2 font-medium">
                          تاريخ الميلاد
                        </label>

                        <input
                          type="date"
                          value={prefillData?.prefill?.dateOfBirth || ""}
                          readOnly={!isFieldEditable("dateOfBirth")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "dateOfBirth",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("dateOfBirth")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* GENDER */}

                      <div>

                        <label className="block mb-2 font-medium">
                          النوع
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.gender || ""}
                          readOnly={!isFieldEditable("gender")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "gender",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("gender")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* MOBILE */}

                      <div>

                        <label className="block mb-2 font-medium">
                          رقم الموبايل
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.mobile || ""}
                          readOnly={!isFieldEditable("mobile")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "mobile",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("mobile")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* EMAIL */}

                      <div>

                        <label className="block mb-2 font-medium">
                          البريد الإلكتروني
                        </label>

                        <input
                          type="email"
                          value={prefillData?.prefill?.email || ""}
                          readOnly={!isFieldEditable("email")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "email",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("email")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* NATIONALITY */}

                      <div>

                        <label className="block mb-2 font-medium">
                          الجنسية
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.nationality || ""}
                          readOnly={!isFieldEditable("nationality")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "nationality",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("nationality")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* ADDRESS */}

                      <div>

                        <label className="block mb-2 font-medium">
                          العنوان
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.address || ""}
                          readOnly={!isFieldEditable("address")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "address",
                              e.target.value
                            )
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("address")
                              ? "border-[#00BFA6] bg-white"
                              : "bg-gray-100"
                          }`}
                        />

                      </div>

                      {/* NATIONAL ID */}

                      <div>

                        <label className="block mb-2 font-medium">
                          الرقم القومي
                        </label>

                        <input
                          type="text"
                          value={prefillData?.prefill?.nationalId || ""}
                          readOnly={!isFieldEditable("nationalId")}
                          required
                          onChange={(e) =>
                            handleFieldChange(
                              "nationalId",
                              e.target.value
                            )
                          }
                          placeholder={
                            isFieldEditable("nationalId")
                              ? "ادخل الرقم القومي"
                              : ""
                          }
                          className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            isFieldEditable("nationalId")
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
                          تأكيد الحجز
                        </button>

                      </div>

                    </form>

                  )}

                </div>

              </div>,

              document.body
            )
          }

          <button
            onClick={() => navigate("/contact")}
            className="w-full bg-white border-2 border-[#00786F] hover:bg-gray-50 duration-300 text-[#00786F] py-3 rounded-xl font-semibold transition"
          >
            {t("academy_info")}
          </button>

        </div>

      </div>

    

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

    

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t("academy_facilities_title")}
        </h2>

        <div className="space-y-3">

          {data?.facilities?.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

              <p className="text-gray-600 text-sm leading-6 flex-1">
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

  

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {t("academy_join_conditions_title")}
        </h2>

        <div className="space-y-3">

          {data?.joinConditions?.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />

              <p className="text-gray-600 text-sm leading-6 flex-1">
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

  

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

                <p>
                  {e?.season}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Right_side;