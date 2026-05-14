

import React from "react";
import { assets } from "../../assets/assets";
import Title_1 from "../Shared_Component/Title_1";

const Values = ({ data }) => {
  // const values = [
  //   {
  //     title: "الإلتزام:",
  //     desc: "نضع أصحاب المصلحة دائماً في مقدمة أولوياتنا، ونسعى باستمرار إلى تحسين أدائنا وخدماتنا.",
  //   },
  //   {
  //     title: "الشفافية:",
  //     desc: "نعمل بانفتاح ومسؤولية لبناء الثقة والاحترام المتبادل.",
  //   },
  //   {
  //     title: "الشراكة:",
  //     desc: "نؤمن بأن النجاح يتحقق من خلال التعاون وبناء شراكات استراتيجية قوية.",
  //   },
  //   {
  //     title: "المسؤولية:",
  //     desc: "نلتزم بالنزاهة، ونحافظ على الموارد، ونحافظ على أعلى المعايير في كل ما نقوم به.",
  //   },
  //   {
  //     title: "التمكين:",
  //     desc: "نمكن اللاعبين والأعضاء والموظفين والمتطوعين والمجتمع من الوصول إلى كامل إمكاناتهم.",
  //   },
  // ];

  return (
  <section className=" bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-14">
    <Title_1 title="قيمنا الأساسية" />

    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mt-8">

      {/* Images */}
      <div className="relative w-full lg:w-[45%] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] order-1 lg:order-none">
        <img
          src={assets.about_us}
          alt="Tennis court"
          className="absolute top-0 right-[28%] sm:right-[35%] lg:right-[30%] w-[150px] sm:w-[200px] lg:w-[210px] h-[360px] sm:h-[460px] lg:h-[500px] object-cover rounded-2xl shadow-xl"
        />

        <img
          src={assets.acdemy}
          alt="Tennis racket"
          className="absolute top-[80px] sm:top-[100px] right-[8%] sm:right-[18%] lg:right-[5%] w-[165px] sm:w-[220px] lg:w-[230px] h-[270px] sm:h-[350px] lg:h-[365px] object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-[55%] order-2">
        <div className="flex flex-col gap-4">
          {data?.coreValues?.map((item, index) => (
            <div
              key={index}
              className="bg-[#EEF6F5] rounded-2xl p-4 sm:p-5 shadow-md text-right"
            >
              <h3 className="text-[#0A8F7A] font-bold text-lg sm:text-xl mb-2">
                   <span className="text-[#00BFA6]">{item.icon || "•"}</span>

                {item.title}
              </h3>

              <p className="text-gray-800 leading-7 text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);
};

export default Values ;