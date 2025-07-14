<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="sidebar-overlay"
        @click="$emit('close')"
      />
    </Transition>
    <Transition name="slide">
      <aside
        v-if="isOpen"
        class="sidebar-panel"
      >
        <header class="sidebar-header">
          <NuxtLink
            to="/"
            @click="$emit('close')"
          >
            <HeaderLogo />
          </NuxtLink>
          <div class="header-actions">
            <UtilsNavigationItem
              link="/cart"
              class="action-icon"
              @click="$emit('close')"
            >
              <Icon
                name="material-symbols:shopping-cart-outline"
                size="24"
              />
            </UtilsNavigationItem>
            <button
              class="action-icon close-btn"
              aria-label="Закрыть меню"
              @click="$emit('close')"
            >
              <Icon
                name="mdi:close"
                size="28"
              />
            </button>
          </div>
        </header>

        <div class="sidebar-search">
          <BaseInput
            v-model="searchQuery"
            placeholder="Search"
            icon-name="material-symbols:search-rounded"
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
            <Icon
              :name="item.iconName"
              size="24"
            />
            <span>{{ item.content }}</span>
          </UtilsNavigationItem>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TextNavItem, IconNavItem } from "~/types/NavItems";
import BaseDivider from "~/components/base/BaseDivider.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import BaseInput from "~/components/base/BaseInput.vue";

defineProps<{
  isOpen: boolean;
}>();

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
    iconName: "material-symbols:person-outline",
  },
  {
    content: "Log Out",
    linkSlug: "logout",
    iconName: "material-symbols:logout",
  },
];
</script>

<style scoped lang="scss">
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
}

.sidebar-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: theme-color("body-bg-color");
}

.sidebar-header {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.sidebar-header > a {
  flex: 1;
  min-width: 0;
}

.header-actions {
  display: flex;
  flex-shrink: 0;
  gap: 16px;
  align-items: center;
}

.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: theme-color("opposite-color");
}

.close-btn {
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
}

.sidebar-search {
  flex-shrink: 0;
  margin: 24px 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
