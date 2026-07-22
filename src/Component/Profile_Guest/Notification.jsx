import React from 'react'
import { GoDotFill } from "react-icons/go";

const Notification = () => {
    const arr = [
        {
            title: "أهلاً بك في نادي النادي",
            subtitle: "أكمل تسجيل بياناتك وتمتع بأفضل الأنشطة والخدمات",
            status:"الان"
        },
        {
            title: "أهلاً بك في نادي النادي",
            subtitle: "أكمل تسجيل بياناتك وتمتع بأفضل الأنشطة والخدمات",
            status:"منذ 3 دقايق"
        }
    ]
    return (
        <div className="border border-[#00000040] rounded-xl p-5">
            <h3 className='text-[#1E2939] font-bold text-[18px] flex justify-between'>
                الاشعارات <span className='bg-[#FB2C36] text-white  px-3 py-1 text-[14px] rounded-full'>2</span>
            </h3>

            <div>
                {arr.map((e, index) => (
                    <div key={index} className='bg-[#F0FDF4] p-3 border rounded-xl flex justify-between items-center my-2'>
                        <div className='flex gap-2'>
                            <span className='text-[#00A63E] text-2xl'><GoDotFill /></span>
                            <div>
                                <h4 className='text-[#1E2939] font-semibold flex'>  {e.title}</h4>
                                <p className='text-[#5B626E] text-[14px]'>  {e.subtitle}</p>
                            </div>
                        </div>
                        <span className='text-[#00A63E] text-[14px]'>{e.status}</span>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Notification
