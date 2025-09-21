<template>
  <BaseButton
    class="button-toggle"
    variant="toggle"
    aria-label="Переключить тему"
    @click="toggleTheme"
  >
    <Icon
      v-if="isMounted"
      :name="themeIcon"
      size="16"
    />
  </BaseButton>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useTheme } from "~/composables/useTheme";

const { theme, toggleTheme } = useTheme();

const themeIcon = computed(() => {
  return theme.value === "light" ? "mdi:weather-sunny" : "mdi:weather-night";
});

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<style lang="scss" scoped>
.button-toggle {
  cursor: pointer;
}
</style>
