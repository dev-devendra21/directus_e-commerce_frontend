import { getSliderApi } from "@/apis/slider";
import { useQuery } from "@tanstack/react-query";

export function useGetSlider() {
  const { isError, isLoading, data, error, refetch, isSuccess, isRefetching } =
    useQuery({
      queryFn: getSliderApi,
      queryKey: ["get_slider"],
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    });

  return { isError, isLoading, data, error, refetch, isSuccess, isRefetching };
}
