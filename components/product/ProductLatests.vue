<template>
  <section class="featured-products-section">
    <ClientOnly>
      <h1 class="page-title"> {{ pageTitle }} </h1>
    </ClientOnly>

    <div
      v-if="pending"
      class="product-grid"
    >
      <ProductCardSkeleton
        v-for="n in 6"
        :key="`skel-${n}`"
      />
    </div>

    <UtilsNotificationCustom
      v-else-if="error"
      class="error-message"
      mode="inline"
      :type="NotificationTypeEnum.Error"
      :message="errorMessage"
      :minWidth="288"
    />

    <div
      v-else-if="randomProducts.length > 0"
      class="product-grid"
    >
      <ProductCard
        v-for="product in randomProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NotificationTypeEnum } from "~/types/notification";
import { useAppBreakpoints } from "#imports";
import { useProducts } from "~/composables/api/useProducts";
import ProductCard from "~/components/product/ProductCard.vue";
import ProductCardSkeleton from "~/components/product/ProductCardSkeleton.vue";

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
  margin-top: 64px;
  margin-bottom: 64px;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 48px;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px 24px;
  align-items: stretch;

  @media (max-width: ($breakpoints-l - 1px)) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 16px;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    grid-template-columns: repeat(2, 1fr);
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
