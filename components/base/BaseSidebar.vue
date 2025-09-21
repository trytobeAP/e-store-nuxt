<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="sidebar-overlay"
        @click="$emit('close')"
      />
    </Transition>
    <Transition :name="transitionName">
      <aside
        v-if="isOpen"
        class="sidebar-panel"
      >
        <div
          v-if="title || $slots.headerActions"
          class="panel-header"
        >
          <component
            :is="titleComponent"
            class="panel-title"
          >
            <NuxtLink
              v-if="titleLink"
              :to="titleLink"
              @click="$emit('close')"
            >
              <HeaderLogo v-if="showLogo" />
              <span v-else>{{ title }}</span>
            </NuxtLink>
            <template v-else>
              <HeaderLogo v-if="showLogo" />
              <span v-else>{{ title }}</span>
            </template>
          </component>

          <div class="header-actions">
            <slot name="headerActions" />

            <BaseButton
              variant="plain"
              aria-label="Close menu"
              @click="$emit('close')"
            >
              <Icon
                name="local-custom:cross-thin"
                size="24"
              />
            </BaseButton>
          </div>
        </div>

        <div class="sidebar-content-wrapper">
          <slot />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    direction?: "left" | "right";
    title?: string;
    titleLink?: string;
    showLogo?: boolean;
  }>(),
  {
    direction: "right",
    title: "",
    titleLink: undefined,
    showLogo: false,
  },
);

defineEmits(["close"]);

const transitionName = computed(() => `slide-${props.direction}`);

const titleComponent = computed(() => (props.showLogo ? "div" : "h3"));
</script>

<style scoped lang="scss">
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
}

.sidebar-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: theme-color("main-color");
  box-shadow: -2px 0 10px rgb(0 0 0 / 10%);

  &.from-left {
    right: auto;
    left: 0;
    box-shadow: 2px 0 10px rgb(0 0 0 / 10%);
  }
}

.panel-header {
  display: flex;
  flex-shrink: 0;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
}

.panel-title {
  margin: 0;
  font-family: "Allerta Stencil", sans-serif;
  font-size: 24px;
  font-weight: $fw-regular;
  line-height: 40px;
  color: theme-color("opposite-color");

  a {
    color: inherit;
    text-decoration: none;
  }
}

.header-actions {
  display: flex;
  flex-shrink: 0;
  gap: 16px;
  align-items: center;
}

.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: theme-color("opposite-color");
  cursor: pointer;
  background: none;
  border: none;
}

.sidebar-content-wrapper {
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
