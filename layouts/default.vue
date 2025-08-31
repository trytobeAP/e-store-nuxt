<template>
  <div class="container">
    <HeaderComponent @open-sidebar="mainMenuSidebar.open()" />

    <main class="page-contant-slot">
      <slot />
    </main>

    <FooterComponent />

    <AppSidebar
      :is-open="mainMenuSidebar.isOpen.value"
      @close="mainMenuSidebar.close()"
    />
  </div>
</template>

<script setup lang="ts">
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";
import { createSidebarState } from "~/composables/useSidebar";

const mainMenuSidebar = createSidebarState();

useBodyScrollLock(mainMenuSidebar.isOpen);
</script>

<style lang="scss" scoped>
.page-contant-slot {
  color: theme-color("opposite-color");
}
</style>
