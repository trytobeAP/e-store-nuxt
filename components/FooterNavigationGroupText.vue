<template>
  <span class="text-navigation">
    <NavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      class="nav-link text-link"
    >
      {{ item.content }}
    </NavigationItem>
  </span>
</template>

<script setup lang="ts">
interface TextNavItem {
  linkSlug: string;
  content: string;
}

defineProps<{ items: TextNavItem[] }>();
</script>

<style scoped lang="scss">
.text-navigation {
  display: inline-flex;
  align-items: center;
  gap: 40px;
}

.text-link {
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  color: theme-color("link-color-light");

  &:hover {
    color: theme-color("link-color");
  }
}
</style>
