import axiosInstance from "../../Instance";

export const  Newslist = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.api.public.news.get_news_list.get_news_list", { params:params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
