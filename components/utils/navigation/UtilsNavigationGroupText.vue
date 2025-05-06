<template>
  <span
    class="text-navigation"
    v-bind="$attrs"
  >
    <UtilsNavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      class="nav-link text-link"
      :class="item.classes"
    >
      {{ item.content }}
    </UtilsNavigationItem>
  </span>
</template>

<script setup lang="ts">
interface TextNavItem {
  linkSlug: string;
  content: string;
  classes?: string | string[] | Record<string, boolean>;
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
  line-height: 27px;
}
</style>
