import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom';
import { NewsDetails } from '../../../axiosConfig/APIs/News/News_details';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import i18next from 'i18next';
import More_News from './More_News';
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosTimer, IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";
import { FaEye, FaSearchPlus } from "react-icons/fa";
import Social_Media from '../../Shared_component/Social_Media';
import i18n from '../../../i18n/i18n';
import Spinner from '../../Shared_component/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

const getPhotoUrl = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item?.url || item?.image || item?.file_url || item?.src || "";
};

const News_details = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({});
    const { id } = useParams();
    const location = useLocation();
    const branchId = location.state?.branchId;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const isAr = i18n.language === "ar";

    const Get_News_Details = async () => {
        const params = {
            "language": i18next.language,
            "id": id,
            "branchId": branchId
        }
        try {
            const response = await NewsDetails(params);
            setData(response?.message?.data || response?.message || {});
        } catch (error) {
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        Get_News_Details();
    }, [id, i18next.language, branchId]);

    const sliderImages = useMemo(() => {
        const rawList = [];
        const addSource = (source) => {
            if (!source) return;
            if (Array.isArray(source)) {
                source.forEach((item) => {
                    const url = getPhotoUrl(item);
                    if (url) rawList.push(url);
                });
            } else {
                const url = getPhotoUrl(source);
                if (url) rawList.push(url);
            }
        };

        addSource(data?.image);
        addSource(data?.cover_image);
        addSource(data?.gallery);
        addSource(data?.images);
        addSource(data?.photos);
        addSource(data?.media);

        return [...new Set(rawList)];
    }, [data]);

    const handleNext = (e) => {
        e.stopPropagation();
        if (!sliderImages.length) return;
        setSelectedImgIndex((prev) => (prev + 1) % sliderImages.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (!sliderImages.length) return;
        setSelectedImgIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImgIndex === null) return;
            if (e.key === "ArrowRight") isAr ? handlePrev(e) : handleNext(e);
            if (e.key === "ArrowLeft") isAr ? handleNext(e) : handlePrev(e);
            if (e.key === "Escape") setSelectedImgIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImgIndex, isAr, sliderImages.length]);

    const info = [
        { icon: <MdOutlineDateRange />, value: data.publishDate },
        { icon: <IoIosTimer />, value: [data?.day, data?.month].filter(Boolean).join(" ") },
        { icon: <FaEye />, value: data.viewCount },
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
                {isAr ? <IoMdArrowForward /> : <IoMdArrowBack />}
                <h2 className='text-xl font-bold '>{data?.title}</h2>
            </div>

            <div className='border rounded-xl mx-4 md:mx-8 overflow-hidden'>
                {sliderImages.length > 0 && (
                    <div className="relative group">
                        <Swiper
                            key={`${i18n.language}-${sliderImages.length}`}
                            dir={isAr ? "rtl" : "ltr"}
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation={sliderImages.length > 1}
                            pagination={{ clickable: true }}
                            autoplay={
                                sliderImages.length > 1
                                    ? { delay: 3000, disableOnInteraction: false }
                                    : false
                            }
                            loop={sliderImages.length > 1}
                            slidesPerView={1}
                            className="news-swiper w-full h-[260px] sm:h-[340px] md:h-[420px] rounded-t-xl"
                        >
                            {sliderImages.map((imageUrl, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        onClick={() => setSelectedImgIndex(index)}
                                        className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] cursor-pointer overflow-hidden rounded-t-xl group/slide"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={data?.title ? `${data.title} - ${index + 1}` : `news-slide-${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white/90 p-3 rounded-full text-[#08AC85] transform translate-y-3 group-hover/slide:translate-y-0 transition-transform duration-300 shadow-lg">
                                                <FaSearchPlus size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
                <div className='px-6 md:px-10 py-5'>
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

            {selectedImgIndex !== null &&
                sliderImages[selectedImgIndex] &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
                        onClick={() => setSelectedImgIndex(null)}
                    >
                        <button
                            className="fixed top-6 right-6 text-white/70 hover:text-white text-4xl transition-all z-[100000] bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                            onClick={() => setSelectedImgIndex(null)}
                        >
                            <IoMdClose />
                        </button>

                        {sliderImages.length > 1 && (
                            <>
                                <button
                                    className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl md:text-5xl transition-all z-[100000] bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full backdrop-blur-md hover:scale-110 active:scale-95"
                                    onClick={isAr ? handleNext : handlePrev}
                                >
                                    <IoMdArrowBack />
                                </button>
                                <button
                                    className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl md:text-5xl transition-all z-[100000] bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full backdrop-blur-md hover:scale-110 active:scale-95"
                                    onClick={isAr ? handlePrev : handleNext}
                                >
                                    <IoMdArrowForward />
                                </button>
                            </>
                        )}

                        <div
                            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={sliderImages[selectedImgIndex]}
                                className="max-w-full max-h-[82vh] rounded-lg shadow-2xl object-contain animate-zoomIn"
                                alt="Zoomed news preview"
                            />
                            {sliderImages.length > 1 && (
                                <div className="text-white/80 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md text-sm">
                                    {selectedImgIndex + 1} / {sliderImages.length}
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </div>

    )
}

export default News_details
