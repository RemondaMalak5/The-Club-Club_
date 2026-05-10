

import React from "react";
import { assets } from "../../assets/assets";
import Title_1 from "../Shared_Component/Title_1";

const Vision_Mission = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-14">
      <Title_1 title="رؤيتنا ورسالتنا" />

      <div className="max-w-6xl mx-auto flex flex-col gap-8 mt-10">

        {/* Vision */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-6">

          {/* Text */}
          <div className="flex-1 bg-[#EEF6F5] rounded-3xl shadow-md p-6 sm:p-8 text-center lg:text-right">
            <h2 className="text-[#0A8F7A] text-3xl sm:text-4xl font-bold mb-4">
              رؤيتنا
            </h2>

            <p className="text-gray-800 leading-8 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              أن نكون روادًا وقادةً في المجال الرياضي، ووجهةً مفضلةً لإعداد
              الأبطال، والنشر في الرياضات المختلفة، وتحقيق المراكز الأولى.
            </p>
          </div>

          {/* Image */}
          <div className="w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] bg-white rounded-3xl shadow-2xl flex items-center justify-center shrink-0">
            <img
              src={assets.vision}
              alt="Vision"
              className="w-[110px] sm:w-[130px] object-contain"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col lg:flex-row items-center gap-6">

          {/* Image */}
        
          {/* Text */}
          <div className="flex-1 bg-[#EEF6F5] rounded-3xl shadow-md p-6 sm:p-8 text-center lg:text-right">
            <h2 className="text-[#0A8F7A] text-3xl sm:text-4xl font-bold mb-4">
              رسالتنا
            </h2>

            <p className="text-gray-800 leading-8 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              نقدم تجربة متميزة في إدارة الأكاديميات الرياضية الدولية وتطوير
              الأبطال في مختلف الرياضات لجميع اللاعبين والعائلات من جميع
              الأعمار والقدرات.
            </p>
          </div>
            <div className="w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] bg-white rounded-3xl shadow-2xl flex items-center justify-center shrink-0">
            <img
              src={assets.mission}
              alt="Mission"
              className="w-[110px] sm:w-[130px] object-contain"
            />
          </div>


        </div>
      </div>
    </section>
  );
};

export default Vision_Mission;