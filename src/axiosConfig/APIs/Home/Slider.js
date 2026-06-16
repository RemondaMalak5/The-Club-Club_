import axiosInstance from "../../Instance";

export const home_slider = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.slider.get_slider.get_slider", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
