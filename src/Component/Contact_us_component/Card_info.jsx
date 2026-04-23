import React from 'react'
import { LuMail, LuPhone } from 'react-icons/lu'
import SocialMedia from '../Shared_Component/SocialMedia'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'


const Card_info = () => {
  return (
        <div className='xl:w-1/4 w-full   border bg-gradient-to-r from-[#08AC85DB]  to-[#00786F] rounded-xl py-10 px-8 
         text-white flex flex-col gap-5 justify-center items-center'>
         
         
           <div className='flex flex-col gap-2 justify-center items-center '>
            <p className='font-bold text-[22px]'> معلومات التواصل </p>
            <p className='text-[14px] text-[#FFFFFFE5] font-regular'>نوفر لك خدمة رياضية عالية الجودة في بيئة آمنة ومريحة </p>
            </div> 
            <div className='flex flex-col gap-3  w-full'>
                <div className='flex items-center gap-2'>
                    <span  className='border-none rounded-md p-4 bg-[#FFFFFF33] font-bold text-[20px]'> <LuPhone/></span>
                    <span className='flex flex-col gap-1 text-[#FFFFFFE5] text-[14px]'> 
                        <p> الهاتف</p>
                        <p>+135465655646 </p>
                    </span>
                </div>
                  <div className='flex items-center gap-2'>
                    <span  className='border-none rounded-md p-4 bg-[#FFFFFF33] font-bold text-[20px]'> <LuMail/></span>
                    <span className='flex flex-col gap-1 text-[#FFFFFFE5] text-[14px]'> 
                        <p> البريد الإلكتروني</p>
                        <p>info@theclub.com</p>
                    </span>
                </div>
                
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <p> تابعنا </p>
              <SocialMedia/>
               </div>
        </div>
      )
}

export default Card_info

// import React from "react";
// import { LuMail, LuPhone } from "react-icons/lu";
// import { FaWhatsapp } from "react-icons/fa";
// import SocialMedia from "../Shared_Component/SocialMedia";
// import { IoChevronBack } from "react-icons/io5";

// const Card_info = () => {
//   const contactData = [
//     {
//       title: "الهاتف",
//       value: "16647",
//       icon: <LuPhone />,
//     },
//     {
//       title: "واتساب",
//       value: "+20 123 456 7890",
//       icon: <FaWhatsapp />,
//     },
//     {
//       title: "البريد الإلكتروني",
//       value: "info@theclub.com.eg",
//       icon: <LuMail />,
//     },
//   ];

//   return (
//     <div
//       className="xl:w-[30%] w-full rounded-2xl px-4 py-8 md:px-6
//       bg-gradient-to-b from-[#2CC7A6] to-[#006B68] text-white
//       flex flex-col justify-between"
//     >
//       <div>
//         <div className="text-center flex flex-col gap-2 mb-6">
//           <h2 className="text-[30px] font-extrabold leading-tight">
//             معلومات التواصل
//           </h2>
//           <p className="text-sm text-white/80 leading-6">
//             نوفر لك خدمة رياضية عالية الجودة
//             <br />
//             في بيئة آمنة ومريحة
//           </p>
//         </div>

//         <div className="flex flex-col gap-4">
//           {contactData.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white/10 rounded-2xl px-4 py-4 flex items-center justify-between"
//             >
//               <div className="text-white/90 text-lg">
//                 <IoChevronBack />
//               </div>

//               <div className="flex flex-col items-end text-right flex-1 px-3">
//                 <p className="text-sm text-white/90">{item.title}</p>
//                 <p className="text-sm text-white font-medium break-all">
//                   {item.value}
//                 </p>
//               </div>

//               <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-[20px] text-white shrink-0">
//                 {item.icon}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="w-full h-[1px] bg-white/20 mb-6"></div>

//         <div className="flex flex-col items-end gap-4">
//           <p className="font-bold text-xl">تابعنا</p>
//           <SocialMedia />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card_info;