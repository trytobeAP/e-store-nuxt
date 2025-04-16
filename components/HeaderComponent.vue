<template>
  <div class="header-top-page d-flex align-center">
    <NuxtLink to="/">
      <HeaderLogo />
    </NuxtLink>

    <nav class="nav">
      <HeaderNavigation />
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header-top-page {
  justify-content: space-between;
}
</style>
