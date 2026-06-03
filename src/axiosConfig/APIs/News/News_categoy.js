import axiosInstance from "../../Instance";

export const News_categoy = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.news.get_news_categories.get_news_categories", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
