<template>
  <div class="product-list-wrapper">
    <div class="product-grid">
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <BasePagination
      class="pagination-container"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="updatePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ProductCard from "./ProductCard.vue";
import BasePagination from "~/components/base/BasePagination.vue";
import type { Product } from "~/types/Product";

const props = defineProps<{
  products: Product[];
}>();

const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(props.products.length / itemsPerPage);
});

const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.products.slice(start, end);
});

const updatePage = (newPage: number) => {
  currentPage.value = newPage;
};
</script>

<style scoped lang="scss">
.product-list-wrapper {
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px 24px;

  @media (max-width: ($breakpoints-l - 1px)) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 16px;
  }
}

.pagination-container {
  margin-top: 86px;

  @media (max-width: ($breakpoints-l - 1px)) {
    margin-top: 60px;
  }
}
</style>
