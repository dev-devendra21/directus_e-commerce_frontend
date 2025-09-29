import axios from "../config/axiosConfig";

export const getTestimonialsApi = async () => {
  try {
    const response = await axios.get("/items/testimonials", {
      params: {
        fields: ["*", "product.*", "users.*"],
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
