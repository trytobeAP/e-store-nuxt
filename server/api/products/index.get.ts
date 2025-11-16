import { createError, useRuntimeConfig } from "#imports";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const apiBase = config.apiBase;

  try {
    const products = await $fetch("/products", {
      baseURL: apiBase,
    });

    return products;
  } catch (error) {
    console.error("Error fetching from Fake Store API (/products):", error);

    throw createError({
      statusCode: 502,
      statusMessage: "Could not fetch products from the upstream API.",
    });
  }
});
