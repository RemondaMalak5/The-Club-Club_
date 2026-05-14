import axiosInstance from "../../Instance";

export const Champins_details = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.tournament.get_tournament_detail.get_tournament_detail", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
