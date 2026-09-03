import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header_t_profie from "../Component/profile_Trainer/Header_t_profie";
import { profile_tranier } from "../axiosConfig/APIs/Profile_Trainer/Trainer_Profile";
import i18next from "i18next";
import { useBranch } from "../context/BranchContext";
import Achievements_t_profile from "../Component/profile_Trainer/Achievements_t_profile";
import Review from "../Component/profile_Trainer/Review";

const Profile_trainer = () => {
  const { id } = useParams();
  const { selectedBranch } = useBranch();

  const [data, setData] = useState(null);

  const Get_trainer_profile = async () => {
    const params = {
      language: i18next.language,
      id,
      branchId: selectedBranch || "all",
    };

    try {
      const response = await profile_tranier(params);

      console.log("Trainer profile data:", response);

      setData(response?.message);
    } catch (error) {
      console.error("Error fetching trainer profile:", error);
    }
  };

  useEffect(() => {
    if (id) {
      Get_trainer_profile();
    }
  }, [id, i18next.language, selectedBranch]);

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
<Header_t_profie
  data={data}
  trainerId={id}
  branchId={data?.branchId}
  onReviewAdded={Get_trainer_profile}
/>      

    
       <div className="flex flex-wrap ">
  <div className=" xl:w-[55%] w-full px-5 space-y-4">
      <Achievements_t_profile data={data?.achievements}/>
        </div>

        <div className="xl:w-[45%] w-full px-5 space-y-4">
             <Review data={data?.reviews}/>
        </div>
      </div> 
    </div>
  );
};

export default Profile_trainer;