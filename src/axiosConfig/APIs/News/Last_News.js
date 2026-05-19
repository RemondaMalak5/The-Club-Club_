import axiosInstance from "../../Instance";

export const Last_news = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.news.latest_news.get_latest_news", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
