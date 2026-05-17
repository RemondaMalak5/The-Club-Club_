import axiosInstance from "../../Instance";

export const Branch_stats = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.branches.get_branch_stats.get_branch_stats", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
