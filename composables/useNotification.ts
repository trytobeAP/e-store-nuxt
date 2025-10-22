import { ref, readonly } from "vue";
import { NotificationTypeEnum } from "~/types/Notification";

const message = ref<string>("");
const type = ref<NotificationTypeEnum | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

export function useNotification(duration = 3000) {
  function show(newMessage: string, newType: NotificationTypeEnum) {
    if (timer) {
      clearTimeout(timer);
    }

    message.value = newMessage;
    type.value = newType;

    timer = setTimeout(() => {
      hide();
    }, duration);
  }

  function hide() {
    message.value = "";
    type.value = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  return {
    notificationMessage: readonly(message),
    notificationType: readonly(type),
    showNotification: show,
    hideNotification: hide,
  };
}
