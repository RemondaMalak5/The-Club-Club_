

import React from "react";
import Title_1 from "../Shared_Component/Title_1";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const About_services = ({ data }) => {
  const { t } = useTranslation();
  const services = data?.serviceCategories || [];
 const navigate =useNavigate();
  return (
    <div className="xl:px-14 sm:px-5">
      <Title_1 title={t("services_high_quality")} />

      <div className="flex flex-wrap py-4">
        {services.length === 0 ? (
          <p className="text-center w-full text-gray-500">
            لا توجد خدمات حالياً
          </p>
        ) : (
          services.slice(0, 4).map((service, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4">
              <div className="xl:px-8 px-2 py-4">
                <img
                  src={service.image}
                  className="w-full h-72 rounded-2xl"
                  alt={service.name}
                  loading="lazy"
                />

                <p onClick={()=>{navigate("/services")}} 
                className="cursor-pointer border-b-2 border-[#21857C] border-x-2 mx-5 rounded-b-2xl p-4 text-center font-semibold text-[18px]">
                  {service.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default About_services;