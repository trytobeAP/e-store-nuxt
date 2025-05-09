import type { UseFetchOptions } from "#app";
import { defu } from "defu";
import { useApiFetch, type ApiResponse } from "~/composables/core/useApiFetch";
import type { Product } from "~/types/Product";

type ProductsApiResponse = ApiResponse<Product[]>;

export function useProducts(
  options: UseFetchOptions<ProductsApiResponse> = {}
) {
  const defaults: UseFetchOptions<ProductsApiResponse> = {
    key: "/products",
  };

  const mergedOptions = defu(options, defaults);

  return useApiFetch<ProductsApiResponse>("/products", mergedOptions);
}
