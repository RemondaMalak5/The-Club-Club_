import axiosInstance from "../Instance";

export const  Contact_us = async (body) => {
  try {
    const response = await axiosInstance.post("/method/the_club_api.api.public.contact_and_support.submit_contact.submit_contact",   body );
    return response.data;
  } catch (error) {
    throw error;
  }
};
