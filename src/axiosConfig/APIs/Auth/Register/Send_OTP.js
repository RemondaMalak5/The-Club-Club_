import axiosInstance from "../../../Instance";

export const Send_OTP = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.register.send_registration_otp",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};