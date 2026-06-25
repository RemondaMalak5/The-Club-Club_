import axiosInstance from "../../../Instance";

export const Reset_password = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.password.reset_password",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};