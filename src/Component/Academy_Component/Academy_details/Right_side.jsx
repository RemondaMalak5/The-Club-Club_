import React from "react";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const Right_side = ({ data }) => {
  return (
    <div className="col-span-3 space-y-6 sticky top-5">

      {/* Price Card */}
      <div className="bg-gray-100 rounded-2xl p-8">

        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 pb-4">
          احجز الآن
        </h2>

        {/* Level */}
        <div className="flex items-center gap-3 justify-between ">
          <p className="text-sm text-gray-600">السعر يبدأ من  </p>
          <div className="flex items-baseline gap-1 ">
            <span className="text-2xl font-bold text-[#00BFA6]">{data?.minPrice}</span>
            <span className="text-sm text-gray-600">ج.م</span>
          </div>

        </div>
        <div className="h-[1px] bg-[#1E2939]"></div>
        {/* Price with Discount */}
        <div className="flex items-end justify-between mb-8">
          <p className="text-sm text-red-700">السعر بعد الخصم</p>
          <p className="text-red-700 font-bold text-lg">30%</p>

        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F]  duration-300 text-white py-3 rounded-xl font-semibold transition">
            احجز الآن
          </button>
          <button className="w-full bg-white border-2 border-[#00786F] hover:bg-gray-50 duration-300 text-[#00786F] py-3 rounded-xl font-semibold transition">
            معلومات
          </button>
        </div>
      </div>
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">
          المدربون
        </h2>

        <div className="space-y-5">
          {data?.trainers?.map((trainer, index) => (
            <div key={index} className="border rounded-2xl p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                {/* Profile Photo */}
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />

                {/* Trainer Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {trainer.role}
                  </p>
                </div>

                
              </div>

              {/* Tags/Links */}
              <div className="flex flex-wrap gap-2 mt-4 ">
                {trainer.certifications?.map((cert, i) => (
                  <span
                    key={i}
                    className="text-xs text-[#00BFA6] cursor-pointer hover:underline border border-[#00BFA6] rounded-full px-2 py-1"
                  >
                    {cert}
                  </span>
                )) || (
                    <>
                      <span className="text-xs text-[#00BFA6] cursor-pointer hover:underline">تدريب</span>
                      <span className="text-xs text-[#00BFA6] cursor-pointer hover:underline">قيمة للعملاء</span>
                      <span className="text-xs text-[#00BFA6] cursor-pointer hover:underline">حياة و ترفيه</span>
                    </>
                  )}
              </div>
            </div>
          )) }
        </div>
      </div>
      {/* Facilities */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5 text-right">
          المرافق
        </h2>

        <div className="space-y-3">
          {data?.facilities?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          )) || [
            "ملعب كرة قدم",
            "صالة تدريب مكيفة",
            "مرافق طبية و إسعافات أولية",
            "غرف تغيير ملابس",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5 text-right">
          المعدات
        </h2>

        <div className="space-y-3">
          {data?.equipment?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          )) || [
            "كرات تدريب مهنية",
            "أدوات تدريب متقدمة",
            "أجهزة قياس اللياقة",
            "ملابس تدريب موحدة",
            "كواليس درب صور",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5 text-right">
          شروط الاشتراك
        </h2>

        <div className="space-y-3">
          {data?.conditions?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          )) || [
            "يجب ألا يتخطى المشارك 6 سنوات أقصى",
            "شهادة صحية",
            "الالتزام بالمواعيد",
            "ارتداء الملابس الرسمية",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-[#00BFA6] mt-1 shrink-0 text-lg" />
              <p className="text-gray-600 text-sm leading-6 text-right flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>



      {/* Trainers */}

    </div>
  );
};

export default Right_side;