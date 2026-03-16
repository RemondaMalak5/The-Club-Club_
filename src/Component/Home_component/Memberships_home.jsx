import React from 'react'
import { LuCircleCheckBig } from 'react-icons/lu';

const Memberships_home = () => {
  const memberships = [
    {
      type: 'فردي',
      badge: 'Starter',
      features: ['دخول النادي + أنشطة مختارة', 'حجز عضو', 'حجز أنشطة', 'إشعارات وتجديد'],
      popular: false,
    },
    {
      type: 'عائلي',
      badge: 'Most Popular',
      features: ['التسجيل للأسر والأطفال', '3 فحصات طبية', 'QR للدخول', 'أولوية في الحجز'],
      popular: true,
    },
    {
      type: 'شركات',
      badge: 'Corporate',
      features: ['باقة الشركات والمؤسسات', 'تقرير استخدام', 'شروط خاصة', 'حجز حسابات'],
      popular: false,
    },
  ];

  return (
    <div className="py-5 px-10">
      <h2 className="text-[36px] font-bold ">العضويات</h2>
      <p className="text-gray-500 mb-8 ">اختر الخطة الأنسب لك ولأسرتك</p>

      <div className="grid md:grid-cols-3 gap-5 justify-items-center">
        {memberships.map((e, idx) => (
          <div
            key={idx}
          className={`w-96 border rounded-2xl p-5 flex flex-col justify-between
            ${idx === 1 ? 'scale-110 border border-[#00786F] shadow-2xl' : 'border-gray-300'}`} // الكارد الأوسط أكبر
          >
            <h3 className="mt-4 text-xl font-bold flex justify-between items-center">
              {e.type}
              <span className={`text-[13px] font-semibold px-5 py-2 w-fit rounded-md 
                               ${e.popular ? 'bg-[#08AC85DB] text-white' : 'bg-gray-200 text-gray-700'}`}>
                {e.badge}
              </span>
            </h3>

            <ul className="my-5 space-y-2 text-right">
              {e.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-[#6A7282] font-medium">
                  <LuCircleCheckBig />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              className={`my-8 py-2 px-4 rounded-xl font-bold ${
                e.popular
                  ? 'bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] text-white'
                  : 'border border-[#08AC85DB] text-[#08AC85DB] hover:bg-[#08AC85DB] hover:text-white'
              }`}
            >
              اختر الخطة
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Memberships_home