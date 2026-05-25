import axiosInstance from "../../Instance";

export const  All_Services = async (params) => {
  try {
    const response = await axiosInstance.get("/method/club_services.api.services.get_list", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
