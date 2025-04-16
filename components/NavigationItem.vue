<template>
  <NuxtLink
    :to="link"
    class="item"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { link = "/" } = defineProps<{ link?: string }>();
</script>

<style scoped lang="scss">
.item {
  size: 20px;
  align-items: center;
  line-height: 27px;
}
</style>
