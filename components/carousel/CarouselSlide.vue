<template>
  <div class="carousel-slide">
    <img
      :src="image.src"
      :alt="image.alt || `Slide ${image.id}`"
      loading="lazy"
      class="slide-image"
    />
    <div class="slide-content-overlay">
      <div class="slide-info">
        <h3
          v-if="image.name"
          class="slide-title"
        >
          {{ image.name }}
        </h3>
        <p
          v-if="image.price"
          class="slide-price"
        >
          {{ formattedPrice }}
        </p>
        <NuxtLink
          v-if="image.productLink"
          :to="image.productLink"
        >
          <BaseButton
            class="slide-view-button"
            variant="info"
          >
            View Product
          </BaseButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CarouselImage } from "~/types/CarouselImage";

const props = defineProps<{
  image: CarouselImage;
}>();

const formattedPrice = computed(() => {
  if (props.image.price !== undefined) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(props.image.price);
  }
  return "";
});
</script>

<style scoped lang="scss">
.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slide-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 20px;

  @media (max-width: $breakpoints-m) {
    padding: 10px;
  }

  @media (max-width: $breakpoints-s) {
    padding: 10px;

    align-items: flex-end;
    justify-content: flex-start;
  }
}

.slide-info {
  color: theme-color("opposite-color");
  max-width: 50%;
  text-shadow: -1px -1px 0 theme-color("main-color"),
    1px -1px 0 theme-color("main-color"), -1px 1px 0 theme-color("main-color"),
    1px 1px 0 theme-color("main-color");

  .slide-title {
    font-size: 2rem;
    font-weight: $fw-medium;
    margin-bottom: 0.1em;
    line-height: 42px;
  }

  .slide-price {
    font-size: 1.5rem;
    font-weight: $fw-medium;
    margin-bottom: 0.5em;
  }

  @media (max-width: $breakpoints-l) {
    .slide-title {
      font-size: 1.75rem;
    }
    .slide-price {
      font-size: 1.25rem;
    }
  }

  @media (max-width: $breakpoints-m) {
    max-width: 70%;
    line-height: 32px;
    .slide-title {
      font-size: 1.5rem;
      margin-bottom: 0.1em;
    }
    .slide-price {
      font-size: 1.1rem;
      margin-bottom: 0.3em;
    }
  }

  @media (max-width: $breakpoints-s) {
    max-width: 85%;
    margin-left: 0;
    margin-right: 0;
    text-align: left;

    .slide-title {
      display: block;
      width: auto;
      margin-bottom: 0.9em;
    }
    .slide-price {
      display: block;
      width: auto;
      margin-bottom: 0.9em;
    }
    .slide-view-button {
      display: block;
      width: auto;
      margin-bottom: 46px;
    }
  }
}

.slide-view-button {
  text-shadow: none;

  @media (max-width: $breakpoints-l) {
    height: 38px;
    width: 140px;
    font-size: 0.9rem;
  }

  @media (max-width: $breakpoints-m) {
    height: 32px;
    width: 120px;
    font-size: 0.75rem;
    margin-bottom: 2rem;
  }

  @media (max-width: $breakpoints-s) {
    height: 32px;
    width: 100%;
    max-width: 120px;
    font-size: 0.8rem;
  }
}
</style>
