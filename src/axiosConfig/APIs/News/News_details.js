import axiosInstance from "../../Instance";

export const NewsDetails = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.news.get_news_detail.get_news_detail", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
