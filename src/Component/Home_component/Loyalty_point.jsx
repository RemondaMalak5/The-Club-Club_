import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { CgCalendarDates } from "react-icons/cg";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { assets } from "../../assets/assets";
import { FaTag } from "react-icons/fa";
import { Loyalty_list } from "../../axiosConfig/APIs/Loyalty/Loyalty_list";

const Loyalty_point = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const[data,setData] = useState();
    const[selectedBranch, setSelectedBranch] = useState();
 const Get_Loyalty_list = async () => {
    const params = {
      branchId: selectedBranch === "all" ? "" : selectedBranch,
language: i18next.language,
    }
    try {
      const response = await Loyalty_list(params);
      setData(response.message.data);
    } catch (error) {
    }
 }

  useEffect(() => {
    Get_Loyalty_list();
  }, [i18next.language]);

    

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-10">
                        <h2 className=" text-[36px] font-bold bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
                {t("loyalty")}
            </h2>
            <p className="text-gray-500 text-sm mt-1 mb-6">
                {t("loyalty_subtitle")}
            </p>

            <div className="relative">
                <Swiper
                key={i18next.language}
                   dir={i18next.language === "ar" ? "rtl" : "ltr"}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,

                    }}
                    loop={data?.length > 3}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="news-slider news-swiper !pb-10"
                >
                    {data?.map((item) => (
                        <SwiperSlide key={item.id} className="!h-auto">
                            <div
                                onClick={() =>
    navigate(`/loyalty-details/${item.id}`)
                                }
                                className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-52 w-full object-cover"
                                        loading="lazy"
                                    />

                                    <div
                                        className={`absolute ${i18next.language === "ar"
                                                ? "right-0 top-0"
                                                : "left-0 top-0"
                                            } flex items-center gap-2 rounded-lg bg-[#FFD54A] px-4 py-2 shadow-lg`}
                                    >    <FaTag className="text-[#1E2939]" />
                                        <span className="text-sm font-bold text-[#1E2939]">
                                            {t("discount")} {item.discountRate}
                                        </span>
                                    </div>
                                </div>

                               <div className="flex flex-1 flex-col p-5">
  <div className="flex items-center justify-between gap-3 text-sm text-gray-500">
    <span className="rounded-full bg-[#EAF3F1] px-5 py-2 text-[14px] font-bold text-[#1E2939]">
      {item.branchName}
    </span>

    <div className="flex items-center gap-1.5 font-semibold text-[#21857C]">
      <CgCalendarDates className="shrink-0 text-[18px]" />
      <span>{item.date}</span>
    </div>
  </div>

  

  <h3 className="line-clamp-2 py-3 text-[18px] font-bold text-[#1E2939]">
    {item.title}
  </h3>
<div className=" flex items-center gap-3 rounded-xl border border-[#FFD54A]/40 bg-[#FFF9E6] px-4 py-3">
   

    <div className="flex gap-2 leading-tight">
      <span className="text-[13px] font-medium text-[#6A7282]">
        {i18next.language === "ar"
          ? "العرض ساري حتى"
          : "Offer valid until"}
      </span>

      <span className=" text-sm font-bold text-[#1E2939]">
        {item.validTill}
      </span>
    </div>
  </div>
  <div
    className="my-2 line-clamp-2 text-sm text-[#6A7282]"
    dangerouslySetInnerHTML={{ __html: item.description }}
  />

  <button
    type="button"
    className="mt-auto flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] px-5 py-3 text-[16px] font-semibold text-white"
  >
    {t("read_more")}

    {i18next.language === "ar" ? (
      <GoArrowUpLeft />
    ) : (
      <GoArrowUpRight />
    )}
  </button>
</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Loyalty_point;