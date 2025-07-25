<template>
  <div>
    <Transition name="fade">
      <div
        v-if="message"
        class="custom-notification"
        role="alert"
      >
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped lang="scss">
.custom-notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  max-width: 300px;
  padding: 10px 20px;
  font-size: 0.9rem;
  color: theme-color(main-color);
  background-color: theme-color(opposite-color);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
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
