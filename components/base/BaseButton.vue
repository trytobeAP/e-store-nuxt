<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "info" | "toggle";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const buttonClasses = computed(() => ({
  "action-btn-primary": props.variant === "primary",
  "action-btn-secondary": props.variant === "secondary",
  "info-btn": props.variant === "info",
  "toggle-btn": props.variant === "toggle",
}));
</script>

<style lang="scss" scoped>
.action-btn-primary {
  width: 188px;
  height: 52px;
  font-weight: $fw-medium;
  color: theme-color("opposite-color");
  background-color: theme-color("main-color");
  border: 2px solid theme-color("opposite-color");
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: theme-color("main-color");
    background-color: theme-color("opposite-color");
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    width: 100%;
    max-width: 320px;
    height: 48px;
  }
}

.action-btn-secondary {
  width: 288px;
  height: 52px;
  font-weight: $fw-medium;
  color: theme-color("main-color");
  background-color: theme-color("opposite-color");
  border: 2px solid theme-color("opposite-color");
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    color: theme-color("opposite-color");
    background-color: theme-color("main-color");
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    width: 100%;
    max-width: 320px;
    height: 48px;
  }
}

.info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 52px;
  padding: 0 1em;
  font-weight: $fw-bold;
  color: theme-color("opposite-color");
  text-align: center;
  background-color: theme-color("main-color");
  border: 2px solid theme-color("opposite-color");
  border-radius: 6px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

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

  @media (max-width: ($breakpoints-m - 1px)) {
    width: 160px;
    height: 48px;
    font-size: 0.9rem;
  }
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: theme-color("gray-light-color");
  border: none;
  border-radius: 50%;
}
</style>
