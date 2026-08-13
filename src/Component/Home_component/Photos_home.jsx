import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import i18next from "i18next";
import { Gallary } from "../../axiosConfig/APIs/Home/Gallary";
import { useTranslation } from "react-i18next";
import Spinner from "../Shared_Component/Spinner";

const Photos_home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
 const {t} = useTranslation();
  // next
  const nextSlide = () => {
    setCurrent((prev) =>
      prev === data.length - 1 ? 0 : prev + 1
    );
  };

  // prev
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );
  };

  // get gallery
  const getGallary = async () => {
    const params = {
      language: i18next.language,
      branchId:"all",
      per_page:4,

    };

    try {
      const response = await Gallary(params);


      setData(response.message.data || []);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getGallary();
  }, [i18next.language]);

  // لو current أكبر من عدد الصور
  useEffect(() => {
    if (current >= data.length && data.length > 0) {
      setCurrent(0);
    }
  }, [data, current]);

  // loading
  if (!data.length && !error) {
    return (
      <div className="px-4 md:px-14 py-10">
<Spinner/>     </div>
    );
  }

  // error
  if (error) {
    return (
      <div className="px-4 md:px-14 py-10">
        <p className="text-center text-red-500">
          {t("error_loading_photos")}
        </p>
      </div>
    );
  }

  return (
    <div className="py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[36px] font-bold bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
          {t("photos_and_videos")}
        </h2>

        {/* <button className="border border-teal-600 text-teal-600 px-4 py-1 rounded-full text-[18px]">
          {t("view_more")}
        </button> */}
      </div>

      {/* Slider */}
      <div className="border shadow-md rounded-3xl p-5 relative">

        {/* arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
        >
          <ChevronRight />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[420px]">

          {/* الصورة الكبيرة */}
          <div className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden relative h-[250px] md:h-full transition-all duration-500">

            <img
              src={data[current]?.url}
              alt={data[current]?.branchName}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
              {data[current]?.branchName}
            </span>
          </div>

          {/* الصور الصغيرة */}
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative rounded-2xl overflow-hidden h-[200px] md:h-full cursor-pointer border-2 transition-all duration-300 ${
                current === index
                  ? "border-teal-500 scale-[0.97]"
                  : "border-transparent"
              }`}
            >
              <img
                src={item.url}
                alt={item.branchName}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
                {item.branchName}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Photos_home;