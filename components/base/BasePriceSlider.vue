<template>
  <div class="price-slider-wrapper">
    <div
      ref="sliderRef"
      class="price-slider"
    />

    <div class="slider-label">
      <span>Price: ${{ currentValues[0] }} - ${{ currentValues[1] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import noUiSlider from "nouislider";
import type { API as NoUiSliderAPI } from "nouislider";

const props = withDefaults(
  defineProps<{
    min?: number;
    max?: number;
    modelValue: [number, number];
    showFilterButton?: boolean;
  }>(),
  {
    min: 0,
    max: 1500,
    showFilterButton: false,
  },
);
const emit = defineEmits(["update:modelValue"]);

const sliderRef = ref<HTMLElement | null>(null);
const sliderInstance = ref<NoUiSliderAPI | null>(null);
const currentValues = ref<[number, number]>([...props.modelValue]);

onMounted(() => {
  if (!sliderRef.value) return;

  sliderInstance.value = noUiSlider.create(sliderRef.value, {
    start: props.modelValue,
    connect: true,
    range: {
      min: props.min,
      max: props.max,
    },
    step: 1,
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  sliderInstance.value.on("update", (values) => {
    const [minVal, maxVal] = values.map(Number);
    currentValues.value = [minVal, maxVal];
    emit("update:modelValue", currentValues.value);
  });
});

onUnmounted(() => {
  if (sliderInstance.value) {
    sliderInstance.value.destroy();
  }
});
</script>

<style lang="scss">
.price-slider-wrapper {
  padding-top: 10px;

  /* stylelint-disable selector-class-pattern */
  .noUi-target {
    height: 2px;
    background: theme-color("gray-theme-complimentary-color");
    border: none;
    box-shadow: none;
  }

  .noUi-connect {
    background: theme-color("opposite-color");
  }

  .noUi-handle {
    top: -7px !important;
    right: -1px !important;
    width: 2px !important;
    height: 16px !important;
    cursor: pointer;
    background: theme-color("opposite-color");
    border: none;
    border-radius: 0;
    box-shadow: none;

    &::before,
    &::after {
      display: none;
    }

    /* stylelint-enable selector-class-pattern */
  }
}

.slider-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 14px;
  color: theme-color("gray-dark-color");
}

.filter-button {
  font-size: 14px;
  font-weight: $fw-bold;
  color: theme-color("accent-color");
  cursor: pointer;
  background: none;
  border: none;
}
</style>
