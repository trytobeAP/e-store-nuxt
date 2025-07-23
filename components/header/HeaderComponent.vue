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
  display: flex;

  :deep(.header-navigation-container) {
    gap: 48px;
  }

  :deep(.header-text-nav) {
    gap: 64px;
  }

  :deep(.header-icon-nav) {
    gap: 38px;
  }

  @media (max-width: (vars.$breakpoints-l - 1px)) {
    :deep(.header-navigation-container) {
      gap: 32px;
    }

    :deep(.header-text-nav) {
      gap: 40px;
    }

    :deep(.header-icon-nav) {
      gap: 24px;
    }
  }

  @media (max-width: (vars.$breakpoints-m - 1px)) {
    display: none;
  }
}

.mobile-nav {
  display: none;

  @media (max-width: (vars.$breakpoints-m - 1px)) {
    display: flex;
    gap: 16px;
    align-items: center;

    :deep(.nav-link) {
      padding-bottom: 0;
      line-height: 1;
      border-bottom: none;
    }
  }
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
</style>
