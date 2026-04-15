import React from "react";
import { Users, Activity, Layers } from "lucide-react";

const Services_Header = () => {
  const stats = [
    {
      title: "المشتركين",
      value: 320,
      icon: <Users size={20} />,
    },
    {
      title: "الخدمات النشطة",
      value: 12,
      icon: <Activity size={20} />,
    },
    {
      title: "إجمالي عدد الخدمات",
      value: 13,
      icon: <Layers size={20} />,
    },
  ];

  return (
    <div className="px-14 py-6 ">
        <div className="bg-[#E9F2EF] rounded-2xl  md:p-10 mb-6">

      {/* Top Text */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            خدمات النادي
          </h1>
          <p className="text-gray-500 mt-2">
            اكتشف باقة متنوعة من الخدمات والأنشطة المميزة
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm"
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

export default Services_Header;