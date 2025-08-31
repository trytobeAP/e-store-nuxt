<template>
  <NuxtLayout>
    <div class="error-layout">
      <div class="error-content">
        <div class="builder-animation">
          <ClientOnly>
            <Icon
              name="fa6-solid:person-digging"
              class="builder-icon"
            />
          </ClientOnly>
        </div>
        <div class="hammer-animation">
          <ClientOnly>
            <Icon
              name="mdi:hammer-wrench"
              class="hammer-icon"
            />
          </ClientOnly>
        </div>
        <h1 class="error-code">
          {{ error.statusCode }}
        </h1>
        <h2 class="error-title">
          {{ title }}
        </h2>
        <p class="error-description">
          {{ description }}
        </p>
        <BaseButton
          variant="primary"
          @click="handleError"
        >
          HOMEPAGE
        </BaseButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { clearError } from "#app";
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const title = computed(() => {
  return `${props.error.statusCode} ERROR`;
});

const description = computed(() => {
  return props.error.statusCode === 404
    ? "This page not found; \nback to home and start again"
    : "Something went wrong on our end. We are working to fix it.";
});

const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped lang="scss">
.error-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 40px 20px;
  color: theme-color("opposite-color");
  text-align: center;
  background-color: theme-color("main-color");
}

.error-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  padding: 20px;
}

.error-code {
  margin: 0;
  font-size: clamp(4rem, 20vw, 8rem);
  font-weight: $fw-bold;
  line-height: 1;
  color: theme-color("accent-color");
  animation: pulse 2.5s ease-in-out infinite;
}

.error-title {
  margin: 0;
  font-size: 2rem;
  font-weight: $fw-medium;
}

.error-description {
  max-width: 400px;
  margin: 0 0 16px;
  font-size: 1.1rem;
  color: theme-color("link-color-light");
  white-space: pre-line;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin: 0 0 16px;
    font-size: 1rem;
    line-height: 44px;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

.builder-animation {
  position: absolute;
  bottom: -20px;
  left: -40px;
  z-index: 10;

  @media (max-width: ($breakpoints-m - 1px)) {
    bottom: -10px;
    left: -20px;
    transform: scale(0.7);
  }
}

.builder-icon {
  font-size: 100px;
  color: theme-color("accent-color");
  animation: builder-jump 0.8s infinite alternate ease-in-out;
}

.hammer-animation {
  position: absolute;
  top: -20px;
  right: -40px;
  z-index: 10;

  @media (max-width: ($breakpoints-m - 1px)) {
    top: -10px;
    right: -20px;
    transform: scale(0.7);
  }
}

.hammer-icon {
  font-size: 80px;
  color: theme-color("opposite-color");
  transform-origin: 20% 80%;
  animation: hammer-swing 0.8s infinite alternate ease-in-out;
}

@keyframes hammer-swing {
  from {
    transform: rotate(20deg) scaleX(-1);
  }

  to {
    transform: rotate(-45deg) scaleX(-1);
  }
}

@keyframes builder-jump {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-10px);
  }
}
</style>
