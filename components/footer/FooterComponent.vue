<template>
  <footer class="content">
    <hr class="divider" />
    <div class="d-flex justify-between footer-row">
      <UtilsNavigationGroupText
        class="footer-text-nav"
        :items="textNavItems"
      />
      <div class="newsletter-wrapper">
        <UtilsNewsletterForm />
      </div>
    </div>
    <div class="d-flex justify-between footer-row">
      <FooterNavigationLicense />
      <UtilsNavigationGroupIcon
        class="footer-icon-nav"
        :items="iconNavItems"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { TextNavItem, IconNavItem } from "~/types/NavItems";

const initialTextItems = [
  "contact",
  "terms of services",
  "shipping and returns",
];

const textNavItems: TextNavItem[] = initialTextItems.map((item) => ({
  content: item.toUpperCase(),
  linkSlug: item.split(" ").join("-"),
}));

const iconNavItems: IconNavItem[] = [
  { linkSlug: "facebook", iconName: "uim:facebook-f" },
  { linkSlug: "instagram", iconName: "mdi:instagram" },
  { linkSlug: "twitter", iconName: "mdi:twitter" },
];
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.content > hr.divider {
  width: 100%;
  height: 1px;
  margin: 0;
  border: none;
  border-top: 1px solid theme-color(gray-color);
}

.newsletter-wrapper {
  margin-left: auto;
}

.footer-text-nav {
  gap: 40px;

  :deep(.text-link) {
    font-weight: 400;
    color: theme-color("link-color-light");

    &:hover,
    &:focus,
    &:active {
      color: theme-color("link-color");
    }
  }
}

.footer-icon-nav {
  gap: 30px;

  :deep(.icon-link) {
    color: theme-color("link-color-light");

    &:hover,
    &:focus,
    &:active {
      color: theme-color("link-color");
    }
  }
}
</style>
