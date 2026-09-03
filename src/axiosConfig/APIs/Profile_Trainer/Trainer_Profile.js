import axiosInstance from "../../Instance";

export const  profile_tranier = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_trainer_profile.get_trainer_profile", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
