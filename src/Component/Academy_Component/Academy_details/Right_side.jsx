import React from "react";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const Right_side = ({ data }) => {
  return (
    <div className="col-span-3 space-y-6 sticky top-5">

      {/* Price Card */}
      <div className="bg-gray-100 rounded-2xl p-8">

        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          احجز الآن
        </h2>

        {/* Level */}
        <div className="text-right mb-6">
          <p className="text-sm text-gray-600">المستوى بتداخل</p>
        </div>

        {/* Price with Discount */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-gray-500 text-xs mb-2">السعر</p>
            <div className="flex items-baseline gap-1 ">
              <span className="text-4xl font-bold text-[#00BFA6]">600</span>
              <span className="text-sm text-gray-600">ج.م</span>
            </div>
          </div>
          <div className="bg-red-200 rounded-lg px-4 py-2">
            <p className="text-red-700 font-bold text-lg">30%</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-[#00BFA6] hover:bg-[#00a892] duration-300 text-white py-3 rounded-xl font-semibold transition">
            احجز الآن
          </button>
          <button className="w-full bg-white border-2 border-[#00BFA6] hover:bg-gray-50 duration-300 text-[#00BFA6] py-3 rounded-xl font-semibold transition">
            معلومات
          </button>
        </div>
      </div>

      {/* Includes */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          يشمل الاشتراك
        </h2>

        <div className="space-y-4">
          {[
            "عدد 12 حصة شهرياً",
            "متابعة مع المدرب",
            "اختبارات تقييم دورية",
            "إمكانية المشاركة بالبطولات",
            "شهادة إتمام",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0" />

              <p className="text-gray-600 text-sm leading-6">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          تواصل معنا
        </h2>

        <div className="space-y-4 text-sm text-gray-600">
          <p>
            📞 {data?.phone || "01000000000"}
          </p>

          <p>
            📍 {data?.address || "القاهرة - التجمع الخامس"}
          </p>

          <p>
            ✉️ info@academy.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Right_side;