<template>
  <div class="socials-wrapper">
    <span class="socials-label">Follow us</span>
    <div class="socials-line" />
    <UtilsNavigationGroupIcon
      :items="socialItems"
      link-class="social-link"
    />
  </div>
</template>

<script setup lang="ts">
import type { IconNavItem } from "~/types/NavItems";

const socialItems: IconNavItem[] = [
  { linkSlug: "facebook", iconName: "ri:facebook-fill" },
  { linkSlug: "instagram", iconName: "mdi:instagram" },
  { linkSlug: "twitter", iconName: "mdi:twitter" },
];
</script>

<style scoped lang="scss">
.socials-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

.socials-label {
  font-size: 16px;
  font-weight: $fw-medium;
  color: theme-color("opposite-color");
}

.socials-line {
  width: 40px;
  height: 1px;
  background-color: theme-color("gray-dark-color");
}
</style>
