<template>
  <div>
    <Transition name="fade">
      <div
        v-if="message"
        class="notification"
        :class="notificationClasses"
        role="alert"
      >
        <ClientOnly>
          <Icon
            :name="iconName"
            class="notification-icon"
          />
        </ClientOnly>
        <span class="notification-text">{{ message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type NotificationType = "error" | "success" | "info";
type NotificationMode = "fixed" | "inline";

const props = withDefaults(
  defineProps<{
    message: string;
    type?: NotificationType;
    mode?: NotificationMode;
  }>(),
  {
    type: "info",
    mode: "fixed",
  },
);

const notificationClasses = computed(() => ({
  "is-fixed": props.mode === "fixed",
  "is-inline": props.mode === "inline",
  [`type--${props.type}`]: true,
}));

const iconName = computed(() => {
  switch (props.type) {
    case "error":
      return "mdi:alert-circle-outline";
    case "success":
      return "mdi:check-circle-outline";
    case "info":
    default:
      return "mdi:information-outline";
  }
});
</script>

<style scoped lang="scss">
.notification {
  display: flex;
  gap: 12px;
  align-items: center;
  max-width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 8px;
}

.notification-icon {
  flex-shrink: 0;
  font-size: 24px;
}

.is-fixed {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  max-width: 320px;
  color: theme-color("main-color");
  background-color: theme-color("opposite-color");
  border-color: theme-color("opposite-color");
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
}

.is-inline {
  box-sizing: border-box;
}

.type--error {
  color: theme-color("error-color");
  background-color: rgb(216 39 0 / 10%);
  border-color: theme-color("error-color");
}

.type--success {
  color: green;
  background-color: rgb(0 128 0 / 10%);
  border-color: green;
}

.type--info {
  color: #3498db;
  background-color: rgb(52 152 219 / 10%);
  border-color: #3498db;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
