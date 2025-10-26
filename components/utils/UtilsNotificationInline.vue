<template>
  <div
    class="notification notification--inline"
    role="alert"
    :class="notificationClasses"
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
import { NotificationTypeEnum } from "~/types/Notification";

const props = withDefaults(
  defineProps<{
    message: string;
    type?: NotificationTypeEnum;
  }>(),
  {
    type: NotificationTypeEnum.INFO,
  },
);

const notificationClasses = computed(() => `type--${props.type}`);

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
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  color: inherit;
}

.type--error .notification__icon {
  color: inherit;
}
</style>
