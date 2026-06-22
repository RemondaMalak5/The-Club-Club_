
import axiosInstance from "../../Instance";

export const  Services_details = async (params) => {
  try {
    const response = await axiosInstance.get("/method/club_services.api.services.get_detail", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
