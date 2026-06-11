import axiosInstance from "../../Instance";

export const  Get_profile = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.users.get_profile.get_profile", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
