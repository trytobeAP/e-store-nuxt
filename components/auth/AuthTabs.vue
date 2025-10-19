<template>
  <div class="auth-tabs">
    <button
      class="auth-tabs__button"
      :class="{ 'auth-tabs__button--active': activeTab === 'login' }"
      @click="setActiveTab('login')"
    >
      Sign in
    </button>
    <button
      class="auth-tabs__button"
      :class="{ 'auth-tabs__button--active': activeTab === 'register' }"
      @click="setActiveTab('register')"
    >
      Register
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AuthTab } from "~/types/AuthTab";

defineProps<{
  activeTab: AuthTab;
}>();

const emit = defineEmits<{
  (e: "update:activeTab", value: AuthTab): void;
}>();

const setActiveTab = (tab: AuthTab) => {
  emit("update:activeTab", tab);
};
</script>

<style scoped lang="scss">
.auth-tabs {
  display: flex;
  width: 100%;
  padding: 4px;
  background-color: theme-color("gray-light-color");
  border-radius: 8px;

  [data-theme="dark"] & {
    background-color: theme-color("gray-theme-complimentary-color");
  }
}

.auth-tabs__button {
  flex-grow: 1;
  padding: 12px 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: $fw-medium;
  color: theme-color("opposite-color");
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &--active {
    background-color: theme-color("main-color");
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  }
}
</style>
