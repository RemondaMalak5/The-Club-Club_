import axiosInstance from "../../Instance";

export const  Academylist = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_academies.get_academies", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
