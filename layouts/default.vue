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
import { ref } from "vue";
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";

const isSidebarOpen = ref(false);

useBodyScrollLock(isSidebarOpen);

const openSidebar = () => {
  isSidebarOpen.value = true;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<style lang="scss" scoped>
.page-contant-slot {
  color: theme-color("opposite-color");
}
</style>
