
import axiosInstance from "../../Instance";

export const  Services_category = async (params) => {
  try {
    const response = await axiosInstance.get("/method/club_services.api.services.get_categories", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
