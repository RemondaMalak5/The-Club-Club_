// import React from "react";
import { useTranslation } from "react-i18next";
import { CiDiscount1 } from "react-icons/ci";
import { GiTrophyCup } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Newslist } from "../../../axiosConfig/APIs/News/News_list";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { GoDot, GoDotFill } from "react-icons/go";

const Nav_top = () => {
  const { i18n, t } = useTranslation();
    const [data, setData] = useState([]);
  const navigate = useNavigate();

 const Get_news_list = async()=>{
  const params ={
        language:i18next.language

  }
  
  try{
    const respose= await Newslist(params)
       setData(respose.message.data)
  }
  catch{}
 }
 useEffect( ()=>{
  Get_news_list()
 },[i18next.language])
  return (
    <div className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] hidden lg:flex justify-between items-center overflow-hidden py-2">
      
      {/* Marquee */}
      <div className="flex-1 overflow-hidden">
        <div className={`flex whitespace-nowrap  ${i18n.language === 'en' ? 'animate-marquee-reverse' : 'animate-marquee'}  text-white font-[400] text-[16px]`}>
          {data.map((e,index)=>(
<div
        key={index}
        className="mx-6 flex shrink-0 items-center  cursor-pointer hover:underline"
onClick={() =>
                navigate(`/news/${e.id}`, {
                  state: {
                    branchId: e.branchId,
                    branchName: e.branchName,
                  },
                })
              }      >               <span className="flex items-center gap-1">
{/* <img src={assets.logo_club} className="w-9 h-7 "/> */}
            {/* <CiDiscount1 /> */}
            {/* <GoDotFill/> */}
<GoDot/>


{e.title}          </span>
            </div>

          )
          )}
         
           {/* <span className="flex items-center gap-1">
            <GiTrophyCup />
            {t('winter_tournament')}
          </span> 

          <span className="flex items-center gap-1">
            <CiDiscount1 />
            {t('discounts_message')}
          </span>

          <span className="flex items-center gap-1">
            <SlLocationPin />
            {t('our_branches_list')}
          </span> */}

          {/* <span className="flex items-center gap-1">
            <GiTrophyCup />
            {t('winter_tournament')}
          </span>

          <span className="flex items-center gap-1">
            <CiDiscount1 />
            {t('discounts_message')}
          </span>

          <span className="flex items-center gap-1">
            <SlLocationPin />
            {t('our_branches_list')}
          </span> */}
        </div>
      </div>

      {/* Language Button */}
      <div className="px-5">
        <button
          className="rounded-full border px-5 py-1 bg-transparent hover:bg-white text-white hover:text-black flex items-center gap-1 "
          onClick={() => {
            const newLang = i18n.language.startsWith("en") ? "ar" : "en";
            i18n.changeLanguage(newLang);
            localStorage.setItem("lang", newLang);
          }}
        >

          {i18n.language.startsWith("en") ? t('arabic_lang') : t('english_lang')}           <MdLanguage/>

        </button>
      </div>
    </div>
  );
};

export default Nav_top;