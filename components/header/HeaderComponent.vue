<template>
  <header>
    <div class="header-content">
      <NuxtLink to="/">
        <HeaderLogo />
      </NuxtLink>

      <HeaderNavigation class="desktop-nav" />

      <div class="mobile-nav">
        <UtilsNavigationItem
          link="/cart"
          class="nav-link icon-link"
        >
          <Icon
            name="material-symbols:shopping-cart-outline"
            size="24"
          />
        </UtilsNavigationItem>

        <button
          class="burger-menu-btn"
          aria-label="Открыть меню"
          @click="$emit('open-sidebar')"
        >
          <Icon
            name="mdi:menu"
            size="24"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(["open-sidebar"]);
</script>

<style scoped lang="scss">
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.desktop-nav {
  display: none;
}

.burger-menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: theme-color("opposite-color");
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;

  &:focus-visible {
    border-radius: 4px;
  }
}

.mobile-nav {
  display: flex;
  gap: 16px;
  align-items: center;

  :deep(.nav-link) {
    padding-bottom: 0;
    line-height: 1;
    border-bottom: none;
  }
}

@media (min-width: $breakpoints-m) and (max-width: ($breakpoints-l - 1px)) {
  .desktop-nav {
    display: flex;
  }

  .mobile-nav {
    display: none;
  }

  .desktop-nav :deep(.header-navigation-container) {
    gap: 32px;
  }

  .desktop-nav :deep(.header-text-nav) {
    gap: 40px;
  }

  .desktop-nav :deep(.header-icon-nav) {
    gap: 24px;
  }
}

@media (min-width: $breakpoints-l) {
  .desktop-nav {
    display: flex;
  }

  .mobile-nav {
    display: none;
  }

  .desktop-nav :deep(.header-navigation-container) {
    gap: 48px;
  }

  .desktop-nav :deep(.header-text-nav) {
    gap: 64px;
  }

  .desktop-nav :deep(.header-icon-nav) {
    gap: 38px;
  }
}
</style>
