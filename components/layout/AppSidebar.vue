<template>
  <BaseSidebar
    direction="right"
    :is-open="isOpen"
    show-logo
    title-link="/"
    @close="$emit('close')"
  >
    <template #headerActions>
      <UtilsNavigationItem
        class="action-icon"
        link="/cart"
        @click="$emit('close')"
      >
        <ClientOnly>
          <Icon
            name="material-symbols:shopping-cart"
            size="24"
          />
        </ClientOnly>
      </UtilsNavigationItem>
    </template>

    <div class="sidebar-search">
      <BaseInput
        v-model="searchQuery"
        placeholder="Search"
        icon-name="material-symbols:search"
        readonly
      />
    </div>
    <nav class="sidebar-nav">
      <UtilsNavigationItem
        v-for="item in primaryNavItems"
        :key="item.linkSlug"
        :link="`/${item.linkSlug}`"
        class="sidebar-link"
        @click="$emit('close')"
      >
        {{ item.content }}
      </UtilsNavigationItem>
      <BaseDivider class="sidebar-divider" />
      <UtilsNavigationItem
        v-for="item in secondaryNavItems"
        :key="item.linkSlug"
        :link="`/${item.linkSlug}`"
        class="sidebar-link"
        @click="$emit('close')"
      >
        <ClientOnly>
          <Icon
            :name="item.iconName"
            size="24"
          />
        </ClientOnly>
        <span>{{ item.content }}</span>
      </UtilsNavigationItem>
    </nav>
  </BaseSidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TextNavItem, IconNavItem } from "~/types/NavItems";

defineProps<{ isOpen: boolean }>();
defineEmits(["close"]);

const searchQuery = ref("");
const initialPrimaryNavItems = [
  "shop",
  "blog",
  "our story",
  "contact",
  "terms of use",
  "shipping and returns",
];
const primaryNavItems: TextNavItem[] = initialPrimaryNavItems.map((item) => ({
  content: item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  linkSlug: item.split(" ").join("-"),
}));
const secondaryNavItems: IconNavItem[] = [
  {
    content: "My account",
    linkSlug: "account",
    iconName: "material-symbols:person",
  },
  {
    content: "Log Out",
    linkSlug: "logout",
    iconName: "material-symbols:logout",
  },
];
</script>

<style scoped lang="scss">
.sidebar-search {
  margin-bottom: 24px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-link {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 18px;
  font-weight: $fw-medium;
  color: theme-color("link-color");
  text-decoration: none;
}

.sidebar-divider {
  margin: 16px 0;
}
</style>
