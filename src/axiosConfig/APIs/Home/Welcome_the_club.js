import axiosInstance from "../../Instance";

export const welcome_the_club = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.home.get_home_hero.get_home_hero", { params:params });   
    return response.data;
  } catch (error) {
    throw error;
  }
};