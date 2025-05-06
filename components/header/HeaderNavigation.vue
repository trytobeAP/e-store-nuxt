// components/header/HeaderNavigation.vue
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
interface TextNavItem {
  linkSlug: string;
  content: string;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
}

const initialTextItems = ["shop", "blog", "our story"];

const shopItemsContent = initialTextItems.map((elem) => {
  return elem
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});

const shopItemsLinks = initialTextItems.map((elem) => {
  return elem.split(" ").join("-");
});

const textNavItems: TextNavItem[] = initialTextItems.map((_, i) => ({
  content: shopItemsContent[i],
  linkSlug: shopItemsLinks[i],
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
  align-items: flex-start;
  gap: 48px;
}

.separator {
  width: 1px;
  height: 18px;
  background-color: theme-color("opposite-color");
  margin-top: 4px;
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
