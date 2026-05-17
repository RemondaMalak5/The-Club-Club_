import axiosInstance from "../../Instance";

export const Gallary = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.media.get_gallery.get_gallery", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
