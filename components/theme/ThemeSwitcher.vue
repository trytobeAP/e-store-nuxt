<template>
  <BaseButton
    variant="toggle"
    aria-label="Переключить тему"
    @click="toggleTheme"
  >
    <Icon
      :name="themeIcon"
      size="16"
    />
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "~/composables/useTheme";

const { theme, toggleTheme } = useTheme();

const themeIcon = computed(() => {
  return theme.value === "light" ? "mdi:weather-sunny" : "mdi:weather-night";
});
</script>
