import axios from "../config/axiosConfig";

export const getSliderApi = async () => {
  try {
    const response = await axios.get("/items/slider", {
      params: {
        fields: ["*", "products.*"],
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
