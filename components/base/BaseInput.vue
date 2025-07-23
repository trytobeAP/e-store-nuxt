<template>
  <div
    class="input-wrapper"
    :class="{ 'has-icon': !!iconName }"
  >
    <Icon
      v-if="iconName"
      :name="iconName"
      size="24"
      class="input-icon"
      aria-hidden="true"
    />
    <input
      v-model="model"
      class="base-input"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
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
}

withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  iconName: "",
});

const model = defineModel<string | number>();
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
  color: vars.theme-color("opposite-color");
  background-color: vars.theme-color("gray-light-color");
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: vars.theme-color("gray-dark-color");
  }

  &:focus {
    outline: none;
    border-color: vars.theme-color("accent-color");
  }
}

.input-wrapper.has-icon .base-input {
  padding-left: 48px;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  color: vars.theme-color("gray-dark-color");
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
