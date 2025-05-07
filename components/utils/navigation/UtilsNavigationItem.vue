<template>
  <NuxtLink
    :to="link"
    class="item"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ link?: string }>(), {
  link: "/",
});
</script>

<style scoped lang="scss">
.item {
  size: 20px;
  align-items: center;
  line-height: 27px;
}
</style>
