import React from "react";
import Title_1 from "../Shared_Component/Title_1";
import { FaArrowLeftLong } from "react-icons/fa6";
import SubTitle from "../Shared_Component/SubTitle";
import { assets } from "./../../assets/assets";
import Btn_bg from "../Shared_Component/Btn_bg";

const Branches_home = () => {
  const branch = [
    {
      name: "فرع اكتوبر",
      title: " أكاديميات • أنشطة أطفال",
      button: " الاكاديميات",
      img:assets.october
    },
    {
      name: "فرع شيرتون",
      title: " أكاديميات • أنشطة أطفال",
      button: " الاكاديميات",
      img:assets.sheraton
    },{
      name: " فرع العاصمه الاداريه الجديده",
      title: " أكاديميات • أنشطة أطفال",
      button: " الاكاديميات",
      img:assets.elasma
    },
    
  ];
  return (
    <div className="px-10 py-5  ">
      <div className="flex justify-between rounded-2xl  ">
          <Title_1 title={"فروعنا"} />
        <button className="border border-[#00786F] px-5 rounded-full flex justify-center items-center gap-3">
          عرض خريطه الفروع
          <span className="py-3">
            <FaArrowLeftLong />
          </span>
        </button>
      </div>

      <SubTitle SubTitle={"اختار الفرع الأقرب وتصفح الخريطة"} />
    <div className="w-full pt-8 grid grid-cols-3 gap-4 ">
  {branch.map((e, index) => (
    <div key={index} className="border rounded-xl shadow-2xl px-3">
      <img src={e.img} />

      <div className="px-5 py-5 flex flex-col gap-3">
        <p className="font-bold text-[18px]">{e.name}</p>

        <p className="font-semibold text-[14px] text-[#4B4B4B]">
          {e.title}
        </p>

        <div className="flex flex-wrap gap-5">
          <Btn_bg btn={e.button} />

          <button className="text-[16px] font-bold border border-[#00786F] px-7 py-3 rounded-xl">
            التفاصيل
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Branches_home;
