import React from 'react'
import SubTitle from '../Shared_Component/SubTitle'
import { LuNewspaper } from 'react-icons/lu'
import { IoNotificationsOutline } from 'react-icons/io5'

const News_component = () => {
  return (
    <div className='px-14 py-5'>
      <div className='bg-[#EBF3F1] py-10 px-12 rounded-xl flex flex-col gap-2 '>
        <div className='flex flex-wrap gap-3'>
            <div className='bg-white rounded-full flex gap-2 py-2 px-3'>
                <span className='py-1 text-[#14B8A6]'><LuNewspaper/>
</span>
              <p className='text-[#364153] font-medium'>آخر أخبار النادي والفعاليات</p>
            </div>
             <div className='bg-white rounded-full flex gap-2 py-2 px-3'>
                <span className='py-1 text-[#FB923C]'><IoNotificationsOutline/></span>
              <p className='text-[#364153] font-medium'>تنبيهات • بطولات • أكاديميات</p>
            </div>
        </div>
        <h1 className='text-[#101828] font-bold text-[45px]'>الأخبار والفعاليات</h1>
        <SubTitle SubTitle={"تابع أحدث المستجدات، مواعيد التسجيل، الفعاليات القادمة، وأهم التنبيهات لكل فرع."}/>
      </div>
    </div>
  )
}

export default News_component
