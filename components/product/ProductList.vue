<template>
  <div class="product-list-wrapper">
    <div class="product-grid">
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
        class="product-grid-item"
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
import { computed } from "vue";
import ProductCard from "./ProductCard.vue";
import BasePagination from "~/components/base/BasePagination.vue";
import type { Product } from "~/types/Product";

const props = defineProps<{
  products: Product[];
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "page-changed", page: number): void;
}>();

const itemsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(props.products.length / itemsPerPage);
});

const displayedProducts = computed(() => {
  const start = (props.currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.products.slice(start, end);
});

const updatePage = (newPage: number) => {
  emit("page-changed", newPage);
};
</script>

<style scoped lang="scss">
.product-list-wrapper {
  width: 100%;
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

.product-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.pagination-container {
  margin-top: 86px;

  @media (max-width: ($breakpoints-l - 1px)) {
    margin-top: 60px;
  }
}
</style>
