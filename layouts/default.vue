<template>
  <div class="container">
    <HeaderComponent @open-sidebar="openSidebar" />

    <main class="page-contant-slot">
      <slot />
    </main>

    <FooterComponent />

    <AppSidebar
      :is-open="isSidebarOpen"
      @close="closeSidebar"
    />

    <UtilsNotificationCustom
      mode="fixed"
      :message="notificationMessage"
      :type="notificationType!"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { NotificationTypeEnum } from "~/types/Notification";
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useAuthStore } from "~/stores/auth";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";
import { useNotification } from "~/composables/useNotification";
import { createSidebarState } from "~/composables/useSidebar";

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = createSidebarState();

const { notificationMessage, notificationType, showNotification } =
  useNotification();

useBodyScrollLock(isSidebarOpen);

const authStore = useAuthStore();

watch(
  () => authStore.isAuthenticated,
  (isNowAuthenticated, wasPreviouslyAuthenticated) => {
    if (wasPreviouslyAuthenticated && !isNowAuthenticated) {
      showNotification(
        "You have been successfully logged out.",
        NotificationTypeEnum.SUCCESS,
      );
    }
  },
);
</script>

<style lang="scss" scoped>
.page-contant-slot {
  color: theme-color("opposite-color");
}
</style>
