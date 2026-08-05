import axiosInstance from "../../Instance";

export const Submit_Application = async (body) => {
  try {
    const response = await axiosInstance.post("/method/the_club_api.api.public.academies.submit_student_applicant.submit_student_applicant",   body );
    return response.data;
  } catch (error) {
    throw error;
  }
};
