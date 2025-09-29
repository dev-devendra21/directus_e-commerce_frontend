import { useQuery } from "@tanstack/react-query";
import {
  getUserProfileApi,
  getCustomerAddressApi,
} from "@/shared/apis/customer";

export function useGetProfile() {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: getUserProfileApi,
    queryKey: ["profile"],
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return { isError, isLoading, data, error, refetch };
}

export function useGetCustomerAddress(id: string) {
  const { isError, isLoading, data, error } = useQuery({
    queryFn: () => getCustomerAddressApi(id),
    queryKey: ["address", id],
    staleTime: 0,
    gcTime: 0,
  });

  return { isError, isLoading, data, error };
}
