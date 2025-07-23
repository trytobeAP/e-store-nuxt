<template>
  <p class="license">
    <span>© 2021 Shelly.</span>
    <NuxtLink
      class="info-link"
      to="/terms-of-use"
    >
      Terms of use
    </NuxtLink>
    <span>and</span>
    <NuxtLink
      class="info-link"
      to="/privacy-policy"
    >
      privacy policy.
    </NuxtLink>
  </p>
</template>

<style scoped lang="scss">
span {
  color: vars.theme-color("opposite-color");
}
</style>
