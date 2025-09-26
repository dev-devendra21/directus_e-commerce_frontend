import { useMutation } from "@tanstack/react-query";
import {
  registerNewCustomerApi,
  loginCustomerApi,
  createCustomerAddressApi,
  updateCustomerAddressApi,
  verifyCustomerEmailApi,
  sendOtpToVerifyEmailApi,
} from "@/apis/customer";

import type { AddressData } from "@/types/address";

export const useCreateCustomer = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: registerNewCustomerApi,
    onSuccess: (data) => {
      console.log("A new customer registered successfully", data);
    },
    onError: (error) => {
      console.log("error while creating project", error.message);
    },
  });

  return {
    createCustomerMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useLoginCustomer = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: loginCustomerApi,
    onSuccess: async () => {
      console.log("A new customer login successfully");
    },
    onError: (error) => {
      console.log("error while login customer", error);
    },
  });

  return {
    loginCustomerMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useCreateCustomerAddress = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: createCustomerAddressApi,
    onSuccess: (data) => {
      console.log("A new address created successfully", data);
    },
    onError: (error) => {
      console.log("error while creating address", error.message);
    },
  });

  return {
    createCustomerAddressMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useUpdateCustomerAddress = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddressData }) =>
      updateCustomerAddressApi(id, data),
    onSuccess: (data) => {
      console.log("Address updated successfully", data);
    },
    onError: (error) => {
      console.log("error while updating address", error.message);
    },
  });

  return {
    updateCustomerAddressMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useVerifyCustomerEmail = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: verifyCustomerEmailApi,
    onSuccess: () => {},
    onError: (error) => {
      console.log("error while creating address", error.message);
    },
  });

  return {
    verifyCustomerMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};

export const useSendOtpForEmailVerification = () => {
  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: sendOtpToVerifyEmailApi,
    onSuccess: () => {},
    onError: (error) => {
      console.log("error while creating address", error.message);
    },
  });

  return {
    sendOtpMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
    isError,
  };
};
