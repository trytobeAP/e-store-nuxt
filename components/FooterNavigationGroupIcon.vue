<template>
  <span class="icon-navigation">
    <NavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      class="icon-link"
    >
      <Icon
        :name="item.iconName"
        size="24"
      />
    </NavigationItem>
  </span>
</template>

<script setup lang="ts">
defineProps<{ items: NavItem[] }>();

interface NavItem {
  linkSlug: string;
  iconName: string;
}
</script>

<style scoped lang="scss">
.icon-navigation {
  display: inline-flex;
  align-items: center;
  gap: 30px;
}

.icon-link {
  line-height: 27px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  color: theme-color("link-color-light");

  &:hover,
  &:active,
  &:focus {
    color: theme-color("link-color");
  }
}
</style>
