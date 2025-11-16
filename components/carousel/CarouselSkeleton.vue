<template>
  <div class="carousel-skeleton-wrapper" />
</template>

<style scoped lang="scss">
.carousel-skeleton-wrapper {
  width: 100%;
  aspect-ratio: 1000 / 600;
  background-color: theme-color("gray-light-color");
  border-radius: 16px;
  animation: pulse-opacity 1.5s infinite ease-in-out;

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

@keyframes pulse-opacity {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
</style>
