import React from "react";
import { assets } from "../../assets/assets";

const About_component = () => {
  return (
    <div className="px-14 py-10  ">
      <div className="w-full flex flex-wrap  ">
        <div className="w-full md:w-1/2">
          <h2 className="text-[44px] font-bold text-[#00786F]"> عن النادى</h2>
          <p className="text-[#4A5565] font-medium text-[20px] py-3 ">
            يقع الفرع الرئيسي للنادي في مدينة 6 أكتوبر بالقرب من ميدان جهينة،
            على وصلة دهشور بين ميدان جهينة وطريق الواحات، ويمتد على مساحة 20
            فدانًا. يضم مجموعة واسعة من المرافق الرياضية والترفيهية والخدمية،
            إلى جانب حدائق واسعة ومساحات خضراء. تبلغ تكلفة المشروع حوالي 665
            مليون جنيه مصري، وقد تم تصميمه ليستوعب أكثر من 80,000 عضو نشط.
          </p>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="relative w-[250px] h-[300px] ">
            <div className=" absolute top-0 right-36 w-full h-full rounded-3xl overflow-hidden shadow-xl">
              <img
                src={assets.about}
                alt="About Us"
                className="w-full h-full "
              />

              <div className="absolute inset-0 bg-teal-700/70"></div>
            </div>

            <div className="absolute top-10 right-56 w-full h-full rounded-3xl overflow-hidden shadow-xl">
              <img
                src={assets.about_us}
                alt="football"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default About_component;
