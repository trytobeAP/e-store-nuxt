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

    <div class="home-content-wrapper">
      <GreetingCarousel />
      <ProductLatests />
    </div>
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
    margin-bottom: 24px;
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
</style>
