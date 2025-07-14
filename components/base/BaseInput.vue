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
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="base-input"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: string;
  placeholder?: string;
  iconName?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  iconName: "",
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
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

.input-wrapper.has-icon .base-input {
  padding-left: 48px;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  color: theme-color("gray-dark-color");
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
