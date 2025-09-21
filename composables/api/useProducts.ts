import { useFetch, useRuntimeConfig } from "#app";
import type { UseFetchOptions } from "#app";
import { useSlugify } from "~/utils/slugify";
import type { Product } from "~/types/Product";

export type ProductsApiResponse = Product[];

export const useProducts = (options?: UseFetchOptions<Product[]>) => {
  const config = useRuntimeConfig();

  const url = "/products";

  return useFetch<Product[]>(url, {
    baseURL: config.public.apiBase,
    key: "all-products",
    transform: (response: Product[]): Product[] => {
      return response.map((product) => {
        const inStock = Math.random() < 0.8;

        const onSale = inStock ? Math.random() < 0.3 : false;

        let saleData: {
          oldPrice?: number;
          price: number;
          discountPercentage?: number;
        } = { price: product.price };

        if (onSale) {
          const discount = Math.random() * (0.7 - 0.05) + 0.05;
          const oldPrice = product.price;
          const newPrice = oldPrice * (1 - discount);

          saleData = {
            oldPrice: Math.round(oldPrice * 100) / 100,
            price: Math.round(newPrice * 100) / 100,
            discountPercentage: Math.round(discount * 100),
          };
        }

        return {
          ...product,
          price: saleData.price,
          oldPrice: saleData.oldPrice,
          discountPercentage: saleData.discountPercentage,
          slug: `${useSlugify(product.title)}-${product.id}`,
          onSale: onSale,
          inStock: inStock,
        };
      });
    },
    ...options,
  });
};
