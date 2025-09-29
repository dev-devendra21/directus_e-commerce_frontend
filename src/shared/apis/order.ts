import axios from "../config/axiosConfig";
import store from "@/shared/store/useStore";

export const createOrderApi = async (data: any) => {
  try {
    const response = await axios.post(
      "flows/trigger/68433de9-483f-4959-9b83-545499c933f3",
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllOrdersApi = async (searchQuery: string, filter?: string) => {
  try {
    const { userId } = store.getState();
    let url = `/items/orders?fields=*,customer.*,billing_address.*,shipping_address.*,line_items.*,line_items.product.*,line_items.product_variant.*&filter[customer][id][_eq]=${userId}`;

    if (searchQuery) {
      url += `&filter[line_items][product][title][_contains]=${searchQuery}`;
    }

    if (filter) {
      url += `&filter[status][_eq]=${filter}`;
    }
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleOrderApi = async (id: string) => {
  try {
    const { userId } = store.getState();
    const response = await axios.get(`/items/orders/${id}`, {
      params: {
        filter: {
          customer: { _eq: userId },
        },
        fields: [
          "*",
          "customer.*",
          "customer.user.*",
          "billing_address.*",
          "shipping_address.*",
          "line_items.*",
          "line_items.product.*",
          "line_items.product_variant.*",
        ],
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
