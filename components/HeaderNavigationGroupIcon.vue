<template>
  <span class="icon-navigation">
    <NavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      class="nav-link icon-link"
    >
      <Icon
        :name="item.iconName"
        size="24"
      />
    </NavigationItem>
  </span>
</template>

<script setup lang="ts">
interface UserNavItem {
  linkSlug: string;
  iconName: string;
}
defineProps<{ items: UserNavItem[] }>();
</script>

<style scoped lang="scss">
.icon-navigation {
  display: inline-flex;
  align-items: center;
  gap: 38px;
}

.icon-link {
  line-height: 27px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
</style>
