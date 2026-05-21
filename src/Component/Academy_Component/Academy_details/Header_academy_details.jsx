import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Academy_Detail } from "../../../axiosConfig/APIs/Academy/Academy_Details";
import Left_side from "./Left_side";
import Right_side from "./Right_side";
import { FaStar } from "react-icons/fa";
import { MdOutlineDateRange, MdPersonOutline } from "react-icons/md";

const Header_academy_details = () => {
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

  console.log("params:", params);

  const Get_Academy_Details = async () => {
    try {
      const response = await Academy_Detail(params);
      setData(response.message);
      console.log(response.message);
      console.log(id);
    } catch (error) {
      setError(true);
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    if (id) {
      Get_Academy_Details();
    }
  }, [id, i18next.language, branchId]);

  return (
    <div>
      <img src={data?.image} alt="Academy" className="w-full h-[300px]" />
      <div className="px-14">
        <p className=" font-bold text-[40px]">{data?.name}</p>
        <div className=" flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="text-[18px] font-bold ">
              {data?.rating}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineDateRange />
            <span className="text-gray-600 text-sm">منذ</span>
            <span className="text-gray-600 font-semibold">
              {data?.sinceYear}
            </span>
          </div>
          <div className="flex items-center gap-1">
             <span className="text-[18px]"><MdPersonOutline /> </span>
            <span className="text-gray-600 text-sm">{data?.trainersCount} متدرب </span>
          </div>


        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-14 py-8">
        <div className="lg:col-span-7">
          <Left_side data={data} />
        </div>

        <div className="lg:col-span-5">
          <Right_side data={data} />
        </div>
      </div>
    </div>
  );
};

export default Header_academy_details;
