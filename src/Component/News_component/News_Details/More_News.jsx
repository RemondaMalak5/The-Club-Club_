import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { Most_read_news } from '../../../axiosConfig/APIs/News/Most_Read_News';
import { CgCalendarDates } from 'react-icons/cg';
import { GoArrowUpRight } from 'react-icons/go';

const More_News = () => {
    const [data, setData] = useState([]);

    const Get_Most_Read_News = async () => {
        const params = {
          "language": i18next.language,
          "branchId": "master",
            
        }
        try {
            const response = await Most_read_news(params);
            setData(response.message.data);
            console.log("Most read news:", response.message.data);
        }
        catch (error) {
            console.error("Error fetching most read news:", error);
        }
    }

    useEffect(() => {
        Get_Most_Read_News();
    }, [i18next.language]);

  return (
    <div className='px-10'>
        <h2 className='text-2xl font-bold my-4'> اخر الأخبار </h2>
      <div className="grid md:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <img src={item.image} alt="" className="w-full h-52 object-cover" />
      
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                        {item.category}
                      </span>
                      <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center">
                        
                        <span className="text-[16px] ">
                          
                          <CgCalendarDates/>
                        </span>
                        {item.publishDate}
                      </p>
                    </div>
      
                    <h3 className="font-bold text-[18px]  text-[#1E2939]">
                      {item.title}
                    </h3>
      
                    <p className="text-[#6A7282] text-sm">{item.desc}</p>
      
                    <button
        onClick={() =>
          navigate(`/news/${item.id}`, {
            state: {
              branchId: item.branchId,
              branchName: item.branchName,
            },
          })
        }
        className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] font-semibold text-[16px] text-white px-5 py-3 rounded-full text-sm hover:bg-[#0aa194] transition flex items-center gap-1"
      >
        <span className="font-semibold text-[16px]">
          <GoArrowUpRight/>
        </span>
        قراءة المزيد
      </button>
      
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default More_News
