

import React, { useEffect, useState } from "react";
import About_component from "../Component/AboutUs_component/About_component";
import About_services from "../Component/AboutUs_component/About_services";
import About_us_goals from "../Component/AboutUs_component/About_us_goals";
import Values from "../Component/AboutUs_component/Values";
import Vision_Mission from "../Component/AboutUs_component/Vision_Mission";
import i18next from "i18next";
import { About_us } from "../axiosConfig/APIs/About";

const AboutUs = () => {
  const [data, setData] = useState(null);

   const Get_About_us = async () => {
    const params = {
      language: i18next.language,
    };

    try {
      const response = await About_us(params);

      setData(response.message.data);
      setTotalPages(response.message.total_pages);
    } catch (error) {
      setError(true);
      console.error("Error fetching memberships:", error);
    }
  };

  useEffect(() => {
    Get_About_us();
  }, [i18next.language]);

  if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <About_component data={data} />
      <About_services data={data} />
      <Values data={data} />
      <About_us_goals data={data} />
      <Vision_Mission data={data} />
    </div>
  );
};

export default AboutUs;
