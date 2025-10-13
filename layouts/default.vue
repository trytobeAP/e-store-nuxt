<template>
  <div class="container">
    <HeaderComponent @open-sidebar="openSidebar" />

    <main class="page-contant-slot">
      <slot />
    </main>

    <FooterComponent />

    <AppSidebar
      :is-open="isSidebarOpen"
      @close="closeSidebar"
    />
  </div>
</template>

<script setup lang="ts">
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";
import { createSidebarState } from "~/composables/useSidebar";

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = createSidebarState();

useBodyScrollLock(isSidebarOpen);
</script>

<style lang="scss" scoped>
.page-contant-slot {
  color: theme-color("opposite-color");
}
</style>
