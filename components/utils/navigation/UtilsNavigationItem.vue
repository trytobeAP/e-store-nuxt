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
  if (!props.link) {
    return "/";
  }

  const isExternal =
    props.link.startsWith("http") || props.link.startsWith("//");

  if (isExternal) {
    return props.link;
  }

  return props.link.startsWith("/") ? props.link : `/${props.link}`;
});
</script>

<style scoped lang="scss">
.item {
  size: 20px;
  align-items: center;
  line-height: 27px;
}
</style>
