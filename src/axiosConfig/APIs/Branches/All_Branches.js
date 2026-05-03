import axiosInstance from "../../Instance";

export const  AllBranches = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.branches.get_branches.get_branches", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
