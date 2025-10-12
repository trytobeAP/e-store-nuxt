<template>
  <section class="featured-products-section">
    <h1 class="page-title">Shop The Latest</h1>

    <div class="product-grid">
      <div
        v-for="n in 6"
        :key="`fallback-${n}`"
        class="product-grid-item"
      >
        <div class="skeleton-card">
          <div class="skeleton-image" />
          <div class="skeleton-text skeleton-title" />
          <div class="skeleton-text skeleton-price" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
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

.product-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.product-grid-item {
  margin: 0 12px 70px;

  @media (min-width: $breakpoints-l) {
    width: calc(100% / 3 - 24px);
  }

  @media (max-width: ($breakpoints-l - 1px)) {
    width: calc(100% / 2 - 24px);
    margin-bottom: 40px;
  }
}

.skeleton-card {
  width: 100%;
  text-align: center;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 24px;
  background-color: theme-color("gray-light-color");
  border-radius: 4px;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-text {
  height: 16px;
  margin: 0 auto 8px;
  background-color: theme-color("gray-light-color");
  border-radius: 4px;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-title {
  width: 80%;
}

.skeleton-price {
  width: 40%;
  margin-bottom: 0;
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
</style>
