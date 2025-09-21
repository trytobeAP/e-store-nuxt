<template>
  <footer>
    <BaseDivider class="footer-divider desktop-only-divider" />

    <div class="desktop-footer">
      <div class="d-flex justify-between footer-row">
        <UtilsNavigationGroupText
          class="footer-text-nav"
          :items="desktopNavItems"
          link-class="info-link"
        />
        <div class="newsletter-wrapper">
          <UtilsNewsletterForm max-width="100%" />
        </div>
      </div>
      <div class="d-flex justify-between footer-row">
        <FooterNavigationLicense class="footer-license-desktop" />

        <UtilsNavigationGroupIcon
          class="footer-icon-nav"
          link-class="info-link"
          :items="socialItems"
        />
      </div>
    </div>

    <div class="mobile-footer">
      <div class="footer-section">
        <UtilsNewsletterForm
          max-width="400px"
          :is-agreement-accepted="isAgreedToTerms"
        />

        <BaseCheckbox v-model="isAgreedToTerms">
          i agree to the website's terms and conditions
        </BaseCheckbox>
      </div>

      <div class="footer-section">
        <UtilsNavigationGroupText
          class="footer-nav-mobile"
          link-class="info-link"
          :items="desktopNavItems"
        />
      </div>

      <div class="footer-section">
        <FooterSocials />
      </div>

      <FooterNavigationLicense class="footer-license-mobile" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import FooterSocials from "~/components/footer/FooterSocials.vue";
import BaseDivider from "~/components/base/BaseDivider.vue";
import type { TextNavItem, IconNavItem } from "~/types/NavItems";

const isAgreedToTerms = ref(false);

const desktopNavItems: TextNavItem[] = [
  "contact",
  "terms of services",
  "shipping and returns",
].map((item) => ({
  content: item.toUpperCase(),
  linkSlug: item.split(" ").join("-"),
}));

const socialItems: IconNavItem[] = [
  { linkSlug: "https://facebook.com", iconName: "ri:facebook-fill" },
  { linkSlug: "https://instagram.com", iconName: "mdi:instagram" },
  { linkSlug: "https://twitter.com", iconName: "mdi:twitter" },
];
</script>

<style scoped lang="scss">
.footer-divider {
  margin-top: 40px;
}

.desktop-only-divider {
  display: block;

  @media (max-width: ($breakpoints-m - 1px)) {
    display: none;
  }
}

.desktop-footer {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 60px;

  @media (max-width: ($breakpoints-l - 1px)) {
    display: none;
  }
}

.mobile-footer {
  display: none;

  @media (max-width: ($breakpoints-l - 1px)) {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 32px;
  }
}

.footer-row {
  display: flex;
  gap: 32px;
  align-items: center;
}

.newsletter-wrapper {
  margin-left: auto;
}

.footer-text-nav {
  display: flex;
  gap: 40px;

  :deep(.text-link) {
    font-size: 14px;
    font-weight: $fw-regular;

    &:hover,
    &:focus,
    &:active {
      color: theme-color("link-color");
    }
  }

  @media (min-width: $breakpoints-m) and (max-width: ($breakpoints-l - 1px)) {
    :deep(&.text-navigation) {
      gap: 16px !important;
    }

    :deep(.text-link) {
      font-size: 13px;
      white-space: nowrap;
    }
  }
}

.footer-icon-nav {
  display: flex;
  gap: 30px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-nav-mobile {
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  :deep(.text-link) {
    font-size: 14px;
    font-weight: $fw-regular;
  }
}

.footer-license-mobile {
  font-size: 14px;
  text-align: center;
}
</style>
