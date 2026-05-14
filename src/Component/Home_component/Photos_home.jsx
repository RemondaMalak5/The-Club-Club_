// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { assets } from "../../assets/assets";
// import i18next from "i18next";
// import { Gallary } from "../../axiosConfig/APIs/Home/Gallary";

// const Photos_home = () => {
//   // const cards = [
//   //   {
//   //     title: "هاي الجري",
//   //     img: assets.image_1,
//   //   },
//   //   {
//   //     title: "هاي اليوجا",
//   //     img: assets.image_2,
//   //   },
//   //   {
//   //     title: "رفع كرات",
//   //     img: assets.image_3,
//   //   },
//   //   {
//   //     title: "كرة القدم",
//   //     img: assets.image_4,
//   //   },
//   // ];
// const [data, setData] = useState([]);
// const [error, setError] = useState(false);

//   const [current, setCurrent] = useState(0);
// const getGallary = async () => {
//   const params = {
//     "language": i18next.language,
//   } 
//   try {    const response = await Gallary(params);
//     setData(response.message.data);
//     console.log("gallary:", response.message.data);
//   }
//   catch (error) {
//     setError(true);
//     console.error("Error fetching gallary:", error);
//   }
// };
//   const nextSlide = () => {
//     setCurrent((prev) =>
//       prev === data.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? data.length - 1 : prev - 1
//     );
//   };

// useEffect(() => {   
//   getGallary();
// }, [i18next.language]);

//   return (
//     <div className="px-4 md:px-14 py-10">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-[36px] font-bold">
//           صور{" "}
//           <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
//             وفيديو
//           </span>
//         </h2>

//         <button className="border border-teal-600 text-teal-600 px-4 py-1 rounded-full text-[18px]">
//           عرض المزيد
//         </button>
//       </div>

//       {/* Slider */}
//       <div className="border shadow-md rounded-3xl p-5 relative">

//         {/* arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
//         >
//           <ChevronLeft />
//         </button>

//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
//         >
//           <ChevronRight />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[420px]">

//           {/* الصورة الكبيرة */}
//           <div className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden relative h-[250px] md:h-full transition-all duration-500">
//             <img
//               src={data[current].img}
//               alt={data[current].title}
//               className="w-full h-full object-cover"
//             />

//             <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
//               {data[current].title}
//             </span>
//           </div>

//           {/* الصور الصغيرة */}
//           {data.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`relative rounded-2xl overflow-hidden h-[200px] md:h-full cursor-pointer border-2 transition-all duration-300 ${
//                 current === index
//                   ? "border-teal-500 scale-[0.97]"
//                   : "border-transparent"
//               }`}
//             >
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />

//               <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
//                 {item.title}
//               </span>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Photos_home;

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import i18next from "i18next";

import { Gallary } from "../../axiosConfig/APIs/Home/Gallary";
import { apiUrl_main } from "../../axiosConfig/Instance";

const Photos_home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);

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

      console.log("gallery:", response.message.data);

      setData(response.message.data || []);
    } catch (error) {
      setError(true);
      console.error("Error fetching gallery:", error);
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
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  // error
  if (error) {
    return (
      <div className="px-4 md:px-14 py-10">
        <p className="text-center text-red-500">
          حصل خطأ أثناء تحميل الصور
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-14 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[36px] font-bold">
          صور{" "}
          <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
            وفيديو
          </span>
        </h2>

        <button className="border border-teal-600 text-teal-600 px-4 py-1 rounded-full text-[18px]">
          عرض المزيد
        </button>
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
              src={`${apiUrl_main}${data[current]?.url}`}
              alt={data[current]?.branchName}
              className="w-full h-full object-cover"
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
                src={`${apiUrl_main}${item.url}`}
                alt={item.branchName}
                className="w-full h-full object-cover"
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