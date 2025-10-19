<template>
  <div class="shop-page">
    <ClientOnly>
      <div
        v-if="isMobile"
        class="mobile-search-wrapper"
      >
        <BaseInput
          v-model="localMobileSearchQuery"
          variant="default"
          placeholder="Search products..."
          icon-name="local-custom:search"
          clearable
        />
      </div>
    </ClientOnly>

    <ClientOnly>
      <h1 class="page-title"> {{ pageTitle }} </h1>
    </ClientOnly>

    <div class="shop-layout">
      <ProductFilters
        class="shop-filters"
        :model-value="activeFilters"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
        :max-price="maxProductPrice"
        @update:model-value="handleFiltersUpdate"
      />

      <div class="shop-products">
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

        <ProductList
          v-else-if="filteredProducts"
          :products="filteredProducts"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "#app";
import { NotificationTypeEnum } from "~/types/Notification";
import { useAppBreakpoints } from "#imports";
import { useProducts } from "~/composables/api/useProducts";
import { debounce } from "~/utils/debounce";
import {
  validateNumberQuery,
  validateOptionQuery,
  validateStringQuery,
  validateBooleanQuery,
} from "~/utils/queryValidators";
import type { LocationQueryRaw } from "vue-router";
import type { Filters } from "~/types/Filters";
import type { SelectOption } from "~/types/SelectOption";

const { isMobile } = useAppBreakpoints();

const route = useRoute();
const router = useRouter();

const pageTitle = computed(() => {
  if (isMobile.value) return `Shop`;
  return `Shop The Latest`;
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

const PRICE_SLIDER_MIN_PRICE = 0;
const PRICE_SLIDER_MAX_PRICE = 1500;

const maxProductPrice = computed(() => {
  if (!allProducts.value || allProducts.value.length === 0) {
    return PRICE_SLIDER_MAX_PRICE;
  }
  const max = Math.max(...allProducts.value.map((p) => p.price));
  return Math.ceil(max / 100) * 100;
});

const activeFilters = computed<Filters>({
  get() {
    const query = route.query;
    return {
      searchQuery: validateStringQuery(query.searchQuery, ""),
      category: validateOptionQuery(query.category, categoryOptions, null),
      sortBy: validateOptionQuery(query.sortBy, sortOptions, null),
      priceRange: [
        validateNumberQuery(query.minPrice, PRICE_SLIDER_MIN_PRICE),
        Math.min(
          validateNumberQuery(query.maxPrice, maxProductPrice.value),
          maxProductPrice.value,
        ),
      ],
      onSale: validateBooleanQuery(query.onSale),
      inStock: validateBooleanQuery(query.inStock),
    };
  },
  set(newFilters) {
    const query: LocationQueryRaw = { ...route.query };

    const filterKeys: (keyof Filters | "minPrice" | "maxPrice")[] = [
      "searchQuery",
      "category",
      "sortBy",
      "onSale",
      "inStock",
      "minPrice",
      "maxPrice",
    ];
    filterKeys.forEach((key) => delete query[key]);

    if (newFilters.searchQuery) query.searchQuery = newFilters.searchQuery;
    if (newFilters.category) query.category = newFilters.category;
    if (newFilters.sortBy) query.sortBy = newFilters.sortBy;
    if (newFilters.priceRange[0] > PRICE_SLIDER_MIN_PRICE)
      query.minPrice = String(newFilters.priceRange[0]);
    if (newFilters.priceRange[1] < maxProductPrice.value)
      query.maxPrice = String(newFilters.priceRange[1]);
    if (newFilters.onSale) query.onSale = "true";
    if (newFilters.inStock) query.inStock = "true";

    delete query.page;

    router.replace({ query });
  },
});

const currentPage = computed({
  get() {
    return validateNumberQuery(route.query.page, 1);
  },
  set(newPage) {
    const query: LocationQueryRaw = { ...route.query };
    if (newPage > 1) {
      query.page = String(newPage);
    } else {
      delete query.page;
    }
    router.replace({ query });
  },
});

watch(maxProductPrice, (newMax) => {
  const maxPriceFromUrl = route.query.maxPrice;
  if (!maxPriceFromUrl) {
    activeFilters.value.priceRange[1] = newMax;
  }
});

const handleFiltersUpdate = (newFilters: Filters) => {
  activeFilters.value = newFilters;
};

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const localMobileSearchQuery = ref(activeFilters.value.searchQuery);
watch(
  () => activeFilters.value.searchQuery,
  (newSearch) => {
    if (localMobileSearchQuery.value !== newSearch) {
      localMobileSearchQuery.value = newSearch;
    }
  },
);

const debouncedMobileSearchUpdate = debounce((query: string) => {
  handleFiltersUpdate({ ...activeFilters.value, searchQuery: query });
}, 500);

watch(localMobileSearchQuery, (newQuery) => {
  debouncedMobileSearchUpdate.call(newQuery || "");
});

onUnmounted(() => {
  debouncedMobileSearchUpdate.cancel();
});

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
.page-title {
  width: 252px;
  margin-top: 96px;
  margin-bottom: 38px;
  font-family: "DM Sans", sans-serif;
  font-size: 33px;
  font-weight: $fw-medium;
  line-height: 43px;
  text-align: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 36px;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: $fw-regular;
    line-height: 30px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: $fw-regular;
    line-height: 26px;
  }
}

.mobile-search-wrapper {
  margin-bottom: 24px;
}

.shop-layout {
  display: flex;
  flex-direction: row;
  gap: 48px;
  align-items: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    flex-direction: column;
    gap: 0;
  }
}

.shop-products {
  flex: 1;
  width: 100%;

  @media (min-width: $breakpoints-m) {
    margin: 0 -12px;
  }
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.error-message {
  margin: 40px 0;
}
</style>
