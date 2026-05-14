// import React from "react";
// import { assets } from "../../assets/assets";

// const About_component = () => {
//   return (
//     <> 
//      <div className="xl:px-14 xl:py-10 p-5  ">
//       <div className="w-full flex flex-wrap  ">
//         <div className="w-full md:w-1/2">
//           <h2 className="text-[44px] font-bold text-[#00786F]"> عن النادى</h2>
//           <p className="text-[#4A5565] font-medium text-[20px] py-3 ">
//             يقع الفرع الرئيسي للنادي في مدينة 6 أكتوبر بالقرب من ميدان جهينة،
//             على وصلة دهشور بين ميدان جهينة وطريق الواحات، ويمتد على مساحة 20
//             فدانًا. يضم مجموعة واسعة من المرافق الرياضية والترفيهية والخدمية،
//             إلى جانب حدائق واسعة ومساحات خضراء. تبلغ تكلفة المشروع حوالي 665
//             مليون جنيه مصري، وقد تم تصميمه ليستوعب أكثر من 80,000 عضو نشط.
//           </p>
//         </div>
//         <div className="w-full md:w-1/2 ">
//           <div className="relative w-[250px] h-[300px] ">
//             <div className=" absolute top-0 right-36 w-full h-full rounded-3xl overflow-hidden shadow-xl">
//               <img
//                 src={assets.about}
//                 alt="About Us"
//                 className="w-full h-full "
//               />

//               <div className="absolute inset-0 bg-teal-700/70"></div>
//             </div>

//             <div className="absolute top-10 right-56 w-full h-full rounded-3xl overflow-hidden shadow-xl">
//               <img
//                 src={assets.about_us}
//                 alt="football"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//      <div className="w-full bg-slate-800 flex flex-wrap my-10 relative h-[250px]">
//   <img 
//     src={assets.background} 
//     alt="About Us" 
//     className="w-full h-full object-cover absolute top-0 left-0 z-0"
//   />

//   <div className="absolute top-0 left-0 w-full h-full bg-[#EBF1F1]/70 z-10"></div>

//   {/* محتوى فوق الاتنين */}
//   <div className="relative z-20 flex justify-center items-center h-full w-full px-4">
//   <p className="text-black text-center px-24 font-semibold text-[20px] md:text-[26px] lg:text-[30px]">
//     "أول مشروع تجاري تابع لوزارة الشباب والرياضة، يُدار بواسطة القطاع الخاص (UFC GYM Egypt)، مع خطط للتوسع في مختلف أنحاء مصر."
//   </p>
// </div>
// </div>
//     </>
  
//   );
// };

// export default About_component;


import React from "react";
import { assets } from "../../assets/assets";

const About_component = ({ data }) => {
  return (
    <>
      <div className="xl:px-14 xl:py-10 p-5">
        <div className="w-full flex flex-wrap">
          
          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[44px] font-bold text-[#00786F]">
              عن النادي
            </h2>

            <p className="text-[#4A5565] font-medium text-[20px] py-3">
              {data?.ourClub?.intro}
            </p>
          </div>

          {/* Images */}
          <div className="w-full md:w-1/2">
            <div className="relative w-[250px] h-[300px]">
              <div className="absolute top-0 right-36 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={assets.about}
                  className="w-full h-full"
                  alt="about"
                />
                <div className="absolute inset-0 bg-teal-700/70"></div>
              </div>

              <div className="absolute top-10 right-56 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={assets.about_us}
                  className="w-full h-full object-cover"
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* slogan */}
      <div className="w-full bg-slate-800 flex flex-wrap my-10 relative h-[250px]">
        <img
          src={assets.background}
          className="w-full h-full object-cover absolute top-0 left-0"
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
