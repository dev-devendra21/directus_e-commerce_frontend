import { useQuery } from "@tanstack/react-query";
import { getAllCouponsApi } from "@/apis/coupon";

export function useCoupons(subtotal: number) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getAllCouponsApi(subtotal),
    queryKey: ["coupons"],
    staleTime: 10000,
  });

  return { isError, isLoading, data, error, refetch };
}
