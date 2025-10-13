<template>
  <div>
    <CarouselSkeleton v-if="isLoading" />

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
.greeting-error {
  padding: 40px;
  font-size: 1.2rem;
  color: theme-color("gray-dark-color");
  text-align: center;
}
</style>
