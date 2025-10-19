<template>
  <div
    class="input-wrapper"
    :class="[`variant-${variant}`, `icon-position-${iconPosition}`]"
  >
    <input
      v-model="model"
      class="base-input"
      :type="type"
      :placeholder="placeholder"
    />

    <component
      :is="iconAsButton ? 'button' : 'span'"
      class="icon-container"
      :class="{ 'clear-btn': iconAsButton }"
      :aria-label="iconAsButton ? 'Clear input' : undefined"
      :style="iconStyle"
      @click="iconAsButton ? clearInput() : null"
    >
      <Icon
        v-if="currentIconName"
        :name="currentIconName"
        :size="iconAsButton ? 20 : 24"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "file";

interface Props {
  type?: InputType;
  placeholder?: string;
  variant?: "default" | "line";
  iconName?: string;
  iconPosition?: "left" | "right";
  iconColor?: string;
  clearable?: boolean;
  clearIconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  variant: "default",
  iconName: "",
  iconPosition: "left",
  iconColor: undefined,
  clearable: false,
  clearIconName: "mdi:close",
});

const model = defineModel<string | number>();

const clearInput = () => {
  model.value = typeof model.value === "number" ? 0 : "";
};

const iconAsButton = computed(() => props.clearable && !!model.value);

const currentIconName = computed(() => {
  return iconAsButton.value ? props.clearIconName : props.iconName;
});

const iconStyle = computed(() => {
  return props.iconColor ? { color: props.iconColor } : {};
});
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
}

.base-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  color: theme-color("opposite-color");
  transition: all 0.2s ease;

  &::placeholder {
    color: theme-color("gray-dark-color");
  }

  &:focus {
    outline: none;
  }
}

.variant-line .base-input {
  height: 40px;
  padding: 0 32px 0 8px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid theme-color("gray-color");
  border-radius: 0;
}

.variant-default .base-input {
  padding: 0 48px;
  background-color: theme-color("gray-light-color");
  border: 1px solid transparent;
  border-radius: 8px;

  [data-theme="dark"] & {
    background-color: theme-color("gray-theme-complimentary-color");
  }
}

.variant-default .base-input:focus {
  border-color: theme-color("opposite-color");
}

.variant-line .base-input:focus {
  border-bottom-color: theme-color("opposite-color");
}

.icon-container {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  padding: 0;
  color: theme-color("gray-dark-color");
  background: none;
  border: none;
  transform: translateY(-50%);
}

.variant-default .icon-container {
  left: 14px;
}

.variant-line .icon-container {
  right: 0;
}

.icon-container.clear-btn {
  cursor: pointer;
}

.variant-default .icon-container.clear-btn {
  right: 14px;
  left: auto;
}

.icon-container:not(.clear-btn) {
  pointer-events: none;
}

.icon-container.clear-btn:hover {
  color: theme-color("opposite-color");
}
</style>
