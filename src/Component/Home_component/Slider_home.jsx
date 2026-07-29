import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import i18next from 'i18next';
import { home_slider } from '../../axiosConfig/APIs/Home/Slider';

const Slider_home = () => {
  const {t} = useTranslation();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const[data,setData]=useState([]);
  // const slides = [
  //   { id: 1, image: assets.slide_1, title: t("olympic_tournaments"), description: t("professional_training") },
  //   { id: 2, image: assets.slide_2, title: t("جمباز"), description: t("professional_training") },
  // ];
  
 const Home_slider_Api = async () => {
  const params = {
    language: i18next.language,
  }
  try {
    const response = await home_slider(params);

    if (
      response?.message?.data &&
      response.message.data.length > 0
    ) {
      setData(response.message.data);
    } else {
      setData(staticSlides);
    }
  } catch (error) {
    setData(staticSlides);
  }
};

  useEffect(()=>{
    Home_slider_Api();
  },[i18next.language])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }
  const prevSlide = () => { 
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  }
  return (
  <div className="relative w-full h-[550px] mx-auto overflow-hidden">

   <div key={currentSlide} className="animate-fadeSlide">
  <img
    src={data[currentSlide]?.image}
    className="w-full h-[550px] object-cover brightness-50"
    loading="lazy"
  />

  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-textUp">
    {data[currentSlide]?.title}
  </h2>

  <p className="text-md md:text-lg lg:text-xl text-center text-[#F3F4F6] absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-textUp">
    {data[currentSlide]?.description}
  </p>
</div>
    <button
      onClick={prevSlide}
      className="absolute left-3 top-1/2 text-[40px] text-[#FFFFFF4D]  px-3 py-1"
    >
            <IoIosArrowDropleftCircle />

    </button>

    <button
      onClick={nextSlide}
      className="absolute right-3 top-1/2 text-[40px] text-[#FFFFFF4D] px-3 py-1"
    >
      <IoIosArrowDroprightCircle />
    </button>

  </div>
);
};



export default Slider_home
