<template>
  <div class="reset-password-page">
    <div class="reset-password-page__container">
      <ClientOnly>
        <h1 class="reset-password-page__title">
          {{ pageTitle }}
        </h1>
      </ClientOnly>
      <p class="reset-password-page__text">
        If you've forgotten your password, enter your e-mail
        <br class="reset-password-page__br--mobile" />
        address and we'll send you an e-mail
        <br class="reset-password-page__br--desktop" />
      </p>

      <AuthResetPasswordForm @success="handleFormSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { definePageMeta, useSeoMeta, useAppBreakpoints } from "#imports";
import { useNotificationStore } from "~/stores/notification";
import { NotificationTypeEnum } from "~/types/Notification";

definePageMeta({
  middleware: "guest",
});

useSeoMeta({
  title: "Reset Your Password | SHOPEE",
  description:
    "Forgot your password? Enter your email address to receive a link to reset your password and regain access to your SHOPEE account.",
});

const { isMobile } = useAppBreakpoints();

const { showNotification } = useNotificationStore();

const pageTitle = computed(() => {
  if (isMobile.value) return `Lost password`;
  return `Have you Forgotten Your Password\u00A0?`;
});

const handleFormSuccess = () => {
  showNotification(
    "We've sent a password reset link to your email.",
    NotificationTypeEnum.SUCCESS,
  );
};
</script>

<style scoped lang="scss">
.reset-password-page {
  display: flex;
  justify-content: center;
  padding: 0 16px 40px;
}

.reset-password-page__container {
  width: 100%;
  max-width: 580px;
  margin-top: 96px;
  text-align: center;

  @media (min-width: ($breakpoints-xl + 1px)) {
    margin-top: 128px;
  }
}

.reset-password-page__title {
  margin-bottom: 40px;
  font-family: "DM Sans", sans-serif;
  font-size: 34px;
  font-weight: $fw-medium;
  line-height: 44px;
}

.reset-password-page__text {
  margin-bottom: 76px;
  font-size: 16px;
  line-height: 1.6;
  text-align: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    display: inline-block;
    margin-bottom: 48px;
  }
}

.reset-password-page__br--mobile {
  display: none;
}

.reset-password-page__br--desktop {
  display: block;
}

@media (max-width: ($breakpoints-m - 1px)) {
  .reset-password-page__br--mobile {
    display: block;
  }

  .reset-password-page__br--desktop {
    display: none;
  }
}
</style>
