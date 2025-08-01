<template>
  <div class="content">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

useTheme();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.content {
  margin-top: 16px;

  @media (min-width: $breakpoints-m) {
    margin-top: 32px;
  }

  @media (min-width: $breakpoints-l) {
    margin-top: 64px;
  }
}
</style>
