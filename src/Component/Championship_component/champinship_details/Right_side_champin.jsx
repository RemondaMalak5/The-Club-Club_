import React from "react";
import { FaStar } from "react-icons/fa";

const Right_side_champin = ({ data }) => {
  return (
    <div className="space-y-6">
      

      {/* Teams List */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">الفرق المشاركة</h2>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data?.teams?.map((team, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 border-b hover:bg-gray-50 p-2 rounded">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </span>
              
              {team?.logo && (
                <img src={team.logo} alt={team?.name} className="w-8 h-8 rounded-full object-cover" />
              )}
              
              <span className="text-sm font-medium text-gray-800">{team?.name || "فريق"}</span>
            </div>
          )) || (
            <>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-600">فريق {i + 1}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">معلومات عامة</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <p className="text-gray-600">نوع البطولة</p>
            <h3 className="font-semibold">{data?.type || "كرة قدم"}</h3>
          </div>

          <div className="flex items-center justify-between pb-3 border-b">
            <p className="text-gray-600">عدد الفرق</p>
            <h3 className="font-semibold">{data?.teams?.length || 16} فريق</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">الحالة</p>
            <h3 className="font-semibold text-green-600">{data?.status || "مفتوحة"}</h3>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-5">التواصل</h2>

        <div className="space-y-4 text-sm text-gray-600">
          <p>📞 {data?.phone || "+20 100 000 000"}</p>
          <p>📧 {data?.email || "info@gmail.com"}</p>
          <p>📍 {data?.location || "القاهرة"}</p>
        </div>
      </div>
    </div>
  );
};

export default Right_side_champin;