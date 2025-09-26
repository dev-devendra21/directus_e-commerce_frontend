import axios from "../config/axiosConfig";
import clientConfig from "../config/indexConfig";

export const registerNewCustomerApi = async (data: any) => {
  try {
    const reqData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: clientConfig.customer_role,
    };
    const response = await axios.post("/users", reqData);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginCustomerApi = async (data: any) => {
  try {
    const reqData = {
      email: data.email,
      password: data.password,
    };

    const response = await axios.post("/auth/login", reqData);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserProfileApi = async () => {
  try {
    const response = await axios.get(
      "/items/customers?fields=*,user.*,addresses.*&deep[addresses]=*"
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCustomerAddressApi = async (data: any) => {
  try {
    const reqData = {
      type: data.type,
      address_type: data.address_type,
      is_active: data.is_active,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      city: data.city,
      state: data.state,
      country_code: data.country_code,
      postal_code: data.postal_code,
    };
    const response = await axios.post("/items/customer_addresses", reqData);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCustomerAddressApi = async (id: string) => {
  try {
    const response = await axios.get(`/items/customer_addresses/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCustomerAddressApi = async (id: string, data: any) => {
  try {
    const reqData = {
      type: data.type,
      address_type: data.address_type,
      is_active: data.is_active,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      city: data.city,
      state: data.state,
      country_code: data.country_code,
      postal_code: data.postal_code,
    };
    const response = await axios.patch(
      `/items/customer_addresses/${id}`,
      reqData
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyCustomerEmailApi = async (data: any) => {
  try {
    const response = await axios.post(
      "flows/trigger/c6019e6f-8f51-42b8-82bd-11232f916de8",
      data
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendOtpToVerifyEmailApi = async (data: any) => {
  try {
    const response = await axios.post(
      "flows/trigger/2d0192a6-aeab-432e-b8a9-5d0ccd4a6638",
      data
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
