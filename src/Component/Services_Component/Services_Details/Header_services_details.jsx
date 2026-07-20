import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Left_side from "./Left_side";
import Right_side from "./Right_side";
import { Services_details } from "../../../axiosConfig/APIs/Services/Services_details";
import i18next from "i18next";

const Header_services_details = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const {id}= useParams();
    const branchId = location.state?.branchId;
  const [error,setError] =useState("false");
const [data, setData] = useState(null);
   const params = {
    language: i18next.language,
    service_id: id,
    branchId: branchId,
  };

  const Get_Services_Details = async () => {
    try {
      const response = await Services_details(params);
      setData(response.message.data);
      console.log("res",response.message.data)
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (id) {
      Get_Services_Details();
    }
  }, [id, i18next.language, branchId]);  
  return (
    <div className="bg-[#f8faf9]" >
      <div
        onClick={() => navigate("/services")}
        className="w-full flex items-center gap-2 text-[24px] md:text-[30px] py-4 px-4 md:px-10 cursor-pointer"
      >
        {i18n.language === "ar" ? <IoMdArrowForward /> : <IoMdArrowBack />}
        <p className="font-bold text-gray-800">{service?.title || t('service_details_title')}</p>
      </div>

      <img
        src={data?.cover_photo || service?.cover_photo}
        alt={service?.title || "Service"}
        className="w-full h-[320px] md:h-[380px] object-cover"
        loading="lazy"
      />

      <div className="px-4 md:px-10 py-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm">{data?.category.name} </span>
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm">{data?.branchName} </span>
          <span className="rounded-full bg-white border px-3 py-1 shadow-sm"> {data?.date.start_date}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Left_side data={data} />
          </div>
          <div className="lg:col-span-5">
            <Right_side data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_services_details;
