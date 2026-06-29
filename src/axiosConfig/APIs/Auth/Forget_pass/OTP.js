import axiosInstance from "../../../Instance";

export const Verify_Forgot_Password_OTP = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.password.verify_forgot_password_otp",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};