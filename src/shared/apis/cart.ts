import axios from "../config/axiosConfig";
import store from "@/shared/store/useStore";

export const createCartApi = async (data: any) => {
  try {
    const { userId, billing_address_id } = store.getState();

    // 1. Check if an active cart already exists for this customer
    const existingCartRes = await axios.get(`/items/carts`, {
      params: {
        filter: {
          customer: { _eq: userId },
          status: { _eq: "Active" },
        },
        fields: "id",
      },
    });

    const existingCart = existingCartRes.data.data?.[0];

    if (existingCart) {
      // 2. If cart exists → add new cart_item to it
      const cartItemRes = await axios.post(`/items/cart_items`, {
        ...data,
        cart: existingCart.id,
      });
      return cartItemRes.data.data;
    } else {
      // 3. If no cart exists → create a new cart with first cart_item
      const reqData = {
        customer: userId,
        billing_address: billing_address_id || null,
        status: "Active",
        cart_item: {
          create: [data],
        },
      };

      const response = await axios.post("/items/carts", reqData);
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartApi = async () => {
  const { userId } = store.getState();
  const { data } = await axios.get("/items/carts", {
    params: {
      filter: {
        customer: { _eq: userId },
        status: { _eq: "Active" },
      },
      fields: [
        "id",
        "status",
        "subtotal",
        "total",
        "shipping_total",
        "tax_total",
        "discount_amount",
        "customer.*",
        "cart_item.id",
        "cart_item.quantity",
        "cart_item.price",
        "cart_item.subtotal",
        "cart_item.product.id",
        "cart_item.product.title",
        "cart_item.product.thumbnail",
        "cart_item.product.category.*",
        "cart_item.product_variant.*",
        "coupons_id.*",
        "billing_address.*",
        "shipping_address.*",
      ].join(","),
      deep: {
        cart_item: {
          _sort: ["date_created"], // optional sorting of cart items
        },
      },
    },
  });

  return data.data || null;
};

export const updateCartApi = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`/items/carts/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCartQuantityApi = async (
  itemId: string,
  quantity: number
) => {
  const res = await axios.post(
    "/flows/trigger/6014f73c-cdd9-4cf7-880a-7276d8fc442d",
    {
      item_id: itemId,
      quantity,
    }
  );
  return res.status;
};

export const deleteCartApi = async () => {
  try {
    const { userId } = store.getState();
    // 1. Find active cart for this user
    const cartRes = await axios.get(`/items/carts`, {
      params: {
        filter: {
          customer: { _eq: userId },
          status: { _eq: "Active" },
        },
        fields: "id",
      },
    });

    const activeCart = cartRes.data.data?.[0];

    if (!activeCart) {
      return { success: false, message: "No active cart found for this user" };
    }

    // 2. Delete the active cart
    const res = await axios.post(
      `flows/trigger/016057d7-1289-45f2-9a2a-524056af62d8`,
      { cart_id: activeCart.id }
    );

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCartItemApi = async (itemId: string) => {
  try {
    const { userId } = store.getState();

    // 1. Find the active cart for this user
    const cartRes = await axios.get(`/items/carts`, {
      params: {
        filter: {
          customer: { _eq: userId },
          status: { _eq: "Active" },
        },
        fields: "id",
      },
    });

    const activeCart = cartRes.data.data?.[0];
    if (!activeCart) {
      return { success: false, message: "No active cart found for this user" };
    }

    // 2. Check if the cart_item belongs to this cart
    const itemRes = await axios.get(`/items/cart_items/${itemId}`, {
      params: { fields: "id,cart" },
    });

    const item = itemRes.data.data;
    if (!item || item.cart !== activeCart.id) {
      return { success: false, message: "Cart item not found in active cart" };
    }

    // 3. Delete the cart_item
    const res = await axios.post(
      `flows/trigger/28ecfc00-c156-42bf-952a-9195547f4449`,
      { item_id: itemId }
    );

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addDiscountToCartApi = async (data: any) => {
  try {
    const response = await axios.post(
      `/flows/trigger/2d4e59f9-1737-44ad-8944-68d2cfcc8557`,
      data
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
