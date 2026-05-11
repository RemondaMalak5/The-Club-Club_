import axiosInstance from "../../Instance";

export const  Academy_Detail = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_academy_detail.get_academy_detail", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
