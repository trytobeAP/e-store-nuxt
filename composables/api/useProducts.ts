import { useFetch, useRuntimeConfig } from "#app";
import type { UseFetchOptions } from "#app";
import type { Product } from "~/types/Product";

export type ProductsApiResponse = Product[];

/**
 * Функция-помощник для создания "слага" из строки.
 * 1. Заменяем все, что не является буквой или цифрой, на дефис.
 * 2. Заменяем один или несколько дефисов подряд на один-единственный.
 * 3. Убираем дефисы, если они оказались в начале или в конце строки.
 * @param text - Входная строка (название товара).
 */
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const useProducts = (options?: UseFetchOptions<Product[]>) => {
  const config = useRuntimeConfig();

  const url = "/products";

  return useFetch<Product[]>(url, {
    baseURL: config.public.apiBase,
    key: "all-products",
    transform: (response: Product[]): Product[] => {
      return response.map((product) => ({
        ...product,
        slug: `${slugify(product.title)}-${product.id}`,
        onSale: Math.random() < 0.3,
        inStock: Math.random() < 0.8,
      }));
    },
    ...options,
  });
};
