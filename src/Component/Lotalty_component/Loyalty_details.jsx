
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
import { Loyalty_list } from '../../axiosConfig/APIs/Loyalty/Loyalty_list';
import { useEffect, useState } from 'react';
import { useBranch } from '../../context/BranchContext';
import { MdDiscount } from "react-icons/md";
import { IoLocationOutline } from 'react-icons/io5';


const Loyalty_details = () => {
    const { t } = useTranslation();
    const [data, setData] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedBranch } = useBranch();
   const Get_Loyalty_list = async () => {
  const params = {
    branchId: "",
    language: i18next.language,
  };

  try {
    const response = await Loyalty_list(params);

    const loyaltyList = response?.message?.data || [];

    const selectedItem = loyaltyList.find(
      (item) => String(item.id) === String(id)
    );

    console.log("selectedItem:", selectedItem);

    setData(selectedItem || null);
  } catch (error) {
    console.error("Error fetching Loyalty_list:", error);
  }
};

    useEffect(() => {
        Get_Loyalty_list();
    }, [i18next.language, selectedBranch ,id]);

    const info = [
        { icon: <MdOutlineDateRange />, value: `${data?.date}  - ${data?.validTill}`  },
        { icon: <IoLocationOutline/>, value: data?.branchName},
        { icon: <MdDiscount />, value:    `${data?.discountRate}${t("discount")}` },
    ];

    return (
        <div >
            <div
                onClick={() => navigate("/loyalty")}
                className="w-full flex items-center gap-2 text-[24px] md:text-[30px] py-4 px-4 md:px-10 cursor-pointer"
            >
                {i18next.language === "ar" ? <IoMdArrowForward /> : <IoMdArrowBack />}
                <h2 className='text-xl font-bold '>{data?.title}</h2>
            </div>

           <div className="border rounded-xl mx-8 overflow-hidden">
  <img
    src={data?.image || assets.image_1}
    alt={data?.title || "loyalty"}
    className="w-full h-[384px] object-cover"
    loading="lazy"
  />

  <div className="px-10 py-5">
    <div className="pb-4 flex flex-wrap gap-4">
      {info.map(
        (item, index) =>
          item.value && (
            <p
              key={index}
              className="text-[#08AC85DB] text-sm flex items-center gap-1"
            >
              <span className="font-semibold">
                {item.icon}
              </span>

              {item.value}
            </p>
          )
      )}
    </div>

    <div className="w-full h-[1px] bg-gray-300 mb-4" />

    <h1 className="text-2xl font-bold mb-4">
      {data?.title}
    </h1>

  
    <div
      className="p-4 rounded-lg bg-slate-50 leading-8"
      dangerouslySetInnerHTML={{
        __html: data?.description || "",
      }}
    />

    

    <div className="w-full h-[1px] bg-gray-100 my-5" />

    <Social_Media />
  </div>
</div>
        </div>

    )
}

export default Loyalty_details
