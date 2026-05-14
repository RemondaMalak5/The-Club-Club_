import React from 'react'
import Title_1 from '../Shared_Component/Title_1'
import { assets } from './../../assets/assets';

const About_services = () => {
  const services = [
    {     
      title: 'صالات أسكواش',
      image: assets.acdemy} ,
       {     
      title: 'صالات ألعاب قوة',
      image: assets.acdemy}, {     
      title: 'حمامات سباحة',
      image: assets.acdemy}, {     
      title: 'ساحات ألعاب',
      image: assets.acdemy}
  ]
    
  return (
    <div className='xl:px-14 sm:px-5  '>
      <Title_1 title='خدمات عالية الجودة ' />
      <div className='flex flex-wrap py-4 '>
        {services.map((service,index) => (
          <div className='w-full md:w-1/2 lg:w-1/4  ' key={index}>
 <div className='xl:px-8 px-2 py-4 '>    
             <img src={service.image} alt={service.title} className='w-full h-72 rounded-2xl ' />
             <p className='border-b-2  border-[#21857C] border-x-2 mx-5 rounded-b-2xl p-4 text-center font-semibold text-[18px]'>{service.title}</p>
          </div>
          </div>
         
        ))}
      </div>
    </div>
  )
}

export default About_services

// import React from "react";
// import Title_1 from "../Shared_Component/Title_1";

// const About_services = ({ data }) => {
//   const services = data?.serviceCategories || [];

//   return (
//     <div className="xl:px-14 sm:px-5">
//       <Title_1 title="خدمات عالية الجودة" />

//       <div className="flex flex-wrap py-4">
//         {services.length === 0 ? (
//           <p className="text-center w-full text-gray-500">
//             لا توجد خدمات حالياً
//           </p>
//         ) : (
//           services.map((service, index) => (
//             <div key={index} className="w-full md:w-1/2 lg:w-1/4">
//               <div className="xl:px-8 px-2 py-4">
//                 <img
//                   src={service.image}
//                   className="w-full h-72 rounded-2xl"
//                   alt={service.title}
//                 />

//                 <p className="border-b-2 border-[#21857C] border-x-2 mx-5 rounded-b-2xl p-4 text-center font-semibold text-[18px]">
//                   {service.title}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default About_services;