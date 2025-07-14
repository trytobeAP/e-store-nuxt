<template>
  <div class="container">
    <HeaderComponent @open-sidebar="isSidebarOpen = true" />

    <main>
      <slot />
    </main>

    <FooterComponent />

    <AppSidebar
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppSidebar from "~/components/layout/AppSidebar.vue";

const isSidebarOpen = ref(false);
</script>
