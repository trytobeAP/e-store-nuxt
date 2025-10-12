<template>
  <div>
    <div
      v-if="isLoading"
      class="carousel-skeleton-wrapper"
    />

    <div
      v-else-if="error"
      class="greeting-error"
    >
      Could not load greeting images: {{ error }}
    </div>
    <Carousel
      v-else
      aria-label="Welcome Showcase"
      :images="images"
      :show-indicators="true"
      :autoplay="true"
      :autoplay-interval="5000"
      :initial-slide="0"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCarouselImages from "~/composables/carousel/useCarouselImages";

const { images, isLoading, error, fetchImages } = useCarouselImages();

onMounted(() => {
  fetchImages();
});
</script>

<style scoped lang="scss">
.carousel-skeleton-wrapper {
  width: 100%;
  aspect-ratio: 1000 / 600;
  background-color: theme-color("gray-light-color");
  animation: pulse-bg 1.5s infinite ease-in-out;

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

@keyframes pulse-bg {
  0% {
    background-color: theme-color("gray-light-color");
  }

  50% {
    background-color: theme-color("gray-color");
  }

  100% {
    background-color: theme-color("gray-light-color");
  }
}

.greeting-error {
  padding: 40px;
  font-size: 1.2rem;
  color: theme-color("gray-dark-color");
  text-align: center;
}
</style>
