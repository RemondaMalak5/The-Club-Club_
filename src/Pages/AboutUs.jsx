

import React, { useEffect, useState } from "react";
import About_component from "../Component/AboutUs_component/About_component";
import About_services from "../Component/AboutUs_component/About_services";
import About_us_goals from "../Component/AboutUs_component/About_us_goals";
import Values from "../Component/AboutUs_component/Values";
import Vision_Mission from "../Component/AboutUs_component/Vision_Mission";
import i18next from "i18next";
import { About_us } from "../axiosConfig/APIs/About";
import Spinner from "../Component/Shared_component/Spinner";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const [data, setData] = useState(null);
   const[error,setError] =useState(false);
   const { i18n } = useTranslation();

   const Get_About_us = async () => {
    const params = {
      language: i18n.language,
    };

    try {
      const response = await About_us(params);
      setData(response.message.data);
      setTotalPages(response.message.total_pages);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    Get_About_us();
  }, [i18n.language]);

  if (!data) {
    return <Spinner/>;
  }

  return (
    <div >
      <About_component data={data} />
      <div className="sm:px-10 xl:px-5">
<About_services data={data} />
      <Values data={data} />
      <About_us_goals data={data} />
      <Vision_Mission data={data} />
      </div>
      
    </div>
  );
};

export default AboutUs;
