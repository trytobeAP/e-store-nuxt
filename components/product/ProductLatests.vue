<template>
  <section class="featured-products-section">
    <h1 class="page-title"> {{ pageTitle }} </h1>

    <ProductSkeletonList
      v-if="pending"
      :items-count="6"
    />
    <UtilsNotificationCustom
      v-else-if="error"
      class="error-message"
      mode="inline"
      :type="NotificationTypeEnum.ERROR"
      :message="errorMessage"
      :minWidth="288"
    />
    <div
      v-else
      class="product-grid"
    >
      <ProductCard
        v-for="product in randomProducts"
        :key="product.id"
        :product="product"
        class="product-grid-item"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NotificationTypeEnum } from "~/types/notification";
import { useAppBreakpoints } from "#imports";
import { useProducts } from "~/composables/api/useProducts";
const {
  data: allProducts,
  pending,
  error,
} = useProducts({ server: false, lazy: true });

const { isMobile } = useAppBreakpoints();

const pageTitle = computed(() => {
  if (isMobile.value) return `Shop`;
  return `Shop The Latest`;
});

const randomProducts = computed(() => {
  if (!allProducts.value || allProducts.value.length === 0) {
    return [];
  }

  const numberOfProducts = isMobile.value ? 4 : 6;

  const productsShuffled = [...allProducts.value].sort(
    () => 0.5 - Math.random(),
  );

  return productsShuffled.slice(0, numberOfProducts);
});

const errorMessage = computed(
  () =>
    "Oops! We couldn't load the products. Please check your connection and try again later.",
);
</script>

<style scoped lang="scss">
.page-title {
  margin-top: 96px;
  margin-bottom: 38px;
  text-align: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 24px;
    margin-bottom: 16px;
  }
}

.featured-products-section {
  padding-top: 64px;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 48px;
  }
}

.section-title {
  margin-bottom: 48px;
  font-size: 2rem;
  color: theme-color("opposite-color");
  text-align: center;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 32px;
    font-size: 1.5rem;
  }
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.product-grid-item {
  margin: 0 12px 70px;

  @media (min-width: $breakpoints-l) {
    width: calc(100% / 3 - 24px);
  }

  @media (max-width: ($breakpoints-l - 1px)) {
    width: calc(100% / 2 - 24px);
    margin-bottom: 40px;
  }
}

.error-message {
  padding: 40px;
  color: theme-color("error-color");
  text-align: center;
  background-color: rgb(216 39 0 / 10%);
  border: 1px solid theme-color("error-color");
  border-radius: 8px;
}
</style>
