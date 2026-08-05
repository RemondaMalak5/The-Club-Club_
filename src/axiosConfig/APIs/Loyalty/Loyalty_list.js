import axiosInstance from "../../Instance";

export const Loyalty_list = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.discounts.get_discounts.get_discounts", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
