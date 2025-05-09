<template>
  <div>
    <Transition name="fade">
      <div
        v-if="props.message"
        class="custom-notification"
        role="alert"
      >
        {{ props.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.custom-notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: theme-color(opposite-color);
  color: theme-color(main-color);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 300px;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
