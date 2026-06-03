import React from 'react'
import { LuMail, LuPhone } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { IoChevronBack } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import Social_Media from '../Shared_Component/Social_Media'

const Card_info = () => {
  const { t } = useTranslation()

  const contactData = [
    {
      title: t('phone'),
      value: "16647",
      icon: <LuPhone />,
    },
    {
      title: t('whatsapp'),
      value: "+20 123 456 7890",
      icon: <FaWhatsapp />,
    },
    {
      title: t('email'),
      value: "info@theclub.com.eg",
      icon: <LuMail />,
    },
  ]

  return (
    <div
      className="xl:w-1/4 w-full rounded-2xl px-4 py-8 md:px-6
      bg-gradient-to-b from-[#2CC7A6] to-[#006B68] text-white
      flex flex-col justify-between gap-6"
    >
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{t('contact_information')}</h2>
        <p className="text-sm text-white/80">
          {t('contact_description')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {contactData.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-white/20 transition"
          >
           
 <div className="text-white/90 text-xl bg-white/10 rounded-md p-2">
              {item.icon}
            </div>
            <div className="flex flex-col   flex-1 px-3">
              <p className="text-sm text-white/90">{item.title}</p>
              <p className="text-sm text-white font-medium">{item.value}</p>
            </div>

           
             <div className="text-white/90 text-lg">
              <IoChevronBack />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{t('follow_us')}</p>
        <Social_Media />
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