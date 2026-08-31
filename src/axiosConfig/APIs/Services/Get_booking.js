import axiosInstance from "../../Instance";

export const Create_booking = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/method/club_services.api.booking.create",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};