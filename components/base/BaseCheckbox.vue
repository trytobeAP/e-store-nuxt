<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      class="checkbox-input"
      @change="onChange"
    />
    <span class="checkbox-box" />
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.checkbox-box {
  position: relative;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border: 1px solid theme-color("gray-dark-color");
  border-radius: 2px;
}

.checkbox-input:checked + .checkbox-box::after {
  position: absolute;
  left: 3px;
  width: 5px;
  height: 10px;
  content: "";
  border: solid theme-color("opposite-color");
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 14px;
  color: theme-color("opposite-color");
}
</style>
