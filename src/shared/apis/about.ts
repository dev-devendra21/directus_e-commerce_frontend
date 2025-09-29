import axios from "../config/axiosConfig";

export const getAboutApi = async () => {
  try {
    const response = await axios.get("/items/about_us");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
