import { LucideCircleCheckBig } from 'lucide-react'
import React from 'react'
import { FaAward } from 'react-icons/fa'

const Upgrade_to_member = () => {
    const arr =[
        {icon:<LucideCircleCheckBig/>,
            title:"دحول غير محددود"
        },
          {icon:<LucideCircleCheckBig/>,
            title:"خصومات حصرية"
        } , {icon:<LucideCircleCheckBig/>,
            title:"أولوية في الحجز  "
        }
    ]
  return (
    <div className='bg-[#EBF1F1] p-5  rounded-xl'>
      <h3 className='font-bold text-[20px] flex items-center gap-3 '>
        <span className='text-[#F0B100]'> <FaAward/></span>
        ترقية إلى عضوية كاملة
      </h3>
      <p className='text-[#5B626E] py-1 text-[16px] '>احصل على مزايا حصرية واستمتع بخصومات تصل إلى 50% على جميع الخدمات</p> 
     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
  {arr.map((e, index) => (
    <div
      key={index}
      className="py-5 px-3 shadow-sm flex gap-2 bg-white rounded-xl"
    >
      <span className="text-[#08AC85DB]">{e.icon}</span>
      <p className="text-[#5B626E]">{e.title}</p>
    </div>
  ))}
</div>
      <div className="flex flex-wrap gap-3 mt-3">
        <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] flex justify-center gap-3">
          <span className="text-[16px] font-semibold"> اشترك الان  </span>  
        </button>
        <button className="bg-[#F0FDFA] text-[#5B626E] border border-[#08AC85DB] font-semibold py-3 px-5 rounded-xl hover:bg-[#EAF3F1]  flex justify-center gap-3">
          <span className="text-[16px] font-semibold"> المزيد من التفاصيل  </span>           
        </button>
      </div>
    </div>
  )
}

export default Upgrade_to_member
