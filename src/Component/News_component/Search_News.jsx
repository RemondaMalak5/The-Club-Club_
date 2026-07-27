import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Most_read_news } from "../../axiosConfig/APIs/News/Most_Read_News";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";
import { Last_news } from "../../axiosConfig/APIs/News/Last_News";
import { News_categoy } from "../../axiosConfig/APIs/News/News_categoy";
import { CgCalendarDates } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import { CiCirclePlus } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { HiCalendarDateRange } from "react-icons/hi2";

const Search_News = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [activity, setActivity] = useState("");
  const [search, setSearch] = useState("");
  const [mostReadNews, setMostReadNews] = useState([]);
  const [lastNews, setLastNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [branches, setBranches] = useState([]);
  
  const Get_most_read_news = useCallback(async () => {
    const params = {
      language: i18next.language,
      branchId: "all" ,
      category: "all",
    };
    try {
      const response = await Most_read_news(params);
      setMostReadNews(response.message.data);
    } catch (error) {
      console.error('Failed to load most read news', error);
    }
  }, []);
  
  const Get_last_news = useCallback(async () => {
    const params = {
      language: i18next.language,
      branchId: "all",
      category: "all",
      limit: 5,
    };
    try {
      const response = await Last_news(params);
      setLastNews(response.message.data);
    } catch (error) {
      console.error('Failed to load last news', error);
    }
  }, []);

  useEffect(() => {
    Get_last_news();
  }, [Get_last_news, i18next.language]);

  useEffect(() => {
    Get_most_read_news();
  }, [Get_most_read_news, i18next.language]);
  

  return (
    <div className="px-14 py-5">
      <div className="flex flex-wrap  ">
        <div onClick={() =>
                navigate(`/news/${mostReadNews[0]?.id}`, {
                  state: {
                    branchId: mostReadNews[0]?.branchId,
                    branchName: mostReadNews[0]?.branchName,
                  },
                })
              }
        className="xl:w-1/2 w-full border bg-white rounded-2xl overflow-hidden shadow-sm relative">
          <span className="bg-[#FB923C]  font-bold text-[14px] rounded-full text-white py-2 px-3 m-2 absolute">
                {t('news_section_badge_special')}
              </span>
           <img
            src={mostReadNews[0]?.image}
            alt={mostReadNews[0]?.title}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
         
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                {mostReadNews[0]?.category}
              </span>
              <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center">
                <span className="text-[16px] ">
                  <CgCalendarDates />
                </span>
                {mostReadNews[0]?.publishDate}
              </p>
            </div>

            <h2 className="font-bold text-lg mt-2 mb-2">
              {mostReadNews[0]?.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {mostReadNews[0]?.summary}
            </p>

            <div className="flex gap-3">
              <button 
                className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white px-4 py-2 rounded-xl text-sm">
                {t("view_more")}
              </button>

              {/* <button className="border border-[#00786F] px-4 py-2 rounded-xl text-[16px] flex items-center gap-1 text-[#00786F]">
                            <span className="text-[16px] ">
                              <CiCirclePlus />
                            </span>
                {t("book")}
              </button> */}
            </div>
          </div>
        </div>

        <div 
        className="xl:w-1/2 w-full ps-5 sm:pt-5 xl:pt-0  ">
          <h2 className="font-bold text-[24px] mb-4 px-2">{t("latest_news")}</h2>
          {lastNews.slice(0, 4).map((item, index) => (
            <div
            onClick={() =>
                  navigate(`/news/${item.id}`, {
                    state: {
                      branchId: item.branchId,
                      branchName: item.branchName,
                    },
                  })
                }
              key={index}
              className="flex justify-between items-center  w-full border p-5 rounded-xl my-2 cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold ">{item.title}</p>
                <span className="text-[14px] text-[#6A7282] flex items-center gap-2">
                 <HiCalendarDateRange/>
 {item.publishDate}
<span className="text-[14px] text-[#6A7282]  flex gap-1  px-2  ">
                    <IoLocationOutline/>
{item.branchName }
                  </span>
                </span>
              </div>

              <button
                
                className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] border p-3 text-white rounded-2xl text-xs flex items-center gap-1">
                {t('read_more')}<FiArrowUpRight />
              </button>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Search_News;
