import axiosInstance from "../../Instance";

export const Most_read_news = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.news.most_read_news.get_most_read_news", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
