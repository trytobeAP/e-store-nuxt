<template>
  <footer>
    <div class="content">
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
          :items="IconNavItems"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface TextNavItem {
  linkSlug: string;
  content: string;
}

interface IconNavItem {
  linkSlug: string;
  iconName: string;
}

const initialTextItems = [
  "contact",
  "terms of services",
  "shipping and returns",
];

const moreInfoItemsContent = initialTextItems.map((elem) => {
  return elem.toUpperCase();
});

const moreInfoItemsLinkSlug = initialTextItems.map((elem) => {
  return elem.split(" ").join("-");
});

const textNavItems: TextNavItem[] = initialTextItems.map((_, i) => ({
  content: moreInfoItemsContent[i],
  linkSlug: moreInfoItemsLinkSlug[i],
}));

const IconNavItems: IconNavItem[] = [
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
  border: none;
  border-top: 1px solid theme-color(gray-color);
  margin: 0;
  height: 1px;
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
