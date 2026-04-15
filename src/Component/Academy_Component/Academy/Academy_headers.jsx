import React from "react";
import { Users, Activity, ClipboardList } from "lucide-react";

const Academy_headers = () => {
  const stats = [
    {
      title: "عدد الأكاديميات",
      value: 24,
      icon: <ClipboardList size={20} />,
    },
    {
      title: "إجمالي المشتركين",
      value: 980,
      icon: <Users size={20} />,
    },
    {
      title: "الأكاديميات النشطة",
      value: 17,
      icon: <Activity size={20} />,
    },
  ];

  return (
    <div className="px-14 py-9">
          <div className="bg-[#E9F2EF] rounded-2xl p-6 md:p-10 mb-6">
      
      {/* Title */}
      <div className="text-right mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          الأكاديميات الرياضية
        </h1>
        <p className="text-gray-500 mt-2">
          طور مهاراتك الرياضية مع أفضل المدربين
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm"
          >
            <div className="text-right">
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold text-teal-600">
                {stat.value}
              </h2>
            </div>

            <div className="bg-teal-600 text-white p-3 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </div>
    
  );
};

export default Academy_headers;