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

    <UtilsNotificationFixed
      :message="notificationMessage"
      :type="notificationType!"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { NotificationTypeEnum } from "~/types/Notification";
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useAuthStore } from "~/stores/auth";
import { useNotificationStore } from "~/stores/notification";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";
import { createSidebarState } from "~/composables/useSidebar";

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = createSidebarState();

useBodyScrollLock(isSidebarOpen);

const authStore = useAuthStore();

const notificationStore = useNotificationStore();

const { message: notificationMessage, type: notificationType } =
  storeToRefs(notificationStore);

const { showNotification } = notificationStore;

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
