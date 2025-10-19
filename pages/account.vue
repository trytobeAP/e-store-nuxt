<template>
  <div class="account-page">
    <div class="account-page__container">
      <h1 class="account-page__title"> My account </h1>

      <AuthTabs
        v-model:active-tab="activeTab"
        class="account-page__tabs"
      />

      <div class="account-page__form">
        <AuthLoginForm v-if="activeTab === 'login'" />
        <AuthRegisterForm v-if="activeTab === 'register'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { definePageMeta } from "#imports";
import type { AuthTab } from "~/types/AuthTab";

definePageMeta({
  middleware: "guest",
});

const activeTab = ref<AuthTab>("login");
</script>

<style scoped lang="scss">
.account-page {
  display: flex;
  justify-content: center;
}

.account-page__container {
  width: 100%;
  max-width: 500px;
  margin-top: 144px;
  margin-bottom: 246px;

  @media (max-width: ($breakpoints-l - 1px)) {
    max-width: 450px;
    margin-top: 78px;
    margin-bottom: 144px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    max-width: 100%;
    margin-top: 24px;
    margin-bottom: 92px;
  }
}

.account-page__title {
  margin-bottom: 64px;
  font-family: "DM Sans", sans-serif;
  font-size: 33px;
  font-weight: $fw-medium;
  text-align: center;

  @media (max-width: ($breakpoints-s - 1px)) {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: $fw-regular;
  }
}

.account-page__tabs {
  margin-bottom: 48px;
}

.account-page__form {
  max-width: 100%;

  @media (max-width: ($breakpoints-s - 1px)) {
    max-width: 288px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
