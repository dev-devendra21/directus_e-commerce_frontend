import { createOrderApi } from "@/shared/apis/order";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      console.log("A new order created successfully", data);
    },
    onError: (error) => {
      console.log("error while creating order", error.message);
    },
  });

  return {
    createOrderMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};
