import axios from "../config/axiosConfig";

export const getAllProductsApi = async (
  categoryTitle?: string,
  searchQuery?: string,
  sortBy?: string,
  order: "asc" | "desc" = "asc"
) => {
  try {
    let url =
      "/items/products?fields=*,variants.*,category.*,category.parent_category.*,category.tax_rate.*&deep[tax_rate]=*";

    // filter by category
    if (categoryTitle) {
      url += `&filter[category][title][_eq]=${encodeURIComponent(
        categoryTitle
      )}`;
    }

    // search query
    if (searchQuery) {
      url += `&filter[title][_contains]=${encodeURIComponent(searchQuery)}`;
    }

    // sorting
    if (sortBy) {
      url += `&sort=${order === "desc" ? "-" : ""}${sortBy}`;
    }

    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("getAllProductsApi error:", error);
    throw error;
  }
};

export const getSingleProductApi = async (id: string) => {
  try {
    const response = await axios.get(
      `/items/products/${id}?fields=*,variants.*,category.*,category.parent_category.*,category.tax_rate.*&deep[tax_rate]=*`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRelatedProductsApi = async (
  categoryId: string,
  productId: string
) => {
  try {
    const response = await axios.get(
      `/items/products?fields=*,variants.*,category.*,category.tax_rate.*&deep[tax_rate]=*&filter[category][id][_eq]=${categoryId}&filter[id][_neq]=${productId}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductSearchQuery = async (query: string) => {
  try {
    const response = await axios.get(`/items/products?search=${query}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
