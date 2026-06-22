import axiosInstance from "../../../Instance";

export const forget = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.password.forgot_password",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};