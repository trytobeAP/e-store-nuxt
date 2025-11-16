import { createError, useRuntimeConfig } from "#imports";
import { defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id");

  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product ID is required.",
    });
  }

  const config = useRuntimeConfig(event);
  const apiBase = config.apiBase;

  try {
    const product = await $fetch(`/products/${productId}`, {
      baseURL: apiBase,
    });

    return product;
  } catch (error) {
    console.error(
      `Error fetching product ${productId} from Fake Store API:`,
      error,
    );
    throw createError({
      statusCode: 502,
      statusMessage: "Could not fetch the product from the upstream API.",
    });
  }
});
