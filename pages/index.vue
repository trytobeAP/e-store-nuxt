<template>
  <div>
    <div class="mobile-search-container">
      <BaseInput
        v-model="searchQuery"
        placeholder="Search"
        icon-name="material-symbols:search-rounded"
        readonly
        @click="handleSearchClick"
      />
    </div>
    <GreetingCarousel class="watch-carousel-container" />
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

@media (max-width: (vars.$breakpoints-m - 1px)) {
  .mobile-search-container {
    display: block;
  }
}

:deep(.base-input) {
  cursor: pointer;
}

.watch-carousel-container {
  width: 100%;
  max-width: 1000px;
  height: auto;
  aspect-ratio: 1000 / 600;
  margin: 16px auto;
  border-radius: 16px;
}
</style>
