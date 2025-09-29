<template>
  <div class="product-grid">
    <div
      v-for="n in itemsCount"
      :key="`skel-${n}`"
      class="product-grid-item"
    >
      <ProductCardSkeleton />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ itemsCount?: number }>(), {
  itemsCount: 6,
});
</script>

<style scoped lang="scss">
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
</style>
