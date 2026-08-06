import axiosInstance from "../../Instance";

export const  Myappicant = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_my_applications.get_my_applications", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
