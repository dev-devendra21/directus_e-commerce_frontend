import { useQuery } from "@tanstack/react-query";
import {
  getAllProductsApi,
  getSingleProductApi,
  getRelatedProductsApi,
  getProductSearchQuery,
} from "../../../apis/product";
export function useProducts(
  category?: string,
  searchQuery?: string,
  sortBy?: string,
  order: "asc" | "desc" = "asc"
) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getAllProductsApi(category, searchQuery, sortBy, order),
    queryKey: ["products"],
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { isError, isLoading, data, error, refetch };
}

export function useSingleProduct(id: string) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getSingleProductApi(id),
    queryKey: ["product", id],
    staleTime: 0,
    gcTime: 0,
    enabled: !!id,
  });

  return { isError, isLoading, data, error, refetch };
}

export function useRelatedProducts(categoryId: string, productId: string) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getRelatedProductsApi(categoryId, productId),
    queryKey: ["related_products", productId, categoryId],
    staleTime: 10000,
    enabled: !!categoryId && !!productId,
  });

  return { isError, isLoading, data, error, refetch };
}

export function useProductSearch(query: string) {
  const { isError, isLoading, data, error, refetch } = useQuery({
    queryFn: () => getProductSearchQuery(query),
    queryKey: ["product_search", query],
    staleTime: 10000,
    enabled: !!query,
  });

  return { isError, isLoading, data, error, refetch };
}
