  import React from 'react'
import { assets } from '../../assets/assets';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const Slider_branch = ({branchName}) => {
  const {t} = useTranslation();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    { id: 1, image: assets.club, title: branchName, description: t("professional_training") },
    { id: 2, image: assets.slide_2, title: branchName, description: t("professional_training") },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }
  const prevSlide = () => { 
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }
  return (
  <div className="relative w-full h-[550px] mx-auto overflow-hidden ">

   <div key={currentSlide} className="animate-fadeSlide">
  <img
    src={slides[currentSlide].image}
    className="w-full h-[550px] object-cover brightness-50"
    loading="lazy"
  />

  <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-textUp">
  {t("welcome_branch", { branchName: slides[currentSlide].title })}
  </h2>

  <p className="text-md md:text-lg lg:text-xl text-center text-[#F3F4F6] absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-textUp">
    {slides[currentSlide].description}
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



export default Slider_branch
