
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { FaFutbol, FaSwimmer, FaRunning } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Academylist } from "../../axiosConfig/APIs/Academy/Academy_list";

// const academies = [
//   {
//     title: "أكاديمية كرة السلة",
//     desc: "مهارات • مباريات • منافسات عربية",
//     icon: <FaRunning />,
//   },
//   {
//     title: "أكاديمية السباحة",
//     desc: "مهارات • تمارين • منافسات",
//     icon: <FaSwimmer />,
//   },
//   {
//     title: "أكاديمية كرة القدم",
//     desc: "مهارات • لياقة • منافسات",
//     icon: <FaFutbol />,
//   },
//   {
//     title: "أكاديمية السباحة",
//     desc: "مهارات • تمارين • منافسات",
//     icon: <FaSwimmer />,
//   },
// ];


const Academy_home = () => {
   const [data, setData] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("all");
    const [error, setError] = useState(false);
    const [branches, setBranches] = useState([]);


   const Get_Academy_List = async () => {
    const params = {
      "language": i18next.language,
      "branchId": selectedBranch,
      
    }
    try {
      const response = await Academylist(params);
      setData(response.message.data);
      console.log(response.message);
      setTotalPages(response.message.total_pages);
      console.log(assets.academy);
    }
    catch (error) {
      setError(true);
      console.error("Error fetching news:", error);
    }
 
  };
  useEffect(() => { 
    Get_Academy_List();
  }, [i18next.language,selectedBranch]);
  return (
    <div className="px-4 sm:px-10 lg:px-10 py-6" dir="rtl">
      <div className="w-full bg-[#F2F6F5] p-4 sm:p-6 lg:p-8 rounded-2xl">

        {/* Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
            الأكاديميات{" "}
            <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
              الرياضية
            </span>
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            اختر الرياضة التي تريدها واحجز بسهولة
          </p>
        </div>

        {/* Branches + View All */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">

          <div className="flex flex-wrap gap-3">
            <button className="bg-[#0A8F7A] text-white px-4 py-2 rounded-xl font-bold w-full sm:w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition">
              فرع اكتوبر
            </button>

            <button className="border border-[#0A8F7A] px-4 py-2 rounded-xl text-sm w-full sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
              فرع العاصمه
            </button>

            <button className="border border-[#0A8F7A] px-4 py-2 rounded-xl text-sm w-full sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
              فرع شيراتون
            </button>
          </div>

          <button className="border border-[#0A8F7A] text-[#0A8F7A] px-4 py-2 rounded-full hover:bg-[#0A8F7A] hover:text-white transition font-bold flex items-center justify-center gap-1 w-full sm:w-fit">
            عرض جميع الأكاديميات
            <span className="text-[18px]">
              <IoArrowBack />
            </span>
          </button>

        </div>

        {/* Academies list */}
        <div className="flex flex-col gap-4">
          {data.map((academy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
            >

              {/* right side */}
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-[#0A8F7A] text-lg shrink-0">
                  {academy.icon}
                </div>

                <div className="text-right">
                  <h3 className="font-semibold text-gray-800">
                    {academy.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {academy.category}
                  </p>
                </div>
              </div>

              {/* buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <button className="bg-[#0A8F7A] text-white px-4 py-2 rounded-2xl font-bold sm:w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition">
                  حجز
                </button>

                <button className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
                  الجدول
                </button>

                <button className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
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