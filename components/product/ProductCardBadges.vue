<template>
  <div>
    <div
      v-if="onSale && inStock"
      class="sale-badge"
    >
      On Sale
    </div>

    <div
      v-if="!inStock"
      class="badge-overlay"
    >
      <span class="sold-out-badge">Sold Out</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onSale?: boolean;
  inStock?: boolean;
}>();
</script>

<style scoped lang="scss">
.sale-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: $fw-bold;
  line-height: 1;
  color: theme-color("white-color");
  background-color: theme-color("accent-color");
  border-radius: 4px;
}

.badge-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 50%);

  html[data-theme="dark"] & {
    background-color: rgb(0 0 0 / 50%);
  }
}

.sold-out-badge {
  padding: 8px 16px;
  font-weight: $fw-bold;
  color: theme-color("opposite-color");
  background-color: theme-color("main-color");
  border: 1px solid theme-color("opposite-color");
  border-radius: 4px;
}
</style>
