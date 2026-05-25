import axiosInstance from "../../../Instance";

export const Create_Account  = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.register.create_account",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};