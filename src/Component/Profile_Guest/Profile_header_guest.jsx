import React from 'react'

const Profile_header_guest = () => {
  return (
      <div className="py-5 px-10 rounded-2xl flex flex-col bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] to-[#DCF0EB9A]">
      <h1 className="text-[30px] font-bold text-[#1E2939]">مرحباً بك في نادي النادي!</h1>
      <p className="text-[#5B626E] mt-2 text-[16px]">نحن سعداء بانضمامك إلينا. دعنا نساعدك على البدء!</p>
      <div className="flex flex-wrap gap-3 mt-2">
        <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] mt-5 flex justify-center gap-3">
          <span className="text-[16px] font-semibold">ابدأ الآن</span>  
        </button>
        <button className="bg-[#F0FDFA] text-[#08AC85DB] border border-[#08AC85DB] font-semibold py-3 px-5 rounded-xl hover:bg-[#EAF3F1] mt-5 flex justify-center gap-3">
          <span className="text-[16px] font-semibold">اتصل بينا </span>           
        </button>
      </div>
    </div>
  
  )
}

export default Profile_header_guest
