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
defineProps<{ items: NavItem[] }>();

interface NavItem {
  linkSlug: string;
  content: string;
}
</script>

<style scoped lang="scss">
.text-navigation {
  display: inline-flex;
  align-items: center;
  gap: 64px;
}

.text-link {
  font-size: 16px;
  line-height: 27px;
}
</style>
