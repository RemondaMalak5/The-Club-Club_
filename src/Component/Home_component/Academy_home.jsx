
import React from "react";
import { FaFutbol, FaSwimmer, FaRunning } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const academies = [
  {
    title: "أكاديمية كرة السلة",
    desc: "مهارات • مباريات • منافسات عربية",
    icon: <FaRunning />,
  },
  {
    title: "أكاديمية السباحة",
    desc: "مهارات • تمارين • منافسات",
    icon: <FaSwimmer />,
  },
  {
    title: "أكاديمية كرة القدم",
    desc: "مهارات • لياقة • منافسات",
    icon: <FaFutbol />,
  },
  {
    title: "أكاديمية السباحة",
    desc: "مهارات • تمارين • منافسات",
    icon: <FaSwimmer />,
  },
];

const Academy_home = () => {
  return (
    <div className="px-10 py-6">
                <div className="w-full bg-[#F2F6F5] p-8  rounded-2xl">

      {/* Header */}
        
        <div>
          <h2 className="text-[36px] font-bold ">
            الأكاديميات  <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">             الرياضية
 </span>
          </h2>
          <p className="text-gray-500 text-sm">
            اختر الرياضة التي تريدها واحجز بسهولة
          </p>
        </div>
        <div className="flex justify-between gap-3 py-3">
             <div className="flex gap-3">
    <button className="bg-[#0A8F7A] text-white px-4 py-2 rounded-xl font-bold w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition">
      فرع اكتوبر
    </button>
   

    <button className="border border-[#0A8F7A] px-4 py-2 rounded-xl text-sm w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
      فرع العاصمه 
    </button>
   
    <button className="border border-[#0A8F7A] px-4 py-2 rounded-xl text-sm w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
      فرع شيراتون
    </button>
    
  </div>
        <button className="border border-[#0A8F7A] text-[#0A8F7A] px-4 py-2 rounded-full hover:bg-[#0A8F7A] hover:text-white transition font-bold flex items-center gap-1">
          عرض جميع الأكاديميات 
          <span className="text-[18px]"> <IoArrowBack/>
 </span>
        </button>
        </div>
       

      {/* Academies list */}
      <div className="flex flex-col gap-4">

        {academies.map((academy, index) => (
         <div key={index} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">

  {/* right side */}
  <div className="flex items-center gap-3">
    <div className="bg-gray-100 p-3 rounded-lg text-[#0A8F7A] text-lg">
      {academy.icon}
    </div>

    <div className="text-right">
      <h3 className="font-semibold text-gray-800">{academy.title}</h3>
      <p className="text-gray-500 text-sm">{academy.desc}</p>
    </div>
  </div>

  {/* left side buttons */}
  <div className="flex gap-3">
    <button className="bg-[#0A8F7A] text-white px-4 py-2 rounded-2xl font-bold w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition">
      حجز
    </button>
   

    <button className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
      الجدول
    </button>
   
    <button className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
      التفاصيل
    </button>
    
  </div>

</div>
        ))}

      </div>
    </div>
    </div>
  
  );
};

export default Academy_home;