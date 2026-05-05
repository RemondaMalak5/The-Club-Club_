import axiosInstance from "../../Instance";

export const Champins_State = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.trophies.get_trophies_summary.get_trophies_summary", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
