<template>
  <div>
    <hr class="divider" />
    <div class="spacer" />
    <div class="d-flex justify-between">
      <FooterNavigationGroupText :items="textNavItems" />
      <NewsletterForm />
    </div>
    <div class="spacer" />
    <div class="d-flex justify-between">
      <FooterNavigationLicense />
      <FooterNavigationGroupIcon :items="IconNavItems" />
    </div>
  </div>
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

const moreInfoItemsContent = [
  "contact",
  "terms of services",
  "shipping and returns",
].map((elem) => {
  return elem.toUpperCase();
});

const moreInfoItemsLinkSlug = initialTextItems.map((elem) => {
  return elem.split(" ").join("-");
});

const textNavItems: TextNavItem[] = [];
for (let i = 0; i < initialTextItems.length; i++) {
  textNavItems.push({
    content: moreInfoItemsContent[i],
    linkSlug: moreInfoItemsLinkSlug[i],
  });
}

const IconNavItems: IconNavItem[] = [
  { linkSlug: "facebook", iconName: "uim:facebook-f" },
  { linkSlug: "instagram", iconName: "mdi:instagram" },
  { linkSlug: "twitter", iconName: "mdi:twitter" },
];
</script>

<style scoped lang="scss">
.spacer {
  margin-top: 48px;
}
</style>
