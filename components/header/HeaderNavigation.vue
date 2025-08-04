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
      <div class="theme-switcher-wrapper">
        <ThemeSwitcher />
      </div>
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
  gap: 30px;
  align-items: center;
}

.theme-switcher-wrapper {
  position: relative;
  padding-bottom: 27px;
  border-bottom: 2px solid transparent;
}

:deep(.toggle-btn) {
  position: absolute;
  top: -4px;
  left: -32px;

  @media (min-width: $breakpoints-m) {
    left: 16px;
  }
}

.separator {
  width: 1px;
  height: 18px;
  background-color: theme-color("opposite-color");
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
    background-color: theme-color("link-color");
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
    font-weight: $fw-medium;
  }
}

.header-icon-nav {
  gap: 38px;
}
</style>
