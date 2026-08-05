import axiosInstance from "../../Instance";

export const  Application_prefill = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.academies.get_application_prefill.get_application_prefill", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
