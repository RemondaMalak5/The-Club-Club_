import axiosInstance from "../../Instance";

export const  Academy_Stats = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_academy_stats.get_academy_stats", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
