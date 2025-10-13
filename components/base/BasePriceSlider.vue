<template>
  <div class="price-slider-wrapper">
    <div
      ref="sliderRef"
      class="price-slider"
    />

    <div class="slider-label">
      <span>Price: ${{ modelValue[0] }} - ${{ modelValue[1] }}</span>

      <button
        v-if="isNotEmpty"
        class="reset-button"
        @click="resetSlider"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import noUiSlider from "nouislider";
import type { API as NoUiSliderAPI } from "nouislider";

const props = withDefaults(
  defineProps<{
    min?: number;
    max?: number;
    modelValue: [number, number];
  }>(),
  {
    min: 0,
    max: 1500,
  },
);
const emit = defineEmits(["update:modelValue"]);

const sliderRef = ref<HTMLElement | null>(null);
const sliderInstance = ref<NoUiSliderAPI | null>(null);

const isNotEmpty = computed(() => {
  return props.modelValue[0] > props.min || props.modelValue[1] < props.max;
});

const resetSlider = () => {
  if (sliderInstance.value) {
    sliderInstance.value.set([props.min, props.max]);
  }
};

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
    const [minVal, maxVal] = values.map(Number) as [number, number];
    emit("update:modelValue", [minVal, maxVal]);
  });
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (
      sliderInstance.value &&
      JSON.stringify(newValue) !== JSON.stringify(oldValue)
    ) {
      sliderInstance.value.set(newValue);
    }
  },
  { deep: true },
);

watch(
  () => props.max,
  (newMax) => {
    if (sliderInstance.value && newMax !== undefined) {
      sliderInstance.value.updateOptions(
        {
          range: {
            min: props.min,
            max: newMax,
          },
        },
        false,
      );
    }
  },
);

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
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  color: theme-color("gray-dark-color");
}

.reset-button {
  padding: 0;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: $fw-regular;
  line-height: 22px;
  color: theme-color("accent-color");
  cursor: pointer;
  background: none;
  border: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}
</style>
