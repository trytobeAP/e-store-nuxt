<template>
  <div class="shop-page">
    <h1
      v-if="isMobile"
      class="page-title"
    >
      Shop
    </h1>
    <h3
      v-else
      class="page-title"
    >
      Shop The Latest
    </h3>

    <div class="shop-layout">
      <ProductFilters
        class="shop-filters"
        :model-value="activeFilters"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
        @update:model-value="updateFilters"
      />

      <div class="shop-products">
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
          type="error"
          :message="errorMessage"
        />

        <ProductList
          v-else-if="filteredProducts"
          :products="filteredProducts"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#app";
import { useAppBreakpoints } from "#imports";
import { useProducts } from "~/composables/api/useProducts";
import type { LocationQueryRaw } from "vue-router";
import type { Filters } from "~/types/Filters";
import type { SelectOption } from "~/types/SelectOption";

const { isMobile } = useAppBreakpoints();
const route = useRoute();
const router = useRouter();

const priceSliderMinPrice = 0;
const priceSliderMaxPrice = 1500;

const activeFilters = ref<Filters>({
  searchQuery: (route.query.searchQuery as string) || "",
  category: (route.query.category as string) || null,
  sortBy: (route.query.sortBy as string) || null,
  priceRange: [
    route.query.minPrice ? Number(route.query.minPrice) : priceSliderMinPrice,
    route.query.maxPrice ? Number(route.query.maxPrice) : priceSliderMaxPrice,
  ],
  onSale: route.query.onSale === "true",
  inStock: route.query.inStock === "true",
});

const categoryOptions: SelectOption[] = [
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
];

const sortOptions: SelectOption[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

const {
  data: allProducts,
  pending,
  error,
} = useProducts({ server: false, lazy: true });

function updateFilters(newFilters: Filters) {
  activeFilters.value = newFilters;

  const query: LocationQueryRaw = {
    searchQuery: newFilters.searchQuery || undefined,
    category: newFilters.category || undefined,
    sortBy: newFilters.sortBy || undefined,
    minPrice: String(newFilters.priceRange[0]),
    maxPrice: String(newFilters.priceRange[1]),
    onSale: newFilters.onSale ? "true" : undefined,
    inStock: newFilters.inStock ? "true" : undefined,
  };

  router.replace({ query });
}

watch(
  () => route.query,
  (newQuery) => {
    activeFilters.value = {
      searchQuery: (newQuery.searchQuery as string) || "",
      category: (newQuery.category as string) || null,
      sortBy: (newQuery.sortBy as string) || null,
      priceRange: [
        newQuery.minPrice ? Number(newQuery.minPrice) : priceSliderMinPrice,
        newQuery.maxPrice ? Number(newQuery.maxPrice) : priceSliderMaxPrice,
      ],
      onSale: newQuery.onSale === "true",
      inStock: newQuery.inStock === "true",
    };
  },
  { deep: true },
);

const filteredProducts = computed(() => {
  if (!allProducts.value) return [];
  let tempProducts = [...allProducts.value];
  const filters = activeFilters.value;

  if (filters.category)
    tempProducts = tempProducts.filter((p) => p.category === filters.category);
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    tempProducts = tempProducts.filter((p) => p.price >= min && p.price <= max);
  }
  if (filters.sortBy) {
    const [field, dir] = filters.sortBy.split("-");
    tempProducts.sort((a, b) => {
      const valA = field === "price" ? a.price : (a.rating?.rate ?? 0);
      const valB = field === "price" ? b.price : (b.rating?.rate ?? 0);
      return dir === "asc" ? valA - valB : valB - valA;
    });
  }
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    tempProducts = tempProducts.filter((p) =>
      p.title.toLowerCase().includes(q),
    );
  }
  if (filters.onSale) tempProducts = tempProducts.filter((p) => p.onSale);
  if (filters.inStock) tempProducts = tempProducts.filter((p) => p.inStock);

  return tempProducts;
});

const errorMessage = computed(
  () =>
    "Oops! We couldn't load the products. Please check your connection and try again later.",
);
</script>
<style lang="scss" scoped>
.container {
  padding-top: 40px;
}

.page-title {
  margin-bottom: 40px;
  text-align: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 24px;
    margin-bottom: 16px;
  }
}

.shop-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
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

.error-message {
  margin: 40px 0;
}
</style>
