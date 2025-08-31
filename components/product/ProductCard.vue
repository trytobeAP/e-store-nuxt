<template>
  <div class="product-card">
    <NuxtLink
      :to="`/products/${product.slug}`"
      class="card-link"
    >
      <div class="image-wrapper">
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
          loading="lazy"
        />

        <ProductCardBadges
          :on-sale="product.onSale"
          :in-stock="product.inStock"
        />
      </div>

      <div class="card-content">
        <h3
          v-if="!isMobile"
          class="product-name"
        >
          {{ product.title }}
        </h3>
        <h6
          v-else
          class="product-name"
        >
          {{ product.title }}
        </h6>
        <p class="product-price">{{ formattedPrice }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppBreakpoints } from "~/composables/useAppBreakpoints";
import type { Product } from "~/types/Product";

const props = defineProps<{
  product: Product;
}>();

const { isMobile } = useAppBreakpoints();

const formattedPrice = computed(() => {
  if (props.product.price !== undefined) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(props.product.price);
  }
  return "";
});
</script>

<style scoped lang="scss">
.product-card {
  text-align: left;
}

.card-link {
  display: block;
  color: theme-color("opposite-color");
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 16px;
  overflow: hidden;
  background-color: theme-color("gray-light-color");
  border-radius: 8px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: $fw-regular;
}

.product-price {
  margin: 0;
  font-size: 16px;
  font-weight: $fw-medium;
  color: theme-color("accent-color");
}
</style>
