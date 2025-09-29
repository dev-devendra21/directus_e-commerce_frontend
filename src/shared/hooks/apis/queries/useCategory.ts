import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesApi } from "../../../apis/category";
export function useCategories() {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: getAllCategoriesApi,
    queryKey: ["categories"],
    staleTime: 10000,
  });

  return { isError, isLoading, data, error, refetch };
}
