<template>
  <label class="toggle-wrapper">
    <span class="toggle-label"><slot /></span>
    <input
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
const model = defineModel<boolean>();
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
  width: 50px;
  height: 28px;
  background-color: theme-color("gray-color");
  border-radius: 14px;
  transition: background-color 0.2s ease;
}

.toggle-switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background-color: theme-color("white-color");
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.toggle-input:checked + .toggle-switch-bg {
  background-color: theme-color("accent-color");
}

.toggle-input:checked + .toggle-switch-bg .toggle-switch-handle {
  transform: translateX(22px);
}
</style>
