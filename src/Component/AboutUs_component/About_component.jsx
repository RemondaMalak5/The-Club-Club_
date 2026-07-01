import React from "react";
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";

const About_component = ({ data }) => {
  const {t}=useTranslation();
  
  return (
    <>
      <div className="xl:px-14 xl:py-10 p-5">
        <div className="w-full flex flex-wrap">
          
          <div className="w-full xl:w-1/2">
            <h2 className="text-[44px] font-bold text-[#00786F]">
{             t("about")
}            </h2>

            <p className="text-[#4A5565] font-medium text-[20px] py-3">
              {data?.ourClub?.intro}
            </p>
          </div>

          {/* Images */}
         {data?.ourClub?.video && (
  <div className="w-full xl:w-1/2 flex justify-center items-center p-5 ">
    {data?.ourClub.video ? (
        <video
          src={`${"http://156.200.122.85:100/"}${data?.ourClub.video}`}
          controls
          autoPlay
          muted
          loop
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg my-5 border-2 border-[#21857C]"
        />
      ) : (
        <p className="text-gray-500">{t("loading_video")}</p>
      )}
  </div>
)}
        </div>
            {/* <div className="relative w-[250px] h-[300px]">
              <div className="absolute top-0 right-36 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={assets.about}
                  className="w-full h-full"
                  alt="about"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-teal-700/70"></div>
              </div>

              <div className="absolute top-10 right-56 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={assets.about_us}
                  className="w-full h-full object-cover"
                  alt="about"
                  loading="lazy"
                />
              </div>
            </div> */}
          </div>

      {/* slogan */}
      <div className="w-full bg-slate-800 flex flex-wrap my-10 relative h-[250px]">
        <img
          src={assets.background}
          className="w-full h-full object-cover absolute top-0 left-0"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-[#EBF1F1]/70"></div>

        <div className="relative z-20 flex justify-center items-center w-full px-4">
          <p className="text-black text-center font-semibold text-[20px] md:text-[26px] lg:text-[30px]">
            {data?.slogan}
          </p>
        </div>
      </div>
    </>
  );
};

export default About_component;
