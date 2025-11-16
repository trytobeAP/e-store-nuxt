<template>
  <div class="carousel-slide">
    <NuxtImg
      class="slide-image"
      format="webp"
      placeholder
      :sizes="HERO_CAROUSEL_IMAGE_SIZES"
      :src="image.src"
      :alt="image.alt || `Slide ${image.id}`"
      :priority="isFirst"
      :fetchpriority="isFirst ? 'high' : 'auto'"
      :loading="isFirst ? 'eager' : 'lazy'"
    />
    <div class="slide-content-overlay">
      <div class="slide-info">
        <h3
          v-if="image.title"
          class="slide-title"
        >
          {{ image.title }}
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
import { HERO_CAROUSEL_IMAGE_SIZES } from "~/constants/imageSizes";

const props = defineProps<{
  image: CarouselImage;
  isActive: boolean;
  isFirst: boolean;
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
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (max-width: $breakpoints-m) {
    padding: 10px;
  }

  @media (max-width: $breakpoints-s) {
    align-items: flex-end;
    justify-content: flex-start;
    padding: 10px;
  }
}

.slide-info {
  max-width: 50%;
  color: theme-color("opposite-color");
  text-shadow:
    -1px -1px 0 theme-color("main-color"),
    1px -1px 0 theme-color("main-color"),
    -1px 1px 0 theme-color("main-color"),
    1px 1px 0 theme-color("main-color");

  .slide-title {
    margin-bottom: 0.1em;
    font-size: 2rem;
    font-weight: $fw-medium;
    line-height: 42px;
  }

  .slide-price {
    margin-bottom: 0.5em;
    font-size: 1.5rem;
    font-weight: $fw-medium;
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
      margin-bottom: 0.1em;
      font-size: 1.5rem;
    }

    .slide-price {
      margin-bottom: 0.3em;
      font-size: 1.1rem;
    }
  }

  @media (max-width: $breakpoints-s) {
    max-width: 85%;
    margin-right: 0;
    margin-left: 0;
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
    width: 140px;
    height: 38px;
    font-size: 0.9rem;
  }

  @media (max-width: $breakpoints-m) {
    width: 120px;
    height: 32px;
    margin-bottom: 2rem;
    font-size: 0.75rem;
  }

  @media (max-width: $breakpoints-s) {
    width: 100%;
    max-width: 120px;
    height: 32px;
    font-size: 0.8rem;
  }
}
</style>
