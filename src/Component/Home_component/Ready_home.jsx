import React from 'react'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'

const Ready_home = () => {
  return (
    <div className='px-14 '>
           <div className="w-full bg-gray-100 rounded-xl p-6 flex items-center justify-between ">
      
      {/* Text Section */}
      <div className="text-right">
        <h2 className="text-[36px] font-bold text-gray-900">جاهز تبدأ؟</h2>
        <p className="text-gray-500 text-sm mt-1">
          سجل الآن، أنشئ الحساب المجاني، وابدأ الحجز في أقل من دقيقة
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
       

        <button className="bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition">
           <MdOutlinePersonAddAlt1/>
          <span>اشترك الآن</span>
          
        </button>
         <button className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition">
         <IoChatboxEllipsesOutline/>
             <span>           تواصل معنا
 </span>
        </button>
      </div>

    </div>
    </div>
  
  )
}

export default Ready_home
