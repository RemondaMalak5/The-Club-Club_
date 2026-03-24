import React from 'react'
import { assets } from '../../assets/assets';
import { GoArrowUpRight } from 'react-icons/go';
import { CgCalendarDates } from 'react-icons/cg';

const All_News = () => {
     const news = [
            {
                img: assets.news_1,
                date: "30 مايو 2025",
                tag: "خدمات",
                title: "تطوير منطقة الخدمات",
                desc: "تحسين شامل للمرافق لتقديم أفضل تجربة للأعضاء",
            },
            {
                img: assets.news_2,
                date: "30 مايو 2025",
                tag: "بطولات",
                title: "مباريات ودية نهاية الأسبوع",
                desc: "مباريات حماسية بين فرق النادي المختلفة",
            },
            {
                img: assets.news_3,
                date: "30 مايو 2025",
                tag: "أنشطة",
                title: "برنامج لياقة جديد للأعضاء",
                desc: "برنامج متكامل للياقة البدنية والصحة",
            },
        ];
  return (
    <div className='px-14 py-5'>
        <div className="grid md:grid-cols-3 gap-6">
        
                            {news.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                                >
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="w-full h-52 object-cover"
                                    />
        
                                    <div className="p-5 space-y-3">
        
                                        <div className="flex justify-between items-center text-sm text-gray-500">
        
                                            <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                                                {item.tag}
                                            </span>
                                            <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center"> <span className="text-[16px] "> <CgCalendarDates /> </span>
                                                {item.date}</p>
        
                                        </div>
        
                                        <h3 className="font-bold text-[18px]  text-[#1E2939]">
                                            {item.title}
                                        </h3>
        
                                        <p className="text-[#6A7282] text-sm">
                                            {item.desc}
                                        </p>
        
                                        <button className=" bg-gradient-to-r from-[#08AC85DB] to-[#00786F] font-semibold text-[16px] text-white px-5 py-3 rounded-full text-sm hover:bg-[#0aa194] transition flex items-center gap-1">
                                            <span className="font-semibold text-[16px] "> <GoArrowUpRight /> </span>
                                            قراءة المزيد
        
                                        </button>
        
                                    </div>
                                </div>
                            ))}
        
                        </div>
    </div>
  )
}

export default All_News
