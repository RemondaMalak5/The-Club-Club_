
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import i18next from 'i18next';
import { icon } from 'leaflet';
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosTimer, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';
import Social_Media from '../Shared_Component/Social_Media';
import { assets } from '../../assets/assets';

const Loyalty_details = () => {
    const { t } = useTranslation();
  
    const arr = [
      assets.image_1,assets.image_3
    ]

    const info = [
        { icon: <MdOutlineDateRange />, value: "hello"},
        { icon: <IoIosTimer />, value: "12/7/2026" },
        { icon: <FaEye />,   value: 5 },
    ];
   
    return (
        <div >
            <div
                onClick={() => navigate("/loyalty")}
                className="w-full flex items-center gap-2 text-[24px] md:text-[30px] py-4 px-4 md:px-10 cursor-pointer"
            >
                {i18next.language === "ar" ? <IoMdArrowForward /> : <IoMdArrowBack />}
                <h2 className='text-xl font-bold '>{}</h2>
            </div>

            <div className='border rounded-xl  mx-8'>
                {Array.isArray(arr) && arr.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="news-swiper w-full h-[384px] rounded-t-xl"
                    >
                        {arr.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={typeof image === "string" ? image : image?.image}
                                    alt={`gallery-${index}`}
                                    className="w-full h-[384px] object-cover rounded-t-xl"
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <img
                        src={assets.image_1}
                        alt={""|| ""}
                        className="w-full h-[384px] object-cover rounded-t-xl"
                        loading="lazy"
                    />
                )}               <div className='px-10 py-5'>
                    <div className='pb-4  flex flex-wrap gap-4 justify-between items-center'>
                        <div>
                            <div className='flex flex-wrap gap-4'>
                                {info.map((item, index) => (
                                    <p key={index} className='text-[#08AC85DB] text-sm mt-1 flex items-center gap-1'>
                                        <span className='font-semibold'>{item.icon} </span>
                                        {item.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                    <p className='p-4 rounded-lg  bg-slate-50'>{}</p>
                    
      
                    <div className='w-full h-[1px] bg-gray-100'></div>
                    <Social_Media/>

                </div>
            </div>
        </div>

    )
}

export default Loyalty_details
