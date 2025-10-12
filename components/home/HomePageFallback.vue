<template>
  <div>
    <div class="carousel-skeleton-wrapper" />

    <section class="featured-products-section">
      <h1 class="page-title">Shop The Latest</h1>
      <ProductSkeletonList :items-count="6" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.carousel-skeleton-wrapper {
  width: 100%;
  aspect-ratio: 1000 / 600;
  background-color: theme-color("gray-light-color");
  border-radius: 16px;
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

.page-title {
  margin-top: 96px;
  margin-bottom: 38px;
  text-align: start;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 24px;
    margin-bottom: 16px;
  }
}

.featured-products-section {
  padding-top: 64px;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 48px;
  }
}
</style>
