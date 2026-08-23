import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { CgCalendarDates } from "react-icons/cg";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


import "swiper/css";
import "swiper/css/pagination";
import { Newslist } from "../../axiosConfig/APIs/News/News_list";

const News_home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const Get_News_List = async () => {
    const params = {
      language: i18next.language,
      branchId: "all",
      per_page: 6,
    };

    try {
      setError(false);

      const response = await Newslist(params);

      setData(response?.message?.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(true);
      setData([]);
    }
  };

  useEffect(() => {
    Get_News_List();
  }, [i18next.language]);

  return (
    <section className="py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-[36px] font-bold text-transparent">
            {t("news")}
          </h1>

          <p className="text-[16px] text-[#6A7282]">
            {t("latest_news")}
          </p>
        </div>

        {/* <button
          type="button"
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 rounded-full border border-[#00786F] px-6 py-2 text-[18px] font-bold text-black transition hover:bg-[#00786F] hover:text-white"
        >
          {t("view_all_news")}

          {i18next.language === "ar" ? (
            <IoArrowBack />
          ) : (
            <IoArrowForward />
          )}
        </button> */}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-center font-medium text-red-600">
          {i18next.language === "ar"
            ? "حدث خطأ أثناء تحميل الأخبار"
            : "An error occurred while loading the news"}
        </div>
      )}

      {!error && data.length > 0 && (
        <Swiper
          key={`${i18next.language}-${data.length}`}
          dir={i18next.language === "ar" ? "rtl" : "ltr"}
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={data.length > 3}
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
          className="news-slider news-swiper !pb-12"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <article
                onClick={() => navigate(`/news/${item.id}`)}
                className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title || ""}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3 text-sm text-gray-500">
                    <span className="max-w-[55%] truncate rounded-full bg-[#EAF3F1] px-5 py-2 text-[14px] font-bold text-[#1E2939]">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold text-[#21857C]">
                      <CgCalendarDates className="shrink-0 text-[17px]" />
                      <span>{item.publishDate}</span>
                    </div>
                  </div>

                  <h3 className="line-clamp-2 py-3 text-[18px] font-bold text-[#1E2939]">
                    {item.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm leading-6 text-[#6A7282]">
                    {item.desc}
                  </p>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/news/${item.id}`);
                    }}
                    className="mt-auto flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#08AC85DB] to-[#00786F] px-5 py-3 text-[16px] font-semibold text-white transition hover:shadow-md"
                  >
                    {t("read_more")}

                    {i18next.language === "ar" ? (
                      <GoArrowUpLeft />
                    ) : (
                      <GoArrowUpRight />
                    )}
                  </button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!error && data.length === 0 && (
        <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
          {i18next.language === "ar"
            ? "لا توجد أخبار حالياً"
            : "No news available"}
        </div>
      )}
    </section>
  );
};

export default News_home;