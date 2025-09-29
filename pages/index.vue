<template>
  <div>
    <div class="mobile-search-container">
      <BaseInput
        v-model="searchQuery"
        placeholder="Search"
        icon-name="material-symbols:search"
        readonly
        @click="handleSearchClick"
      />
    </div>
    <GreetingCarousel />

    <ClientOnly>
      <ProductLatests />

      <template #fallback>
        <section class="featured-products-section">
          <h1 class="page-title">Shop The Latest</h1>
          <div class="product-grid">
            <div
              v-for="n in 6"
              :key="`fallback-${n}`"
              class="product-grid-item"
            >
              <ProductCardSkeleton />
            </div>
          </div>
        </section>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");

const handleSearchClick = () => {
  console.log("Search input clicked. Future implementation can go here.");
};
</script>

<style scoped lang="scss">
.mobile-search-container {
  display: none;
}

@media (max-width: ($breakpoints-m - 1px)) {
  .mobile-search-container {
    display: block;
  }
}

:deep(.base-input) {
  cursor: pointer;
}

.home-content-wrapper {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}

:deep(.product-grid) {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

:deep(.product-grid-item) {
  margin: 0 12px 70px;

  @media (min-width: $breakpoints-l) {
    width: calc(100% / 3 - 24px);
  }

  @media (max-width: ($breakpoints-l - 1px)) {
    width: calc(100% / 2 - 24px);
    margin-bottom: 40px;
  }
}

:deep(.product-card),
:deep(.skeleton-card) {
  margin: 0 12px 70px;

  @media (min-width: $breakpoints-l) {
    width: calc(100% / 3 - 24px);
  }

  @media (max-width: ($breakpoints-l - 1px)) {
    width: calc(100% / 2 - 24px);
    margin-bottom: 40px;
  }
}

/* стили из ProductCardSkeleton, иначе при рендере страницы
карточки-скелетоны рендерятся сначала правильного размера,
затем очень маленькими
и лишь после какого-то времени уже валидные карточки товаров с сопутствующим контентом
*/

:deep(.skeleton-card) {
  width: 100%;
  text-align: center;
}

:deep(.skeleton-image) {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 24px;
  background-color: theme-color("gray-light-color");
  border-radius: 4px;
}

:deep(.skeleton-text) {
  height: 16px;
  margin: 0 auto 8px;
  background-color: theme-color("gray-light-color");
  border-radius: 4px;
}

:deep(.skeleton-title) {
  width: 80%;
}

:deep(.skeleton-price) {
  width: 40%;
  margin-bottom: 0;
}
</style>
