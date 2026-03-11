import React from 'react'
import { assets } from '../../assets/assets';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const Slider_home = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    { id: 1, image: assets.slide_1 },
    { id: 2, image: assets.slide_2 },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }
  const prevSlide = () => { 
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }
  return (
  <div className="relative w-full mx-auto">

    <img
      src={slides[currentSlide].image}
      className="w-full h-[490px] object-cover brightness-50  "
    />
   <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {("مسابح أوليمبية")}
        </h2>
        <p
       className='text-md md:text-l lg:text-xl  text-center  text-[#F3F4F6] absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {("تدريب احترافي في مسابح عالمية المستوى")}</p>
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
