import React, { useState } from "react";
import Card from "./Card";

const Services_search = () => {
  const [activeTab, setActiveTab] = useState("الكل");

  const tabs = ["الكل", "فعاليات", "أنشطة", "رحلات", "مسابقات", "مناسبات"];

  const data = [
    {
      id: 1,
      title: "رحلة شرم الشيخ",
      desc: "رحلة ترفيهية لمدة 3 أيام",
      price: 1500,
      category: "رحلات",
      date: "10 مارس",
      location: "شرم الشيخ",
      seats: 20,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      title: "مسابقة برمجة",
      desc: "اختبر مهاراتك",
      price: 0,
      category: "مسابقات",
      date: "15 مارس",
      location: "القاهرة",
      seats: 50,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      id: 3,
      title: "حفل موسيقي",
      desc: "استمتع بأفضل الأغاني",
      price: 300,
      category: "فعاليات",
      date: "20 مارس",
      location: "الإسكندرية",
      seats: 100,
      image:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    },
  ];

  const filteredData =
    activeTab === "الكل"
      ? data
      : data.filter((item) => item.category === activeTab);

  return (
    <div className="px-14 py-6 bg-gray-50 min-h-screen">

      {/* Tabs */}
      <div className="flex gap-3 justify-center flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border transition
              ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="ابحث في الخدمات..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none"
        />

        <select className="px-4 py-2 border rounded-lg">
          <option>كل الحالات</option>
        </select>

        <select className="px-4 py-2 border rounded-lg">
          <option>كل الفروع</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Services_search;