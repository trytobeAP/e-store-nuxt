import { ref } from "vue";
import { defineStore } from "pinia";
import { NotificationTypeEnum } from "~/types/Notification";

export const useNotificationStore = defineStore("notification", () => {
  const message = ref("");
  const type = ref<NotificationTypeEnum | null>(null);

  let timer: ReturnType<typeof setTimeout> | null = null;

  function showNotification(
    newMessage: string,
    newType: NotificationTypeEnum,
    duration = 3000,
  ) {
    if (timer) {
      clearTimeout(timer);
    }

    message.value = newMessage;
    type.value = newType;

    timer = setTimeout(() => {
      hideNotification();
    }, duration);
  }

  function hideNotification() {
    message.value = "";
    type.value = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  return {
    message,
    type,
    showNotification,
    hideNotification,
  };
});
