<template>
  <div
    ref="selectWrapper"
    class="custom-select"
    :class="{ 'is-open': isOpen }"
  >
    <button
      class="select-trigger"
      :class="{ 'has-value': !!modelValue }"
      @click="toggleDropdown"
    >
      {{ selectedLabel }}
      <span class="icon-wrapper">
        <span
          v-if="clearable && modelValue"
          class="icon-btn clear-btn"
          @click.stop="clearSelection"
        >
          <Icon
            name="local-custom:cross-thick"
            size="12"
          />
        </span>
        <span
          v-else
          class="icon-btn select-arrow"
        >
          <Icon
            name="local-custom:arrow-corner-down"
            size="8"
          />
        </span>
      </span>
    </button>

    <Transition name="fade">
      <ul
        v-if="isOpen"
        class="select-options"
      >
        <li
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="{ 'is-selected': modelValue === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { SelectOption } from "~/types/SelectOption";

const props = defineProps<{
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  clearable?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
  (e: "clear"): void;
}>();

const isOpen = ref(false);
const selectWrapper = ref(null);

onClickOutside(selectWrapper, () => (isOpen.value = false));

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: SelectOption) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const clearSelection = () => {
  emit("clear");
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected ? selected.label : props.placeholder || "Select...";
});
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px;
  font-size: 16px;
  color: theme-color("opposite-color");
  text-align: left;
  cursor: pointer;
  background-color: theme-color("main-color");
  border: 1px solid theme-color("gray-color");
  border-radius: 4px;

  &.has-value {
    color: theme-color("opposite-color");
  }
}

.is-open .select-trigger {
  border-color: theme-color("accent-color");
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.icon-btn {
  position: absolute;
  top: 50%;
  right: 16px;
  display: flex;
  align-items: center;
  color: theme-color("opposite-color");
}

.select-arrow {
  transform: translateY(-50%);
}

.clear-btn {
  transform: translateY(-50%) translateX(-2px);

  &:hover {
    color: theme-color("accent-color");
  }
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  list-style: none;
  background-color: theme-color("main-color");
  border: 1px solid theme-color("accent-color");
  border-top: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.select-option {
  padding: 12px 16px;
  color: theme-color("opposite-color");
  cursor: pointer;

  &:hover {
    background-color: theme-color("gray-light-color");

    [data-theme="dark"] & {
      background-color: theme-color("gray-theme-complimentary-color");
    }
  }

  &.is-selected {
    font-weight: $fw-bold;
    color: theme-color("accent-color");
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
