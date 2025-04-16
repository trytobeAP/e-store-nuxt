<template>
  <span class="navigation">
    <HeaderNavigationGroupText
      class="shop"
      :items="textNavItems"
    />
    <span class="separator" />
    <HeaderNavigationGroupIcon
      class="user"
      :items="iconNavItems"
    />
  </span>
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
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
});

const shopItemsLinks = initialTextItems.map((elem) => {
  return elem.split(" ").join("-");
});

const textNavItems: TextNavItem[] = [];
for (let i = 0; i < initialTextItems.length; i++) {
  textNavItems.push({
    content: shopItemsContent[i],
    linkSlug: shopItemsLinks[i],
  });
}

const iconNavItems: IconNavItem[] = [
  { linkSlug: "search", iconName: "material-symbols:search-rounded" },
  { linkSlug: "cart", iconName: "material-symbols:shopping-cart-outline" },
  { linkSlug: "account", iconName: "material-symbols:person-outline" },
];
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: flex-start;
  gap: 48px;
}

.separator {
  width: 1px;
  height: 24px;
  background-color: theme-color("opposite-color");
  margin-top: 2px;
}
</style>
