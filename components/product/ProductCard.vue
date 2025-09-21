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
          :discount-percentage="product.discountPercentage"
        />
        <button
          v-if="product.inStock"
          class="add-to-cart-btn"
          @click.prevent="addToCart"
        >
          <span>ADD TO CART</span>
        </button>
      </div>

      <div class="card-content">
        <h3 class="product-name">
          {{ product.title }}
        </h3>

        <div class="price-container">
          <template v-if="product.onSale && product.oldPrice">
            <span class="old-price">{{ formattedOldPrice }}</span>
            <span class="new-price">{{ formattedPrice }}</span>
          </template>
          <template v-else>
            <span class="regular-price">{{ formattedPrice }}</span>
          </template>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "~/types/Product";

const props = defineProps<{
  product: Product;
}>();

const formattedPrice = computed(() => {
  const price = props.product?.price;

  if (price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }
  return "";
});

const formattedOldPrice = computed(() => {
  const oldPrice = props.product?.oldPrice;

  if (oldPrice) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(oldPrice);
  }
  return "";
});

const addToCart = () => {
  console.log(`Product ${props.product.id} added to cart!`);
};
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-link {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  color: theme-color("opposite-color");
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
}

.card-content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 6px;
  overflow: hidden;
  background-color: theme-color("gray-light-color");
  border-radius: 8px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-name {
  display: -webkit-box;
  height: 52px;
  margin: 0 0 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font-size: 20px;
  font-weight: $fw-regular;
  line-height: 26px;
  -webkit-box-orient: vertical;

  @media (max-width: ($breakpoints-m - 1px)) {
    height: 44px;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 22px;
  }
}

.price-container {
  display: flex;
  gap: 8px;
  align-items: baseline;
  margin-top: auto;
  margin-bottom: 0;
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  font-weight: $fw-regular;
  line-height: 26px;

  @media (max-width: ($breakpoints-m - 1px)) {
    font-size: 12px;
    line-height: 20px;
  }
}

.regular-price,
.new-price {
  color: theme-color("accent-color");
}

.old-price {
  color: theme-color("error-color");
  text-decoration: line-through;
}

.add-to-cart-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  padding: 16px;
  font-size: 14px;
  font-weight: $fw-bold;
  color: theme-color("opposite-color");
  text-transform: uppercase;
  cursor: pointer;
  background-color: rgb(242 242 242 / 90%);
  border: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (min-width: $breakpoints-m) {
    height: 22%;
  }

  [data-theme="dark"] & {
    background-color: rgb(30 30 30 / 90%);
  }
}

.product-card:hover .add-to-cart-btn {
  @media (min-width: $breakpoints-m) {
    opacity: 1;
  }
}
</style>
