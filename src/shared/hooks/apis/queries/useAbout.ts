import { getAboutApi } from "../../../apis/about";
import { useQuery } from "@tanstack/react-query";

export function useGetAbout() {
  const { isError, isLoading, data, error, refetch, isSuccess, isRefetching } =
    useQuery({
      queryFn: getAboutApi,
      queryKey: ["about"],
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    });

  return { isError, isLoading, data, error, refetch, isSuccess, isRefetching };
}
