import axiosInstance from "../../Instance";

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