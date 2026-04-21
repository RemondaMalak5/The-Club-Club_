// import React, { useState } from "react";
// import { LayoutGrid, List } from "lucide-react";
// import { assets } from "../../../assets/assets";
// import { FaStar } from "react-icons/fa";
// import { IoLocationOutline } from "react-icons/io5";
// import { MdOutlineSportsSoccer, MdPerson } from "react-icons/md";
// import { LiaAwardSolid } from "react-icons/lia";

// const Academy_filter = () => {
//   const tabs = [
//     "كل الأكاديميات",
//     "رياضات جماعية",
//     "رياضات فردية",
//     "رياضات بحرية",
//     "مراكز اللياقة",
//     "ملاعب متاحة",
//   ];
//   const academies = [
//     {
//       img: assets.acdemy,
//       name: "أكاديمية كرة القدم",
//       rate: 4.5,
//       category: "رياضات جماعية",
//       branch: "الفرع الرئيسي",
//       count: 5,
//       proftiprofessional: 3,
//       discription:
//         "تقدم أكاديمية كرة القدم برامج تدريبية شاملة لجميع الأعمار والمستويات، مع مدربين محترفين ومرافق حديثة لتطوير مهارات اللاعبين.",
//     },
//     ,
//     {
//       img: assets.acdemy,
//       name: "أكاديمية كرة القدم",
//       rate: 4.0,
//       category: "رياضات جماعية",
//       branch: "الفرع الرئيسي",
//       count: 5,
//       proftiprofessional: 3,
//       discription:
//         "تقدم أكاديمية كرة القدم برامج تدريبية شاملة لجميع الأعمار والمستويات، مع مدربين محترفين ومرافق حديثة لتطوير مهارات اللاعبين.",
//     },

//     ,
//     {
//       img: assets.acdemy,
//       name: "أكاديمية كرة القدم",
//       rate: 4.8,
//       category: "رياضات جماعية",
//       branch: "الفرع الرئيسي",
//       count: 5,
//       proftiprofessional: 3,
//       discription:
//         "تقدم أكاديمية كرة القدم برامج تدريبية شاملة لجميع الأعمار والمستويات، مع مدربين محترفين ومرافق حديثة لتطوير مهارات اللاعبين.",
//     },
//     ,
//   ];
//   const [active, setActive] = useState("كل الأكاديميات");

//   return (
//     <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-3 mb-4 justify-center">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActive(tab)}
//             className={`px-4 py-2 rounded-full border text-sm transition
//               ${
//                 active === tab
//                   ? "bg-teal-600 text-white"
//                   : "bg-white text-gray-600"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Search + controls */}
//       <div className="flex flex-wrap gap-3 mb-6 items-center px-10">
//         <input
//           type="text"
//           placeholder="ابحث في الأكاديميات..."
//           className="flex-1 px-4 py-2 border rounded-lg outline-none"
//         />
//         <select className="px-4 py-2 border rounded-lg">
//           <option>كل الفروع</option>
//         </select>

//         <select className="px-4 py-2 border rounded-lg">
//           <option>كل الفئات</option>
//         </select>

//         <button className="p-2 bg-teal-600 text-white rounded-lg">
//           <LayoutGrid size={18} />
//         </button>

//         <button className="p-2 border rounded-lg">
//           <List size={18} />
//         </button>
//       </div>

//       <div className="w-full flex flex-wrap ">
//         {academies.map((academy, index) => (
//           <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
//             <div className="border rounded-lg shadow-md overflow-hidden bg-white">
//               <img
//                 src={academy.img}
//                 alt={academy.name}
//                 className="w-full h-40 object-cover"
//               />

//               <div className="p-4 flex flex-wrap justify-between items-center">
//                 <h3 className="text-lg font-bold mb-2">{academy.name}</h3>
//                 <div className="border px-2 py-1 text-sm rounded-xl font-bold flex items-center gap-1">
//                  <span className="text-[#F0B100]"> <FaStar /></span>  {academy.rate}
//                 </div>
//               </div>
//               <div className="px-4 ">
//                 <p className="text-[#6A7282] font-medium text-[16px]">{academy.discription}</p>
//               </div>
//               <div className="text-[#6A7282] font-medium text-[16px] flex flex-col gap-1 p-4">
//                  <p className="flex items-center gap-1"><span className="text-[#08AC85DB]"> <IoLocationOutline/></span>{academy.branch}</p>
//                     <p className="flex items-center gap-1"><span className="text-[#08AC85DB]"> <MdOutlineSportsSoccer/></span> {academy.count} ملاعب</p>
//                       <p className="flex items-center gap-1"><span className="text-[#08AC85DB]"> <LiaAwardSolid/></span> {academy.proftiprofessional} مدربين محترفين</p>
//               </div>
//               <div className="px-4 py-3 flex gap-3">
//                 <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg">
//                   عرض التفاصيل  
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Academy_filter;
import React, { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { assets } from "../../../assets/assets";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";

const Academy_filter = () => {
  const tabs = [
    "كل الأكاديميات",
    "رياضات جماعية",
    "رياضات فردية",
    "رياضات بحرية",
    "مراكز اللياقة",
    "ملاعب متاحة",
  ];

  const academies = [
    {
      img: assets.acdemy,
      name: "أكاديمية كرة القدم",
      rate: 4.5,
      category: "رياضات جماعية",
      branch: "الفرع 6 أكتوبر",
      count: 5,
      proftiprofessional: 3,
      discription:
        "تقدم أكاديمية كرة القدم برامج تدريبية شاملة لجميع الأعمار والمستويات، مع مدربين محترفين ومرافق حديثة لتطوير مهارات اللاعبين.",
    },
    {
      img: assets.acdemy,
      name: "أكاديمية السباحة",
      rate: 4.0,
      category: "رياضات فردية",
      branch: "فرع  العاصمه",
      count: 2,
      proftiprofessional: 4,
      discription:
        "أكاديمية متخصصة في تعليم السباحة لجميع الفئات العمرية مع مدربين محترفين وبرامج تدريبية متقدمة.",
    },
    
   
    {
      img: assets.acdemy,
      name: "أكاديمية الكرة الطائرة",
      rate: 4.3,
      category: "رياضات جماعية",
      branch:"فرع شيراتون",
      count: 3,
      proftiprofessional: 2,
      discription:
        "برامج تدريبية متكاملة لتعليم الكرة الطائرة للمبتدئين والمحترفين في بيئة رياضية مميزة.",
    },
  ];

  const [activeTab, setActiveTab] = useState("كل الأكاديميات");
  const [selectedBranch, setSelectedBranch] = useState("كل الفروع");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const branches = ["كل الفروع", ...new Set(academies.map((item) => item.branch))];

  const filteredAcademies = useMemo(() => {
    return academies.filter((academy) => {
      const matchesTab =
        activeTab === "كل الأكاديميات" || academy.category === activeTab;

      const matchesBranch =
        selectedBranch === "كل الفروع" || academy.branch === selectedBranch;

      const matchesSearch =
        academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        academy.discription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        academy.branch.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesBranch && matchesSearch;
    });
  }, [academies, activeTab, selectedBranch, searchTerm]);

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-4" dir="rtl">
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              activeTab === tab
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="ابحث في الأكاديميات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none"
        />

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none"
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg border transition ${
            viewMode === "grid"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <LayoutGrid size={18} />
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg border transition ${
            viewMode === "list"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <List size={18} />
        </button>
      </div>

      <div
        className={`w-full flex flex-wrap ${
          viewMode === "list" ? "flex-col" : ""
        }`}
      >
        {filteredAcademies.length > 0 ? (
          filteredAcademies.map((academy, index) => (
            <div
              key={index}
              className={
                viewMode === "grid"
                  ? "w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
                  : "w-full mb-6"
              }
            >
              <div
                className={`border rounded-lg shadow-md overflow-hidden bg-white ${
                  viewMode === "list"
                    ? "flex flex-col md:flex-row"
                    : ""
                }`}
              >
                <img
                  src={academy.img}
                  alt={academy.name}
                  className={`object-cover ${
                    viewMode === "grid"
                      ? "w-full h-40"
                      : "w-full md:w-[320px] h-52 md:h-auto"
                  }`}
                />

                <div className="flex-1">
                  <div className="p-4 flex justify-between items-center flex-wrap gap-3">
                    <h3 className="text-lg font-bold">{academy.name}</h3>

                    <div className="border px-2 py-1 text-sm rounded-xl font-bold flex items-center gap-1">
                      <span className="text-[#F0B100]">
                        <FaStar />
                      </span>
                      {academy.rate}
                    </div>
                  </div>

                  <div className="px-4">
                    <p className="text-[#6A7282] font-medium text-[16px] leading-7">
                      {academy.discription}
                    </p>
                  </div>

                  <div className="text-[#6A7282] font-medium text-[14px] flex flex-col gap-1 p-4">
                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <IoLocationOutline />
                      </span>
                      {academy.branch}
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <MdOutlineSportsSoccer />
                      </span>
                      {academy.count} ملاعب
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <LiaAwardSolid />
                      </span>
                      {academy.proftiprofessional} مدربين محترفين
                    </p>
                  </div>

                  <div className="px-4 py-3">
                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-lg">
            لا توجد أكاديميات مطابقة
          </div>
        )}
      </div>
    </div>
  );
};

export default Academy_filter;