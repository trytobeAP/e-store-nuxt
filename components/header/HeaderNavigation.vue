<template>
  <nav>
    <span class="header-navigation-container">
      <UtilsNavigationGroupText
        class="header-text-nav"
        :items="textNavItems"
      />
      <span class="separator" />
      <UtilsNavigationGroupIcon
        class="header-icon-nav"
        :items="iconNavItems"
      />
    </span>
  </nav>
</template>

<script setup lang="ts">
import type { TextNavItem, IconNavItem } from "~/types/NavItems";

const initialTextItems = ["shop", "blog", "our story"];

const textNavItems: TextNavItem[] = initialTextItems.map((item) => ({
  content: item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  linkSlug: item.split(" ").join("-"),
}));

const iconNavItems: IconNavItem[] = [
  { linkSlug: "search", iconName: "material-symbols:search-rounded" },
  { linkSlug: "cart", iconName: "material-symbols:shopping-cart-outline" },
  { linkSlug: "account", iconName: "material-symbols:person-outline" },
];
</script>

<style scoped lang="scss">
.header-navigation-container {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.separator {
  width: 1px;
  height: 18px;
  margin-top: 4px;
  background-color: theme-color("opposite-color");
}

.header-text-nav {
  gap: 64px;

  :deep(.text-link) {
    font-weight: 500;
  }
}

.header-icon-nav {
  gap: 38px;
}
</style>
