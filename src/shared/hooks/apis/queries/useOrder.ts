import { useQuery } from "@tanstack/react-query";
import useStore from "@/shared/store/useStore";
import { getAllOrdersApi, getSingleOrderApi } from "../../../apis/order";

export function useGetAllOrders(searchQuery: string, filterVal: string) {
  const { isAuthenticated } = useStore();
  const { isError, isLoading, data, error, refetch, isSuccess } = useQuery({
    queryFn: () => getAllOrdersApi(searchQuery, filterVal),
    queryKey: ["get_all_orders"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: isAuthenticated,
  });

  return { isError, isLoading, data, error, refetch, isSuccess };
}

export function useSingleOrder(id: string) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getSingleOrderApi(id),
    queryKey: ["single_order", id],
    staleTime: 10000,
    enabled: !!id,
  });

  return { isError, isLoading, data, error, refetch };
}
