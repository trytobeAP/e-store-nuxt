import type { UseFetchOptions } from "#app";
import { computed, unref } from "vue";
import type { MaybeRef } from "vue";
import { defu } from "defu";
import { useApiFetch, type ApiResponse } from "~/composables/core/useApiFetch";
import type { Product } from "~/types/Product";

type ProductApiResponse = ApiResponse<Product>;

export function useProduct(
  productId: MaybeRef<string | number | undefined | null>,
  options: UseFetchOptions<ProductApiResponse> = {},
) {
  const url = computed(() => {
    const id = unref(productId);
    return id ? `/products/${id}` : null;
  });

  const key = computed(() => {
    const id = unref(productId);
    return id ? `product-${id}` : null;
  });

  const defaults: UseFetchOptions<ProductApiResponse> = {
    key: key.value ?? undefined,
  };

  const mergedOptions = defu(options, defaults);

  const fetchResult = useApiFetch<ProductApiResponse>(url, mergedOptions);

  return fetchResult;
}
