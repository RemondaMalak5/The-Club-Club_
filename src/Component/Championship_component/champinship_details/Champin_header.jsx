import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Champins_details } from "../../../axiosConfig/APIs/Champanship/Champins_details";
import { GiTrophyCup } from "react-icons/gi";
import Left_side_chamin from "./Left_side_chamin";
import Right_side_champin from "./Right_side_champin";
import { MdOutlineDateRange, MdPersonOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const Champin_header = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  const branchId = location.state?.branchId;

  const params = {
    language: i18next.language,
    id: id,
    branchId: branchId,
  };

  const Get_Champins_Details = async () => {
    try {
      const response = await Champins_details(params);
      setData(response.message);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (id) {
      Get_Champins_Details();
    }
  }, [id, i18next.language, branchId]);

  const info = [
{
  icon: <MdOutlineDateRange />,
  value: `${data?.startDate} - ${data?.endDate}`,
},    { icon: <CiLocationOn/>, value: data?.location },
    { icon: <MdPersonOutline/>, value: data?.teamsCount},
  ]
  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-10">
      {/* Hero Image */}
      <img
        src={data?.image}
        alt="championship"
        className="w-full h-[300px] object-cover"
        loading="lazy"
      /> 
       <div className="flex gap-3 pt-5 px-14 ">
            <button className="rounded-3xl bg-[#AFEBE5] px-4 py-2">
              {data?.type}
            </button>
            <button className="rounded-3xl bg-[#E5E7EB] px-4 py-2">
              {data?.status}
            </button>
          </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-14 py-5">
      
        <div>
          <h1 className="text-2xl font-bold text-[#1B1B1B]">
            {data?.name}
          </h1>
          <div className="flex flex-wrap gap-4 py-1">
              {info.map((e, index) => (
            <p
              key={index}
              className="text-[#1E2939] text-sm mt-1 flex items-center gap-1"
            >
              <span className="font-semibold">{e.icon}</span>
              {e.value}
            </p>
          ))}
          </div>
        </div>
          <button className=" border-2 border-[#FFDF20] bg-[#FFF7ED] flex gap-2 items-center px-5 py-2 rounded-lg ">
            <span className="text-[#FFDF20] text-xl"><GiTrophyCup /></span>
            المركز الاول
          </button>

      </div>
      {/* Layout */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-8">
            <Left_side_chamin data={data} />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <Right_side_champin data={data} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Champin_header;