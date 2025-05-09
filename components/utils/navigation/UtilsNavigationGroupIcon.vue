<template>
  <span
    class="icon-navigation"
    v-bind="$attrs"
  >
    <UtilsNavigationItem
      v-for="item in items"
      :key="item.linkSlug"
      :link="`/${item.linkSlug}`"
      class="nav-link icon-link"
      :class="item.classes"
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
}

defineProps<Props>();
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
}
</style>
