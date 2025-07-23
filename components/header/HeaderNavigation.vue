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
  align-items: center;
}

.separator {
  width: 1px;
  height: 18px;
  background-color: vars.theme-color("opposite-color");
}

:deep(.nav-link) {
  position: relative;
  padding-bottom: 5px;
  border-bottom: none;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    content: "";
    background-color: vars.theme-color("link-color");
    opacity: 0;
    transition: none;
  }

  &.router-link-active::after,
  &:hover::after,
  &:active::after {
    opacity: 1;
  }
}

.header-text-nav {
  gap: 64px;

  :deep(.text-link) {
    font-weight: vars.$fw-medium;
  }
}

.header-icon-nav {
  gap: 38px;
}
</style>
