import axios from "../config/axiosConfig";

export const getShippingCostApi = async (data: any) => {
  try {
    const response = await axios.post("/api/v1/shipping-cost", {
      addressData: data.addressData,
      cartId: data.cartId,
    });
    const result = await response.data.data;

    return result.data.available_courier_companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
