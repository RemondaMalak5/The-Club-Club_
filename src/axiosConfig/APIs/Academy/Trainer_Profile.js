import axiosInstance from "../../Instance";

export const Get_Trainer_Profile = async (params) => {
  try {
    const response = await axiosInstance.get(
      "/method/the_club_api.api.public.academies.get_trainer_profile.get_trainer_profile",
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Add_Trainer_Review = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.public.academies.add_trainer_review.add_trainer_review",
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
