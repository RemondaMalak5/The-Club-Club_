import React, { useEffect, useState } from 'react'
import { NewsDetails } from '../../../axiosConfig/APIs/News/News_details';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import i18next from 'i18next';
import More_News from './More_News';
import { icon } from 'leaflet';
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosTimer, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Social_Media from '../../Shared_component/Social_Media';
import i18n from '../../../i18n/i18n';
import Spinner from '../../Shared_component/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

const News_details = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({});
    const { id } = useParams();
    const location = useLocation();
    const branchId = location.state?.branchId;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const Get_News_Details = async () => {
        const params = {
            "language": i18next.language,
            "id": id,
            "branchId": branchId
        }
        try {
            const response = await NewsDetails(params);
            setData(response.message);
        } catch (error) {
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        Get_News_Details();
    }, [id, i18next.language, branchId]);

    const info = [
        { icon: <MdOutlineDateRange />, value: data.publishDate },
        { icon: <IoIosTimer />, value: `${data?.day} ${data?.month}` },
        { icon: <FaEye />,   value: data.viewCount },
    ];
    if (loading) {
        return <Spinner />;
    }
    return (
        <div >
            <div
                onClick={() => navigate("/news")}
                className="w-full flex items-center gap-2 text-[24px] md:text-[30px] py-4 px-4 md:px-10 cursor-pointer"
            >
                {i18n.language === "ar" ? <IoMdArrowForward /> : <IoMdArrowBack />}
                <h2 className='text-xl font-bold '>{data?.title}</h2>
            </div>

            <div className='border rounded-xl  mx-8'>
                {Array.isArray(data?.gallery) && data.gallery.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="news-swiper w-full h-[384px] rounded-t-xl"
                    >
                        {data.gallery.map((image, index) => (
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
                        src={data?.image}
                        alt={data?.title || "News"}
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
                        <div>
                            <button className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-2 rounded-xl '>{t("register_now")}  </button>
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                    <p className='p-4 rounded-lg  bg-slate-50'>{data?.summary}</p>
                    
                <div className='py-4'
  dangerouslySetInnerHTML={{ __html: data?.content }}
/>
                    <div className='w-full h-[1px] bg-gray-100'></div>
                    <Social_Media />

                </div>
            </div>
            <More_News />
        </div>

    )
}

export default News_details
