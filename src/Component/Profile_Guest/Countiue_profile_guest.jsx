import i18next from 'i18next'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoPersonOutline } from 'react-icons/io5'

const Countiue_profile_guest = () => {
    const arr = [
        {
            title: "أكمل ملفك الشخصي",
            description: "أكمل ملفك الشخصي لتتمكن من الاستفادة من جميع خدمات النادي",
            icon:<IoPersonOutline /> 
        },
        {
            title: "أكمل ملفك الشخصي",
            description: "أكمل ملفك الشخصي لتتمكن من الاستفادة من جميع خدمات النادي",
            icon:<IoPersonOutline /> 
        },
        {
            title: "أكمل ملفك الشخصي",
            description: "أكمل ملفك الشخصي لتتمكن من الاستفادة من جميع خدمات النادي",
            icon:<IoPersonOutline/> 
        },
    ]
  return (
    <div className="py-5 px-10 rounded-2xl flex flex-col  border border-[#00000040]">
      <h1 className="text-[30px] font-bold text-[#1E2939]">أكمل ملفك الشخصي</h1>
        <p className="text-[#5B626E] mt-2 text-[16px]">أكمل ملفك الشخصي لتتمكن من الاستفادة من جميع خدمات النادي</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  {arr.map((item, index) => (
    <div
      key={index}
      className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
    >
    
 <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-[#08AC85] bg-[#F8FAFC]">
        {item.icon}
      </div>

      <div className="flex-1 text-right mx-4">
        <h3 className="text-[16px] font-bold text-[#1E293B]">
          {item.title}
        </h3>
        <p className="text-sm text-[#64748B] mt-1">
          {item.description}
        </p>
      </div>

     
        <div className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500">
{i18next.language=="ar"?<FaArrowLeft/>:<FaArrowRight />}
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default Countiue_profile_guest
