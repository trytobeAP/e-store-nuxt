<template>
  <nav>
    <span class="header-navigation-container">
      <UtilsNavigationGroupText
        class="header-text-nav"
        :items="textNavItems"
      />
      <span class="separator" />

      <UtilsNavigationGroupIcon
        class="header-icon-nav"
        :items="iconNavItemsBeforeAccount"
      />

      <div
        class="account-icon-wrapper"
        :class="{ 'is-authenticated': authStore.isAuthenticated }"
      >
        <button
          class="account-icon-button"
          aria-label="Account"
          @click="handleAccountClick"
        >
          <Icon
            name="local-custom:account"
            size="24"
          />
        </button>
      </div>

      <div class="theme-switcher-wrapper">
        <ThemeSwitcher />
      </div>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import type { TextNavItem, IconNavItem } from "~/types/NavItems";

const router = useRouter();
const authStore = useAuthStore();

const initialTextItems = ["shop", "blog", "our story"];
const textNavItems: TextNavItem[] = initialTextItems.map((item) => ({
  content: item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  linkSlug: item.split(" ").join("-"),
}));

const iconNavItemsBeforeAccount: IconNavItem[] = [
  { linkSlug: "search", iconName: "local-custom:search" },
  { linkSlug: "cart", iconName: "local-custom:cart" },
];

const logoutInitiated = ref(false);
let logoutTimer: ReturnType<typeof setTimeout> | null = null;

const handleGuestClick = () => {
  router.push("/account");
};

const handleFirstAuthClick = () => {
  authStore.logout();
  logoutInitiated.value = true;
  logoutTimer = setTimeout(() => {
    logoutInitiated.value = false;
  }, 3000);
};

const handleSecondAuthClick = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
  logoutInitiated.value = false;
  router.push("/account");
};

const handleAccountClick = () => {
  if (!authStore.isAuthenticated) {
    handleGuestClick();
    return;
  }

  if (logoutInitiated.value) {
    handleSecondAuthClick();
  } else {
    handleFirstAuthClick();
  }
};

onUnmounted(() => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
});
</script>

<style scoped lang="scss">
.header-navigation-container {
  display: flex;
  gap: 30px;
  align-items: center;
}

.theme-switcher-wrapper {
  position: relative;
  padding-bottom: 27px;
  border-bottom: 2px solid transparent;
}

:deep(.toggle-btn) {
  position: absolute;
  top: -4px;
  left: -32px;

  @media (min-width: $breakpoints-m) {
    left: 16px;
  }
}

.separator {
  width: 1px;
  height: 18px;
  background-color: theme-color("opposite-color");
}

.account-icon-wrapper {
  position: relative;
  display: inline-flex;
  padding-bottom: 5px;

  .account-icon-button {
    padding: 0;
    line-height: 1;
    color: theme-color("link-color");
    cursor: pointer;
    background: none;
    border: none;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    content: "";
    background-color: theme-color("link-color");
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  &.is-authenticated::before {
    position: absolute;
    top: -8px;
    left: -4px;
    z-index: 1;
    width: 10px;
    height: 10px;
    content: "";
    background-color: #28a745;
    border: 2px solid theme-color("main-color");
    border-radius: 50%;
  }
}

:deep(.nav-link) {
  position: relative;
  padding-bottom: 5px;
  border-bottom: none;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    content: "";
    background-color: theme-color("link-color");
    opacity: 0;
    transition: none;
  }

  &.router-link-active::after,
  &:hover::after,
  &:active::after {
    opacity: 1;
  }
}

.header-text-nav {
  gap: 64px;

  --text-nav-font-weight: #{$fw-regular};
}

.header-icon-nav {
  gap: 38px;
}
</style>
