<template>
  <label
    class="toggle-wrapper"
    :for="id"
  >
    <span class="toggle-label"><slot /></span>
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      class="toggle-input"
    />
    <div class="toggle-switch-bg">
      <div class="toggle-switch-handle" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { useId } from "#imports";

const model = defineModel<boolean>();

const id = useId();
</script>

<style scoped lang="scss">
.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.toggle-label {
  font-size: 16px;
  color: theme-color("opposite-color");
}

.toggle-input {
  display: none;
}

.toggle-switch-bg {
  position: relative;
  width: 33px;
  height: 20px;
  background-color: theme-color("toggle-background-color");
  border-radius: 14px;
  transition: background-color 0.2s ease;

  @media (max-width: ($breakpoints-m - 1px)) {
    width: 42px;
    height: 25px;
  }
}

.toggle-switch-handle {
  position: absolute;
  top: 20%;
  left: 12%;
  width: 12px;
  height: 12px;
  background-color: theme-color("main-color");
  border-radius: 50%;
  transition: transform 0.2s ease;

  @media (max-width: ($breakpoints-m - 1px)) {
    left: 12%;
    width: 15px;
    height: 15px;
  }
}

.toggle-input:checked + .toggle-switch-bg {
  background-color: theme-color("accent-color");
}

.toggle-input:checked + .toggle-switch-bg .toggle-switch-handle {
  transform: translateX(13px);

  @media (max-width: ($breakpoints-m - 1px)) {
    transform: translateX(17px);
  }
}
</style>
