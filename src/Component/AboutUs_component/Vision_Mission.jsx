

import React from "react";
import { assets } from "../../assets/assets";
import Title_1 from "../Shared_Component/Title_1";
import { apiUrl_main } from "../../axiosConfig/Instance";

const Vision_Mission = ({ data }) => {
  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-14">
      <Title_1 title="رؤيتنا ورسالتنا" />

      <div className="max-w-6xl mx-auto flex flex-col gap-8 mt-10">

        {/* Vision */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-6">

          {/* Text */}
          <div className="flex-1 bg-[#EEF6F5] rounded-3xl shadow-md p-6 sm:p-8 text-center lg:text-right">
            <h2 className="text-[#0A8F7A] text-3xl sm:text-4xl font-bold mb-4">
              {data?.vision?.title}
            </h2>

            <p className="text-gray-800 leading-8 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              {data?.vision?.description}
            </p>
          </div>

          {/* Image */}
          <div className="w-[170px] h-[170px] sm:w-[190px] sm:h-[190px]  rounded-3xl shadow-2xl flex items-center justify-center shrink-0">
            <img
              src={`${apiUrl_main}${data?.vision?.image}`}
              alt="Vision"
              className="w-full h-full  rounded-3xl "
            />
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col lg:flex-row items-center gap-6">

          {/* Image */}
        
          {/* Text */}
          <div className="flex-1 bg-[#EEF6F5] rounded-3xl shadow-md p-6 sm:p-8 text-center lg:text-right">
            <h2 className="text-[#0A8F7A] text-3xl sm:text-4xl font-bold mb-4">
{data?.mission?.title }
            </h2>

            <p className="text-gray-800 leading-8 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
                      {data?.mission?.description }
            </p>
          </div>
            <div className="w-[170px] h-[170px] sm:w-[190px] sm:h-[190px]  rounded-3xl shadow-2xl flex items-center justify-center shrink-0">
            <img
              src={`${apiUrl_main}${data?.mission?.image}`}
              alt="Mission"
              className="w-full h-full  rounded-3xl "
            />
          </div>


        </div>
      </div>
    </section>
  );
};

export default Vision_Mission;