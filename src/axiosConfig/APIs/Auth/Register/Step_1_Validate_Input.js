import axiosInstance from "../../../Instance";

export const Step_1_validation = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/the_club_api.api.auth.register.validate_registration_input",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};