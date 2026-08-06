import axiosInstance from "../../Instance";

export const  payment_Fawry = async (params) => {
  try {
    const response = await axiosInstance.get("/method/the_club_api.fawry.create_payment", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
