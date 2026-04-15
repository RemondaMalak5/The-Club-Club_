import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

const Academy_filter = () => {
  const tabs = [
    "كل الأكاديميات",
    "رياضات جماعية",
    "رياضات فردية",
    "رياضات بحرية",
    "مراكز اللياقة",
    "ملاعب متاحة",
  ];

  const [active, setActive] = useState("كل الأكاديميات");

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                active === tab
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + controls */}
      <div className="flex flex-wrap gap-3 mb-6 items-center px-10">
        <input
          type="text"
          placeholder="ابحث في الأكاديميات..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none"
        />
           <select className="px-4 py-2 border rounded-lg">
          <option>كل الفروع</option>
        </select>

         <select className="px-4 py-2 border rounded-lg">
          <option>كل الفئات</option>
        </select>


        <button className="p-2 bg-teal-600 text-white rounded-lg">
          <LayoutGrid size={18} />
        </button>

        <button className="p-2 border rounded-lg">
          <List size={18} />
        </button>

      
      </div>

      
    </>
  );
};

export default Academy_filter;