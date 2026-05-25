import axiosInstance from "../../Instance";

export const LoginApi = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.login.login",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};