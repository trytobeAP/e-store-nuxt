<template>
  <div
    class="input-wrapper"
    :class="[`icon-position-${iconPosition}`]"
  >
    <input
      v-model="model"
      class="base-input"
      :type="type"
      :placeholder="placeholder"
    />
    <ClientOnly>
      <button
        v-if="showClearIcon"
        class="icon-btn clear-btn"
        @click="clearInput"
      >
        <Icon
          name="mdi:close"
          size="20"
        />
      </button>

      <span
        v-else-if="iconName"
        class="icon-btn default-icon"
      >
        <Icon
          :name="iconName"
          size="24"
        />
      </span>
    </ClientOnly>
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
  iconName?: string;
  iconPosition?: "left" | "right";
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  iconName: "",
  clearable: false,
  iconPosition: "left",
});

const model = defineModel<string | number>();

function clearInput() {
  model.value = typeof model.value === "number" ? 0 : "";
}

const showClearIcon = computed(() => props.clearable && model.value);
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
}

.base-input {
  width: 100%;
  height: 48px;
  padding-right: 16px;
  padding-left: 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  color: theme-color("gray-dark-color");
  background-color: theme-color("gray-light-color");
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: theme-color("gray-dark-color");
  }

  &:focus {
    outline: none;
    border-color: theme-color("accent-color");
  }
}

.icon-position-left .base-input {
  padding-left: 48px;
}

.icon-position-right .base-input {
  padding-right: 48px;
}

.icon-btn {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  color: theme-color("gray-dark-color");
  transform: translateY(-50%);
}

.icon-position-left .icon-btn {
  left: 14px;
}

.icon-position-right .icon-btn {
  right: 12px;
}

.default-icon {
  pointer-events: none;
}

.clear-btn {
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: theme-color("accent-color");
  }
}
</style>
