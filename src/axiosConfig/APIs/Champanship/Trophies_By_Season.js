import axiosInstance from "../../Instance";

export const Get_Trophies_By_Season = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.trophies.get_trophies_by_season.get_trophies_by_season", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
