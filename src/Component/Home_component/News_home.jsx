import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { CgCalendarDates } from "react-icons/cg";
import { GoArrowUpRight } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import i18next from "i18next";
import { Newslist } from "../../axiosConfig/APIs/News/News_list";
import { useNavigate } from "react-router-dom";

const News_home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
  
   
  const Get_News_List = async () => {
     const params = {
        "language": i18next.language, 
        "branchId":"all",
        "per_page": 3,
          
    }
    try {
      const response = await Newslist(params);
      setData(response.message.data);
      console.log(response.message.data);
    }   
    catch (error) {
      setError(true);
      console.error("Error fetching news:", error);
    }
}     

  useEffect(() => {
    Get_News_List();
  }, [i18next.language]);
  
    return (
        <section className=" py-16 px-10 sm:px-10 lg:px-20">


                {/* Header */}
                <div className="flex justify-between items-center mb-10 flex-wrap">
                    <div>
                        <h1 className="text-[36px] font-medium bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
                            الأخبار
                        </h1>
                        <p className="text-[#6A7282] text-[16px]">
                            أحدث الاخبار من فروع نادي النادي
                        </p>
                    </div>

                    <button   onClick={() => navigate('/news')}
                    className="border border-[#00786F] text-black font-bold text-[18px] px-6 py-2 rounded-full hover:bg-[#00786F] hover:text-white transition flex  items-center gap-2">
                        عرض جميع الأخبار
                        <span> <IoArrowBack /></span>
                    </button>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img
                                src={item.image}
                                alt=""
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-5 space-y-3">

                                <div className="flex justify-between items-center text-sm text-gray-500">

                                    <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                                        {item.category}
                                    </span>
                                    <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center"> <span className="text-[16px] "> <CgCalendarDates /> </span>
                                        {item.publishDate}</p>

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
        </section>
    );
};

export default News_home;