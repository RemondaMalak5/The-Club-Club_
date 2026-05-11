import axiosInstance from "../../Instance";

export const Memberships = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.memberships.get_membership_plans.get_membership_plans", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
