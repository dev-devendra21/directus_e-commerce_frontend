import { getCartApi } from "@/apis/cart";
import { useQuery } from "@tanstack/react-query";
import useStore from "@/store/useStore";

export function useGetCart() {
  const { isAuthenticated } = useStore();
  const { isError, isLoading, data, error, refetch, isSuccess, isRefetching } =
    useQuery({
      queryFn: getCartApi,
      queryKey: ["get_cart"],
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: isAuthenticated,
      staleTime: 0,
      gcTime: 0,
    });

  return { isError, isLoading, data, error, refetch, isSuccess, isRefetching };
}
