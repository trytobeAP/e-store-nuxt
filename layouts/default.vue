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
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      mode="fixed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { NotificationTypeEnum } from "~/types/Notification";
import AppSidebar from "~/components/layout/AppSidebar.vue";
import { useBodyScrollLock } from "~/composables/useBodyScrollLock";
import { createSidebarState } from "~/composables/useSidebar";

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = createSidebarState();

useBodyScrollLock(isSidebarOpen);

const authStore = useAuthStore();
const notificationMessage = ref("");
const notificationType = ref<NotificationTypeEnum>(NotificationTypeEnum.INFO);
let notificationTimer: ReturnType<typeof setTimeout> | null = null;

const showNotification = (message: string, type: NotificationTypeEnum) => {
  notificationMessage.value = message;
  notificationType.value = type;

  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notificationTimer = setTimeout(() => {
    notificationMessage.value = "";
  }, 3000);
};

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

onUnmounted(() => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
});
</script>

<style lang="scss" scoped>
.page-contant-slot {
  color: theme-color("opposite-color");
}
</style>
