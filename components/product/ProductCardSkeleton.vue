<template>
  <div class="skeleton-card">
    <div class="skeleton-image" />
    <div class="skeleton-text skeleton-title" />
    <div class="skeleton-text skeleton-price" />
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  width: 100%;
  text-align: center;
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

.skeleton-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 24px;
  background-color: theme-color("gray-light-color");
  border-radius: 8px;
  animation: pulse-opacity 1.5s infinite ease-in-out;
}

.skeleton-text {
  height: 16px;
  margin: 0 auto 8px;
  background-color: theme-color("gray-light-color");
  border-radius: 4px;
  animation: pulse-opacity 1.5s infinite ease-in-out;
}

.skeleton-title {
  width: 80%;
}

.skeleton-price {
  width: 40%;
  margin-bottom: 0;
}
</style>
