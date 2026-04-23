// import { FaWhatsapp, FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa6";
// import { Link } from "react-router";

// const SocialMedia = () => {
//     const social_Arr = [
//         {
//             icon: <FaFacebookF />,
//             linkTo: "https://www.facebook.com/theclub.com.eg",
//             bg: "#1877F2",
//         },
//         {
//             icon: <FaInstagram />,
//             linkTo: "https://www.instagram.com/theclub.com.eg",
//             bg: "#e1306c",
//         },
       
//         {
//             icon: <FaWhatsapp />,
//             linkTo: "https://api.whatsapp.com/send/?phone=+20100002131",
//             bg: "#25D366",
//         },
//     ];

//     return (
//         <ul className="flex items-center gap-1">
//             {social_Arr.map((item, index) => (
//                 <li key={index} className="relative group">
//                     <Link
//                         to={item.linkTo}
//                         target="_blank"
//                         className="relative sm:p-5 p-1 flex items-center justify-center sm:w-[30px] sm:h-[30px] rounded-full  text-[24px] z-10 overflow-hidden transition-all duration-300 ease-in-out"
//                     >
//                         <div
//                             className="absolute bottom-0 left-0 w-full h-0 z-0 transition-all duration-300 ease-in-out group-hover:h-full"
//                             style={{ backgroundColor: item.bg }}
//                         ></div>
//                         <span className="relative z-10">{item.icon}</span>
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default SocialMedia;

import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  const socialArr = [
    {
      icon: <FaFacebookF />,
      link: "https://www.facebook.com",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com",
    },
    {
      icon: <FaXTwitter />,
      link: "https://twitter.com",
    },
    {
      icon: <FaWhatsapp />,
      link: "https://api.whatsapp.com/send/?phone=+20100002131",
    },
  ];

  return (
    <div className="flex justify-center sm:justify-start gap-3 pt-2 text-[18px]">
      {socialArr.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 p-3 rounded-full hover:bg-white/30 cursor-pointer transition"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;