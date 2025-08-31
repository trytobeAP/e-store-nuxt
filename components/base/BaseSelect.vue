<template>
  <div class="select-wrapper">
    <select
      v-model="selectedValue"
      class="base-select"
      :class="{
        'has-value': !!modelValue,
        'is-clearable': clearable && modelValue,
      }"
    >
      <option
        v-if="placeholder"
        value=""
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <button
      v-if="clearable && modelValue"
      class="icon-btn clear-btn"
      aria-label="Clear selection"
      @click.prevent="$emit('clear')"
    >
      <ClientOnly>
        <Icon
          name="mdi:close"
          size="20"
        />
      </ClientOnly>
    </button>

    <span
      v-else
      class="icon-btn select-icon"
    >
      <ClientOnly>
        <Icon
          name="mdi:chevron-down"
          size="20"
        />
      </ClientOnly>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface SelectOption {
  value: string | number;
  label: string;
}

const props = defineProps<{
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  clearable?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "clear"): void;
}>();

const selectedValue = computed({
  get() {
    return props.modelValue ?? "";
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  width: 100%;
}

.base-select {
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px;
  font-size: 16px;
  color: theme-color("gray-dark-color");
  appearance: none;
  cursor: pointer;
  background-color: theme-color("main-color");
  border: 1px solid theme-color("gray-color");
  border-radius: 8px;
  transition: padding-right 0.2s ease;

  &.has-value {
    color: theme-color("opposite-color");
  }

  &.is-clearable {
    padding-right: 40px;
  }
}

.icon-btn {
  position: absolute;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: theme-color("gray-dark-color");
  transform: translateY(-50%);
}

.select-icon {
  right: 12px;
  pointer-events: none;
}

.clear-btn {
  right: 12px;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: theme-color("opposite-color");
  }
}
</style>
