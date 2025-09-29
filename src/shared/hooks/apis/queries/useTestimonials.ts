import { getTestimonialsApi } from "../../../apis/testimonials";
import { useQuery } from "@tanstack/react-query";

export function useGetTestimonials() {
  const { isError, isLoading, data, error, refetch, isSuccess, isRefetching } =
    useQuery({
      queryFn: getTestimonialsApi,
      queryKey: ["testimonials"],
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    });

  return { isError, isLoading, data, error, refetch, isSuccess, isRefetching };
}
