import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Champins_details } from "../../../axiosConfig/APIs/Champanship/Champins_details";

import Left_side_chamin from "./Left_side_chamin";
import Right_side_champin from "./Right_side_champin";

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
      console.error("Error fetching championship:", error);
    }
  };

  useEffect(() => {
    if (id) {
      Get_Champins_Details();
    }
  }, [id, i18next.language, branchId]);

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-10">
      {/* Hero Image */}
      <img
        src={data?.image}
        alt="championship"
        className="w-full h-[300px] object-cover"
      />

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