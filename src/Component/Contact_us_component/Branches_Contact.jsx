import React from 'react'
import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClock } from 'react-icons/lu';

const Branches_Contact = () => {
  const Branches = [
    {
      name: "العاصمة الإدارية الجديدة",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
    {
      name: "شيراتون المطار",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
    {
      name: "6 أكتوبر",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "+20123456789",
    },
  ];
 const timeWork = [
    { day: "الجمعة", hours: "7:00 ص - 12:00 م" },
    { day: "السبت", hours: "6:00 ص - 12:00 م" },
    { day: "الأحد - الخميس", hours: "6:00 ص - 11:00 م" },
  ];

  return (
<div className="w-full flex flex-wrap justify-center gap-6 mt-10">
        {Branches.map((branch, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 max-w-sm w-full relative hover:scale-105 transition border border-[#E5E7EB]"
          >
            <span className="absolute left-4 top-4 bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm">
              Open
            </span>

            <h2 className="text-xl font-bold text-gray-700 text-right mb-4">
              {branch.name}
            </h2>

            <div className="flex items-start gap-2 mb-3 text-gray-600">
              <FaLocationDot className="mt-1 " />
              <div className="text-right">
                <p className="font-semibold">العنوان</p>
                <p className="text-sm">{branch.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <FaPhone className="" />
              <div className="text-right">
                <p className="font-semibold">الهاتف</p>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-green-600 text-sm"
                >
                  {branch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-5 text-gray-600">
              <LuClock className="mt-1 " />
              <div className="text-right text-sm">
                <p className="font-semibold mb-1">ساعات العمل</p>
                {timeWork.map((time, idx) => (
                  <p key={idx}>
                    {time.day}: {time.hours}
                  </p>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              زيارة الفرع
            </button>
          </div>
        ))}
      </div>  )
}

export default Branches_Contact