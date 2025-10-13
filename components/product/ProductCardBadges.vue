<template>
  <div
    v-if="onSale && discountPercentage"
    class="sale-badge"
  >
    -{{ discountPercentage }}%
  </div>

  <div
    v-if="!inStock"
    class="badge-overlay"
  >
    <span class="sold-out-badge">Sold Out</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  onSale?: boolean;
  inStock?: boolean;
  discountPercentage?: number;
}
defineProps<Props>();
</script>

<style scoped lang="scss">
.sale-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 2px 6px;
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: $fw-regular;
  line-height: 20px;
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
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 2px 6px;
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: $fw-regular;
  line-height: 20px;
  color: theme-color("white-color");
  background-color: theme-color("accent-color");
  border-radius: 4px;
}
</style>
