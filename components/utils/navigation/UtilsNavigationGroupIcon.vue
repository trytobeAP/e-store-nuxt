<template>
  <span
    class="icon-navigation"
    v-bind="$attrs"
  >
    <UtilsNavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      class="icon-link-group"
      :link="item.linkSlug"
      :class="[linkClass, 'text-link', item.classes]"
    >
      <Icon
        :name="item.iconName"
        size="24"
      />
    </UtilsNavigationItem>
  </span>
</template>

<script setup lang="ts">
interface IconNavItem {
  linkSlug: string;
  iconName: string;
  classes?: string | string[] | Record<string, boolean>;
}

interface Props {
  items: IconNavItem[];
  linkClass?: string;
}

withDefaults(defineProps<Props>(), {
  linkClass: "nav-link",
});
</script>

<style scoped lang="scss">
.icon-navigation {
  display: inline-flex;
  gap: 30px;
  align-items: center;
}

.icon-link-group {
  display: inline-flex;
  align-items: center;
  line-height: 27px;
  vertical-align: middle;
}
</style>
