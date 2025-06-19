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
  font-weight: 500;
  color: theme-color("opposite-color");
  background-color: theme-color("main-color");

  height: 32px;
  width: 288px;
  border: 4px solid black;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: theme-color("main-color");
    background-color: theme-color("opposite-color");
  }
}

action-btn-secondary {
  font-weight: 500;
  color: theme-color("main-color");
  background-color: theme-color("opposite-color");

  height: 32px;
  width: 288px;
  border: 4px solid black;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: theme-color("opposite-color");
    background-color: theme-color("main-color");
  }
}

.info-btn {
  font-weight: $fw-bold;
  color: theme-color("opposite-color");
  background-color: theme-color("main-color");

  height: 52px;
  width: 192px;
  border: 2px solid theme-color("opposite-color");
  border-radius: 6px;
  padding: 0 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    color: theme-color("main-color");
    background-color: theme-color("opposite-color");
  }
  &:focus-visible {
    outline: 2px solid theme-color("accent-color");
    outline-offset: 2px;
  }
}
</style>
