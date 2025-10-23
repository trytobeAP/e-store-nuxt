import { storeToRefs } from "pinia";
import { useNotificationStore } from "~/stores/notification";

export function useNotification() {
  const notificationStore = useNotificationStore();

  const { message, type } = storeToRefs(notificationStore);

  const { showNotification, hideNotification } = notificationStore;

  return {
    notificationMessage: message,
    notificationType: type,
    showNotification,
    hideNotification,
  };
}
