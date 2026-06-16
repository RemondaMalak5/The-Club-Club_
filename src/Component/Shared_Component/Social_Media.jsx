import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Social_Media = () => {
  const socialArr = [
    {
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/theclub.com.eg",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/theclub.com.eg",
    },
    {
      icon: <FaXTwitter />,
      link: "https://www.threads.com/@theclub.com.eg?xmt=AQG0XsPl5kCYVhpBmCWwsd-h9KhEcDSjMNJ9sNTzf1CkbKU",
    },
    {
      icon: <FaWhatsapp />,
      link: "https://api.whatsapp.com/send/?phone=+01101644532",
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

export default Social_Media;