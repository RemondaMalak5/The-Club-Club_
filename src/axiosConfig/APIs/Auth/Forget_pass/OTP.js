import axiosInstance from "../../../Instance";

export const Forget_otp = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.bind.verify_bind_otp",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};