import React from "react";
import Header_Contact_Us from "../Component/Contact_us_component/Header_Contact_Us";
import Form_Contact_us from "../Component/Contact_us_component/Form_Contact_us";
import Card_info from "./../Component/Contact_us_component/Card_info";
import Branches_all from "../Component/Shared_Component/Branches_all";
import Map_Contactus from "../Component/Contact_us_component/Map_Contactus";

const Contact_us = () => {
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <Header_Contact_Us />
      <div className="border shadow-md rounded-xl p-10 bg-[#FFFFFF] border-[#00000040] my-5 flex flex-wrap  justify-between items-start">
        <Card_info />
        <Form_Contact_us />
      </div>
        <div className="w-full  h-[400px]  rounded-2xl overflow-hidden  ">
      <Map_Contactus/>
      </div>
      <Branches_all/>

    </div>
  );
};

export default Contact_us;
