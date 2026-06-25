import axiosInstance from "../../Instance";

export const Update_profile = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.public.users.get_profile.update_profile",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};