<template>
  <div class="carousel-container-wrapper">
    <div
      v-if="images && images.length > 0"
      class="carousel"
      tabindex="0"
      role="region"
      :aria-label="ariaLabel || 'Image carousel'"
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @keydown.left.prevent="prevSlide"
      @keydown.right.prevent="nextSlide"
    >
      <div
        ref="viewportRef"
        class="carousel-viewport"
        :style="{
          transform: `translateX(${currentTranslationX}px)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        }"
      >
        <CarouselSlide
          v-for="(image, indexValue) in images"
          :key="image.id"
          :image="image"
          :is-active="indexValue === currentSlideIndex"
          :is-first="indexValue === 0"
          :aria-label="
            image.alt || `Slide ${indexValue + 1} of ${images.length}`
          "
          :aria-hidden="currentSlideIndex !== indexValue"
        />
      </div>
      <div
        v-if="showIndicators && images.length > 1"
        class="carousel-indicators"
      >
        <CarouselIndicator
          v-for="(image, indexValue) in images"
          :key="`indicator-${image.id}`"
          :active="indexValue === currentSlideIndex"
          :index="indexValue"
          :aria-label="`Go to slide ${indexValue + 1}`"
          @select="goToSlide(indexValue)"
        />
      </div>
    </div>
    <div
      v-else
      class="carousel-no-images-message"
    >
      No images to display.
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  type Ref,
} from "vue";
import type { CarouselImage } from "~/types/CarouselImage";

interface Props {
  images: CarouselImage[];
  showIndicators?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  ariaLabel?: string;
  initialSlide?: number;
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showIndicators: true,
  autoplay: false,
  autoplayInterval: 5000,
  initialSlide: 0,
  emptyMessage: "No images to display.",
});

const currentSlideIndex = ref(0);

const numImages = computed(() => props.images?.length || 0);
const viewportRef = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
let resizeObserver: ResizeObserver | null = null;

const isDragging = ref(false);
const touchStartX = ref(0);
const dragOffsetX = ref(0);
const isPointerDown = ref(false);
const dragThreshold = 50;

const baseTranslateX = computed(() => {
  if (numImages.value === 0 || !viewportWidth.value) {
    return 0;
  }
  const translation = -currentSlideIndex.value * viewportWidth.value;

  return translation;
});

const currentTranslationX = computed(() => {
  const finalTranslation = baseTranslateX.value + dragOffsetX.value;

  return finalTranslation;
});

const nextSlide = () => {
  if (numImages.value === 0) return;
  currentSlideIndex.value = (currentSlideIndex.value + 1) % numImages.value;
};

const prevSlide = () => {
  if (numImages.value === 0) return;
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + numImages.value + numImages.value) %
    numImages.value;
};

const goToSlide = (index: number) => {
  if (numImages.value === 0) return;
  if (index >= 0 && index < numImages.value) {
    currentSlideIndex.value = index;
  }
};

const handlePointerDown = (clientX: number) => {
  if (numImages.value === 0) return;
  isPointerDown.value = true;
  isDragging.value = true;
  touchStartX.value = clientX;
  dragOffsetX.value = 0;
  stopAutoplay();
};

const handlePointerMove = (clientX: number) => {
  if (!isPointerDown.value || numImages.value === 0) return;
  const currentX = clientX;
  dragOffsetX.value = currentX - touchStartX.value;
};

const handlePointerUp = () => {
  if (!isPointerDown.value || numImages.value === 0) return;
  isPointerDown.value = false;
  const finalDragOffset = dragOffsetX.value;

  if (Math.abs(finalDragOffset) > dragThreshold) {
    if (finalDragOffset < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
  nextTick(() => {
    dragOffsetX.value = 0;
    isDragging.value = false;
  });
  startAutoplay();
};

// Touch events
const handleTouchStart = (event: TouchEvent) =>
  handlePointerDown(event.touches[0].clientX);
const handleTouchMove = (event: TouchEvent) =>
  handlePointerMove(event.touches[0].clientX);
const handleTouchEnd = () => handlePointerUp();

// Mouse events
const handleMouseDown = (event: MouseEvent) => {
  handlePointerDown(event.clientX);
  event.preventDefault();
};
const handleMouseMove = (event: MouseEvent) => handlePointerMove(event.clientX);
const handleMouseUp = () => handlePointerUp();
const handleMouseLeave = () => {
  if (isPointerDown.value) {
    handlePointerUp();
  }
};

const autoplayTimer: Ref<ReturnType<typeof setInterval> | null> = ref(null);

const startAutoplay = () => {
  if (props.autoplay && numImages.value > 1) {
    stopAutoplay();
    autoplayTimer.value = setInterval(nextSlide, props.autoplayInterval);
  }
};

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value);
    autoplayTimer.value = null;
  }
};

watch(
  () => props.autoplay,
  (newVal) => {
    if (newVal) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  },
);

watch(currentSlideIndex, (newIndex, oldIndex) => {
  if (newIndex !== oldIndex) {
    dragOffsetX.value = 0;
    isDragging.value = false;
  }
  if (props.autoplay) {
    startAutoplay();
  }
});

watch(
  () => props.images,
  (newImagesArray) => {
    const newNumImages = newImagesArray?.length || 0;

    if (newNumImages > 0) {
      let targetSlide = props.initialSlide;
      if (props.initialSlide < 0 || props.initialSlide >= newNumImages) {
        targetSlide = 0;
      }

      if (viewportWidth.value > 0) {
        if (
          currentSlideIndex.value !== targetSlide ||
          currentSlideIndex.value >= newNumImages
        ) {
          currentSlideIndex.value = targetSlide;
        }
      }
      startAutoplay();
    } else {
      currentSlideIndex.value = 0;
      stopAutoplay();
    }
  },
  { immediate: true, deep: true },
);

watch(viewportWidth, (newWidth, oldWidth) => {
  if (newWidth > 0 && props.images && props.images.length > 0) {
    let targetSlide = currentSlideIndex.value;

    if (
      oldWidth === 0 ||
      typeof oldWidth === "undefined" ||
      Math.abs(newWidth - (oldWidth || 0)) > 1
    ) {
      targetSlide = props.initialSlide;
      if (props.initialSlide < 0 || props.initialSlide >= numImages.value) {
        targetSlide = 0;
      }
    }
    if (targetSlide >= numImages.value) targetSlide = 0;

    if (currentSlideIndex.value !== targetSlide) {
      currentSlideIndex.value = targetSlide;
    }
  }
});

const updateViewportWidth = () => {
  if (viewportRef.value && viewportRef.value.offsetParent !== null) {
    const newWidth = viewportRef.value.offsetWidth;
    if (newWidth > 0) {
      if (viewportWidth.value !== newWidth) {
        viewportWidth.value = newWidth;
      }
    } else if (newWidth === 0 && viewportWidth.value !== 0) {
      console.warn(
        "updateViewportWidth: offsetWidth is 0. Carousel might be temporarily hidden.",
      );
    }
  } else {
    console.warn(
      "updateViewportWidth: viewportRef not available or not visible.",
    );
  }
};

onMounted(() => {
  nextTick(() => {
    updateViewportWidth();

    if (viewportRef.value && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]) {
          const newWidth = entries[0].contentRect.width;
          if (newWidth > 0 && viewportWidth.value !== newWidth) {
            viewportWidth.value = newWidth;
          }
        }
      });
      resizeObserver.observe(viewportRef.value);
    } else {
      console.warn(
        "ResizeObserver not available or viewportRef not ready, falling back to window resize for width.",
      );
      window.addEventListener("resize", updateViewportWidth);
    }
  });
});

onUnmounted(() => {
  stopAutoplay();
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener("resize", updateViewportWidth);
  }
});
</script>

<style scoped lang="scss">
.carousel-container-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1000 / 600;
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: ($breakpoints-l - 1px)) {
    aspect-ratio: 800 / 500;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    aspect-ratio: 600 / 500;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    aspect-ratio: 288 / 354;
  }
}

.carousel {
  width: 100%;
  height: 100%;
}

.carousel-viewport {
  display: flex;
  height: 100%;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;

  @media (max-width: $breakpoints-l) {
    aspect-ratio: 800 / 500;
    margin: 15px auto;
    border-radius: 12px;
  }

  @media (max-width: $breakpoints-m) {
    aspect-ratio: 600 / 500;
    margin: 15px auto;
    border-radius: 10px;
  }

  @media (max-width: $breakpoints-s) {
    aspect-ratio: 288 / 354;
    margin: 10px auto;
    border-radius: 8px;
  }
}

.no-images-message {
  padding: 40px;
  font-size: 1.2rem;
  color: theme-color("gray-dark-color");
  text-align: center;

  @media (max-width: $breakpoints-m) {
    padding: 25px;
    font-size: 1.1rem;
  }

  @media (max-width: $breakpoints-s) {
    padding: 15px;
    font-size: 1rem;
  }
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  z-index: 10;
  display: flex;
  padding: 8px 10px;
  background-color: rgb(0 0 0 / 30%);
  border-radius: 16px;
  transform: translateX(-50%);

  @media (max-width: $breakpoints-m) {
    bottom: 10px;
  }

  @media (max-width: $breakpoints-s) {
    bottom: 8px;
  }
}
</style>
