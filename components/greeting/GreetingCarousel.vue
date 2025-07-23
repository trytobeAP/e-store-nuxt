<template>
  <div>
    <div
      v-if="isLoading"
      class="greeting-loading"
    >
      Loading greetings...
    </div>
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

const { images, isLoading, error, fetchImages } = useCarouselImages({
  totalImages: 10,
  category: "watch",
  baseUrl: "https://via.assets.so/",
  params: "q=95&w=1000&h=600",
});

onMounted(() => {
  fetchImages();
});
</script>

<style scoped lang="scss">
.greeting-loading,
.greeting-error {
  padding: 40px;
  font-size: 1.2rem;
  color: vars.theme-color("gray-dark-color");
  text-align: center;
}
</style>
