import {
  createCartApi,
  deleteCartApi,
  deleteCartItemApi,
  updateCartQuantityApi,
  updateCartApi,
  addDiscountToCartApi,
} from "../../../apis/cart";

import { useMutation } from "@tanstack/react-query";

export const useCreateCart = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: createCartApi,
    onSuccess: (data) => {
      console.log("A new cart created successfully", data);
    },
    onError: (error) => {
      console.log("error while creating cart", error.message);
    },
  });

  return {
    createCartMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useUpdateCart = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCartApi(id, data),
    onSuccess: (data) => {
      console.log("A new cart created successfully", data);
    },
    onError: (error) => {
      console.log("error while creating cart", error.message);
    },
  });

  return {
    updateCartMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export function useUpdateCartQuantity() {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartQuantityApi(itemId, quantity),

    onSuccess: () => {
      console.log("Quantity updated successfully");
    },

    onError: (error) => {
      console.error("Failed to update quantity:", error);
    },
  });

  return {
    updateCartQuantityMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
}

export const useAddDiscountToCart = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: ({ data }: { data: any }) => addDiscountToCartApi(data),

    onSuccess: () => {
      console.log("Discount added successfully");
    },

    onError: (error) => {
      console.error("Failed to add discount:", error);
    },
  });

  return {
    addDiscountToCartMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useDeleteCart = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: deleteCartApi,

    onSuccess: () => {
      console.log("Cart deleted successfully");
    },

    onError: (error) => {
      console.error("Failed to delete cart:", error);
    },
  });

  return {
    deleteCartMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useDeleteCartItem = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: (itemId: string) => deleteCartItemApi(itemId),

    onSuccess: () => {
      console.log("Cart item deleted successfully");
    },

    onError: (error) => {
      console.error("Failed to delete cart item:", error);
    },
  });

  return {
    deleteCartItemMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};
