// import React, { useState } from "react";
// import Card from "./Card";

// const Services_search = () => {
//   const [activeTab, setActiveTab] = useState("الكل");

//   const tabs = ["الكل", "فعاليات", "أنشطة", "رحلات", "مسابقات", "مناسبات"];

//   const data = [
//     {
//       id: 1,
//       title: "رحلة شرم الشيخ",
//       desc: "رحلة ترفيهية لمدة 3 أيام",
//       price: 1500,
//       category: "رحلات",
//       date: "10 مارس",
//       location: "شرم الشيخ",
//       seats: 20,
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//     },
//     {
//       id: 2,
//       title: "مسابقة برمجة",
//       desc: "اختبر مهاراتك",
//       price: 0,
//       category: "مسابقات",
//       date: "15 مارس",
//       location: "القاهرة",
//       seats: 50,
//       image:
//         "https://images.unsplash.com/photo-1518770660439-4636190af475",
//     },
//     {
//       id: 3,
//       title: "حفل موسيقي",
//       desc: "استمتع بأفضل الأغاني",
//       price: 300,
//       category: "فعاليات",
//       date: "20 مارس",
//       location: "الإسكندرية",
//       seats: 100,
//       image:
//         "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
//     },
//   ];

//   const filteredData =
//     activeTab === "الكل"
//       ? data
//       : data.filter((item) => item.category === activeTab);

//   return (
//     <div className="px-14 py-6 bg-gray-50 min-h-screen">

//       {/* Tabs */}
//       <div className="flex gap-3 justify-center flex-wrap mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-full border transition
//               ${
//                 activeTab === tab
//                   ? "bg-teal-600 text-white"
//                   : "bg-white text-gray-600"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Search + Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="ابحث في الخدمات..."
//           className="flex-1 px-4 py-2 border rounded-lg outline-none"
//         />

//         <select className="px-4 py-2 border rounded-lg">
//           <option>كل الحالات</option>
//         </select>

//         <select className="px-4 py-2 border rounded-lg">
//           <option>كل الفروع</option>
//         </select>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredData.map((item) => (
//           <Card key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services_search;

import React, { useMemo, useState } from "react";
import { LayoutGrid, List, Calendar, MapPin, Users } from "lucide-react";

const Services_search = () => {
  const [activeTab, setActiveTab] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("كل الفروع");
  const [selectedStatus, setSelectedStatus] = useState("كل الحالات");
  const [viewMode, setViewMode] = useState("grid");

  const tabs = ["الكل", "فعاليات", "أنشطة", "رحلات", "مسابقات", "مناسبات"];

  const data = [
    {
      id: 1,
      title: "رحلة شرم الشيخ",
      desc: "رحلة ترفيهية لمدة 3 أيام تشمل الإقامة والانتقالات والأنشطة البحرية.",
      price: 1500,
      category: "رحلات",
      date: "10 مارس",
      location: "شرم الشيخ",
      seats: 20,
      status: "متاح",
      branch: "فرع مدينة نصر",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: " رحلة شرم الشيخ",
      desc: "اختبر مهاراتك في حل المشكلات والخوارزميات ضمن تحدي تنافسي ممتع.",
      price: 0,
      category: "مسابقات",
      date: "15 مارس",
      location: "القاهرة",
      seats: 50,
      status: "متاح",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: " رحله شرم الشيخ",
      desc: "استمتع بأفضل الأغاني والعروض الحية في أجواء مميزة.",
      price: 300,
      category: "فعاليات",
      date: "20 مارس",
      location: "الإسكندرية",
      seats: 100,
      status: "متبقي قليل",
      branch: "فرع شيراتون",
      image:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "رحله شرم الشيخ",
      desc: "ورشة إبداعية لتعلم أساسيات الرسم والتلوين لجميع المستويات.",
      price: 200,
      category: "أنشطة",
      date: "22 مارس",
      location: "الجيزة",
      seats: 25,
      status: "متاح",
      branch: "فرع 6 أكتوبر",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "مناسبة  عائلية",
      desc: "يوم ترفيهي مخصص للعائلات يتضمن فقرات متنوعة ومسابقات للأطفال.",
      price: 100,
      category: "مناسبات",
      date: "25 مارس",
      location: "القاهرة الجديدة",
      seats: 80,
      status: "مغلق",
      branch: "فرع العاصمة",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const branches = ["كل الفروع", ...new Set(data.map((item) => item.branch))];
  const statuses = ["كل الحالات", ...new Set(data.map((item) => item.status))];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesTab =
        activeTab === "الكل" || item.category === activeTab;

      const matchesBranch =
        selectedBranch === "كل الفروع" || item.branch === selectedBranch;

      const matchesStatus =
        selectedStatus === "كل الحالات" || item.status === selectedStatus;

      const matchesSearch =
        `${item.title} ${item.desc} ${item.location} ${item.branch} ${item.category}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesTab && matchesBranch && matchesStatus && matchesSearch;
    });
  }, [activeTab, searchTerm, selectedBranch, selectedStatus, data]);

  const getPriceLabel = (price) => {
    return price === 0 ? "مجاني" : `${price} جنيه`;
  };

  const getStatusStyle = (status) => {
    if (status === "متاح") return "bg-emerald-50 text-emerald-700";
    if (status === "متبقي قليل") return "bg-amber-50 text-amber-700";
    if (status === "مغلق") return "bg-red-50 text-red-700";
    return "bg-gray-50 text-gray-700";
  };

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-4 bg-[#f8faf9]" dir="rtl">
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl border text-sm transition ${
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
          placeholder="ابحث في الخدمات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none bg-white"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
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

      <div className={viewMode === "grid" ? "flex flex-wrap" : "flex flex-col gap-5"}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className={
                viewMode === "grid"
                  ? "w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
                  : "w-full"
              }
            >
              <div
                className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition ${
                  viewMode === "grid"
                    ? "h-full flex flex-col"
                    : "flex flex-col md:flex-row min-h-[280px]"
                }`}
              >
                <div
                  className={`relative ${
                    viewMode === "grid"
                      ? "w-full h-52"
                      : "w-full md:w-[320px] lg:w-[360px] h-[220px] md:h-auto md:min-h-[280px] shrink-0"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full text-sm shadow text-gray-700">
                    {item.category}
                  </span>

                 
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="p-4 flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3 justify-between w-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <span className="border text-[#F45816] rounded-full bg-[#FFF7ED] py-1 px-2 font-bold">{item.price} جنيها</span>
                      </div>
                    </div>

                    <p className="px-4 text-gray-500 text-sm leading-6 mb-3">
                      {item.desc}
                    </p>

                    <div className="px-4 pb-4 text-sm text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <Calendar size={16} className="text-teal-500" />
                        {item.date}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-teal-500" />
                        {item.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <Users size={16} className="text-teal-500" />
                        {item.seats} مقاعد
                      </p>

                     
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-lg">
            لا توجد نتائج مطابقة
          </div>
        )}
      </div>
    </div>
  );
};

export default Services_search;