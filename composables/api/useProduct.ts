import type { UseFetchOptions } from "#app";
import { computed, unref } from "vue";
import type { MaybeRef } from "vue";
import { defu } from "defu";
import { useApiFetch } from "~/composables/core/useApiFetch";
import type { Product } from "~/types/Product";

type ProductApiResponse = Product;

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
    immediate: false,
  };

  const mergedOptions = defu(options, defaults);

  return useApiFetch<ProductApiResponse>(url, mergedOptions);
}
