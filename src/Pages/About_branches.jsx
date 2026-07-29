import React, { useEffect, useState } from "react";
import Slider_branch from "../Component/About_Branches/Slider_branch";
import Academy_branch from "../Component/About_Branches/Academy_branch";
import Services_branch from "../Component/About_Branches/Services_branch";
import Gallary_branche from "../Component/About_Branches/Gallary_branche";
import Memberships_branch from "../Component/About_Branches/Memberships_branch";
import { useLocation, useParams } from "react-router-dom";
import i18next from "i18next";
import Spinner from "../Component/Shared_Component/Spinner";
import About_Us_For_branch from "../Component/About_Branches/About_Us_For_branch";
import { About_us } from "../axiosConfig/APIs/About";
import News_branch from './../Component/About_Branches/News_branch';
import BranchStats from "../Component/About_Branches/Branch_stats";
import Ready_home from "../Component/Home_component/Ready_home";

const About_branches = () => {
  const { id } = useParams();
  const location = useLocation();
  const branchId = location.state?.branchId || id;
  const branchName = location.state?.branchName || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const Get_About_us = async () => {
    const params = {
      language: i18next.language,
    };

    try {
      const response = await About_us(params);

      setData(response.message.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    Get_About_us();
  }, [i18next.language]);

  if (!data) {
    return <Spinner/>;
  }
  return (
    <div>
      <Slider_branch branchName={branchName} />
      <div className="xl:px-14 py-5 px-10">
        <About_Us_For_branch className="bg-[#EBF1F1] w-full"
          branchId={branchId}
          branchName={branchName}
          data={data}
        />
        <BranchStats branchId={branchId}/>
                <Academy_branch registryId={branchId} />

        <News_branch branchId={branchId} />
        {/* <Services_branch branchId={branchId} />
        <Gallary_branche branchId={branchId} /> */}
        <Memberships_branch branchId={branchId} />
        <Ready_home/>
      </div>
    </div>
  );
};

export default About_branches;
