<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "info";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const buttonClasses = computed(() => ({
  "action-btn-primary": props.variant === "primary",
  "action-btn-secondary": props.variant === "secondary",
  "info-btn": props.variant === "info",
}));
</script>

<style lang="scss" scoped>
action-btn-primary {
  width: 288px;
  height: 32px;
  font-weight: vars.$fw-medium;
  color: vars.theme-color("opposite-color");
  background-color: vars.theme-color("main-color");
  border: 4px solid black;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: vars.theme-color("main-color");
    background-color: vars.theme-color("opposite-color");
  }
}

action-btn-secondary {
  width: 288px;
  height: 32px;
  font-weight: vars.$fw-medium;
  color: vars.theme-color("main-color");
  background-color: vars.theme-color("opposite-color");
  border: 4px solid black;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: vars.theme-color("opposite-color");
    background-color: vars.theme-color("main-color");
  }
}

.info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 52px;
  padding: 0 1em;
  font-weight: vars.$fw-bold;
  color: vars.theme-color("opposite-color");
  text-align: center;
  background-color: vars.theme-color("main-color");
  border: 2px solid vars.theme-color("opposite-color");
  border-radius: 6px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    color: vars.theme-color("main-color");
    background-color: vars.theme-color("opposite-color");
  }

  &:focus-visible {
    outline: 2px solid vars.theme-color("accent-color");
    outline-offset: 2px;
  }
}
</style>
