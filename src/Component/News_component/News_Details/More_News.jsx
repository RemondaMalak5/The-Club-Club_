import i18next from "i18next";
import React, { useEffect, useState } from "react";
// import { Most_read_news } from "../../../axiosConfig/APIs/News/Most_Read_News";
import { CgCalendarDates } from "react-icons/cg";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Last_news } from "../../../axiosConfig/APIs/News/Last_News";
import { useBranch } from "../../../context/BranchContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const More_News = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const { selectedBranch } = useBranch();
 const navigate = useNavigate();
  const Get_Most_Read_News = async () => {
    const params = {
      language: i18next.language,
      branchId: selectedBranch ||"all",
    };
    try {
      const response = await Last_news(params);
      setData(response.message.data);
    } catch (error) {}
  };

  useEffect(() => {
    Get_Most_Read_News();
  }, [i18next.language , selectedBranch]);

  return (
    <div className="px-10">
      <h2 className="text-[30px] font-bold my-4"> {t("latest_News")} </h2>
        {/* {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-52 object-cover"
              loading="lazy"
            />

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                  {item.category}
                </span>
                <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center">
                  <span className="text-[16px] ">
                    <CgCalendarDates />
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
                      branchId: item.branchName,
                      branchName: item.branchName,
                    },
                  })
                }
                className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] font-semibold text-[16px] text-white px-5 py-3 rounded-full text-sm hover:bg-[#0aa194] transition flex items-center gap-1"
              >
                {t("read_more")}
                <span className="font-semibold text-[16px]">
{i18next.language === "ar" ? (
                      <GoArrowUpLeft />
                    ) : (
                      <GoArrowUpRight />
                    )}
                </span>
              </button>
            </div>
          </div>
        ))} */}

        <div className="relative">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    // navigation
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
    className="news-slider news-swiper  !pb-10 "
  >
    {data?.map((item) => (
  <SwiperSlide key={item.id} className="!h-auto flex">
    <div
      onClick={() =>
        navigate(`/news/${item.id}`, {
          state: {
            branchId: item.branchId,
            branchName: item.branchName,
          },
        })
      }
      className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md"
    >
      <img
        src={item.image}
        alt={item.title || "news"}
        className="h-52 w-full object-cover"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="rounded-full bg-[#EAF3F1] px-5 py-2 text-[14px] font-bold text-[#1E2939]">
            {item.category}
          </span>

          <p className="flex items-center gap-1 text-[14px] font-semibold text-[#21857C]">
            <CgCalendarDates className="text-[16px]" />
            {item.publishDate}
          </p>
        </div>

        <h3 className=" py-2 line-clamp-1 text-[18px] font-bold text-[#1E2939]">
          {item.title}
        </h3>

        <p className="my-2  line-clamp-2 text-sm text-[#6A7282]">
          {item.summary}
        </p>

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
    </div>
  );
};

export default More_News;
