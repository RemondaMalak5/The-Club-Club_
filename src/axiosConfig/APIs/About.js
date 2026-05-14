import axiosInstance from "../Instance";

export const  About_us = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.about.get_about.get_about", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
