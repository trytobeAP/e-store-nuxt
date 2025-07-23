<template>
  <label class="checkbox-wrapper">
    <input
      v-model="model"
      type="checkbox"
      class="checkbox-input"
    />
    <span class="checkbox-box" />
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
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
  border: 1px solid vars.theme-color("gray-dark-color");
  border-radius: 2px;
}

.checkbox-input:checked + .checkbox-box::after {
  position: absolute;
  left: 3px;
  width: 5px;
  height: 10px;
  content: "";
  border: solid vars.theme-color("opposite-color");
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 14px;
  color: vars.theme-color("opposite-color");
}
</style>
