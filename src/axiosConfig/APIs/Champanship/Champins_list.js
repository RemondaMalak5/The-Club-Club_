import axiosInstance from "../../Instance";

export const Champins_list = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.tournament.get_tournament_list.get_tournament_list", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
