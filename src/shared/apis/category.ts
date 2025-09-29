import axios from "../config/axiosConfig";

export const getAllCategoriesApi = async () => {
  const response = await axios.get(
    "/items/categories?fields=*,sub_categories.*,parent_category.*,images.*"
  );
  return response.data.data;
};
