<template>
  <div class="product-page">
    <div v-if="pending">Loading product...</div>
    <div v-else-if="error">
      <h2>Error. Product not found</h2>
    </div>
    <div v-else-if="product">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "#app";
import { useProduct } from "~/composables/api/useProduct";
import { useSeoMeta } from "#imports";

const route = useRoute();
const slug = route.params.slug as string;
const slugParts = slug.split("-");
const productId = slugParts[slugParts.length - 1];

const { data: product, pending, error, execute } = useProduct(productId);

useSeoMeta({
  title: () =>
    product.value ? `${product.value.title} | SHOPEE` : "Product | SHOPEE",
  description: () =>
    product.value
      ? product.value.description.substring(0, 155)
      : "Discover high-quality products at SHOPEE.",
  ogTitle: () =>
    product.value ? `${product.value.title} | SHOPEE` : "Product | SHOPEE",
  ogDescription: () =>
    product.value
      ? product.value.description.substring(0, 155)
      : "Discover high-quality products at SHOPEE.",
  ogImage: () => (product.value ? product.value.image : "~/public/favicon.ico"),
});

onMounted(() => {
  execute();
});
</script>
