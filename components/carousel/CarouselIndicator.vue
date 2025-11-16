<template>
  <button
    class="carousel-indicator"
    :class="{ 'is-active': active }"
    :aria-label="`Go to slide ${index + 1}`"
    :aria-current="active ? 'true' : undefined"
    @click="$emit('select')"
  />
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  index: number;
}>();

defineEmits(["select"]);
</script>

<style scoped lang="scss">
.carousel-indicator {
  position: relative;
  width: 8px;
  height: 8px;
  padding: 0;
  margin: 0 5px;
  cursor: pointer;
  background-color: theme-color("gray-color");
  border: 1px solid transparent;
  border-radius: 50%;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    border-color 0.3s ease;

  &.is-active {
    background-color: transparent;
    border-color: theme-color("gray-color");
    transform: scale(2);
  }

  &:focus-visible {
    outline: 2px solid theme-color("gray-color");
    outline-offset: 2px;
  }

  @media (max-width: $breakpoints-m) {
    width: 7px;
    height: 7px;
    margin: 0 4px;

    &.is-active {
      transform: scale(1.9);
    }

    &:focus-visible {
      outline-offset: 1.5px;
    }
  }

  @media (max-width: $breakpoints-s) {
    width: 6px;
    height: 6px;
    margin: 0 3px;

    &.is-active {
      transform: scale(1.8);
    }

    &:focus-visible {
      outline-offset: 1px;
    }
  }
}

.carousel-indicator::before {
  position: absolute;
  inset: -10px;
  content: "";
  border-radius: 50%;
}
</style>
