import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import i18next from "i18next";

import Header_t_profie from "../Component/profile_Trainer/Header_t_profie";
import Achievements_t_profile from "../Component/profile_Trainer/Achievements_t_profile";
import Review from "../Component/profile_Trainer/Review";

import { profile_tranier } from "../axiosConfig/APIs/Profile_Trainer/Trainer_Profile";
import { useBranch } from "../context/BranchContext";
import Gallery_t_profile from "../Component/profile_Trainer/Gallery_t_profile";

const Profile_trainer = () => {
  const { id } = useParams();
  const { selectedBranch } = useBranch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const Get_trainer_profile = async () => {
    const params = {
      language: i18next.language,
      id,
      branchId: selectedBranch || "all",
    };

    try {
      setLoading(true);

      const response = await profile_tranier(params);


      setData(response?.message);
    } catch (error) {
      console.error("Error fetching trainer profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      Get_trainer_profile();
    }
  }, [id, i18next.language, selectedBranch]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#15957e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-4">
      
      {/* Header */}
      <Header_t_profie
        data={data}
        trainerId={id}
        branchId={data?.branchId}
        onReviewAdded={Get_trainer_profile}
      />

      {/* Content */}
      <div className="flex flex-wrap xl:mt-5 mt-4">
        
        {/* Main Content */}
        <div className="xl:w-[60%] w-full xl:px-5 space-y-4">
          <Achievements_t_profile
            data={data}
          />
          <Gallery_t_profile data={data?.gallery} />
        </div>

        {/* Reviews */}
        <div className="xl:w-[40%] w-full xl:px-5 mt-4 xl:mt-0 space-y-4">
          <Review
            data={data?.reviews}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile_trainer;