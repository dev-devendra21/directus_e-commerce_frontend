import axios from "@/shared/config/axiosConfig";

export const createPaymentOrderApi = async (data: any) => {
  try {
    const response = await axios.post("/api/v1/create-order", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyPaymentApi = async (data: any) => {
  try {
    const response = await axios.post("/api/v1/verify-payment", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
