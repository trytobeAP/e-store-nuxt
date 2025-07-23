<template>
  <NuxtLink
    :to="resolvedLink"
    class="item"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ link?: string }>(), {
  link: "/",
});

const resolvedLink = computed(() => {
  const isExternal = props.link.startsWith("http");

  if (isExternal || props.link.startsWith("/")) {
    return props.link;
  }
  return `/${props.link}`;
});
</script>

<style scoped lang="scss">
.item {
  align-items: center;
  line-height: 27px;
}
</style>
