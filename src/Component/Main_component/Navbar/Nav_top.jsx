import React from 'react'
import { useTranslation } from 'react-i18next'
import { CiDiscount1 } from 'react-icons/ci'
import { GiTrophyCup } from 'react-icons/gi'
import { SlLocationPin } from 'react-icons/sl'

const Nav_top = () => {
     const { i18n } = useTranslation();

 
    return (
        <div className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] w-full flex justify-between items-center px-5 py-2'>
            <div className='flex  gap-3  font-[400] text-[16px] leading-[10px] tracking-[0px]  '>
                <span className='text-white  flex items-center gap-1 '>
                    <GiTrophyCup />
                    بطولة شتوية مفتوحة - احجز مشاركتك
                </span>
                <span className='text-white  flex items-center gap-1'>
                    <CiDiscount1 />
                    خصومات على بعض الخدمات هذا الأسبوع
                </span>
                <span className='text-white  flex items-center gap-1 '>
                    <SlLocationPin />
                    فروعنا: العاصمة . شيراتون . 6 أكتوبر
                </span>
            </div>
            <div className='flex gap-3'>
                <button className='rounded-full border px-3 bg-transparent hover:bg-white text-white hover:text-black'  onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
            }>
                           {i18n.language === "en" ? "العربية" : "English"}

            </button>

                <button className='rounded-full border px-3 py-2 bg-white hover:bg-transparent hover:text-white'>تسجيل الدخول</button>
            </div>


        </div>
    )
}

export default Nav_top
