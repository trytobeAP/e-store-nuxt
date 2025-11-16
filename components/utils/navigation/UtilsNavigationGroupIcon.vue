<template>
  <span
    class="icon-navigation"
    v-bind="$attrs"
  >
    <UtilsNavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      class="icon-link-group"
      v-bind="item.attrs"
      :link="item.linkSlug"
      :class="[linkClass, 'text-link']"
    >
      <Icon
        :name="item.iconName"
        size="24"
      />
    </UtilsNavigationItem>
  </span>
</template>

<script setup lang="ts">
import type { IconNavItem } from "~/types/NavItems";

interface Props {
  items: IconNavItem[];
  linkClass?: string;
}

withDefaults(defineProps<Props>(), {
  linkClass: "nav-link",
});
</script>

<style scoped lang="scss">
.icon-navigation {
  display: inline-flex;
  gap: 30px;
  align-items: center;
}

.icon-link-group {
  display: inline-flex;
  align-items: center;
  line-height: 27px;
  vertical-align: middle;
}
</style>
