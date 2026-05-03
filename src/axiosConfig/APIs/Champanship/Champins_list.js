import axiosInstance from "../../Instance";

export const  Academylist = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.trophies.get_trophies.get_trophies", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
