import axiosInstance from "../../../Instance";

export const Verify_Otp = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.register.verify_registration_otp",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};