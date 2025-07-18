<template>
  <span
    class="text-navigation"
    v-bind="$attrs"
  >
    <UtilsNavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      :class="[linkClass, 'text-link', item.classes]"
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

interface Props {
  items: TextNavItem[];
  linkClass?: string;
}

withDefaults(defineProps<Props>(), {
  linkClass: "nav-link",
});
</script>

<style scoped lang="scss">
.text-navigation {
  display: inline-flex;
  gap: 40px;
  align-items: center;
}

.text-link {
  font-size: 16px;
  line-height: 27px;
}
</style>
