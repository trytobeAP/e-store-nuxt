<template>
  <Transition name="slide-down">
    <div
      v-if="message && mode === 'fixed'"
      class="notification-wrapper-fixed"
      role="alert"
    >
      <div
        class="notification"
        :class="notificationClasses"
      >
        <div class="notification__content">
          <Icon
            :name="iconName"
            class="notification__icon"
          />
          <span class="notification__text">{{ message }}</span>
        </div>
        <NuxtLink
          v-if="actionLink"
          :to="actionLink"
          class="notification__action-link"
        >
          {{ actionText }}
        </NuxtLink>
      </div>
    </div>
  </Transition>

  <div
    v-if="message && mode === 'inline'"
    class="notification notification--inline"
    :class="notificationClasses"
    role="alert"
  >
    <div class="notification__content">
      <Icon
        :name="iconName"
        class="notification__icon"
      />
      <span class="notification__text">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  NotificationTypeEnum,
  type NotificationMode,
} from "~/types/Notification";

const props = withDefaults(
  defineProps<{
    message: string;
    type?: NotificationTypeEnum;
    mode?: NotificationMode;
    actionLink?: string;
    actionText?: string;
  }>(),
  {
    type: NotificationTypeEnum.INFO,
    mode: "fixed",
    actionLink: "",
    actionText: "VIEW",
  },
);

const notificationClasses = computed(() => ({
  [`type--${props.type}`]: true,
}));

const iconName = computed(() => {
  switch (props.type) {
    case NotificationTypeEnum.ERROR:
      return "mdi:alert-circle-outline";
    case NotificationTypeEnum.SUCCESS:
      return "mdi:check-circle-outline";
    default:
      return "mdi:information-outline";
  }
});
</script>

<style scoped lang="scss">
.notification-wrapper-fixed {
  position: fixed;
  top: 16px;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
  border-radius: 4px;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1248px;
  padding: 18px 24px;
  margin: 0 24px;
  pointer-events: auto;
  background-color: theme-color("notification-bg-color");
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}

.notification--inline {
  max-width: 100%;
  padding: 12px 16px;
  margin: 0;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: none;

  &.type--error {
    color: theme-color("error-color");
    background-color: rgb(216 39 0 / 10%);
    border-color: theme-color("error-color");
  }

  &.type--success {
    color: green;
    background-color: rgb(0 128 0 / 10%);
    border-color: green;
  }
}

.notification__content {
  display: flex;
  gap: 12px;
  align-items: center;
}

.notification__icon {
  flex-shrink: 0;
  font-size: 24px;
}

.notification__text {
  font-size: 14px;
  color: theme-color("opposite-color");
}

.notification--inline .notification__text {
  color: inherit;
}

.notification__action-link {
  font-size: 14px;
  font-weight: $fw-bold;
  color: theme-color("accent-color");
  white-space: nowrap;
  text-decoration: none;
}

.type--success .notification__icon {
  color: theme-color("accent-color");
}

.type--error .notification__icon {
  color: theme-color("error-color");
}

.notification--inline.type--error .notification__icon {
  color: inherit;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(calc(-100% - 16px));
}
</style>
