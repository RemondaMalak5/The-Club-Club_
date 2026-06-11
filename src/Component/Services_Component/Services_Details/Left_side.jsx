import React from "react";
import { FaCheck, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const Left_side = ({ data }) => {
  const highlights = [
    data?.sub_title || "خدمة مميزة مصممة لتلبية احتياجات الأعضاء والعائلات بأفضل تجربة." ,
    data?.branchName ? `الفرع: ${data.branchName}` : "فرع متعدد المواقع مع خدمات متكاملة.",
    data?.start_date ? `موعد البدء: ${data.start_date}` : "تتوفر الخدمة خلال الموسم الحالي.",
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-right text-gray-800 mb-4">عن الخدمة</h2>
        <p className="text-gray-600 text-right leading-7">
          {data?.description || data?.sub_title || "هذه الخدمة تقدم تجربة مميزة تشمل الأنشطة والبرامج والفرص المتاحة في الفرع المختار."}
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-right text-gray-800 mb-6">ماذا ستستفيد منه؟</h2>
        <div className="space-y-4">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-start gap-3 text-right">
              <FaCheck className="text-[#00BFA6] mt-1 shrink-0" />
              <p className="text-gray-600 leading-6 flex-1">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-right text-gray-800 mb-6">معلومات الخدمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4 bg-gray-50">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaClock className="text-[#00BFA6]" />
              <span className="font-semibold">الوقت</span>
            </div>
            <p className="text-gray-600 text-right">{data?.start_date || "سيتم تحديد الموعد مع الإدارة"}</p>
          </div>
          <div className="rounded-xl border p-4 bg-gray-50">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-[#00BFA6]" />
              <span className="font-semibold">الموقع</span>
            </div>
            <p className="text-gray-600 text-right">{data?.branchName || "الفرع الرئيسي"}</p>
          </div>
          <div className="rounded-xl border p-4 bg-gray-50 md:col-span-2">
            <div className="flex items-center justify-between text-gray-700 mb-2">
              <FaUsers className="text-[#00BFA6]" />
              <span className="font-semibold">العدد المتاح</span>
            </div>
            <p className="text-gray-600 text-right">
              {data?.is_unlimited ? "غير محدود" : `${data?.available_count || 0} مقعد متاح`} 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Left_side;
